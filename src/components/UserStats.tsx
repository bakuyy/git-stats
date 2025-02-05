'use client';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchUserData } from '@/lib/actions'

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

    loadUserData();
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-[#39D353]">{user.login}</span>'s GitHub Stats
        </h1>
        
        <div className="bg-[#161b22] rounded-lg p-6 shadow-lg">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#39D353] rounded-full" />
              <p className="text-xl">
                Public Repositories: <span className="text-[#39D353] font-bold">{user.public_repos}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
