// src/app/api/location/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { latitude, longitude, altitude } = await req.json()
    
    // Calculate floor or provide default value
    const floor = Math.floor(altitude / 3) // Example: 3 meters per floor
    
    const location = await prisma.location.create({
      data: {
        latitude,
        longitude,
        altitude,
        floor,
        userId: session.user.id,
      },
    })
    
    return NextResponse.json(location)
  } catch (error) {
    console.error('Error saving location:', error)
    return NextResponse.json({ error: 'Error saving location' }, { status: 500 })
  }
}
