import React from "react";
import { getTotalStars } from "@/app/utils/githubHelpers";
import { RiStarSmileFill } from "react-icons/ri";
import { BsStarFill } from "react-icons/bs";


interface StarDisplayProps {
    userData : any
    starSize: string
    dimension: number

}
export default function StarDisplay({ userData, starSize,dimension}:StarDisplayProps) {
  const { repos } = userData;
  const totalStars = getTotalStars(repos);

  //choose random icon
  const randomIcon = () => {
    const iconsArray = [

      <RiStarSmileFill key={Math.random()} />,
      <BsStarFill key={Math.random()} />,
    ];
    return iconsArray[Math.floor(Math.random() * iconsArray.length)];
  };

  //choose random positioning
    const generateRandomPosition = (maxWidth: number, maxHeight: number) => {
    const randomX = Math.floor(Math.random() * maxWidth) + "px";
    const randomY = Math.floor(Math.random() * maxHeight) + "px";
    return { top: randomY, left: randomX };
  }


  const starIcons = Array.from({ length: totalStars }, (_, index) => {
    const icon = randomIcon();
    const randomPosition = generateRandomPosition(dimension, dimension)
    return (
      <div
        key={index} 
        style={{
          position: "absolute",
        //   top: randomPosition.top,
        //   left: randomPosition.left,
          margin: "20px",
          ...randomPosition,
          fontSize: starSize, 
          borderRadius:"100px",
          animation: "rotateAndGlow 20s infinite linear", 
        }}
      >
        {icon}
      </div>
    );
  })

  return (
    <div className="bg-gradient-to-r from-[#151247] to-[#2b134a] w-64 h-64 relative rounded-xl border white shadow-md shadow-white">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {starIcons} 
          <span className=" ml-4"> repo constellation: {totalStars}</span>
        </div>
    </div>
  );
}
