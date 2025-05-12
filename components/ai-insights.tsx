"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Calendar,
  ChevronRight,
  Dna,
  HeartPulse,
  Lightbulb,
  Microscope,
  Pill,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react"

// Mock data for AI insights
const generateAIInsightsData = () => {
  // Disease prediction data
  const diseases = [
    {
      id: 1,
      name: "Foot and Mouth Disease",
      probability: 0.05 + Math.random() * 0.1,
      impact: "High",
      symptoms: ["Fever", "Blisters", "Reduced appetite"],
      preventiveMeasures: ["Vaccination", "Isolation", "Biosecurity"],
      affectedSpecies: ["Cattle", "Pigs", "Sheep"],
    },
    {
      id: 2,
      name: "Mastitis",
      probability: 0.1 + Math.random() * 0.15,
      impact: "Medium",
      symptoms: ["Udder inflammation", "Abnormal milk", "Reduced production"],
      preventiveMeasures: ["Proper milking hygiene", "Regular udder checks", "Antibiotic treatment"],
      affectedSpecies: ["Cattle", "Goats"],
    },
    {
      id: 3,
      name: "Respiratory Infection",
      probability: 0.03 + Math.random() * 0.08,
      impact: "Medium",
      symptoms: ["Coughing", "Nasal discharge", "Difficulty breathing"],
      preventiveMeasures: ["Proper ventilation", "Vaccination", "Reduce stress"],
      affectedSpecies: ["Cattle", "Pigs", "Poultry"],
    },
  ]

  // Breeding optimization data
  const breedingRecommendations = [
    {
      id: 1,
      title: "Optimal Breeding Time",
      description:
        "Based on historical data and current health metrics, the optimal breeding window is approaching for 12 animals.",
      action: "Schedule breeding between June 15-20 for maximum success rate.",
      expectedImprovement: "15-20% higher conception rate",
      confidence: 0.85 + Math.random() * 0.1,
    },
    {
      id: 2,
      title: "Genetic Matching",
      description: "AI analysis suggests optimal genetic matches for 5 females to improve offspring traits.",
      action: "Consider the recommended genetic matches for your next breeding cycle.",
      expectedImprovement: "10-15% improvement in desired traits",
      confidence: 0.75 + Math.random() * 0.15,
    },
    {
      id: 3,
      title: "Breeding Cycle Optimization",
      description: "Current breeding cycles can be optimized to improve overall herd productivity.",
      action: "Adjust breeding schedule according to the AI-generated timeline.",
      expectedImprovement: "8-12% increase in annual calving rate",
      confidence: 0.8 + Math.random() * 0.1,
    },
  ]

  // Productivity enhancement data
  const productivityEnhancements = [
    {
      id: 1,
      title: "Feed Optimization",
      description: "Current feed composition can be adjusted to improve milk production and weight gain.",
      recommendation: "Increase protein content by 2% and add recommended supplements.",
      expectedImprovement: "7-10% increase in milk production",
      implementationDifficulty: "Low",
      roi: "High",
    },
    {
      id: 2,
      title: "Environmental Adjustments",
      description: "Temperature and humidity levels are affecting productivity in certain areas.",
      recommendation: "Adjust ventilation and cooling systems in the specified locations.",
      expectedImprovement: "5-8% increase in overall productivity",
      implementationDifficulty: "Medium",
      roi: "Medium",
    },
    {
      id: 3,
      title: "Health Monitoring Schedule",
      description: "Optimized health check schedule based on predictive analytics.",
      recommendation: "Implement the AI-generated health monitoring schedule.",
      expectedImprovement: "12-15% reduction in health issues",
      implementationDifficulty: "Low",
      roi: "High",
    },
  ]

  // Productivity trend data
  const productivityTrend = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - (11 - i))

    const baseValue = 70 + i * 1.5 + Math.random() * 5
    const optimizedValue = baseValue + 5 + Math.random() * 8

    productivityTrend.push({
      month: date.toLocaleDateString("en-US", { month: "short" }),
      current: baseValue,
      optimized: optimizedValue,
    })
  }

  return {
    diseases,
    breedingRecommendations,
    productivityEnhancements,
    productivityTrend,
    lastUpdated: new Date().toISOString(),
  }
}

export default function AIInsights() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("disease")

  useEffect(() => {
    // Simulate data loading
    setLoading(true)
    setTimeout(() => {
      setData(generateAIInsightsData())
      setLoading(false)
    }, 1500)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(generateAIInsightsData())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (loading || !data) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">AI Insights</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 w-2/3 bg-muted rounded-md"></div>
              </CardHeader>
              <CardContent>
                <div className="h-24 bg-muted rounded-md"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold">AI Insights</h2>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Powered by AI</span>
        </Badge>
      </div>

      <Card className="border-2 border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" />
            AI Prediction Summary
          </CardTitle>
          <CardDescription>
            Insights generated based on health metrics, environmental data, and historical patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="disease" className="flex items-center gap-1">
                <HeartPulse className="h-3 w-3" />
                <span>Disease Prediction</span>
              </TabsTrigger>
              <TabsTrigger value="breeding" className="flex items-center gap-1">
                <Dna className="h-3 w-3" />
                <span>Breeding Optimization</span>
              </TabsTrigger>
              <TabsTrigger value="productivity" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>Productivity Boost</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="disease" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Disease Risk Assessment</h3>
                  <div className="space-y-4">
                    {data.diseases.map((disease: any) => (
                      <div key={disease.id} className="border rounded-lg p-4 transition-all hover:border-primary/30">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{disease.name}</h4>
                          <Badge
                            variant={
                              disease.probability > 0.15
                                ? "destructive"
                                : disease.probability > 0.1
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {disease.probability > 0.15
                              ? "High Risk"
                              : disease.probability > 0.1
                                ? "Medium Risk"
                                : "Low Risk"}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Probability</span>
                            <span className="font-medium">{Math.round(disease.probability * 100)}%</span>
                          </div>
                          <Progress value={disease.probability * 100} className="h-2" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Impact: {disease.impact}</p>
                          <p>Affected: {disease.affectedSpecies.join(", ")}</p>
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                          View details <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Preventive Measures</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Vaccination", value: 35 },
                            { name: "Biosecurity", value: 25 },
                            { name: "Nutrition", value: 20 },
                            { name: "Monitoring", value: 15 },
                            { name: "Treatment", value: 5 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {[0, 1, 2, 3, 4].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 border rounded-lg p-4 bg-amber-50 border-amber-200">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Attention Required</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Our AI has detected early signs of potential health issues in 3 animals. Immediate check-up is
                          recommended.
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 border-amber-300 bg-amber-100 text-amber-800"
                        >
                          View Affected Animals
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="breeding" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Breeding Recommendations</h3>
                  <div className="space-y-4">
                    {data.breedingRecommendations.map((rec: any) => (
                      <div key={rec.id} className="border rounded-lg p-4 transition-all hover:border-primary/30">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {Math.round(rec.confidence * 100)}% Confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="text-sm font-medium">Expected Improvement:</div>
                        <div className="text-sm text-green-600 mb-2">{rec.expectedImprovement}</div>
                        <div className="text-sm font-medium">Recommended Action:</div>
                        <div className="text-sm mb-2">{rec.action}</div>
                        <Button variant="outline" size="sm" className="mt-1">
                          Apply Recommendation
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Breeding Success Forecast</h3>
                  <div className="h-[250px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { month: "Jul", current: 65, optimized: 82 },
                          { month: "Aug", current: 68, optimized: 85 },
                          { month: "Sep", current: 72, optimized: 88 },
                          { month: "Oct", current: 70, optimized: 86 },
                          { month: "Nov", current: 65, optimized: 83 },
                          { month: "Dec", current: 60, optimized: 78 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="current" name="Current Approach" fill="#94a3b8" />
                        <Bar dataKey="optimized" name="AI Optimized" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Optimal Breeding Calendar</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          AI has generated an optimized breeding calendar based on historical success rates, genetic
                          factors, and environmental conditions.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 border-blue-300 bg-blue-100 text-blue-800">
                          View Breeding Calendar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="productivity" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Productivity Enhancement</h3>
                  <div className="space-y-4">
                    {data.productivityEnhancements.map((enhancement: any) => (
                      <div
                        key={enhancement.id}
                        className="border rounded-lg p-4 transition-all hover:border-primary/30"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{enhancement.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              enhancement.roi === "High"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }
                          >
                            {enhancement.roi} ROI
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{enhancement.description}</p>
                        <div className="text-sm font-medium">Recommendation:</div>
                        <div className="text-sm mb-2">{enhancement.recommendation}</div>
                        <div className="text-sm font-medium">Expected Improvement:</div>
                        <div className="text-sm text-green-600 mb-2">{enhancement.expectedImprovement}</div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-muted-foreground">
                            Implementation: {enhancement.implementationDifficulty}
                          </div>
                          <Button variant="outline" size="sm">
                            Implement <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Productivity Forecast</h3>
                  <div className="h-[250px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.productivityTrend} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="current"
                          name="Current Trend"
                          stroke="#94a3b8"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="optimized"
                          name="AI Optimized"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-start">
                      <Zap className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Productivity Boost Potential</h4>
                        <p className="text-sm text-green-700 mt-1">
                          By implementing all AI recommendations, you can achieve up to 18% increase in overall
                          productivity within 3 months.
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-green-300 bg-green-100 text-green-800">
                            View Detailed Analysis
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Apply All Recommendations
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <Microscope className="h-4 w-4 mr-1" />
          <span>Analysis based on 1,248 data points from your livestock</span>
        </div>
        <div className="flex items-center">
          <Pill className="h-4 w-4 mr-1" />
          <span>Last updated: {new Date(data.lastUpdated).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
