'use client';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchUserData } from '@/lib/actions'
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

  return (
    <div className={`${sourceCodePro.variable} bg-[#0d1117] text-white p-8`}>
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

        </div>
      </div>
    </div>
  )
}
