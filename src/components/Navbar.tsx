// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          3D Location Tracker
        </Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}