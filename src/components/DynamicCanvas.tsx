'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
})
const OrbitControls = dynamic(() => import('@react-three/drei').then((mod) => mod.OrbitControls), {
  ssr: false,
})
const Environment = dynamic(() => import('@react-three/drei').then((mod) => mod.Environment), {
  ssr: false,
})

const DynamicMapScene = dynamic(() => import('./MapScene'), {
  ssr: false,
  loading: () => null
})

export default function DynamicCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 10, 20], fov: 75 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000']} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <DynamicMapScene />
      <OrbitControls enablePan={false} enableZoom={false} />
      <Environment preset="city" />
    </>
  )
}

