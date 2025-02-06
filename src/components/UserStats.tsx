"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/actions";
import { sourceCodePro } from "@/app/fonts";

export default function UserStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUserData() {
      const storedUser = localStorage.getItem("githubUser");

      if (storedUser) {
        // Use storedUser directly as a string (the username)
        fetchUserData(storedUser)
          .then((userData) => {
            if (userData) {
              setUser(userData);
            } else {
              router.push("/");
            }
          })
          .catch((error) => {
            console.error("Error loading user data:", error);
            router.push("/");
          });
      }
    }
    console.log(user)
    loadUserData();
  }, [router]);

  if (!user) return null;

  return (
    <div className={`${sourceCodePro.variable} bg-[#0d1117] text-white p-8 `}>
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
        <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-lg shadow-[#39D353]">
          <p className="text-lg font-medium">
            Public Repositories:{" "}
            <span className="text-[#39D353] font-bold">
              {user.public_repos}
            </span>
          </p>
        </div>
        <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-lg shadow-[#39D353]">
          <p className="text-lg font-medium">
            Followers:{" "}
            <span className="text-[#39D353] font-bold">
              {user.followers_count}
            </span>
          </p>
        </div>
        <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-lg shadow-[#39D353]">
          <p className="text-lg font-medium">
            Following:{" "}
            <span className="text-[#39D353] font-bold">
              {user.following_count}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
