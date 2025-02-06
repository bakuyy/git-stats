"use server"

export async function fetchUserData(username: string): Promise<GitHubUser | null> {
  try {
    // api call to fetch user data
    const response = await fetch(`https://api.github.com/users/${username}`);
    console.log('Fetching data for username:', username);
    if (!response.ok) {
      return null; // user not found
    }

    // check for rate limit lol
    const remaining = response.headers.get("X-RateLimit-Remaining");
    const reset = response.headers.get("X-RateLimit-Reset");

    if (remaining === "0" && reset !== null) {
      const resetTime = new Date(parseInt(reset, 10) * 1000);
      const message = `Rate limit exceeded. Try again at ${resetTime.toLocaleTimeString()}`;
      console.log(message);
      throw new Error(message);
    }

    // parse data
    const data = await response.json();

    const [repos] = await Promise.all([
      fetch(data.repos_url).then(res => res.json()),
    ]);

    const userData = {
      login: data.login,
      avatar_url: data.avatar_url,
      public_repos: data.public_repos,
      followers_count: data.followers,
      following_count: data.following,
      repos: repos.map((repo: any) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
      })),
    };

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
