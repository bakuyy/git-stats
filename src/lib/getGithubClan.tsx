import { getUsedLanguages } from "@/app/utils/githubHelpers";

interface GithubStats  {
    commitCount: number;
    commits : string[]
    languages: string[]
}

export default function getGithubClan(data: { userData: { commits: string[], repos: { language: string }[] } }) {
    let scores = {charcode:0, squidhub:0, pikaforce:0, bulbyte:0}
    const userData = data.userData
    const commitMessages = userData.commits
    const commitCount = commitMessages.length

    if (commitCount > 200) scores.charcode += 3
    else if (commitCount > 150) scores.squidhub += 2
    else if (commitCount > 100) scores.pikaforce += 2
    else scores.bulbyte += 3

    commitMessages.forEach(msg => {
        if (msg.startsWith("feat:")) scores.charcode += 3;
        else if (msg.startsWith("fix:")) scores.squidhub += 3;
        else if (msg.startsWith("style:")) scores.pikaforce += 2;
        else if (msg.startsWith("refactor:")) scores.bulbyte += 3;
        else if (msg.startsWith("perf:")) scores.pikaforce += 3;
      })
      
      const languages = getUsedLanguages(userData.repos)

      languages.forEach(language => {
        if (["JavaScript", "C++", "Swift"].includes(language)) scores.charcode += 3;
        else if (["Python", "Go", "Ruby"].includes(language)) scores.squidhub += 3;
        else if (["Rust", "Node.js", "Shell"].includes(language)) scores.pikaforce += 3;
        else if (["Java", "C#", "TypeScript"].includes(language)) scores.bulbyte += 3;
    })

    let maxClan = Object.keys(scores).reduce((a, b) => (scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b))
  
      return {
        charcode: "charcode",
        squidhub: "squidhub",
        pikaforce: "pikaforce",
        bulbyte: "bulbyte"
      }[maxClan]
    }