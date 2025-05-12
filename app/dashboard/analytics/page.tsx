"use client"

import { useState } from "react"
import { Calendar, Download, Filter, LineChart, PieChart, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  BarChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Area,
  Bar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AnalyticsPage() {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("month")

  // Sample data for charts
  const productionData = [
    { month: "Jan", milk: 400, meat: 240, eggs: 180 },
    { month: "Feb", milk: 420, meat: 230, eggs: 190 },
    { month: "Mar", milk: 450, meat: 250, eggs: 200 },
    { month: "Apr", milk: 470, meat: 260, eggs: 210 },
    { month: "May", milk: 500, meat: 270, eggs: 220 },
    { month: "Jun", milk: 520, meat: 290, eggs: 230 },
    { month: "Jul", milk: 540, meat: 300, eggs: 240 },
    { month: "Aug", milk: 560, meat: 310, eggs: 250 },
    { month: "Sep", milk: 580, meat: 320, eggs: 260 },
    { month: "Oct", milk: 600, meat: 330, eggs: 270 },
    { month: "Nov", milk: 620, meat: 340, eggs: 280 },
    { month: "Dec", milk: 650, meat: 350, eggs: 290 },
  ]

  const healthData = [
    { month: "Jan", healthy: 85, sick: 10, treatment: 5 },
    { month: "Feb", healthy: 82, sick: 12, treatment: 6 },
    { month: "Mar", healthy: 80, sick: 15, treatment: 5 },
    { month: "Apr", healthy: 78, sick: 17, treatment: 5 },
    { month: "May", healthy: 75, sick: 20, treatment: 5 },
    { month: "Jun", healthy: 80, sick: 15, treatment: 5 },
    { month: "Jul", healthy: 85, sick: 10, treatment: 5 },
    { month: "Aug", healthy: 88, sick: 8, treatment: 4 },
    { month: "Sep", healthy: 90, sick: 7, treatment: 3 },
    { month: "Oct", healthy: 92, sick: 5, treatment: 3 },
    { month: "Nov", healthy: 94, sick: 4, treatment: 2 },
    { month: "Dec", healthy: 95, sick: 3, treatment: 2 },
  ]

  const financialData = [
    { month: "Jan", income: 5000, expenses: 3000, profit: 2000 },
    { month: "Feb", income: 5200, expenses: 3100, profit: 2100 },
    { month: "Mar", income: 5400, expenses: 3200, profit: 2200 },
    { month: "Apr", income: 5600, expenses: 3300, profit: 2300 },
    { month: "May", income: 5800, expenses: 3400, profit: 2400 },
    { month: "Jun", income: 6000, expenses: 3500, profit: 2500 },
    { month: "Jul", income: 6200, expenses: 3600, profit: 2600 },
    { month: "Aug", income: 6400, expenses: 3700, profit: 2700 },
    { month: "Sep", income: 6600, expenses: 3800, profit: 2800 },
    { month: "Oct", income: 6800, expenses: 3900, profit: 2900 },
    { month: "Nov", income: 7000, expenses: 4000, profit: 3000 },
    { month: "Dec", income: 7200, expenses: 4100, profit: 3100 },
  ]

  const livestockDistribution = [
    { name: "Cattle", value: 45 },
    { name: "Goats", value: 25 },
    { name: "Poultry", value: 20 },
    { name: "Pigs", value: 7 },
    { name: "Mithun", value: 3 },
  ]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t("analytics")}</h1>
          <p className="text-muted-foreground">{t("analytics_description")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("select_time_range") || "Select time range"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{t("last_week") || "Last Week"}</SelectItem>
              <SelectItem value="month">{t("last_month") || "Last Month"}</SelectItem>
              <SelectItem value="quarter">{t("last_quarter") || "Last Quarter"}</SelectItem>
              <SelectItem value="year">{t("last_year") || "Last Year"}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("total_livestock")}</CardTitle>
            <CardDescription>{t("all_categories")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% {t("from_last_month") || "from last month"}</p>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productionData.slice(-6)}>
                  <Line type="monotone" dataKey="milk" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("total_production") || "Total Production"}</CardTitle>
            <CardDescription>{t("milk_meat_eggs") || "Milk, meat, eggs"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 45,231</div>
            <p className="text-xs text-muted-foreground">+8% {t("from_last_month") || "from last month"}</p>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialData.slice(-6)}>
                  <Area type="monotone" dataKey="income" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("health_status")}</CardTitle>
            <CardDescription>{t("overall_herd") || "Overall herd"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+2% {t("from_last_month") || "from last month"}</p>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthData.slice(-6)}>
                  <Area type="monotone" dataKey="healthy" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="production">
        <TabsList>
          <TabsTrigger value="production">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t("production") || "Production"}
          </TabsTrigger>
          <TabsTrigger value="health">
            <LineChart className="h-4 w-4 mr-2" />
            {t("health") || "Health"}
          </TabsTrigger>
          <TabsTrigger value="financial">
            <PieChart className="h-4 w-4 mr-2" />
            {t("financial") || "Financial"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="production" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("productivity_trends") || "Production Trends"}</CardTitle>
              <CardDescription>
                {t("productivity_trends_description") || "Monthly production data for milk, meat, and eggs"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    milk: {
                      label: t("milk") || "Milk (liters)",
                      color: "hsl(var(--chart-1))",
                    },
                    meat: {
                      label: t("meat") || "Meat (kg)",
                      color: "hsl(var(--chart-2))",
                    },
                    eggs: {
                      label: t("eggs") || "Eggs (dozens)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="milk"
                        stroke="var(--color-milk)"
                        fill="var(--color-milk)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="meat"
                        stroke="var(--color-meat)"
                        fill="var(--color-meat)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="eggs"
                        stroke="var(--color-eggs)"
                        fill="var(--color-eggs)"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("health_trends") || "Health Trends"}</CardTitle>
              <CardDescription>
                {t("health_trends_description") || "Monthly health status of your livestock"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    healthy: {
                      label: t("healthy") || "Healthy (%)",
                      color: "hsl(var(--chart-1))",
                    },
                    sick: {
                      label: t("sick") || "Sick (%)",
                      color: "hsl(var(--chart-2))",
                    },
                    treatment: {
                      label: t("treatment") || "Under Treatment (%)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={healthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="healthy"
                        stroke="var(--color-healthy)"
                        fill="var(--color-healthy)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="sick"
                        stroke="var(--color-sick)"
                        fill="var(--color-sick)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="treatment"
                        stroke="var(--color-treatment)"
                        fill="var(--color-treatment)"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("financial_trends") || "Financial Trends"}</CardTitle>
              <CardDescription>
                {t("financial_trends_description") || "Monthly financial performance of your livestock business"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    income: {
                      label: t("income") || "Income (₹)",
                      color: "hsl(var(--chart-1))",
                    },
                    expenses: {
                      label: t("expenses") || "Expenses (₹)",
                      color: "hsl(var(--chart-2))",
                    },
                    profit: {
                      label: t("profit") || "Profit (₹)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="income" fill="var(--color-income)" />
                      <Bar dataKey="expenses" fill="var(--color-expenses)" />
                      <Bar dataKey="profit" fill="var(--color-profit)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
