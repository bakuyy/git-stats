"use client"
import { Suspense, useState,  useEffect } from 'react';
import UserStats from '@/components/UserStats';
import { sourceCodePro } from '@/app/fonts';
import { fetchUserData } from '@/lib/actions';


interface UserPageProps {
    userData: GitHubUser;
  }
  

  export default function UserPage() {
    const [user, setUser] = useState<GitHubUser | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('githubUser'); 
    
        if (storedUser) {
          fetchUserData(storedUser).then(userData => {
            if (userData) {
              setUser(userData)
            }
          }).catch(error => {
            console.error('Error loading user data:', error);
          })
        }
      }, [])

      if (!user) return null;

    
    return (
      <div className={`${sourceCodePro.variable} font-source-code-pro min-h-screen bg-[#0d1117] text-white p-8`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-center">
            GET / stats/
            <h2 className="text-[#39D353]"> for @{user.login}</h2>
          </h1>
          <Suspense fallback={<div>Loading stats...</div>}>
            <UserStats  />
          </Suspense>
        </div>
      </div>
    )
}