"use server"

export async function fetchUserData(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) return null;
    
    const dataPromise = response.json();
    const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));
    
    const [data] = await Promise.all([dataPromise, delayPromise]);

    const [repos, following, followers] = await Promise.all([
        fetch(data.repos_url).then(res=>res.json()),
        fetch(data.following_url).then(res=>res.json()),
        fetch(data.followers_url).then(res=>res.json()),
    ])
    
    return {
      login: data.login,
      avatar_url:data.avatar_url,
      public_repos: data.public_repos,
      followers_count: followers.length,
      following_count: following.length,
      repos: repos.map((repo:any)=> ({
        name: repo.name,
      }))
    }
  } catch (error) {
    console.error('Error fetching gitHub user:', error);
    return null
  }
}
