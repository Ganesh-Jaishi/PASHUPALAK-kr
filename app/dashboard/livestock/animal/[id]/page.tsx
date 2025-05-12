"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import HealthMetricsChart from "@/components/health-metrics-chart"
import LivestockMap from "@/components/livestock-map"
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Droplets,
  Heart,
  Info,
  MapPin,
  Thermometer,
  Weight,
} from "lucide-react"

// Mock data for a single animal
const getAnimalData = (id: string, category: string) => {
  return {
    id,
    category,
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} #${id}`,
    age: "2 years 3 months",
    weight: "78 kg",
    temperature: "38.6°C",
    heartRate: "72 bpm",
    respirationRate: "18 breaths/min",
    hydration: "Normal",
    lastCheckup: "2023-04-15",
    nextCheckup: "2023-07-15",
    purchaseDate: "2021-01-10",
    purchasePrice: "₹15,000",
    location: {
      current: "North Pasture",
      coordinates: { lat: 28.6139, lng: 77.209 },
      lastUpdated: "2023-05-10 14:30",
    },
    healthStatus: "Healthy",
    alerts: [],
    vaccinations: [
      { name: "FMD Vaccine", date: "2023-01-15", dueDate: "2023-07-15" },
      { name: "Brucellosis", date: "2022-11-10", dueDate: "2023-11-10" },
    ],
    treatments: [{ condition: "Minor wound", treatment: "Antiseptic application", date: "2023-03-05" }],
    notes: "This animal is in excellent health and has been consistently performing well.",
  }
}

export default function AnimalDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [animal, setAnimal] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    if (params.id) {
      const animalData = getAnimalData(params.id as string, "goat") // Replace with actual category detection
      setAnimal(animalData)
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (!animal) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{t("animalNotFound")}</h1>
        <Button onClick={() => router.back()}>{t("goBack")}</Button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{animal.name}</h1>
        <Badge className="ml-3" variant={animal.healthStatus === "Healthy" ? "success" : "destructive"}>
          {animal.healthStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("basicInfo")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("id")}:</span>
                <span className="ml-2 font-medium">{animal.id}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("age")}:</span>
                <span className="ml-2 font-medium">{animal.age}</span>
              </div>
              <div className="flex items-center">
                <Weight className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("weight")}:</span>
                <span className="ml-2 font-medium">{animal.weight}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("purchaseDate")}:</span>
                <span className="ml-2 font-medium">{animal.purchaseDate}</span>
              </div>
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("purchasePrice")}:</span>
                <span className="ml-2 font-medium">{animal.purchasePrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("healthMetrics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Thermometer className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("temperature")}:</span>
                <span className="ml-2 font-medium">{animal.temperature}</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("heartRate")}:</span>
                <span className="ml-2 font-medium">{animal.heartRate}</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("respirationRate")}:</span>
                <span className="ml-2 font-medium">{animal.respirationRate}</span>
              </div>
              <div className="flex items-center">
                <Droplets className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("hydration")}:</span>
                <span className="ml-2 font-medium">{animal.hydration}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("lastCheckup")}:</span>
                <span className="ml-2 font-medium">{animal.lastCheckup}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("location")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("currentLocation")}:</span>
                <span className="ml-2 font-medium">{animal.location.current}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("lastUpdated")}:</span>
                <span className="ml-2 font-medium">{animal.location.lastUpdated}</span>
              </div>
            </div>
            <div className="mt-4 h-32 bg-gray-100 rounded-md overflow-hidden">
              <LivestockMap
                center={animal.location.coordinates}
                zoom={15}
                animals={[
                  {
                    id: animal.id,
                    position: animal.location.coordinates,
                    type: animal.category,
                  },
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="health" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="health">{t("healthHistory")}</TabsTrigger>
          <TabsTrigger value="vaccinations">{t("vaccinations")}</TabsTrigger>
          <TabsTrigger value="treatments">{t("treatments")}</TabsTrigger>
          <TabsTrigger value="notes">{t("notes")}</TabsTrigger>
        </TabsList>

        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>{t("healthHistory")}</CardTitle>
              <CardDescription>{t("healthHistoryDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <HealthMetricsChart detailed animalId={animal.id} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccinations">
          <Card>
            <CardHeader>
              <CardTitle>{t("vaccinations")}</CardTitle>
              <CardDescription>{t("vaccinationsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {animal.vaccinations.map((vac: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">{vac.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t("administered")}: {vac.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">
                        {t("nextDue")}: {vac.dueDate}
                      </span>
                      {new Date(vac.dueDate) < new Date() && (
                        <Badge variant="destructive" className="ml-2">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {t("overdue")}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                {animal.vaccinations.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">{t("noVaccinations")}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments">
          <Card>
            <CardHeader>
              <CardTitle>{t("treatments")}</CardTitle>
              <CardDescription>{t("treatmentsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {animal.treatments.map((treatment: any, index: number) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{treatment.condition}</h4>
                      <span className="text-sm text-muted-foreground">{treatment.date}</span>
                    </div>
                    <p className="text-sm mt-1">{treatment.treatment}</p>
                  </div>
                ))}
                {animal.treatments.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">{t("noTreatments")}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>{t("notes")}</CardTitle>
              <CardDescription>{t("notesDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{animal.notes || t("noNotes")}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
