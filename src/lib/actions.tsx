"use server"
export async function fetchUserData(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GITHUB_KEY}`
      }
    })
    // console.log('Fetching data for username:', username);
    // console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json(); 
      console.error('GitHub API Error:', errorData);
      console.log("token", process.env.GITHUB_KEY)
      return null; 
    }

    const partialUserData = await response.json()
    // console.log('user data:', partialUserData)

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

    // check if repos is an array before proceeding
    if (!Array.isArray(repos)) {
      console.error('Expected repos to be an array, but got:', repos)
      return null;  // or return an empty array or some fallback data
    }

    let commitData : any[] = []

    // fetch commits for each repository
    const fetchCommits = async (repo: any) => {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits`,
          {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${process.env.GITHUB_KEY}`
            }
          }
        )
  
        if (!commitsResponse.ok) {
          console.error(`error fetching commits for repo ${repo.name}:`, commitsResponse.status)
          return []
        }
  
        const commits = await commitsResponse.json()
        return Array.isArray(commits)
          ? commits.map((commit: any) => ({ message: commit.commit.message }))
          : []
      }
  
      // fetch commits for all repositories
      const reposWithCommits = await Promise.all(
        repos.map(async (repo) => ({
          name: repo.name,
          stars: repo.stargazers_count,
          language: repo.language,
          url: repo.html_url,
          commits: await fetchCommits(repo),
        }))
      )


    const userData = {
      login: partialUserData.login,
      avatar_url: partialUserData.avatar_url,
      public_repos: partialUserData.public_repos,
      followers_count: partialUserData.followers,
      following_count: partialUserData.following,
      repos: reposWithCommits
    }

    return userData;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null; 
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
