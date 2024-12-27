// import MapBackground from '@/components/MapBackground'
// import LocationHistory from '@/components/LocationHistory'

// export default function Dashboard() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <MapBackground />
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
//         <h1 className="text-4xl font-bold mb-4 text-center">Your Location Dashboard</h1>
//         <LocationHistory />
//       </div>
//     </main>
//   )
// }

import MapBackground from '@/components/MapBackground'
import LocationHistory from '@/components/LocationHistory'

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <MapBackground />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4 text-center">Your SpyPro Dashboard</h1>
        <LocationHistory />
      </div>
    </main>
  )
}
