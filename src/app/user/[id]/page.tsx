"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import UserStats from "@/components/UserStats";
import { sourceCodePro } from "@/app/fonts/index";
import { fetchUserData } from "@/lib/actions";
import StarDisplay from "@/components/StarDisplay";
import Commits from "@/components/Commits";
import Clan from "@/components/Clan";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";

interface GitHubUser {
  login: string;
  avatar_url: string;
  followers_count: number;
  following_count: number;
  public_repos: number;
  repos: [string];
  commits: [string];
}

export default function UserPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [dimension, setDimension] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const updateDimension = () => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      setDimension(vw < 768 ? vw / 2 : vw / 10);
    };

    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("githubUser");
        if (storedUser && !user) {
          const userData = await fetchUserData(storedUser);
          if (userData) {
            setUser(userData);
            localStorage.setItem("userData", JSON.stringify(userData));
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 3000);
      }
    };

    fetchData();
  }, [id, user]); 

  const handleClick = () => {
    router.push("/");
  };

  if (isLoading) return <Loading />;
  if (!user) return null;


  return (
    <div
      className={`${sourceCodePro.variable} font-source-code-pro min-h-screen bg-[#0d1117] text-white p-8 `}
    >
      <div className="max-w-4xl mx-auto mt-[5vh]">
        <div className="mb-4 hover:bg-[#0d1117] cursor-pointer">
        <FaArrowLeftLong onClick={handleClick} size={20}/>
        </div>

        <div className="flex items-center gap-4 sm:text-2xl md:text-2xl">
          <div className="mb-8  mr-4">
            <div className="flex gap-2 justify-center mb-4">
              <div className="w-4 h-4 bg-[#0D4429] rounded-full" />
              <div className="w-4 h-4 bg-[#26A641] rounded-full" />
              <div className="w-4 h-4 bg-[#39D353] rounded-full" />
            </div>
            <Image
              className="rounded-full object-cover "
              src={user.avatar_url}
              width={128}
              height={128}
              alt={`Avatar of ${user.login}`}
            />
          </div>

          <div className="">
            <h1 className="text-3xl font-extrabold text-left sm:text-2xl md:text-4xl">
              GET / stats/
            </h1>
            <h2
              className="[text-shadow:_0_4px_8px_#00BCD4] text-[#39D353] 
                            text-xl md:text-2xl leading-snug font-manrope 
                            font-extrabold "
            >
              {" "}
              for @{user.login}
            </h2>
          </div>
        </div>

        <div className="text-2xl mt-[2vh] mt-[2vh]">
          achievement-gallery/ 🏆
        </div>
        <div className="flex flex-wrap justify-center gap-[2vw]">
  <div className="flex-1 min-w-[300px] max-w-[400px]">
    <StarDisplay
      dimension={dimension}
      starSize={"1.5vh"}
      userData={user}
    />
  </div>
  <div className="flex-1 min-w-[300px] max-w-[600px]">
    <Clan userData={user} />
  </div>
</div>

        <div className="text-2xl mt-[6vh]">commitment-issues/ ⁉️</div>
        <Commits userData={user} />
        <div className="text-2xl mt-[2vh] my-[2vh]">actual-stats/ 🥸</div>
        <UserStats />
      </div>
      
    </div>
  );
}
