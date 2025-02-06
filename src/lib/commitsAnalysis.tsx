import { getCommits } from "@/app/utils/githubHelpers";
import sentiment from "sentiment"


export default function CommitsAnalysis(userData: any){
    const repo = userData
    const commitMessages = getCommits(repo)
    const analysis = commitMessages


}