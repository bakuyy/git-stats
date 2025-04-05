"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetchUserData(username: string): Promise<GitHubUser | null> {
  try {
    // Check if GitHub key is available
    if (!process.env.GITHUB_KEY) {
      console.error('GitHub API key is not configured')
      return null
    }

    // fetch user data
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GITHUB_KEY}`
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.error('User not found:', username)
        return null
      }
      if (response.status === 401) {
        console.error('GitHub API authentication failed. Check your API key configuration.')
        return null
      }
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
    const recentRepos = sortedRepos.slice(0, 10)

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
    return userData
  } catch (error) {
    console.error('error fetching github user:', error)
    return null
  }
}
