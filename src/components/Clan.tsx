import getGithubClan from "@/lib/getGithubClan"
import Image from "next/image";

export default function Clan(userData: any) {
  const clan = getGithubClan(userData);
  const clanMapping = {
    charcode: { name: "Charcode", colour: "yellow", icon: "🔥", img:'/images/char.png',description:'Bold and fast-paced coder who thrives on new features and rapid development' },
    squidhub: { name: "Squidhub", colour: "	#93c8d0", icon: "🌊" , img:'/images/squirtle.png',description:'Steady and reliable developer who focuses on clean, well-structured code'},
    zapforce: { name: "Pikaforce", colour: "yellow", icon: "⚡", img:'/images/pika.png' ,description:'Efficient and performance-driven coder who optimizes and automates relentlessly'},
    bulbyte: { name: "Bulbyte", colour: "green", icon: "🌱", img:'/images/bulb.png',description:'Thoughtful and strategic developer who prioritizes long-term stability and maintainability' },
  }
  if (!clan) return null;
  const clanDetails = clanMapping[clan as keyof typeof clanMapping]

  return (
    <div style={{boxShadow: `5px 5px 5px ${clanDetails.colour}`}} className=" mt-12 max-w-4xl mx-auto flex flex-wrap w-full h-64 relative rounded-xl border shadow-lg">
        <div className="ml-4 mt-2">if-you-were-a-pokemon...</div>
        <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex">
            <div className="text-5xl mr-4">{clanDetails.icon}</div>

            <div className="justify-center items-center">
              <h2 style={{color: `${clanDetails.colour}`}} className="text-xl font-bold text-white flex items-center gap-2">
                {clanDetails.name}
              </h2>
              <p className="text-gray-400 text-sm">{clanDetails.description}</p>
            </div>
            </div>
            <Image className="w-64 pl-24 mr-12" src={clanDetails.img.toString()} alt="Logo" width={500} height={300} />

          </div>
        </div>

    </div>
    </div>
  )
}
