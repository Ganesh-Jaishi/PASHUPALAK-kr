"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, MapPin, Brain, Users } from "lucide-react"
import HealthMetricsChart from "@/components/health-metrics-chart"
import LivestockMap from "@/components/livestock-map"

export default function InteractiveDemo() {
  const [activeDemo, setActiveDemo] = useState("health")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="health" value={activeDemo} onValueChange={setActiveDemo} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Health Monitoring</span>
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>GPS Tracking</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>AI Insights</span>
          </TabsTrigger>
          <TabsTrigger value="vet" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Vet Integration</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 border rounded-lg overflow-hidden">
          <TabsContent value="health" className="m-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Real-time Health Monitoring</h3>
                <p className="text-muted-foreground mb-6">
                  Track vital signs including temperature, heart rate, activity levels, and stress indicators in
                  real-time.
                </p>
                <div className="h-[400px] w-full">
                  <HealthMetricsChart detailed />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="m-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">GPS Tracking & Geo-fencing</h3>
                <p className="text-muted-foreground mb-6">
                  Monitor livestock location in real-time and receive alerts when animals leave designated areas.
                </p>
                <div className="h-[400px] w-full">
                  <LivestockMap detailed />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="m-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">AI-Powered Health Insights</h3>
                <p className="text-muted-foreground mb-6">
                  Receive predictive analytics and early disease detection through advanced AI algorithms.
                </p>
                <div className="h-[400px] w-full flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center p-6">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-slow" />
                    <h4 className="text-lg font-medium mb-2">AI Health Prediction</h4>
                    <p className="text-muted-foreground mb-4">
                      Our AI has analyzed your livestock data and detected potential health issues.
                    </p>
                    <Button>View AI Insights</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vet" className="m-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Veterinarian Integration</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with veterinarians for quick response to health alerts and regular check-ups.
                </p>
                <div className="h-[400px] w-full flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center p-6">
                    <Users className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-slow" />
                    <h4 className="text-lg font-medium mb-2">Vet Network</h4>
                    <p className="text-muted-foreground mb-4">
                      Connect with qualified veterinarians in your area for immediate assistance.
                    </p>
                    <Button>Find Veterinarians</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
