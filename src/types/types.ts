type GitHubUser = {
    login: string;
    avatar_url:string;
    followers_count: number;
    following_count: number;
    public_repos: number;
    repos:any
  }
  

  type reposData = {
    name: string
    stars: number
    language: any
    url: string
    commits: Commit[],
  }

  type Commit =  {
    message: string
  }