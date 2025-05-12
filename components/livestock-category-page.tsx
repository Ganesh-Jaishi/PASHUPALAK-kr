"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Activity, Calendar, ChevronRight, Filter, MapPin, Plus, Search, SortAsc, Tag, Weight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { JSX } from "react"

interface Animal {
  id: string
  name: string
  tag: string
  age: string
  weight: string
  breed: string
  status: "healthy" | "sick" | "treatment"
  location: string
  lastCheckup: string
}

interface LivestockCategoryPageProps {
  category: string
  title: string
  description: string
  icon: JSX.Element
}

export default function LivestockCategoryPage({ category, title, description, icon }: LivestockCategoryPageProps) {
  const { t } = useLanguage()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      // Generate mock data based on category
      const mockAnimals: Animal[] = Array.from({ length: 12 }, (_, i) => ({
        id: `${category}-${i + 1}`,
        name: `${category.charAt(0).toUpperCase() + category.slice(1)} ${i + 1}`,
        tag: `TAG-${category.substring(0, 3).toUpperCase()}-${1000 + i}`,
        age: `${Math.floor(Math.random() * 5) + 1} ${Math.random() > 0.5 ? "years" : "months"}`,
        weight: `${Math.floor(Math.random() * 500) + 50} kg`,
        breed: ["Local", "Mixed", "Pure", "Imported"][Math.floor(Math.random() * 4)],
        status: ["healthy", "sick", "treatment"][Math.floor(Math.random() * 3)] as "healthy" | "sick" | "treatment",
        location: ["North Pasture", "South Field", "Barn", "Grazing Area"][Math.floor(Math.random() * 4)],
        lastCheckup: `${Math.floor(Math.random() * 30) + 1} days ago`,
      }))
      setAnimals(mockAnimals)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [category])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200"
      case "sick":
        return "bg-red-100 text-red-800 border-red-200"
      case "treatment":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "healthy":
        return t("healthy")
      case "sick":
        return t("sick")
      case "treatment":
        return t("underTreatment")
      default:
        return status
    }
  }

  const filteredAnimals = animals
    .filter(
      (animal) =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((animal) => filterStatus === "all" || animal.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "tag") return a.tag.localeCompare(b.tag)
      if (sortBy === "age") return a.age.localeCompare(b.age)
      if (sortBy === "status") return a.status.localeCompare(b.status)
      return 0
    })

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("addNew")}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchAnimals")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SortAsc className="mr-2 h-4 w-4" />
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t("name")}</SelectItem>
              <SelectItem value="tag">{t("tag")}</SelectItem>
              <SelectItem value="age">{t("age")}</SelectItem>
              <SelectItem value="status">{t("status")}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder={t("filter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="healthy">{t("healthy")}</SelectItem>
              <SelectItem value="sick">{t("sick")}</SelectItem>
              <SelectItem value="treatment">{t("underTreatment")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <TabsList>
          <TabsTrigger value="grid">{t("grid")}</TabsTrigger>
          <TabsTrigger value="list">{t("list")}</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredAnimals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("noAnimalsFound")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAnimals.map((animal) => (
                <Card key={animal.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{animal.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {animal.tag}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(animal.status)}>{getStatusText(animal.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {t("age")}: {animal.age}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Weight className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {t("weight")}: {animal.weight}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{animal.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {t("lastCheckup")}: {animal.lastCheckup}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/dashboard/livestock/animal/${animal.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        {t("viewDetails")}
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div>
                        <Skeleton className="h-9 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredAnimals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("noAnimalsFound")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAnimals.map((animal) => (
                <Card key={animal.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <h3 className="font-medium">{animal.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {animal.tag}
                        </p>
                      </div>
                      <div>
                        <Badge className={getStatusColor(animal.status)}>{getStatusText(animal.status)}</Badge>
                      </div>
                      <div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm">
                            {t("age")}: {animal.age}
                          </span>
                          <span className="text-sm">
                            {t("weight")}: {animal.weight}
                          </span>
                          <span className="text-sm">
                            {t("lastCheckup")}: {animal.lastCheckup}
                          </span>
                        </div>
                      </div>
                      <Link href={`/dashboard/livestock/animal/${animal.id}`}>
                        <Button variant="outline">
                          {t("viewDetails")}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
