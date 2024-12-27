'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const DynamicCanvas = dynamic(() => import('./DynamicCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="text-white">Loading 3D scene...</div>
    </div>
  )
})

export default function MapBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <DynamicCanvas />
    </div>
  )
}

