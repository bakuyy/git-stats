export async function fetchCommits(username: string, repoName: string, maxCommits: number = 75) {
    try {
      const commitsResponse = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/commits?per_page=${maxCommits}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${process.env.GITHUB_KEY}`
          }
        }
      )
  
      if (!commitsResponse.ok) {
        console.error('error fetching commits:', commitsResponse.status)
        return []
      }
  
      const commits = await commitsResponse.json()
      return Array.isArray(commits)
        ? commits.map((commit: any) => ({
            message: commit.commit.message,
            date: commit.commit.author.date
          }))
        : []
    } catch (error) {
      console.error('error fetching commits:', error)
      return []
    }
  }