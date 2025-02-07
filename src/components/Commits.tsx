import CommitsAnalysis from "@/lib/commitsAnalysis";
import { GoSmiley } from "react-icons/go";
import { PiSmileyAngryLight } from "react-icons/pi";
import { FaRandom } from "react-icons/fa";
import { sourceCodePro } from "@/app/fonts";
/* eslint-disable @typescript-eslint/no-explicit-any */


export default function Commits(userData: any){
    const res = CommitsAnalysis(userData);

  const commitData = [
    {
      title: "happiest commit",
      icon: <GoSmiley color="#ffcd42" size={20} />,
      color: "255, 205, 66",
      data: res[0],
    },
    {
      title: "most rageful commit",
      icon: <PiSmileyAngryLight color="#e0401f" size={30} />,
      color: "224, 64, 31",
      data: res[1],
    },
    {
      title: "random commit spotlight",
      icon: <FaRandom color="#3091ff" size={15} />,
      color: "48, 145, 255",
      data: res[2],
    },
  ];

  return (
    <div className={`${sourceCodePro.variable} bg-[#0d1117] text-white p-8 mt-[2vh]`}>
      <div className="max-w-4xl mx-auto flex flex-wrap gap-[1vw] gap-[3vh]">
        {commitData.map((commit, index) => (
          <div
            key={index}
            className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-md"
            style={{ boxShadow: `0 4px 6px rgba(${commit.color}, 0.6)` }}
          >
            <p className="text-lg font-medium flex">
              {commit.title}
              <span className="ml-4" style={{ color: commit.color }}>
                {commit.icon}
              </span>
            </p>
            <span className={`text-[${commit.color}] font-bold`}>
              {commit.data}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

