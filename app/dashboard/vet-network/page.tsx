"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  Download,
  Filter,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Printer,
  Search,
  Star,
  Video,
} from "lucide-react"

// Mock veterinarians data
const veterinarians = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    specialty: "Large Animals",
    location: "Delhi",
    distance: "3.2 km",
    rating: 4.8,
    reviews: 24,
    available: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Dr. Priya Singh",
    specialty: "Poultry",
    location: "Gurgaon",
    distance: "8.5 km",
    rating: 4.6,
    reviews: 18,
    available: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Dr. Amit Sharma",
    specialty: "General",
    location: "Noida",
    distance: "12.1 km",
    rating: 4.9,
    reviews: 32,
    available: false,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Dr. Sunita Patel",
    specialty: "Small Ruminants",
    location: "Delhi",
    distance: "5.7 km",
    rating: 4.7,
    reviews: 15,
    available: true,
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Mock appointments data
const appointments = [
  {
    id: "1",
    vetName: "Dr. Rajesh Kumar",
    date: "2023-05-15",
    time: "10:00 AM",
    type: "Vaccination",
    animals: ["Cattle #12", "Cattle #34"],
    status: "Upcoming",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    vetName: "Dr. Priya Singh",
    date: "2023-05-20",
    time: "02:30 PM",
    type: "Health Check",
    animals: ["Goat #45", "Goat #46", "Goat #47"],
    status: "Upcoming",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    vetName: "Dr. Amit Sharma",
    date: "2023-05-05",
    time: "11:15 AM",
    type: "Treatment",
    animals: ["Pig #23"],
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function VetNetworkPage() {
  const { t } = useLanguage()

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">{t("vetNetwork")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            {t("print")}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("scheduleAppointment")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="vets" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="vets">{t("findVeterinarians")}</TabsTrigger>
          <TabsTrigger value="appointments">{t("appointments")}</TabsTrigger>
          <TabsTrigger value="history">{t("medicalHistory")}</TabsTrigger>
        </TabsList>

        <TabsContent value="vets">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("findVeterinarians")}</CardTitle>
              <CardDescription>{t("findVeterinariansDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder={t("searchByNameOrSpecialty")} className="pl-8" />
                </div>
                <div className="relative w-full md:w-[200px]">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder={t("location")} className="pl-8" defaultValue="Delhi" />
                </div>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  {t("search")}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {veterinarians.map((vet) => (
                  <Card key={vet.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={vet.image || "/placeholder.svg"} alt={vet.name} />
                          <AvatarFallback>
                            {vet.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{vet.name}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm ml-1">{vet.rating}</span>
                              <span className="text-xs text-muted-foreground ml-1">({vet.reviews})</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{vet.specialty}</p>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {vet.location} ({vet.distance})
                            </span>
                          </div>
                          <Badge variant={vet.available ? "success" : "outline"} className="mt-2">
                            {vet.available ? t("availableNow") : t("unavailable")}
                          </Badge>
                        </div>
                      </div>
                      <div className="border-t grid grid-cols-3 divide-x">
                        <Button variant="ghost" className="rounded-none py-2">
                          <Phone className="h-4 w-4 mr-2" />
                          {t("call")}
                        </Button>
                        <Button variant="ghost" className="rounded-none py-2">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {t("message")}
                        </Button>
                        <Button variant="ghost" className="rounded-none py-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          {t("book")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">{t("loadMore")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>{t("appointments")}</CardTitle>
              <CardDescription>{t("appointmentsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.vetName} />
                          <AvatarFallback>
                            {appointment.vetName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{appointment.vetName}</h3>
                            <Badge variant={appointment.status === "Completed" ? "outline" : "success"}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm">{appointment.type}</p>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{appointment.date}</span>
                            <Clock className="h-3 w-3 ml-2 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{appointment.time}</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">{t("animals")}:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {appointment.animals.map((animal, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {animal}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {appointment.status !== "Completed" && (
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {t("reschedule")}
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {t("message")}
                          </Button>
                          <Button size="sm">
                            <Video className="h-3 w-3 mr-1" />
                            {t("joinCall")}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">{t("viewAllAppointments")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>{t("medicalHistory")}</CardTitle>
              <CardDescription>{t("medicalHistoryDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder={t("searchByAnimalOrCondition")} className="pl-8" />
                </div>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  {t("search")}
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  {t("exportRecords")}
                </Button>
              </div>

              <div className="text-center py-8">
                <p className="text-muted-foreground">{t("selectAnimalToViewHistory")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
