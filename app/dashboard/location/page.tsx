"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import LivestockMap from "@/components/livestock-map"
import { Clock, Download, Filter, History, MapPin, Printer, Search } from "lucide-react"

// Mock location data
const locationData = {
  center: { lat: 28.6139, lng: 77.209 },
  animals: [
    { id: "0012", position: { lat: 28.6139, lng: 77.209 }, type: "cattle", lastUpdated: "10 minutes ago" },
    { id: "0034", position: { lat: 28.615, lng: 77.211 }, type: "goats", lastUpdated: "15 minutes ago" },
    { id: "0056", position: { lat: 28.613, lng: 77.207 }, type: "cattle", lastUpdated: "5 minutes ago" },
    { id: "0078", position: { lat: 28.6145, lng: 77.2095 }, type: "pigs", lastUpdated: "20 minutes ago" },
    { id: "0089", position: { lat: 28.616, lng: 77.208 }, type: "goats", lastUpdated: "30 minutes ago" },
  ],
  areas: [
    {
      id: "1",
      name: "North Pasture",
      coordinates: [
        { lat: 28.615, lng: 77.207 },
        { lat: 28.617, lng: 77.207 },
        { lat: 28.617, lng: 77.212 },
        { lat: 28.615, lng: 77.212 },
      ],
      color: "#4CAF50",
    },
    {
      id: "2",
      name: "South Pasture",
      coordinates: [
        { lat: 28.61, lng: 77.207 },
        { lat: 28.612, lng: 77.207 },
        { lat: 28.612, lng: 77.212 },
        { lat: 28.61, lng: 77.212 },
      ],
      color: "#2196F3",
    },
  ],
}

// Mock movement history
const movementHistory = [
  {
    id: "1",
    animalId: "0012",
    animalName: "Cattle #12",
    from: "North Pasture",
    to: "South Pasture",
    timestamp: "2023-05-09 14:30",
  },
  {
    id: "2",
    animalId: "0034",
    animalName: "Goat #34",
    from: "Barn",
    to: "North Pasture",
    timestamp: "2023-05-09 09:15",
  },
  {
    id: "3",
    animalId: "0056",
    animalName: "Cattle #56",
    from: "South Pasture",
    to: "Barn",
    timestamp: "2023-05-08 18:45",
  },
  {
    id: "4",
    animalId: "0078",
    animalName: "Pig #78",
    from: "Barn",
    to: "South Pasture",
    timestamp: "2023-05-08 08:30",
  },
]

export default function LocationTrackingPage() {
  const { t } = useLanguage()

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">{t("locationTracking")}</h1>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("selectCategory")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allCategories")}</SelectItem>
              <SelectItem value="cattle">{t("cattle")}</SelectItem>
              <SelectItem value="goats">{t("goats")}</SelectItem>
              <SelectItem value="pigs">{t("pigs")}</SelectItem>
              <SelectItem value="poultry">{t("poultry")}</SelectItem>
              <SelectItem value="mithun">{t("mithun")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            {t("print")}
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            {t("export")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("liveLocationMap")}</CardTitle>
            <CardDescription>{t("liveLocationMapDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] rounded-md overflow-hidden">
              <LivestockMap detailed={true} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t("animalLocations")}</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder={t("searchAnimals")} className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {locationData.animals.map((animal) => (
                  <div key={animal.id} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">
                          {t(animal.type)} #{animal.id}
                        </h4>
                        <Badge variant="outline" className="ml-2">
                          {t(animal.type)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>
                          {animal.position.lat.toFixed(4)}, {animal.position.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{animal.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t("recentMovements")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {movementHistory.map((movement) => (
                  <div key={movement.id} className="p-2 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{movement.animalName}</h4>
                      <span className="text-xs text-muted-foreground">{movement.timestamp}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <History className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">
                        {movement.from} {"->"} {movement.to}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-2">
                {t("viewAllMovements")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
