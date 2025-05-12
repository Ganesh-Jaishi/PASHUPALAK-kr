"use client"

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, MapPin, Maximize2, Minimize2, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for livestock locations
const generateLocationData = () => {
  // Center coordinates (can be adjusted to any farm location)
  const centerLat = 26.1158
  const centerLng = 91.7086

  const animals = []

  // Generate cattle
  for (let i = 0; i < 15; i++) {
    // Random position within ~500m of center
    const lat = centerLat + (Math.random() - 0.5) * 0.01
    const lng = centerLng + (Math.random() - 0.5) * 0.01

    // Random movement speed and direction
    const speed = Math.random() * 2 // km/h
    const direction = Math.random() * 360 // degrees

    animals.push({
      id: `C${1000 + i}`,
      type: "cattle",
      position: { lat, lng },
      speed,
      direction,
      status: Math.random() > 0.9 ? "alert" : "normal",
      batteryLevel: 50 + Math.floor(Math.random() * 50),
      lastUpdate: new Date().toISOString(),
    })
  }

  // Generate goats
  for (let i = 0; i < 10; i++) {
    const lat = centerLat + (Math.random() - 0.5) * 0.008
    const lng = centerLng + (Math.random() - 0.5) * 0.008

    const speed = Math.random() * 1.5
    const direction = Math.random() * 360

    animals.push({
      id: `G${2000 + i}`,
      type: "goat",
      position: { lat, lng },
      speed,
      direction,
      status: Math.random() > 0.95 ? "alert" : "normal",
      batteryLevel: 50 + Math.floor(Math.random() * 50),
      lastUpdate: new Date().toISOString(),
    })
  }

  // Generate pigs
  for (let i = 0; i < 8; i++) {
    const lat = centerLat + (Math.random() - 0.5) * 0.006
    const lng = centerLng + (Math.random() - 0.5) * 0.006

    const speed = Math.random() * 1
    const direction = Math.random() * 360

    animals.push({
      id: `P${3000 + i}`,
      type: "pig",
      position: { lat, lng },
      speed,
      direction,
      status: Math.random() > 0.95 ? "alert" : "normal",
      batteryLevel: 50 + Math.floor(Math.random() * 50),
      lastUpdate: new Date().toISOString(),
    })
  }

  return animals
}

// Geo-fence boundaries
const geofenceBoundaries = [
  {
    id: "main-pasture",
    name: "Main Pasture",
    color: "#10b981",
    points: [
      { lat: 26.1208, lng: 91.7036 },
      { lat: 26.1208, lng: 91.7136 },
      { lat: 26.1108, lng: 91.7136 },
      { lat: 26.1108, lng: 91.7036 },
    ],
  },
  {
    id: "north-field",
    name: "North Field",
    color: "#3b82f6",
    points: [
      { lat: 26.1208, lng: 91.7036 },
      { lat: 26.1258, lng: 91.7036 },
      { lat: 26.1258, lng: 91.7136 },
      { lat: 26.1208, lng: 91.7136 },
    ],
  },
  {
    id: "south-pen",
    name: "South Pen",
    color: "#f59e0b",
    points: [
      { lat: 26.1108, lng: 91.7036 },
      { lat: 26.1108, lng: 91.7136 },
      { lat: 26.1058, lng: 91.7136 },
      { lat: 26.1058, lng: 91.7036 },
    ],
  },
]

interface LivestockMapProps {
  detailed?: boolean
}

export default function LivestockMap({ detailed = false }: LivestockMapProps) {
  const { toast } = useToast()
  const [animals, setAnimals] = useState<any[]>([])
  const [showGeofence, setShowGeofence] = useState(true)
  const [showLabels, setShowLabels] = useState(detailed)
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)
  const [mapZoom, setMapZoom] = useState(detailed ? 15 : 14)
  const [alertedAnimals, setAlertedAnimals] = useState<Set<string>>(new Set())

  // Handle animal click with useCallback to avoid recreating on each render
  const handleAnimalClick = useCallback(
    (id: string) => {
      setSelectedAnimal(id === selectedAnimal ? null : id)

      const animal = animals.find((a) => a.id === id)
      if (animal) {
        toast({
          title: `${animal.type.charAt(0).toUpperCase() + animal.type.slice(1)} ${animal.id}`,
          description: `Status: ${animal.status === "alert" ? "Outside boundary" : "Normal"} | Battery: ${animal.batteryLevel}%`,
        })
      }
    },
    [animals, selectedAnimal, toast],
  )

  // Initialize animals
  useEffect(() => {
    setAnimals(generateLocationData())
  }, [])

  // Update positions and handle alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals((prev) => {
        return prev.map((animal) => {
          // Calculate new position based on speed and direction
          const speedFactor = animal.speed / 3600 // Convert km/h to km/s and then multiply by update interval
          const directionRad = (animal.direction * Math.PI) / 180

          const latChange = Math.cos(directionRad) * speedFactor * 0.001
          const lngChange = Math.sin(directionRad) * speedFactor * 0.001

          // Small random variation in direction
          const newDirection = (animal.direction + (Math.random() - 0.5) * 20) % 360

          // Check if animal is outside geo-fence
          const isOutsideGeofence = Math.random() > 0.98
          const newStatus = isOutsideGeofence ? "alert" : animal.status

          // If status changed to alert and hasn't been alerted before, show toast
          if (isOutsideGeofence && animal.status !== "alert") {
            setAlertedAnimals((prev) => {
              // Only show toast if this animal hasn't been alerted before
              if (!prev.has(animal.id)) {
                setTimeout(() => {
                  toast({
                    title: "Geo-fence Alert",
                    description: `${animal.type.charAt(0).toUpperCase() + animal.type.slice(1)} ${animal.id} has left the designated area.`,
                    variant: "destructive",
                  })
                }, 0)

                // Add to alerted set
                const newSet = new Set(prev)
                newSet.add(animal.id)
                return newSet
              }
              return prev
            })
          }

          return {
            ...animal,
            position: {
              lat: animal.position.lat + latChange,
              lng: animal.position.lng + lngChange,
            },
            direction: newDirection,
            status: newStatus,
            lastUpdate: new Date().toISOString(),
          }
        })
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [toast])

  const getAnimalMarkerStyle = (animal: any) => {
    const baseStyle =
      "absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 flex items-center justify-center"
    const sizeClass = detailed ? "w-6 h-6" : "w-4 h-4"
    const colorClass =
      animal.status === "alert" ? "bg-red-500 border-red-700 geo-fence-alert" : "bg-primary border-primary-foreground"
    const selectedClass = selectedAnimal === animal.id ? "ring-2 ring-offset-2 ring-secondary" : ""
    const animationClass = animal.status === "alert" ? "animate-bounce-slow" : "animate-float"

    return `${baseStyle} ${sizeClass} ${colorClass} ${selectedClass} ${animationClass}`
  }

  const getAnimalPosition = (animal: any) => {
    // Convert GPS coordinates to relative position in the map container
    // This is a simplified calculation for demonstration
    const mapWidth = 100 // percentage
    const mapHeight = 100 // percentage

    // Define map boundaries
    const minLat = 26.1
    const maxLat = 26.13
    const minLng = 91.7
    const maxLng = 91.72

    const latRange = maxLat - minLat
    const lngRange = maxLng - minLng

    const x = ((animal.position.lng - minLng) / lngRange) * mapWidth
    const y = (1 - (animal.position.lat - minLat) / latRange) * mapHeight

    return { x, y }
  }

  const renderAnimalMarkers = () => {
    return animals.map((animal) => {
      const { x, y } = getAnimalPosition(animal)

      return (
        <div
          key={animal.id}
          className={getAnimalMarkerStyle(animal)}
          style={{ left: `${x}%`, top: `${y}%` }}
          onClick={() => handleAnimalClick(animal.id)}
        >
          {detailed && showLabels && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-background/80 px-1 py-0.5 rounded text-xs whitespace-nowrap">
              {animal.id}
            </div>
          )}
        </div>
      )
    })
  }

  const renderGeofenceBoundaries = () => {
    if (!showGeofence) return null

    return geofenceBoundaries.map((boundary) => {
      // Convert boundary points to SVG path
      const points = boundary.points
        .map((point) => {
          const { x, y } = getAnimalPosition({ position: point })
          return `${x},${y}`
        })
        .join(" ")

      return (
        <div key={boundary.id} className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" className="absolute inset-0">
            <polygon
              points={points}
              fill={`${boundary.color}20`}
              stroke={boundary.color}
              strokeWidth="2"
              strokeDasharray={detailed ? "none" : "5,5"}
            />
            {detailed && (
              <text
                x={
                  boundary.points.reduce((sum, point) => sum + getAnimalPosition({ position: point }).x, 0) /
                    boundary.points.length +
                  "%"
                }
                y={
                  boundary.points.reduce((sum, point) => sum + getAnimalPosition({ position: point }).y, 0) /
                    boundary.points.length +
                  "%"
                }
                fill={boundary.color}
                fontSize="12"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {boundary.name}
              </text>
            )}
          </svg>
        </div>
      )
    })
  }

  const renderMapControls = () => {
    return (
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 shadow-md"
          onClick={() => setMapZoom((prev) => Math.min(prev + 1, 16))}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 shadow-md"
          onClick={() => setMapZoom((prev) => Math.max(prev - 1, 13))}
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 shadow-md"
          onClick={() => {
            setAnimals(generateLocationData())
            setAlertedAnimals(new Set())
          }}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const renderDetailedControls = () => {
    if (!detailed) return null

    return (
      <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="show-geofence" checked={showGeofence} onCheckedChange={setShowGeofence} />
              <Label htmlFor="show-geofence">Show Geo-fence</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
              <Label htmlFor="show-labels">Show Labels</Label>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-2">
            {["cattle", "goat", "pig"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${type === "cattle" ? "bg-primary" : type === "goat" ? "bg-blue-500" : "bg-orange-500"}`}
                ></div>
                <span className="text-sm capitalize">{type}</span>
                <Badge variant="outline" className="ml-auto">
                  {animals.filter((a) => a.type === type).length}
                </Badge>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive font-medium">
              {animals.filter((a) => a.status === "alert").length} animal
              {animals.filter((a) => a.status === "alert").length !== 1 ? "s" : ""} outside boundary
            </span>
            <Badge variant="destructive" className="ml-auto">
              Alert
            </Badge>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full" style={{ height: detailed ? "500px" : "300px" }}>
      <div
        className="relative w-full h-full overflow-hidden rounded-lg border bg-muted/20"
        style={{ transform: `scale(${mapZoom / 14})` }}
      >
        {/* Map background */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-50"></div>

        {/* Geo-fence boundaries */}
        {renderGeofenceBoundaries()}

        {/* Animal markers */}
        {renderAnimalMarkers()}

        {/* Map controls */}
        {renderMapControls()}

        {/* Detailed controls */}
        {renderDetailedControls()}
      </div>

      {!detailed && (
        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
          <Badge variant="outline" className="bg-background/80">
            <MapPin className="h-3 w-3 mr-1" />
            {animals.length} Animals
          </Badge>
          {animals.some((a) => a.status === "alert") && (
            <Badge variant="destructive" className="bg-background/80">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Alert
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
