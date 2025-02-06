import { sourceCodePro } from "@/app/fonts"
export default function Loading() {
  return (
    <div className={`${sourceCodePro.variable} font-code_pro min-h-screen flex flex-col items-center justify-center bg-[#0d1117]`}>
      <div className="w-full max-w-4xl px-6 text-center">
        <div className="flex gap-3 justify-center mb-8">
          <div className="w-4 h-4 bg-[#0D4429] rounded-full animate-pulse" />
          <div className="w-4 h-4 bg-[#26A641] rounded-full animate-pulse delay-150" />
          <div className="w-4 h-4 bg-[#39D353] rounded-full animate-pulse delay-300" />
        </div>

        <h1 className="text-2xl text-white mb-4">
          git fetch 
          <span className="text-[#39D353]">/user-stats</span>
        </h1>
        
        <div className="text-gray-400 grid gap-2">
          <p>{`>>`} Analyzing commit patterns...</p>
          <p>{`>>`} Calculating stats...</p>
        </div>
      </div>
    </div>
  )
}