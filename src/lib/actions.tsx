"use server"

export async function fetchUserData(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) return null;
    
    const dataPromise = response.json();
    const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));
    
    const [data] = await Promise.all([dataPromise, delayPromise]);
    
    return {
      login: data.login,
      public_repos: data.public_repos
    };
  } catch (error) {
    console.error('Error fetching gitHub user:', error);
    return null;
  }
}
