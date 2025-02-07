import Sentiment from 'sentiment';


export default function CommitsAnalysis(data:{userData: { commits: string[] }}): [string, string, string] {
    const userData = data.userData
    const commitMessages = userData.commits
    console.log("repo", userData.commits)

    const sentiment = new Sentiment()

    if (commitMessages === null) {
        console.warn("CommitsAnalysis: No commit messages found");
        return [  "",  "",  "" ];
    }

    const analysis = commitMessages.map(msg=>({
        text: msg,
        score: sentiment.analyze(msg).score
    }))
    const happiest = analysis.reduce((a, b) => a.score > b.score ? a : b).text;
    const angriest = analysis.reduce((a, b) => a.score < b.score ? a : b).text;
    const random = commitMessages[Math.floor(Math.random()*commitMessages.length)]
    
    return [happiest, angriest, random ];
  }