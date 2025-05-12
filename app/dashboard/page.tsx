"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { AlertTriangle, MilkIcon as Cow, HeartPulse, Loader2, Plus, RefreshCw, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { getLivestockData, refreshLivestockData } from "@/lib/data-service"
import HealthMetricsChart from "@/components/health-metrics-chart"
import AIInsights from "@/components/ai-insights"
import VetAlerts from "@/components/vet-alerts"
import SyncStatus from "@/components/sync-status"
import LivestockMap from "@/components/livestock-map"

export default function DashboardPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    // Load data
    setLoading(true)
    const livestockData = getLivestockData()
    setData(livestockData)
    setLoading(false)
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      const refreshedData = refreshLivestockData()
      setData(refreshedData)
      setRefreshing(false)

      toast({
        title: t("data_refreshed"),
        description: t("data_refreshed_description"),
      })
    }, 1000)
  }

  const handleAddLivestock = () => {
    toast({
      title: t("add_livestock"),
      description: t("add_livestock_description"),
    })
  }

  const handleViewCategory = (category: string) => {
    router.push(`/dashboard/livestock/${category}`)
  }

  const handleViewAnimal = (id: string) => {
    router.push(`/dashboard/livestock/animal/${id}`)
  }

  if (loading || !data) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-medium">{t("loading_dashboard")}</h2>
          <p className="text-muted-foreground">{t("loading_dashboard_description")}</p>
        </div>
      </div>
    )
  }

  // Get summary data
  const totalAnimals = data.animals.length
  const healthyCounts = data.animals.filter((animal) => animal.healthStatus === "healthy").length
  const warningCounts = data.animals.filter((animal) => animal.healthStatus === "warning").length
  const alertCounts = data.animals.filter((animal) => animal.healthStatus === "alert").length

  // Get animals with issues for quick access
  const animalsWithIssues = data.animals
    .filter((animal) => animal.healthStatus !== "healthy")
    .sort((a, b) => {
      // Sort by severity (alert first, then warning)
      if (a.healthStatus === "alert" && b.healthStatus !== "alert") return -1
      if (a.healthStatus !== "alert" && b.healthStatus === "alert") return 1
      return 0
    })
    .slice(0, 5)

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
          <p className="text-muted-foreground">{t("dashboard_description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("refreshing")}
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t("refresh_data")}
              </>
            )}
          </Button>
          <Button size="sm" className="h-9" onClick={handleAddLivestock}>
            <Plus className="h-4 w-4 mr-2" />
            {t("add_livestock")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("total_livestock")}</p>
                <h3 className="text-3xl font-bold mt-1">{totalAnimals}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Cow className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {Object.entries(data.summary).map(([category, summary]) => (
                <div
                  key={category}
                  className="text-center cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleViewCategory(category)}
                >
                  <div className="text-xs font-medium mb-1 capitalize">{t(category)}</div>
                  <div className="text-sm font-bold">{summary.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-2 border-green-500/10 hover:border-green-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("health_status")}</p>
                <h3 className="text-3xl font-bold mt-1">{Math.round((healthyCounts / totalAnimals) * 100)}%</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <HeartPulse className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span>{t("healthy")}</span>
                </div>
                <span className="font-medium">{healthyCounts}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                  <span>{t("warning")}</span>
                </div>
                <span className="font-medium">{warningCounts}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span>{t("alert")}</span>
                </div>
                <span className="font-medium">{alertCounts}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-2 border-amber-500/10 hover:border-amber-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("recent_alerts")}</p>
                <h3 className="text-3xl font-bold mt-1">{animalsWithIssues.length}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {animalsWithIssues.slice(0, 2).map((animal) => (
                <div
                  key={animal.id}
                  className="flex items-center justify-between text-sm cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleViewAnimal(animal.id)}
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={animal.healthStatus === "alert" ? "destructive" : "outline"}
                      className="h-5 min-w-[60px] justify-center"
                    >
                      {t(animal.healthStatus)}
                    </Badge>
                    <span className="truncate">{animal.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{t(animal.category)}</span>
                </div>
              ))}
              {animalsWithIssues.length > 2 && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => router.push("/dashboard/health")}
                >
                  {t("view_all_alerts")} ({animalsWithIssues.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-2 border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("iot_devices")}</p>
                <h3 className="text-3xl font-bold mt-1">{totalAnimals}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span>{t("online")}</span>
                </div>
                <span className="font-medium">{data.animals.filter((a) => a.deviceStatus === "online").length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-slate-400 mr-2"></div>
                  <span>{t("offline")}</span>
                </div>
                <span className="font-medium">{data.animals.filter((a) => a.deviceStatus === "offline").length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span>{t("battery_low")}</span>
                </div>
                <span className="font-medium">
                  {data.animals.filter((a) => a.deviceStatus === "battery_low").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("health_monitoring")}</CardTitle>
            <CardDescription>{t("health_monitoring_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <HealthMetricsChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("location_tracking")}</CardTitle>
            <CardDescription>{t("location_tracking_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <LivestockMap />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("vet_network")}</CardTitle>
            <CardDescription>{t("vet_network_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <VetAlerts />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("ai_insights")}</CardTitle>
            <CardDescription>{t("ai_insights_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <AIInsights />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("livestock_distribution")}</CardTitle>
            <CardDescription>{t("livestock_distribution_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(data.summary).map(([key, value]) => ({
                      name: t(key),
                      value: value.count,
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {Object.keys(data.summary).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 50}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("productivity_trends")}</CardTitle>
            <CardDescription>{t("productivity_trends_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Jan", cattle: 65, goats: 45, pigs: 30 },
                    { month: "Feb", cattle: 68, goats: 48, pigs: 32 },
                    { month: "Mar", cattle: 70, goats: 50, pigs: 35 },
                    { month: "Apr", cattle: 72, goats: 53, pigs: 38 },
                    { month: "May", cattle: 75, goats: 55, pigs: 40 },
                    { month: "Jun", cattle: 78, goats: 57, pigs: 42 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cattle" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="goats" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="pigs" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("system_status")}</CardTitle>
            <CardDescription>{t("system_status_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <SyncStatus />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
