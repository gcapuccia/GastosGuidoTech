'use client'

import LoginCard from '@/components/LoginCard'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-6 transition-colors">
      <div className="w-full max-w-md">
        <LoginCard />
      </div>
    </div>
  )
}