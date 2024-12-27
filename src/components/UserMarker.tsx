'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import mapboxgl from 'mapbox-gl'

interface UserLocation {
  id: string
  latitude: number
  longitude: number
  altitude: number | null
  floor: number
}

export default function UserMarker({ location }: { location: UserLocation }) {
  const markerRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  React.useEffect(() => {
    if (!markerRef.current) return

    const { latitude, longitude, altitude, floor } = location
    const mercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      [longitude, latitude],
      altitude || 0
    )
    markerRef.current.position.set(
      mercatorCoordinate.x * 100,
      (floor + 1) * 3,
      mercatorCoordinate.y * 100
    )
  }, [location])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 0.5
    }
  })

  return (
    <group ref={markerRef}>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.5, 1, 32]} />
        <meshStandardMaterial color="#ff0000" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

