"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Download, Filter, Plus, Search } from "lucide-react"
import { getLivestockData, type LivestockCategory } from "@/lib/data-service"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function LivestockListPage() {
  const { t } = useLanguage()
  const { animals } = getLivestockData()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [healthFilter, setHealthFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "alert":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getCategoryName = (category: LivestockCategory) => {
    return t(category)
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || animal.category === categoryFilter
    const matchesHealth = healthFilter === "all" || animal.healthStatus === healthFilter

    return matchesSearch && matchesCategory && matchesHealth
  })

  const sortedAnimals = [...filteredAnimals].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "category":
        comparison = a.category.localeCompare(b.category)
        break
      case "breed":
        comparison = a.breed.localeCompare(b.breed)
        break
      case "age":
        comparison = a.age - b.age
        break
      case "weight":
        comparison = a.weight - b.weight
        break
      case "health":
        const healthOrder = { healthy: 0, warning: 1, alert: 2 }
        comparison =
          healthOrder[a.healthStatus as keyof typeof healthOrder] -
          healthOrder[b.healthStatus as keyof typeof healthOrder]
        break
      default:
        comparison = 0
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("livestock_list")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            {t("export")}
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            {t("add_livestock")}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("livestock_inventory")}</CardTitle>
          <CardDescription>{t("manage_your_livestock")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("search_livestock")}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-40">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder={t("category")} />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("all_categories")}</SelectItem>
                      <SelectItem value="cattle">{t("cattle")}</SelectItem>
                      <SelectItem value="mithun">{t("mithun")}</SelectItem>
                      <SelectItem value="goats">{t("goats")}</SelectItem>
                      <SelectItem value="pigs">{t("pigs")}</SelectItem>
                      <SelectItem value="poultry">{t("poultry")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <Select value={healthFilter} onValueChange={setHealthFilter}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <SelectValue placeholder={t("health")} />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("all_statuses")}</SelectItem>
                      <SelectItem value="healthy">{t("healthy")}</SelectItem>
                      <SelectItem value="warning">{t("warning")}</SelectItem>
                      <SelectItem value="alert">{t("alert")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th
                        className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                        onClick={() => handleSort("name")}
                      >
                        {t("name")} {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                        onClick={() => handleSort("category")}
                      >
                        {t("category")} {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                        onClick={() => handleSort("breed")}
                      >
                        {t("breed")} {sortBy === "breed" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                        onClick={() => handleSort("age")}
                      >
                        {t("age")} {sortBy === "age" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                        onClick={() => handleSort("weight")}
                      >
                        {t("weight")} {sortBy === "weight" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                        onClick={() => handleSort("health")}
                      >
                        {t("health_status")} {sortBy === "health" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAnimals.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                          {t("no_livestock_found")}
                        </td>
                      </tr>
                    ) : (
                      sortedAnimals.map((animal) => (
                        <tr key={animal.id} className="border-t hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <Link
                              href={`/dashboard/livestock/animal/${animal.id}`}
                              className="font-medium hover:underline text-primary"
                            >
                              {animal.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3">{getCategoryName(animal.category as LivestockCategory)}</td>
                          <td className="px-4 py-3">{animal.breed}</td>
                          <td className="px-4 py-3">
                            {animal.age} {t("years")}
                          </td>
                          <td className="px-4 py-3">
                            {animal.weight} {t("kg")}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getHealthStatusColor(animal.healthStatus)}`}
                            >
                              {t(animal.healthStatus)}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
