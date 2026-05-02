'use client'

import LoginCard from '@/components/LoginCard'
import { register } from 'module'
        export default function Home() {
          return (
            <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-6">
              <div className="w-full max-w-md">
                <LoginCard />
              </div>
            </div>
          )
        }