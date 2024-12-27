'use client'

import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

export default function MapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-74.5, 40],
        zoom: 15,
        pitch: 60,
        bearing: -60,
        antialias: true
      })

      map.current.on('style.load', () => {
        if (map.current) {
          const layers = map.current.getStyle().layers
          const labelLayerId = layers?.find(
            (layer: mapboxgl.AnyLayer) => layer.type === 'symbol' && layer.layout?.['text-field']
          )?.id

          map.current.addLayer(
            {
              'id': '3d-buildings',
              'source': 'composite',
              'source-layer': 'building',
              'filter': ['==', 'extrude', 'true'],
              'type': 'fill-extrusion',
              'minzoom': 15,
              'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'height']
                ],
                'fill-extrusion-base': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
              }
            },
            labelLayerId
          )
        }
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
}

