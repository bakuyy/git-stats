import getGithubClan from "@/lib/getGithubClan"
import Image from "next/image";

export default function Clan(userData: any) {
  const clan = getGithubClan(userData);
  const clanMapping = {
    charcode: { name: "A Charcode!", colour: "yellow", icon: "🔥", img:'/images/char.png', description:'Bold and fast-paced coder who thrives on new features and rapid development' },
    squidhub: { name: "A Squidhub!", colour: "#93c8d0", icon: "🌊", img:'/images/squirtle.png', description:'Steady and reliable developer who focuses on clean, well-structured code' },
    zapforce: { name: "A Pikaforce!", colour: "yellow", icon: "⚡", img:'/images/pika.png', description:'Efficient and performance-driven coder who optimizes and automates relentlessly' },
    bulbyte: { name: "A Bulbyte!", colour: "green", icon: "🌱", img:'/images/bulb.png', description:'Thoughtful and strategic developer who prioritizes long-term stability and maintainability' },
  }
  
  if (!clan) return null;
  const clanDetails = clanMapping[clan as keyof typeof clanMapping];

  return (
    <div 
      style={{
        boxShadow: `5px 5px 10px ${clanDetails.colour}`,
        border: `1px solid ${clanDetails.colour}`
      }} 
      className="mt-12 max-w-4xl mx-auto flex flex-wrap w-full h-auto relative rounded-xl shadow-lg p-4"
    >
      <div className="ml-4 mt-2 text-lg font-semibold">if-you-were-a-pokemon, you'd-be...</div>
      <div className="p-6 w-full flex items-center">
        <div className="flex items-center space-x-4 w-full">
          <div className="text-5xl">{clanDetails.icon}</div>

          <div className="flex flex-col justify-center items-start">
            <h2 
              style={{ color: `${clanDetails.colour}` }} 
              className="text-xl font-bold text-white"
            >
              {clanDetails.name}
            </h2>
            <p className="text-gray-200 text-sm">{clanDetails.description}</p>
          </div>

          <Image 
            className="w-32 h-32 object-contain" 
            src={clanDetails.img} 
            alt="Logo" 
            width={128} 
            height={128} 
          />
        </div>
      </div>
    </div>
  );
}
