"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowLeft, Calendar, Download, Edit, MapPin, Trash2, TrendingUp } from "lucide-react"
import type { LivestockAnimal } from "@/lib/data-service"
import { useLanguage } from "@/contexts/language-context"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface AnimalDetailsProps {
  animal: LivestockAnimal
}

export function AnimalDetails({ animal }: AnimalDetailsProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")

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

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "offline":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "battery_low":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "cattle":
        return t("cattle")
      case "mithun":
        return t("mithun")
      case "goats":
        return t("goats")
      case "pigs":
        return t("pigs")
      case "poultry":
        return t("poultry")
      default:
        return category
    }
  }

  const getProductivityMetricName = (metric: string) => {
    switch (metric) {
      case "Milk Production":
        return "Milk Production"
      case "Weight Gain":
        return "Weight Gain"
      case "Egg Production":
        return "Egg Production"
      default:
        return metric
    }
  }

  const getProductivityUnit = (unit: string) => {
    return unit
  }

  const getMaxProductivity = (history: Array<{ date: string; value: number }>) => {
    return Math.max(...history.map((item) => item.value))
  }

  const getPerformanceRating = (value: number, metric: string) => {
    // This is a simplified rating system
    if (metric === "Milk Production") {
      if (value > 15) return "Excellent"
      if (value > 10) return "Good"
      if (value > 5) return "Average"
      return "Below Average"
    }

    if (metric === "Weight Gain") {
      if (value > 0.8) return "Excellent"
      if (value > 0.5) return "Good"
      if (value > 0.3) return "Average"
      return "Below Average"
    }

    if (metric === "Egg Production") {
      if (value > 170) return "Excellent"
      if (value > 160) return "Good"
      if (value > 150) return "Average"
      return "Below Average"
    }

    return "Unknown"
  }

  const getTrendAnalysis = (history: Array<{ date: string; value: number }>) => {
    if (history.length < 2) return "Insufficient data"

    const firstValue = history[0].value
    const lastValue = history[history.length - 1].value
    const change = lastValue - firstValue
    const percentChange = (change / firstValue) * 100

    if (percentChange > 10) return "Strong upward trend"
    if (percentChange > 5) return "Moderate upward trend"
    if (percentChange > 0) return "Slight upward trend"
    if (percentChange > -5) return "Stable trend"
    if (percentChange > -10) return "Slight downward trend"
    return "Significant downward trend"
  }

  const getRecommendations = (animal: LivestockAnimal) => {
    const recommendations = []

    // Health-based recommendations
    if (animal.healthStatus === "warning" || animal.healthStatus === "alert") {
      recommendations.push("Schedule a veterinary check-up")
    }

    // Temperature-based recommendations
    if (animal.healthMetrics.temperature > 39.5) {
      recommendations.push("Monitor temperature closely and provide shade/cooling")
    }

    // Activity-based recommendations
    if (animal.healthMetrics.activity < 3000) {
      recommendations.push("Increase exercise opportunities")
    }

    // Stress-based recommendations
    if (animal.healthMetrics.stress > 50) {
      recommendations.push("Reduce stressors in the environment")
    }

    // Productivity-based recommendations
    const trendAnalysis = getTrendAnalysis(animal.productivity.history)
    if (trendAnalysis.includes("downward")) {
      recommendations.push("Review nutrition and feeding practices")
    }

    return recommendations.length > 0 ? recommendations : ["No specific recommendations at this time"]
  }

  const changePercentage = (history: Array<{ date: string; value: number }>) => {
    if (history.length < 2) return 0

    const firstValue = history[0].value
    const lastValue = history[history.length - 1].value
    const change = lastValue - firstValue
    return (change / firstValue) * 100
  }

  const recommendations = getRecommendations(animal)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            {t("export")}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            {t("edit_animal")}
          </Button>
          <Button variant="destructive" size="sm" className="flex items-center gap-1">
            <Trash2 className="h-4 w-4" />
            {t("delete_animal")}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{animal.name}</CardTitle>
              <CardDescription>
                ID: {animal.id} | {getCategoryName(animal.category)} | {animal.breed}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={getHealthStatusColor(animal.healthStatus)}>{t(animal.healthStatus)}</Badge>
              <Badge className={getDeviceStatusColor(animal.deviceStatus)}>{t(animal.deviceStatus)}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
              <TabsTrigger value="health">{t("health_history")}</TabsTrigger>
              <TabsTrigger value="location">{t("location_history")}</TabsTrigger>
              <TabsTrigger value="productivity">{t("productivity_data")}</TabsTrigger>
              <TabsTrigger value="alerts">{t("recent_alerts")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t("animal_details")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="font-medium">{t("animal_id")}:</dt>
                      <dd>{animal.id}</dd>
                      <dt className="font-medium">{t("category")}:</dt>
                      <dd>{getCategoryName(animal.category)}</dd>
                      <dt className="font-medium">{t("breed")}:</dt>
                      <dd>{animal.breed}</dd>
                      <dt className="font-medium">{t("age")}:</dt>
                      <dd>{animal.age} months</dd>
                      <dt className="font-medium">{t("weight")}:</dt>
                      <dd>{animal.weight} kg</dd>
                      <dt className="font-medium">{t("gender")}:</dt>
                      <dd>{animal.gender}</dd>
                      <dt className="font-medium">{t("device_id")}:</dt>
                      <dd>{animal.deviceId}</dd>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t("health_metrics")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="font-medium">{t("temperature")}:</dt>
                      <dd>{animal.healthMetrics.temperature}°C</dd>
                      <dt className="font-medium">{t("heart_rate")}:</dt>
                      <dd>{animal.healthMetrics.heartRate} BPM</dd>
                      <dt className="font-medium">{t("activity")}:</dt>
                      <dd>{animal.healthMetrics.activity} steps/day</dd>
                      <dt className="font-medium">{t("stress")}:</dt>
                      <dd>{animal.healthMetrics.stress}/100</dd>
                      <dt className="font-medium">{t("last_updated")}:</dt>
                      <dd>{new Date(animal.healthMetrics.lastUpdated).toLocaleString()}</dd>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{t("productivity")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        <dt className="font-medium">{t("metric")}:</dt>
                        <dd>{getProductivityMetricName(animal.productivity.metric)}</dd>
                        <dt className="font-medium">{t("current_value")}:</dt>
                        <dd>
                          {animal.productivity.value} {getProductivityUnit(animal.productivity.unit)}
                        </dd>
                        <dt className="font-medium">{t("max_value")}:</dt>
                        <dd>
                          {getMaxProductivity(animal.productivity.history)}{" "}
                          {getProductivityUnit(animal.productivity.unit)}
                        </dd>
                        <dt className="font-medium">{t("performance")}:</dt>
                        <dd>{getPerformanceRating(animal.productivity.value, animal.productivity.metric)}</dd>
                        <dt className="font-medium">{t("trend")}:</dt>
                        <dd className="flex items-center gap-1">
                          {changePercentage(animal.productivity.history) > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                          )}
                          {changePercentage(animal.productivity.history).toFixed(1)}%
                        </dd>
                      </dl>
                    </div>
                    <div className="md:col-span-2 h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={animal.productivity.history}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{t("recommendations")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("health_history")}</CardTitle>
                  <CardDescription>{t("health_metrics_desc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { date: "2023-01-01", temperature: 38.5, heartRate: 65, activity: 5200, stress: 20 },
                            { date: "2023-01-15", temperature: 38.7, heartRate: 68, activity: 4800, stress: 25 },
                            { date: "2023-02-01", temperature: 38.9, heartRate: 70, activity: 4500, stress: 30 },
                            { date: "2023-02-15", temperature: 39.1, heartRate: 72, activity: 4200, stress: 40 },
                            { date: "2023-03-01", temperature: 38.8, heartRate: 69, activity: 4600, stress: 35 },
                            { date: "2023-03-15", temperature: 38.6, heartRate: 67, activity: 4900, stress: 30 },
                            {
                              date: "2023-04-01",
                              temperature: animal.healthMetrics.temperature,
                              heartRate: animal.healthMetrics.heartRate,
                              activity: animal.healthMetrics.activity,
                              stress: animal.healthMetrics.stress,
                            },
                          ]}
                        >
                          <XAxis dataKey="date" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="temperature"
                            name="Temperature (°C)"
                            stroke="#ff0000"
                            strokeWidth={2}
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="heartRate"
                            name="Heart Rate (BPM)"
                            stroke="#0000ff"
                            strokeWidth={2}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="activity"
                            name="Activity (steps)"
                            stroke="#00ff00"
                            strokeWidth={2}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="stress"
                            name="Stress (/100)"
                            stroke="#ff00ff"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{t("veterinary_visits")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>2023-03-15</span>
                              </div>
                              <span>Routine checkup</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>2023-02-01</span>
                              </div>
                              <span>Vaccination</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>2023-01-10</span>
                              </div>
                              <span>Initial assessment</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{t("treatments")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>2023-03-15</span>
                              </div>
                              <span>Deworming</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>2023-02-01</span>
                              </div>
                              <span>FMD Vaccination</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>2023-01-10</span>
                              </div>
                              <span>Antibiotic course</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t("schedule_vet_visit")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("location_history")}</CardTitle>
                  <CardDescription>{t("location_tracking_desc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">{t("map_placeholder")}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("current_location")}: {animal.location.latitude.toFixed(4)},{" "}
                          {animal.location.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{t("location_history")}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(animal.location.lastUpdated).toLocaleString()}</span>
                            </div>
                            <span>
                              {animal.location.latitude.toFixed(4)}, {animal.location.longitude.toFixed(4)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {new Date(new Date(animal.location.lastUpdated).getTime() - 3600000).toLocaleString()}
                              </span>
                            </div>
                            <span>
                              {(animal.location.latitude - 0.001).toFixed(4)},{" "}
                              {(animal.location.longitude - 0.001).toFixed(4)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {new Date(new Date(animal.location.lastUpdated).getTime() - 7200000).toLocaleString()}
                              </span>
                            </div>
                            <span>
                              {(animal.location.latitude - 0.002).toFixed(4)},{" "}
                              {(animal.location.longitude - 0.002).toFixed(4)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t("locate_now")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="productivity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("productivity_data")}</CardTitle>
                  <CardDescription>
                    {getProductivityMetricName(animal.productivity.metric)} (
                    {getProductivityUnit(animal.productivity.unit)})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={animal.productivity.history}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            name={getProductivityMetricName(animal.productivity.metric)}
                            stroke="#8884d8"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{t("productivity_analysis")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <dl className="grid grid-cols-2 gap-2 text-sm">
                            <dt className="font-medium">{t("current_value")}:</dt>
                            <dd>
                              {animal.productivity.value} {getProductivityUnit(animal.productivity.unit)}
                            </dd>
                            <dt className="font-medium">{t("average_value")}:</dt>
                            <dd>
                              {(
                                animal.productivity.history.reduce((sum, item) => sum + item.value, 0) /
                                animal.productivity.history.length
                              ).toFixed(2)}{" "}
                              {getProductivityUnit(animal.productivity.unit)}
                            </dd>
                            <dt className="font-medium">{t("max_value")}:</dt>
                            <dd>
                              {getMaxProductivity(animal.productivity.history)}{" "}
                              {getProductivityUnit(animal.productivity.unit)}
                            </dd>
                            <dt className="font-medium">{t("min_value")}:</dt>
                            <dd>
                              {Math.min(...animal.productivity.history.map((item) => item.value))}{" "}
                              {getProductivityUnit(animal.productivity.unit)}
                            </dd>
                            <dt className="font-medium">{t("trend")}:</dt>
                            <dd>{getTrendAnalysis(animal.productivity.history)}</dd>
                          </dl>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{t("recommendations")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1">
                            {recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("recent_alerts")}</CardTitle>
                  <CardDescription>{t("alerts_desc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {animal.alerts.length > 0 ? (
                      animal.alerts.map((alert) => (
                        <Card key={alert.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                {alert.message}
                              </CardTitle>
                              <Badge className={getAlertStatusColor(alert.status)}>{t(alert.status)}</Badge>
                            </div>
                            <CardDescription>{new Date(alert.timestamp).toLocaleString()}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{t("alert_details")}</p>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              {t("view_details")}
                            </Button>
                            {alert.status !== "resolved" && <Button size="sm">{t("resolve")}</Button>}
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">{t("no_alerts")}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
