"use client";
import { Suspense, useState, useEffect } from "react";
import UserStats from "@/components/UserStats";
import { sourceCodePro } from "@/app/fonts/index";
import { fetchUserData } from "@/lib/actions";
import StarDisplay from "@/components/StarDisplay";

interface UserPageProps {
  userData: GitHubUser;
}

export default function UserPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("githubUser");

    if (storedUser) {
      fetchUserData(storedUser)
        .then((userData) => {
          if (userData) {
            setUser(userData);
          }
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
        });
    }
  }, [])

  if (!user) return null;


  let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  var dimension = vw / 10

  return (
    <div
      className={`${sourceCodePro.variable} font-source-code-pro min-h-screen bg-[#0d1117] text-white p-8 `}
    >
      <div className="max-w-4xl mx-auto mt-[5vh]">
        <div className="flex items-center gap-4 sm:text-2xl md:text-2xl">
          <div className="mb-8  mr-4">
            <div className="flex gap-2 justify-center mb-4">
              <div className="w-4 h-4 bg-[#0D4429] rounded-full" />
              <div className="w-4 h-4 bg-[#26A641] rounded-full" />
              <div className="w-4 h-4 bg-[#39D353] rounded-full" />
            </div>
            <img
              className="rounded-full w-32 h-32 object-cover "
              src={user.avatar_url}
              alt={`Avatar of ${user.login}`}
            />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-left sm:text-2xl md:text-4xl">
              GET / stats/
              <h2 className="text-[#39D353] text-2xl"> for @{user.login}</h2>
            </h1>
          </div>
        </div>

        {/* <Suspense fallback={<div>Loading stats...</div>}> */}
          <UserStats />
          <StarDisplay dimension={dimension} starSize={"1.5vh"} userData={user} />
        {/* </Suspense> */}
      </div>
    </div>
  );
}
