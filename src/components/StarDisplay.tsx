import React from "react";
import { getTotalStars } from "@/app/utils/githubHelpers";
import { RiStarSmileFill } from "react-icons/ri";
import { BsStarFill } from "react-icons/bs";

interface StarDisplayProps {
    userData: any;
    starSize: string;
    dimension: number;
}

export default function StarDisplay({ userData, starSize, dimension }: StarDisplayProps) {
  const { repos } = userData;
  const totalStars = getTotalStars(repos);

  // Choose random icon
  const randomIcon = () => {
    const iconsArray = [
      <RiStarSmileFill key={Math.random()} />,
      <BsStarFill key={Math.random()} />,
    ];
    return iconsArray[Math.floor(Math.random() * iconsArray.length)];
  };

  // Choose random positioning
  const generateRandomPosition = (maxWidth: number, maxHeight: number) => {
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);
    return { top: randomY + "px", left: randomX + "px" };
  };

  // Generate the star icons with random positions
  const starIcons = Array.from({ length: totalStars }, (_, index) => {
    const icon = randomIcon();
    const randomPosition = generateRandomPosition(dimension, dimension);
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          top: randomPosition.top,
          left: randomPosition.left,
          fontSize: starSize,
          borderRadius: "100px",
          animation: "rotateAndGlow 20s infinite linear", // Rotating animation for stars
        }}
      >
        {icon}
      </div>
    );
  });

  return (
    <div className="bg-gradient-to-r from-[#151247] mt-12 max-w-4xl mx-auto flex items-center justify-center to-[#2b134a] w-64 h-64 relative rounded-xl border white shadow-md shadow-white">
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {starIcons}
        <span className="absolute bottom-2 left-4 text-white">
          repo constellation: {totalStars}
        </span>
      </div>
    </div>
  );
}
