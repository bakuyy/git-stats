"use client"
import UserQueryForm from "@/components/forms/UserQuery"
import { Typewriter } from "react-simple-typewriter"
import Tooltip from '@mui/material/Tooltip'
import { sourceCodePro } from "./fonts"
import {motion} from "motion/react"

export default function Home() {
  return (
    <div className={`${sourceCodePro.variable} ml-[15vw] font-source-code-pro flex flex-col items-start justify-center min-h-screen px-6 sm:px-12 py-8 gap-8 sm:gap-16 ml-[5vw] `}>       

      <main className="w-full max-w-4xl text-left"> 
        <h3 className="mb-4 text-xl sm:text-2xl text-left"> 
          built by bakuyy
        </h3>

        <div className="flex gap-2 justify-start"> 
        <div className="w-4 h-4 bg-[#0D4429] rounded-full animate-pulse" />
          <div className="w-4 h-4 bg-[#26A641] rounded-full animate-pulse delay-250" />
          <div className="w-4 h-4 bg-[#39D353] rounded-full animate-pulse delay-800" />
        </div>

        <h1 className="text-4xl mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight text-left">
          git commit -m “
          <span className="text-gray-400">docs</span>:{" "}
          <span className="text-[#39D353] inline-block">
            <Typewriter words={["add my stats"]} cursorStyle="" cursor typeSpeed={100} deleteSpeed={50} delaySpeed={1000} />
          </span>
          ”
        </h1>

        <div className="my-[2vw] text-lg sm:text-xl text-gray-300 leading-relaxed grid gap-2 text-left">
          <h3>{`>>`} Customized stats book for your GitHub profile in seconds</h3>
          <h3>{`>>`} Show off your achievements with style and check your <Tooltip title="commitment issues? perfectionist? let's find out!"><span className="underline">clan</span></Tooltip></h3>
        </div>

        <UserQueryForm />
      </main>
    </div>
  )
}
