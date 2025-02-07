"use client"
import UserQueryForm from "@/components/forms/UserQuery"
import { Typewriter } from "react-simple-typewriter"
import Tooltip from '@mui/material/Tooltip'
import { sourceCodePro } from "./fonts"

export default function Home() {
  return (
    <div className={`${sourceCodePro.variable} ml-[5vw] sm:ml-[15vw] font-source-code-pro flex flex-col items-start justify-center min-h-screen px-4 sm:px-12 py-6 sm:py-8 gap-6 sm:gap-16 mx-12`}>       

      <main className="w-full max-w-4xl text-left"> 
        <h3 className="mb-4 text-xl sm:text-2xl text-left"> 
          built by <a href="https://github.com/bakuyy">@bakuyy</a>
        </h3>

        <div className="flex gap-2 justify-start mb-[8vh]"> 
        <div className="w-4 h-4 bg-[#0D4429] rounded-full animate-pulse" />
          <div className="w-4 h-4 bg-[#26A641] rounded-full animate-pulse delay-250" />
          <div className="w-4 h-4 bg-[#39D353] rounded-full animate-pulse delay-800" />
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl mt-4 sm:mt-6 font-extrabold tracking-tight text-white leading-tight text-left">
          git commit -m “
          <span className="text-gray-400">docs</span>:{" "}
          <span className="text-[#39D353] inline-block">
            <Typewriter words={["add my stats"]} cursorStyle="" cursor typeSpeed={100} deleteSpeed={50} delaySpeed={1000} />
          </span>
          ”
        </h1>

        <div className="my-[2vw] text-base sm:text-lg text-gray-300 leading-relaxed grid gap-1 sm:gap-2 text-left mb-[8vh]">
          <h3>{`>>`} Customized stats book for your GitHub profile in seconds</h3>
          <h3>{`>>`} Show off your achievements with style and check your <Tooltip title="commitment issues? perfectionist? let's find out!"><span className="underline">clan</span></Tooltip></h3>
        </div>

        <UserQueryForm />
      </main>
    </div>
  )
}
