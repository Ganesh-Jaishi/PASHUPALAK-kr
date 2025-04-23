"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  Battery,
  Wifi,
  WifiOff,
  MapPin,
  Heart,
  BarChart3,
  MilkIcon as Cow,
  Droplets,
  Sun,
  Download,
  RefreshCw,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import HealthMetricsChart from "@/components/health-metrics-chart"
import LivestockMap from "@/components/livestock-map"
import VetAlerts from "@/components/vet-alerts"
import AIInsights from "@/components/ai-insights"
import SyncStatus from "@/components/sync-status"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

export default function Dashboard() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [syncStatus, setSyncStatus] = useState<"online" | "offline" | "syncing">("online")
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [selectedAnimal, setSelectedAnimal] = useState("all")
  const [showOfflineData, setShowOfflineData] = useState(false)

  // Simulate network status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const status = Math.random() > 0.8 ? "offline" : "online"
      setSyncStatus(status)

      if (status === "offline") {
        toast({
          title: "Connection Lost",
          description: "Operating in offline mode. Data will sync when connection is restored.",
          variant: "destructive",
        })
        setShowOfflineData(true)
      } else if (showOfflineData) {
        setSyncStatus("syncing")
        setTimeout(() => {
          setSyncStatus("online")
          toast({
            title: "Connection Restored",
            description: "All data has been synchronized successfully.",
          })
          setShowOfflineData(false)
        }, 3000)
      }
    }, 45000) // Check every 45 seconds

    return () => clearInterval(interval)
  }, [toast, showOfflineData])

  // Simulate battery level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        const newLevel = prev - Math.floor(Math.random() * 3)
        return newLevel < 10 ? 100 : newLevel
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Simulate geo-fence alert
  useEffect(() => {
    const timeout = setTimeout(() => {
      toast({
        title: "⚠️ Geo-fence Alert",
        description: "Cattle #1042 has left the designated area.",
        variant: "destructive",
      })
    }, 20000) // Show after 20 seconds

    return () => clearTimeout(timeout)
  }, [toast])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Livestock Monitor</h2>
            <p className="text-muted-foreground">Advanced livestock management with IoT technology</p>
          </div>

          <div className="flex items-center space-x-4">
            <SyncStatus status={syncStatus} />

            <div className="flex items-center space-x-1">
              <Battery className={`h-4 w-4 ${batteryLevel < 20 ? "text-destructive" : "text-primary"}`} />
              <span className="text-sm">{batteryLevel}%</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast({
                  title: "Downloading data...",
                  description: "Saving offline data to your device.",
                })
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Backup Data
            </Button>

            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="health">Health Metrics</TabsTrigger>
              <TabsTrigger value="location">Location Tracking</TabsTrigger>
              <TabsTrigger value="vet">Vet Dashboard</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Label htmlFor="animal-filter" className="text-sm">
                Filter:
              </Label>
              <select
                id="animal-filter"
                className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                value={selectedAnimal}
                onChange={(e) => setSelectedAnimal(e.target.value)}
              >
                <option value="all">All Animals</option>
                <option value="cattle">Cattle</option>
                <option value="pigs">Pigs</option>
                <option value="goats">Goats</option>
                <option value="poultry">Poultry</option>
                <option value="mithun">Mithun</option>
              </select>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="chart-container">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Livestock</CardTitle>
                  <Cow className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-muted-foreground">+12 since last month</p>
                  <div className="mt-4 flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <div className="mr-1 h-3 w-3 rounded-full bg-primary"></div>
                      <span>Cattle: 84</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-1 h-3 w-3 rounded-full bg-secondary"></div>
                      <span>Others: 163</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Alerts</CardTitle>
                  <Heart className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">-3 since yesterday</p>
                  <div className="mt-4">
                    <Badge variant="destructive" className="mr-1">
                      Critical: 2
                    </Badge>
                    <Badge variant="outline" className="mr-1">
                      Warning: 5
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productivity</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">+4% from last week</p>
                  <Progress value={92} className="mt-4" />
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Geo-fence Status</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Secure</div>
                  <p className="text-xs text-muted-foreground">1 alert in the last 24h</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">All boundaries active</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 chart-container">
                <CardHeader>
                  <CardTitle>Health Metrics Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <HealthMetricsChart />
                </CardContent>
              </Card>

              <Card className="col-span-3 chart-container">
                <CardHeader>
                  <CardTitle>Location Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <LivestockMap />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Recent Vet Alerts</CardTitle>
                  <CardDescription>Last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <VetAlerts limit={3} />
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>AI Health Predictions</CardTitle>
                  <CardDescription>Based on current data</CardDescription>
                </CardHeader>
                <CardContent>
                  <AIInsights limit={3} />
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Device and connectivity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Battery className={`h-4 w-4 ${batteryLevel < 20 ? "text-destructive" : "text-primary"}`} />
                        <span>Battery</span>
                      </div>
                      <div className="flex items-center">
                        <Progress value={batteryLevel} className="w-24 mr-2" />
                        <span className="text-sm">{batteryLevel}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {syncStatus === "online" ? (
                          <Wifi className="h-4 w-4 text-primary" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-destructive" />
                        )}
                        <span>Connectivity</span>
                      </div>
                      <Badge variant={syncStatus === "online" ? "outline" : "destructive"}>
                        {syncStatus === "online" ? "Online" : syncStatus === "syncing" ? "Syncing..." : "Offline"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4 text-secondary" />
                        <span>Solar Charging</span>
                      </div>
                      <Badge variant="outline" className="bg-secondary/20">
                        Active
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span>Weather Conditions</span>
                      </div>
                      <span className="text-sm">Clear, 24°C</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Offline Mode</span>
                      <Switch
                        checked={showOfflineData}
                        onCheckedChange={setShowOfflineData}
                        disabled={syncStatus === "offline"}
                      />
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSyncStatus("syncing")
                        setTimeout(() => {
                          setSyncStatus("online")
                          toast({
                            title: "Sync Complete",
                            description: "All data has been synchronized with the cloud.",
                          })
                        }, 2000)
                      }}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Force Sync
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Health Metrics</CardTitle>
                <CardDescription>Real-time data from IoT wearables</CardDescription>
              </CardHeader>
              <CardContent>
                <HealthMetricsChart detailed />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>GPS Tracking & Geo-fencing</CardTitle>
                <CardDescription>Real-time location data with theft detection</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <LivestockMap detailed />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vet" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Veterinarian Dashboard</CardTitle>
                <CardDescription>Health alerts and diagnostic information</CardDescription>
              </CardHeader>
              <CardContent>
                <VetAlerts detailed />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Health Insights</CardTitle>
                <CardDescription>Predictive analytics for livestock management</CardDescription>
              </CardHeader>
              <CardContent>
                <AIInsights detailed />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
