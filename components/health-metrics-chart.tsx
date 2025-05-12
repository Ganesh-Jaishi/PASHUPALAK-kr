"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ThermometerSun, Activity, Heart, Zap } from "lucide-react"

// Mock data for health metrics
const generateHealthData = (days = 7, detailed = false) => {
  const data = []
  const now = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - (days - i - 1))

    const baseTemp = 38.5 + Math.random() * 1.5
    const baseHeart = 70 + Math.random() * 20
    const baseActivity = 60 + Math.random() * 40
    const baseStress = 20 + Math.random() * 30

    // Add hourly data points for detailed view
    if (detailed && i >= days - 2) {
      for (let h = 0; h < 24; h++) {
        const hourDate = new Date(date)
        hourDate.setHours(h)

        const hourVariation = Math.sin(h / 3.82) * 0.5

        data.push({
          timestamp: hourDate.toISOString(),
          label: `${h}:00`,
          temperature: baseTemp + hourVariation,
          heartRate: baseHeart + hourVariation * 10,
          activity: baseActivity + hourVariation * 15,
          stress: baseStress + hourVariation * 8,
        })
      }
    } else {
      data.push({
        timestamp: date.toISOString(),
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        temperature: baseTemp,
        heartRate: baseHeart,
        activity: baseActivity,
        stress: baseStress,
      })
    }
  }

  return data
}

interface HealthMetricsChartProps {
  detailed?: boolean
}

export default function HealthMetricsChart({ detailed = false }: HealthMetricsChartProps) {
  const [data, setData] = useState<any[]>([])
  const [activeMetric, setActiveMetric] = useState("temperature")
  const [animalType, setAnimalType] = useState("cattle")

  useEffect(() => {
    setData(generateHealthData(detailed ? 2 : 7, detailed))

    // Simulate real-time updates for detailed view
    if (detailed) {
      const interval = setInterval(() => {
        setData((prev) => {
          const newData = [...prev]
          const lastItem = newData[newData.length - 1]

          // Add small random variations to the last data point
          newData[newData.length - 1] = {
            ...lastItem,
            temperature: lastItem.temperature + (Math.random() - 0.5) * 0.2,
            heartRate: lastItem.heartRate + (Math.random() - 0.5) * 2,
            activity: lastItem.activity + (Math.random() - 0.5) * 3,
            stress: lastItem.stress + (Math.random() - 0.5) * 1.5,
          }

          return newData
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [detailed])

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "temperature":
        return "#ef4444"
      case "heartRate":
        return "#ec4899"
      case "activity":
        return "#3b82f6"
      case "stress":
        return "#f97316"
      default:
        return "#10b981"
    }
  }

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "temperature":
        return <ThermometerSun className="h-4 w-4" />
      case "heartRate":
        return <Heart className="h-4 w-4" />
      case "activity":
        return <Activity className="h-4 w-4" />
      case "stress":
        return <Zap className="h-4 w-4" />
      default:
        return null
    }
  }

  const getMetricName = (metric: string) => {
    switch (metric) {
      case "temperature":
        return "Temperature"
      case "heartRate":
        return "Heart Rate"
      case "activity":
        return "Activity"
      case "stress":
        return "Stress Level"
      default:
        return metric
    }
  }

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case "temperature":
        return "°C"
      case "heartRate":
        return "BPM"
      case "activity":
        return "%"
      case "stress":
        return "%"
      default:
        return ""
    }
  }

  const getMetricRange = (metric: string, animalType: string) => {
    switch (metric) {
      case "temperature":
        return animalType === "cattle"
          ? "38.0-39.5°C"
          : animalType === "pigs"
            ? "38.5-40.0°C"
            : animalType === "goats"
              ? "38.5-40.0°C"
              : "Normal Range"
      case "heartRate":
        return animalType === "cattle"
          ? "60-90 BPM"
          : animalType === "pigs"
            ? "70-120 BPM"
            : animalType === "goats"
              ? "70-110 BPM"
              : "Normal Range"
      default:
        return "Normal Range"
    }
  }

  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case "temperature":
        return value.toFixed(1)
      case "heartRate":
        return Math.round(value)
      default:
        return Math.round(value)
    }
  }

  const renderDetailedMetrics = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {["temperature", "heartRate", "activity", "stress"].map((metric, index) => {
          const color = getMetricColor(metric)
          const lastValue = data.length ? data[data.length - 1][metric] : 0

          return (
            <Card
              key={metric}
              className="overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full animate-pulse-slow" style={{ backgroundColor: `${color}20` }}>
                      {getMetricIcon(metric)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{getMetricName(metric)}</p>
                      <p className="text-2xl font-bold">
                        {formatValue(lastValue, metric)}
                        <span className="text-sm font-normal ml-1">{getMetricUnit(metric)}</span>
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="h-6">
                    {getMetricRange(metric, animalType)}
                  </Badge>
                </div>

                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey={metric}
                        stroke={color}
                        strokeWidth={2}
                        fill={`url(#gradient-${metric})`}
                        animationDuration={800}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {detailed && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <select
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
            >
              <option value="cattle">Cattle</option>
              <option value="pigs">Pigs</option>
              <option value="goats">Goats</option>
              <option value="poultry">Poultry</option>
              <option value="mithun">Mithun</option>
            </select>
            <Badge variant="outline" className="animate-pulse-slow">
              Live Data
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
              Healthy
            </Badge>
            <Badge variant="outline">ID: #1042</Badge>
          </div>
        </div>
      )}

      {detailed && renderDetailedMetrics()}

      <div className="rounded-md border">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs
            defaultValue="temperature"
            value={activeMetric}
            onValueChange={setActiveMetric}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="temperature" className="flex items-center gap-1">
                <ThermometerSun className="h-3 w-3" />
                <span className="hidden sm:inline">Temperature</span>
              </TabsTrigger>
              <TabsTrigger value="heartRate" className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span className="hidden sm:inline">Heart Rate</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="stress" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span className="hidden sm:inline">Stress</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {!detailed && (
            <select
              className="rounded-md border border-input bg-background px-3 py-1 text-sm w-full sm:w-auto"
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
            >
              <option value="cattle">Cattle</option>
              <option value="pigs">Pigs</option>
              <option value="goats">Goats</option>
              <option value="poultry">Poultry</option>
              <option value="mithun">Mithun</option>
            </select>
          )}
        </div>

        <div className="h-[300px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis tick={{ fontSize: 12 }} tickMargin={10} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number, name: string) => [
                  `${formatValue(value, name)} ${getMetricUnit(name)}`,
                  getMetricName(name),
                ]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={activeMetric}
                stroke={getMetricColor(activeMetric)}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
