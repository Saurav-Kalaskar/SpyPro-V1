'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { estimateFloor } from '../utils/floorEstimation'
import io from 'socket.io-client'

interface Location {
  latitude: number
  longitude: number
  altitude: number | null
  floor?: number | null
}

const socket = typeof window !== 'undefined' ? io('http://localhost:3000') : null

export default function LocationTracker() {
  const [consent, setConsent] = useState(false)
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    if (consent) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            floor: position.coords.altitude ? estimateFloor(position.coords.altitude) : 0,
          }
          setLocation(newLocation)
          if (socket) {
            socket.emit('updateLocation', { id: socket.id, ...newLocation })
          }
        },
        (error) => {
          console.error('Error getting location:', error)
        },
        { enableHighAccuracy: true }
      )

      return () => {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [consent])

  const handleConsentToggle = () => {
    setConsent(!consent)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleConsentToggle}>
          {consent ? 'Revoke Location Access' : 'Grant Location Access'}
        </Button>
        {consent && location && (
          <div className="mt-4">
            <p>Latitude: {location.latitude.toFixed(6)}</p>
            <p>Longitude: {location.longitude.toFixed(6)}</p>
            <p>Altitude: {location.altitude ? `${location.altitude.toFixed(2)} meters` : 'Not available'}</p>
            <p>Estimated Floor: {location.floor}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

