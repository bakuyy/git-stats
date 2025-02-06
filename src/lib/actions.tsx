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

    const partialUserData = await response.json()

    // fetch repositories
    const reposResponse = await fetch(partialUserData.repos_url, {
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
    let allCommits: string[] = []

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
          commits.map((commit: any) => commit.commit.message)
        )
      }
    }

    // sort all commits by date (most recent first)

    // prepare final user data
    const userData = {
      login: partialUserData.login,
      avatar_url: partialUserData.avatar_url,
      public_repos: partialUserData.public_repos,
      followers_count: partialUserData.followers,
      following_count: partialUserData.following,
      repos: repos.map((repo: any) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url
      })),
      commits: allCommits 
    }
    console.log(allCommits)
    return userData
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
//       avatar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhVzhG4W5smueB0d6uh1ZK106XzCaqcCgTw&s",
//       public_repos: 42,
//       followers_count: 120,
//       following_count: 80,
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
//         }
//       ],
//       commits: [
//           'refactor: limit commit fetching for 5 recent repos for rate limit',
//           'refactor: split userData and commit fetching into different functions',
//           'feat: add commit helper',
//           'fix: add github authentication to increase rate limit and fix commit fetching',
//           'style: add mapping for top languages',
//           'fix: parse follower and following count correctly for display',
//           'fix: fix storage bug so it stores on client',
//           'fix: changed star display to render directly from page instead of stats',
//           'feat: add local storage to data',
//           'style: added glow rotate animations and background to stars',
//           'feat: added star display feature',
//           'refactor: updated structure of data fetched from github api',
//           'style: add customized loading page',
//       ]
//     }
//     console.log(mockData)
//     return mockData;

//   }    
//  catch (error) {
//   console.error('Error fetching GitHub user:', error);
//   return null;
// }
// } 
