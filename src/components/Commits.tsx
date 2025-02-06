import CommitsAnalysis from "@/lib/commitsAnalysis";
import { sourceCodePro } from "@/app/fonts";
import { GoSmiley } from "react-icons/go";
import { PiSmileyAngryLight } from "react-icons/pi"
import { FaRandom } from "react-icons/fa";
import { yellow } from "@mui/material/colors";



export default function Commits(userData: any){
    const res = CommitsAnalysis(userData)

    return (
        <div className={`${sourceCodePro.variable} bg-[#0d1117] text-white p-8 mt-[2vh] `}>
        <div className="max-w-4xl mx-auto flex flex-wrap gap-[1vw]">
          <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-md shadow-[#ffcd42]">
            <p className="text-lg font-medium flex">
              happiest commit 
              <GoSmiley className="ml-8"  color={"#ffcd42"}  size={20}/>
            </p>
            <span className="text-[#ffcd42] font-bold">
                {res[0]}
              </span>
          </div>
          <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-md shadow-[#e0401f]">
            <p className="text-lg font-medium flex">
              most rageful commit{" "}
              <PiSmileyAngryLight color={"#e0401f"} className="ml-4" size={30}/>
            </p>
            <span className="text-[#e0401f] font-bold">
                {res[1]}
              </span>
          </div>
          <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-md shadow-[#3091ff]">
            <p className="text-lg font-medium flex">
              random commit spotlight{" "}
              <FaRandom className="ml-4" color={"#3091ff"}  size={15}/>

            </p>
            <span className="text-[#3091ff] font-bold">
                {res[2]}
              </span>
          </div>
  

        </div>
      </div>
      )

}