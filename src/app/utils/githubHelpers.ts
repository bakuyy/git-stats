import { fetchUserData } from "@/lib/actions";

export function getTotalStars(repos: any[]): number{
    // from repos.stars
    // reduce star count to a sum
    // initial value as 0
    return repos.reduce((sum,repo)=> sum + repo.stars,0)
}

export function getUsedLanguages(repos: any[]): string[]{
    const languageCount: Record<string, number> = {}
    repos.forEach((repo)=>{
        if (repo.language){
            languageCount[repo.language] = languageCount[repo.language || 0 ] +1
        }
    })
    return Object.entries(languageCount)
    .sort((a,b)=> b[1]-a[1]) // sort by most used languages 
    .map(([language])=>language)
}