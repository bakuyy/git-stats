import React, { useEffect, useState } from "react";
import { getTotalStars } from "@/app/utils/githubHelpers";
import { FaStar } from "react-icons/fa";
import { RiStarSLine } from "react-icons/ri";
import { RiStarSmileFill } from "react-icons/ri";
import { GiBarbedStar } from "react-icons/gi";
import { LuStar } from "react-icons/lu";
import { BsStarFill } from "react-icons/bs";

export default function StarDisplay({ userData }: { userData: any }) {
  const { repos } = userData;
  const totalStars = getTotalStars(repos);

  //choose random icon
  const randomIcon = () => {
    const iconsArray = [
      <FaStar key={Math.random()} />,
      <RiStarSLine key={Math.random()} />,
      <RiStarSmileFill key={Math.random()} />,
      <GiBarbedStar key={Math.random()} />,
      <LuStar key={Math.random()} />,
      <BsStarFill key={Math.random()} />,
    ];
    return iconsArray[Math.floor(Math.random() * iconsArray.length)];
  };

  const starIcons = Array.from({ length: totalStars }, randomIcon);

  return (
    <div>
      <div>
        <h2>Total Stars: {totalStars}</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {starIcons} 
        </div>
      </div>
    </div>
  );
}
