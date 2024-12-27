'use client'

import React, { useState, useEffect } from 'react'
import { Html } from '@react-three/drei'
import dynamic from 'next/dynamic'

const DynamicUserMarker = dynamic(() => import('./UserMarker'), { 
  ssr: false 
})

interface UserLocation {
  id: string
  latitude: number
  longitude: number
  altitude: number | null
  floor: number
}

export default function MapScene() {
  const [userLocations, setUserLocations] = useState<UserLocation[]>([])
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    const initSocket = async () => {
      const io = (await import('socket.io-client')).default
      const newSocket = io('http://localhost:3000')
      setSocket(newSocket)
    }
    initSocket()

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    const handleLocationUpdate = (data: UserLocation) => {
      setUserLocations(prev => {
        const index = prev.findIndex(loc => loc.id === data.id)
        if (index !== -1) {
          const newLocations = [...prev]
          newLocations[index] = data
          return newLocations
        }
        return [...prev, data]
      })
    }

    socket.on('locationUpdate', handleLocationUpdate)

    return () => {
      socket.off('locationUpdate', handleLocationUpdate)
    }
  }, [socket])

  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {userLocations.map(location => (
        <DynamicUserMarker key={location.id} location={location} />
      ))}
      <Html position={[0, 2, 0]} center>
        <div className="bg-white/80 p-2 rounded-lg shadow-lg">
          <p className="text-sm">Active Users: {userLocations.length}</p>
        </div>
      </Html>
    </group>
  )
}

