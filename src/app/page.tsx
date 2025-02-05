"use client"
import { Source_Code_Pro } from "next/font/google"
import UserQueryForm from "@/components/forms/UserQuery"
import { Typewriter } from "react-simple-typewriter"
import Tooltip from '@mui/material/Tooltip'


const code_pro = Source_Code_Pro({
  display:'swap',
  subsets:['latin'],
  weight:['600'],
  variable:'--font-source-code-pro'
}) 

export default function Home() {
  return (
    <div className={`${code_pro.variable} font-code_pro flex flex-col items-center justify-center min-h-screen px-6 sm:px-12 py-8 gap-8 sm:gap-16`}>       

      <main className="w-full max-w-4xl text-center sm:text-left">
        <h3 className="mb-4 text-xl sm:text-2xl text-center sm:text-left">built by bakuyy</h3>

        <div className="flex gap-2 justify-center sm:justify-start">
          <div className="w-4 h-4 bg-[#0D4429] rounded-full" />
          <div className="w-4 h-4 bg-[#26A641] rounded-full" />
          <div className="w-4 h-4 bg-[#39D353] rounded-full" />
        </div>

        <h1 className="text-4xl mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight text-center sm:text-left">
          git commit -m “
          <span className="text-gray-400">docs</span>:{" "}
          <span className="text-[#39D353] inline-block">
            <Typewriter words={["add my stats"]} cursorStyle="" cursor typeSpeed={100} deleteSpeed={50} delaySpeed={1000} />
          </span>
          ”
        </h1>

        <div className="my-[2vw] text-lg sm:text-xl text-gray-300 leading-relaxed grid gap-2 text-left">
          <h3 className="text-center sm:text-left">{`>>`} Customized stats book for your GitHub profile in seconds</h3>
          <h3 className="text-center sm:text-left">{`>>`} Show off your achievements with style and check your <Tooltip title="commitment issues? perfectionist? let's find out!"><span className="underline">clan</span></Tooltip></h3>
        </div>

        <UserQueryForm />
      </main>
    </div>
  )
}
