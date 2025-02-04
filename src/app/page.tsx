import { Source_Code_Pro } from "next/font/google"
import Form from "next/form"
import Link from "next/link"
import UserQueryForm from "@/components/forms/UserQuery"

const code_pro = Source_Code_Pro({
  display:'swap',
  subsets:['latin'],
  weight:['600'],
  variable:'--font-source-code-pro'
}) 

export default function Home() {
  return (
  <div className={`${code_pro.variable} flex items-center font-code_pro justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}>       
    <main className="ml-[5vw]">
      <h3 className="mb-[2vh] text-3xl sm:text-md"> built by bakuyy </h3>
      <div className="flex gap-4 my-[2vh]">
        <div className="w-[1.5vw] h-[1.5vw] bg-[#0D4429] rounded-full"/>
        <div className="w-[1.5vw] h-[1.5vw] bg-[#26A641] rounded-full"/>
        <div className="w-[1.5vw] h-[1.5vw] bg-[#39D353] rounded-full"/>
      </div>
      <h1 className="text-4xl mt-[4vh] font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl"> git commit -m “<span className="text-gray-400">docs</span>: <span className="text-[#39D353]">add my stats</span>”</h1>

      <div className="text-2xl mt-[3vh]">
        <h3> {`>>`} generate a customized stats book for your github profile in seconds</h3>
        <h3> {`>>`} show off your achievements with style and check your clan</h3>
      </div>

      <UserQueryForm/>


    </main> 
  </div>
  );
}
