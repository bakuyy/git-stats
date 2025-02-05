import { Source_Code_Pro } from "next/font/google"

const code_pro = Source_Code_Pro({
  display: 'swap',
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-source-code-pro'
})

export default function Loading() {
  return (
    <div className={`${code_pro.variable} font-code_pro min-h-screen flex flex-col items-center justify-center bg-[#0d1117]`}>
      Loading...
    </div>
  )
}