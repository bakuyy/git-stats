"use server"
export async function fetchUserData(username: string): Promise<GitHubUser | null> {
  try {
    // fetch user data
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GITHUB_KEY}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('github api error:', errorData)
      return null
    }

    const userData = await response.json()

    // fetch repositories
    const reposResponse = await fetch(userData.repos_url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_KEY}`,
      }
    })

    if (!reposResponse.ok) {
      console.error('error fetching repositories:', reposResponse.status)
      return null
    }

    const repos = await reposResponse.json()

    if (!Array.isArray(repos)) {
      console.error('expected repos to be an array, but got:', repos)
      return null
    }

    // sort repositories by most recently updated
    const sortedRepos = repos.sort((a: any, b: any) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })

    // take the 5 most recent repositories
    // rate limit lol
    const recentRepos = sortedRepos.slice(0, 5)

    // fetch commits for the 5 most recent repositories
    let allCommits: any[] = []

    for (const repo of recentRepos) {
      const commitsResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`, 
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${process.env.GITHUB_KEY}`
          }
        }
      )

      if (!commitsResponse.ok) {
        console.error(`error fetching commits for repo ${repo.name}:`, commitsResponse.status)
        continue // skip this repo and move to the next one
      }

      const commits = await commitsResponse.json()
      if (Array.isArray(commits)) {
        // add commits to the array
        allCommits = allCommits.concat(
          commits.map((commit: any) => ({
            message: commit.commit.message,
            date: commit.commit.author.date,
            repo: repo.name // include repo name for reference
          }))
        )
      }
    }

    // sort all commits by date (most recent first)
    allCommits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // prepare final user data
    const finalUserData = {
      login: userData.login,
      avatar_url: userData.avatar_url,
      public_repos: userData.public_repos,
      followers_count: userData.followers,
      following_count: userData.following,
      repos: recentRepos.map((repo: any) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url
      })),
      commits: allCommits // include all commits from the 5 most recent repos
    }

    return finalUserData
  } catch (error) {
    console.error('error fetching github user:', error)
    return null
  }
}

// "use server"

// export async function fetchUserData(username: string): Promise<GitHubUser | null> {
//   try {
//     // Mock data to return instead of fetching from GitHub API
//     const mockData = {
//       login: "mockUser",
//       avatar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhVzhG4W5smueB0d6uh1ZK106XzCaqcCgTw&s", // Example avatar URL
//       public_repos: 42, // Example public repos count
//       followers_count: 120, // Example followers count
//       following_count: 80, // Example following count
//       repos: [
//         {
//           name: "repo1",
//           stars: 100,
//           language: "JavaScript",
//           url: "https://github.com/mockUser/repo1"
//         },
//         {
//           name: "repo2",
//           stars: 5,
//           language: "Python",
//           url: "https://github.com/mockUser/repo2"
//         },
//         {
//           name: "repo3",
//           stars: 5,
//           language: "Ruby",
//           url: "https://github.com/mockUser/repo3"
//         },
//         {
//           name: "repo4",
//           stars: 2,
//           language: "Go",
//           url: "https://github.com/mockUser/repo4"
//         },
//       ]
//     };

//     return mockData;

//   } catch (error) {
//     console.error('Error fetching GitHub user:', error);
//     return null;
//   }
// }
