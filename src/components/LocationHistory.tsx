'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

interface LocationData {
  id: number
  latitude: number
  longitude: number
  altitude: number | null
  floor: number
  createdAt: string
}

export default function LocationHistory() {
  const { data: session } = useSession()
  const [locations, setLocations] = useState<LocationData[]>([])

  useEffect(() => {
    if (session) {
      fetchLocationHistory()
    }
  }, [session])

  const fetchLocationHistory = async () => {
    try {
      const response = await fetch('/api/location/history')
      if (response.ok) {
        const data = await response.json()
        setLocations(data)
      } else {
        console.error('Failed to fetch location history')
      }
    } catch (error) {
      console.error('Error fetching location history:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location History</CardTitle>
      </CardHeader>
      <CardContent>
        {locations.length > 0 ? (
          <ScrollArea className="h-[300px]">
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.id} className="border-b pb-2">
                  <p>Latitude: {location.latitude.toFixed(6)}</p>
                  <p>Longitude: {location.longitude.toFixed(6)}</p>
                  <p>Altitude: {location.altitude ? `${location.altitude.toFixed(2)} meters` : 'Not available'}</p>
                  <p>Floor: {location.floor}</p>
                  <p>Time: {new Date(location.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p>No location history available.</p>
        )}
      </CardContent>
    </Card>
  )
}

