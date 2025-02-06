'use client';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchUserData } from '@/lib/actions'
import StarDisplay from './StarDisplay';
import { sourceCodePro } from '@/app/fonts';

export default function UserStats() {


  const [user, setUser] = useState<GitHubUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUserData() {
      const storedUser = localStorage.getItem('githubUser');
      
      if (!storedUser) {
        router.push('/')
        return
      }

      try {
        const userData = await fetchUserData(JSON.parse(storedUser));
        if (!userData) {
          router.push('/')
          return
        }
        setUser(userData)
      } catch (error) {
        console.error('Error loading user data:', error);
        router.push('/')
      }
    }

    loadUserData()
  }, [router]);

  if (!user) return null
  let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

  var dimension = vw / 10;

  return (
    <div className={`${sourceCodePro.variable} min-h-screen bg-[#0d1117] text-white p-8`}>
      <div className="max-w-4xl mx-auto">

        
        <div className="bg-[#161b22] rounded-xl p-6 shadow-lg shadow-[#39D353]">
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-[#39D353] rounded-full" />
              <p className="text-lg font-medium">
                Public Repositories: <span className="text-[#39D353] font-bold">{user.public_repos}</span>
              </p>
            </div>
          </div>
          
          <div className="w-full flex justify-center mt-6">
            <StarDisplay dimension={dimension} starSize={"1.5vh"} userData={user} />
          </div>

        </div>
      </div>
    </div>
  )
}
