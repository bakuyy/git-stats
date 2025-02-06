"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/actions";
import { sourceCodePro } from "@/app/fonts";
import { getUsedLanguages } from "@/app/utils/githubHelpers";

export default function UserStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const router = useRouter()

  const languageColors: Record<string, string> = {
    JavaScript: "#f1e05a",  
    TypeScript: "#3178c6",  // Blue
    Python: "#3572A5",      // Blue
    Java: "#b07219",        // Brown
    C: "#555555",           // Gray
    "C++": "#f34b7d",       // Pink/Red
    "C#": "#178600",          // Green
    PHP: "#4F5D95",         // Dark Blue
    Swift: "#ffac45",       // Orange
    Ruby: "#701516",        // Dark Red
    Kotlin: "#A97BFF",      // Purple
    Go: "#00ADD8",          // Teal
    Rust: "#dea584",        // Light Brown
    HTML: "#e34c26",        // Red
    CSS: "#563d7c",         // Purple
    Shell: "#89e051",       // Light Green
    SQL: "#e38c00",         // Orange
    Dart: "#00B4AB",        // Cyan
    R: "#198CE7",           // Light Blue
    Lua: "#000080",         // Navy Blue
    Other: "#ffffff",       // Default color (white)
  };
  

  useEffect(() => {
    async function loadUserData() {
      const storedUser = localStorage.getItem("githubUser");

      if (storedUser) {
        // Use storedUser directly as a string (the username)
        fetchUserData(storedUser)
          .then((userData) => {
            if (userData) {
              setUser(userData)
              console.log(user)
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
  const languages = getUsedLanguages(user.repos)

  return (
    <div className={`${sourceCodePro.variable} bg-[#0d1117] text-white p-8 `}>
      <div className="max-w-4xl mx-auto flex flex-wrap  gap-4">
        <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-md shadow-[#39D353]">
          <p className="text-lg font-medium">
            Public Repositories:{" "}
            <span className="text-[#39D353] font-bold">
              {user.public_repos}
            </span>
          </p>
        </div>
        <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-md shadow-[#39D353]">
          <p className="text-lg font-medium">
            Followers:{" "}
            <span className="text-[#39D353] font-bold">
              {user.followers_count}
            </span>
          </p>
        </div>
        <div className="w-full sm:w-[30%] bg-[#161b22] rounded-xl p-6 shadow-md shadow-[#39D353]">
          <p className="text-lg font-medium">
            Following:{" "}
            <span className="text-[#39D353] font-bold">
              {user.following_count}
            </span>
          </p>
        </div>

        <div className="w-full sm:w-[95%] bg-[#161b22] rounded-xl p-6 shadow-md shadow-[#39D353]">
          <p className="text-lg font-medium">
            Languages:{" "}
            <div className="flex flex-wrap gap-2 mt-2">
            {languages.map((language) => {
            const color = languageColors[language] || languageColors["Other"];
            return (
            <div key={language} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[#39D353] font-bold">{language}</span>
            </div>
            );
        })} 
      </div>
          </p>
        </div>
      </div>
    </div>
  );
}
