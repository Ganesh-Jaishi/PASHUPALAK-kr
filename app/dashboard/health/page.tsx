"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import HealthMetricsChart from "@/components/health-metrics-chart"
import {
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Heart,
  Printer,
  Thermometer,
  Weight,
} from "lucide-react"

// Mock health data
const healthAlerts = [
  {
    id: "1",
    animalId: "0012",
    animalName: "Cattle #12",
    category: "cattle",
    issue: "High temperature",
    value: "40.2°C",
    status: "Critical",
    timestamp: "2023-05-10 08:30",
  },
  {
    id: "2",
    animalId: "0045",
    animalName: "Goat #45",
    category: "goats",
    issue: "Low weight",
    value: "22 kg",
    status: "Warning",
    timestamp: "2023-05-09 14:15",
  },
  {
    id: "3",
    animalId: "0023",
    animalName: "Pig #23",
    category: "pigs",
    issue: "Irregular heartbeat",
    value: "95 bpm",
    status: "Warning",
    timestamp: "2023-05-08 11:45",
  },
  {
    id: "4",
    animalId: "0078",
    animalName: "Cattle #78",
    category: "cattle",
    issue: "Dehydration",
    value: "Moderate",
    status: "Warning",
    timestamp: "2023-05-07 16:20",
  },
]

const upcomingVaccinations = [
  {
    id: "1",
    animalId: "0034",
    animalName: "Goat #34",
    category: "goats",
    vaccination: "FMD Vaccine",
    dueDate: "2023-05-15",
    status: "Upcoming",
  },
  {
    id: "2",
    animalId: "0056",
    animalName: "Cattle #56",
    category: "cattle",
    vaccination: "Brucellosis",
    dueDate: "2023-05-18",
    status: "Upcoming",
  },
  {
    id: "3",
    animalId: "0089",
    animalName: "Pig #89",
    category: "pigs",
    vaccination: "Swine Fever",
    dueDate: "2023-05-12",
    status: "Urgent",
  },
  {
    id: "4",
    animalId: "0023",
    animalName: "Cattle #23",
    category: "cattle",
    vaccination: "Anthrax",
    dueDate: "2023-05-20",
    status: "Upcoming",
  },
]

export default function HealthMonitoringPage() {
  const { t } = useLanguage()

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">{t("healthMonitoring")}</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("totalAnimals")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">{t("beingMonitored")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("healthyAnimals")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">118</div>
            <p className="text-xs text-muted-foreground">95% {t("ofTotal")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("warningStatus")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">5</div>
            <p className="text-xs text-muted-foreground">4% {t("ofTotal")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("criticalStatus")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">
              {"<"}1% {t("ofTotal")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="alerts">{t("healthAlerts")}</TabsTrigger>
          <TabsTrigger value="vaccinations">{t("upcomingVaccinations")}</TabsTrigger>
          <TabsTrigger value="trends">{t("healthTrends")}</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>{t("healthAlerts")}</CardTitle>
              <CardDescription>{t("recentHealthIssues")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthAlerts.map((alert) => (
                  <div key={alert.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{alert.animalName}</h4>
                        <Badge variant="outline" className="ml-2">
                          {t(alert.category)}
                        </Badge>
                        <Badge variant={alert.status === "Critical" ? "destructive" : "warning"} className="ml-2">
                          {alert.status === "Critical" ? (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {alert.issue}: {alert.value}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      <Button variant="link" className="h-auto p-0 text-sm">
                        {t("viewDetails")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccinations">
          <Card>
            <CardHeader>
              <CardTitle>{t("upcomingVaccinations")}</CardTitle>
              <CardDescription>{t("scheduledVaccinations")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingVaccinations.map((vacc) => (
                  <div key={vacc.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{vacc.animalName}</h4>
                        <Badge variant="outline" className="ml-2">
                          {t(vacc.category)}
                        </Badge>
                        <Badge variant={vacc.status === "Urgent" ? "destructive" : "outline"} className="ml-2">
                          {vacc.status === "Urgent" ? (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          ) : (
                            <Calendar className="h-3 w-3 mr-1" />
                          )}
                          {vacc.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {vacc.vaccination} - {t("due")}: {vacc.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        {t("reschedule")}
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t("markComplete")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>{t("healthTrends")}</CardTitle>
              <CardDescription>{t("healthTrendsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Select defaultValue="temperature">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("selectMetric")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2" />
                        {t("temperature")}
                      </div>
                    </SelectItem>
                    <SelectItem value="heartRate">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        {t("heartRate")}
                      </div>
                    </SelectItem>
                    <SelectItem value="respirationRate">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2" />
                        {t("respirationRate")}
                      </div>
                    </SelectItem>
                    <SelectItem value="weight">
                      <div className="flex items-center">
                        <Weight className="h-4 w-4 mr-2" />
                        {t("weight")}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="30d">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("timeRange")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {t("last7Days")}
                      </div>
                    </SelectItem>
                    <SelectItem value="30d">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {t("last30Days")}
                      </div>
                    </SelectItem>
                    <SelectItem value="90d">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {t("last90Days")}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-80">
                <HealthMetricsChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
