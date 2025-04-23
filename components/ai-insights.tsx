"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Calendar,
  Lightbulb,
  BarChart3,
  Droplets,
  Thermometer,
  Leaf,
  Heart,
} from "lucide-react"

// Mock data for AI insights
const generateInsights = () => {
  const insightTypes = [
    {
      type: "health",
      title: "Health Prediction",
      icon: Brain,
      description: "AI-powered health prediction based on vital signs and behavior patterns.",
      category: "prediction",
    },
    {
      type: "productivity",
      title: "Productivity Forecast",
      icon: TrendingUp,
      description: "Predicted changes in livestock productivity over the next 30 days.",
      category: "forecast",
    },
    {
      type: "breeding",
      title: "Breeding Cycle",
      icon: Calendar,
      description: "Optimal breeding times based on historical data and health metrics.",
      category: "recommendation",
    },
    {
      type: "nutrition",
      title: "Nutrition Optimization",
      icon: Leaf,
      description: "Feed composition recommendations to improve health and productivity.",
      category: "recommendation",
    },
    {
      type: "disease",
      title: "Disease Risk",
      icon: TrendingDown,
      description: "Early warning for potential disease outbreaks based on health patterns.",
      category: "alert",
    },
  ]

  const animalTypes = ["cattle", "pig", "goat", "poultry", "mithun"]

  const insights = []

  // Generate random insights
  for (let i = 0; i < 12; i++) {
    const insightType = insightTypes[Math.floor(Math.random() * insightTypes.length)]
    const animalType = animalTypes[Math.floor(Math.random() * animalTypes.length)]

    // Generate a date within the next 30 days
    const date = new Date()
    date.setDate(date.getDate() + Math.floor(Math.random() * 30))

    let content = ""
    let confidence = 70 + Math.floor(Math.random() * 25)

    switch (insightType.type) {
      case "health":
        content = `Based on recent vital signs, ${animalType} herd shows ${Math.random() > 0.5 ? "improved" : "declining"} health trends. ${Math.random() > 0.7 ? "Recommend veterinary check-up." : "Continue monitoring."}`
        break
      case "productivity":
        content = `Predicted ${Math.random() > 0.5 ? "increase" : "decrease"} of ${Math.floor(Math.random() * 15)}% in ${animalType} productivity over the next ${Math.floor(Math.random() * 20) + 10} days.`
        break
      case "breeding":
        content = `Optimal breeding window for ${animalType} group A predicted between ${new Date(date.getTime() + 86400000 * Math.floor(Math.random() * 10)).toLocaleDateString()} and ${new Date(date.getTime() + 86400000 * (Math.floor(Math.random() * 10) + 10)).toLocaleDateString()}.`
        break
      case "nutrition":
        content = `Recommend ${Math.random() > 0.5 ? "increasing" : "decreasing"} ${Math.random() > 0.5 ? "protein" : "fiber"} content in ${animalType} feed by ${Math.floor(Math.random() * 10) + 5}% to optimize health metrics.`
        break
      case "disease":
        content = `Early indicators suggest ${Math.floor(Math.random() * 30) + 10}% increased risk of respiratory issues in ${animalType} herd. Preventative measures recommended.`
        confidence = 65 + Math.floor(Math.random() * 20) // Lower confidence for disease predictions
        break
    }

    insights.push({
      id: `insight-${i}`,
      timestamp: date.toISOString(),
      animalType,
      insightType: insightType.type,
      title: insightType.title,
      description: insightType.description,
      category: insightType.category,
      icon: insightType.icon,
      content,
      confidence,
      applied: Math.random() > 0.7,
    })
  }

  // Sort by confidence (highest first) and category
  return insights.sort((a, b) => {
    if (a.category === "alert" && b.category !== "alert") return -1
    if (a.category !== "alert" && b.category === "alert") return 1
    return b.confidence - a.confidence
  })
}

interface AIInsightsProps {
  detailed?: boolean
  limit?: number
}

export default function AIInsights({ detailed = false, limit }: AIInsightsProps) {
  const [insights, setInsights] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")

  useEffect(() => {
    setInsights(generateInsights())
  }, [])

  const filteredInsights = insights.filter((insight) => {
    if (activeTab === "all") return true
    return insight.category === activeTab
  })

  const displayInsights = limit ? filteredInsights.slice(0, limit) : filteredInsights

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "prediction":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "forecast":
        return "bg-green-100 text-green-800 border-green-200"
      case "recommendation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "alert":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "prediction":
        return <Brain className="h-4 w-4" />
      case "forecast":
        return <TrendingUp className="h-4 w-4" />
      case "recommendation":
        return <Lightbulb className="h-4 w-4" />
      case "alert":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  const renderInsightCard = (insight: any) => {
    return (
      <Card key={insight.id} className="mb-4 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${getCategoryColor(insight.category).split(" ")[0]}`}>
                <insight.icon className={`h-5 w-5 ${getCategoryColor(insight.category).split(" ")[1]}`} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{insight.title}</h4>
                  <Badge variant="outline" className={getCategoryColor(insight.category)}>
                    {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm mt-1">{insight.content}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="capitalize">
                    {insight.animalType}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-1">Confidence:</span>
                    <Progress value={insight.confidence} className="h-2 w-16" />
                    <span className="ml-1">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>

            {detailed && (
              <Button
                variant={insight.applied ? "outline" : "default"}
                size="sm"
                className={insight.applied ? "pointer-events-none opacity-50" : ""}
              >
                {insight.applied ? "Applied" : "Apply"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderDetailedView = () => {
    if (!detailed) return null

    return (
      <>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              <span>Predictions</span>
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Forecasts</span>
            </TabsTrigger>
            <TabsTrigger value="recommendation" className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              <span>Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="alert" className="flex items-center gap-1">
              <TrendingDown className="h-4 w-4" />
              <span>Alerts</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Productivity Forecast</h3>
                <Badge variant="outline" className="bg-primary/20">
                  30-Day Trend
                </Badge>
              </div>
              <div className="h-48 w-full">
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                  [Productivity Trend Chart]
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Predicted Change</p>
                  <p className="text-2xl font-bold text-primary">+8.3%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Confidence</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Health Prediction</h3>
                <Badge variant="outline" className="bg-secondary/20">
                  Herd Analysis
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/80">
                  <Thermometer className="h-8 w-8 text-red-500 mb-2" />
                  <p className="text-sm font-medium">Temperature</p>
                  <p className="text-lg font-bold">Normal</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/80">
                  <Heart className="h-8 w-8 text-pink-500 mb-2" />
                  <p className="text-sm font-medium">Heart Rate</p>
                  <p className="text-lg font-bold">Stable</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/80">
                  <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm font-medium">Hydration</p>
                  <p className="text-lg font-bold">Optimal</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/80">
                  <Leaf className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm font-medium">Nutrition</p>
                  <p className="text-lg font-bold">Good</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Overall Health Score</p>
                <div className="flex items-center mt-1">
                  <Progress value={92} className="h-2 flex-1" />
                  <span className="ml-2 font-bold">92%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-4">
      {renderDetailedView()}

      {displayInsights.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Brain className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">No insights available</h3>
          <p className="text-sm text-muted-foreground">AI is currently analyzing data to generate insights.</p>
        </div>
      ) : (
        displayInsights.map(renderInsightCard)
      )}

      {!detailed && insights.length > limit! && (
        <Button variant="outline" className="w-full" size="sm">
          View All Insights
        </Button>
      )}
    </div>
  )
}
