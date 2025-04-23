"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThermometerSun, Heart, Activity, Zap, MessageCircle, Phone, Video, Calendar, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for vet alerts
const generateVetAlerts = () => {
  const alertTypes = [
    {
      type: "temperature",
      title: "High Temperature",
      icon: ThermometerSun,
      description: "Temperature above normal range detected.",
      severity: "warning",
    },
    {
      type: "heartRate",
      title: "Irregular Heart Rate",
      icon: Heart,
      description: "Unusual heart rate pattern detected.",
      severity: "critical",
    },
    {
      type: "activity",
      title: "Low Activity",
      icon: Activity,
      description: "Activity level below normal threshold.",
      severity: "warning",
    },
    {
      type: "stress",
      title: "High Stress",
      icon: Zap,
      description: "Elevated stress levels detected.",
      severity: "warning",
    },
  ]

  const vets = [
    {
      id: "v1",
      name: "Dr. Sharma",
      specialty: "Large Animal Specialist",
      avatar: "/placeholder-user.jpg",
      available: true,
    },
    {
      id: "v2",
      name: "Dr. Patel",
      specialty: "Livestock Health",
      avatar: "/placeholder-user.jpg",
      available: true,
    },
    {
      id: "v3",
      name: "Dr. Gupta",
      specialty: "Poultry Specialist",
      avatar: "/placeholder-user.jpg",
      available: false,
    },
  ]

  const animalTypes = ["cattle", "pig", "goat", "poultry", "mithun"]

  const alerts = []

  // Generate random alerts
  for (let i = 0; i < 10; i++) {
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
    const vet = vets[Math.floor(Math.random() * vets.length)]
    const animalType = animalTypes[Math.floor(Math.random() * animalTypes.length)]
    const animalId = `${animalType.charAt(0).toUpperCase()}${1000 + Math.floor(Math.random() * 100)}`

    // Generate a date within the last 7 days
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 7))

    alerts.push({
      id: `alert-${i}`,
      timestamp: date.toISOString(),
      animalId,
      animalType,
      alertType: alertType.type,
      title: alertType.title,
      description: alertType.description,
      severity: alertType.severity,
      icon: alertType.icon,
      assignedVet: Math.random() > 0.3 ? vet : null,
      status: Math.random() > 0.6 ? "resolved" : "pending",
      notes: Math.random() > 0.7 ? "Monitoring required for the next 24 hours." : "",
    })
  }

  // Sort by date (newest first) and severity
  return alerts.sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1
    if (a.status !== "pending" && b.status === "pending") return 1
    if (a.severity === "critical" && b.severity !== "critical") return -1
    if (a.severity !== "critical" && b.severity === "critical") return 1
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
}

interface VetAlertsProps {
  detailed?: boolean
  limit?: number
}

export default function VetAlerts({ detailed = false, limit }: VetAlertsProps) {
  const { toast } = useToast()
  const [alerts, setAlerts] = useState<any[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "resolved">("all")

  useEffect(() => {
    setAlerts(generateVetAlerts())
  }, [])

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "pending") return alert.status === "pending"
    if (filter === "resolved") return alert.status === "resolved"
    return true
  })

  const displayAlerts = limit ? filteredAlerts.slice(0, limit) : filteredAlerts

  const handleAssignVet = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === alertId) {
          return {
            ...alert,
            assignedVet: {
              id: "v1",
              name: "Dr. Sharma",
              specialty: "Large Animal Specialist",
              avatar: "/placeholder-user.jpg",
              available: true,
            },
          }
        }
        return alert
      }),
    )

    toast({
      title: "Vet Assigned",
      description: "Dr. Sharma has been assigned to this alert.",
    })
  }

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === alertId) {
          return {
            ...alert,
            status: "resolved",
          }
        }
        return alert
      }),
    )

    toast({
      title: "Alert Resolved",
      description: "The alert has been marked as resolved.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderAlertCard = (alert: any) => {
    return (
      <Card key={alert.id} className="mb-4 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${alert.severity === "critical" ? "bg-red-100" : "bg-amber-100"}`}>
                  <alert.icon
                    className={`h-5 w-5 ${alert.severity === "critical" ? "text-red-500" : "text-amber-500"}`}
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant={alert.severity === "critical" ? "destructive" : "outline"}>
                      {alert.severity === "critical" ? "Critical" : "Warning"}
                    </Badge>
                    {alert.status === "resolved" && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Resolved
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="capitalize">
                      {alert.animalType}
                    </Badge>
                    <Badge variant="outline">ID: {alert.animalId}</Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(alert.timestamp)}</span>
                  </div>
                </div>
              </div>

              {detailed && (
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {alert.notes && (
              <div className="mt-3 text-sm bg-muted/50 p-2 rounded-md">
                <span className="font-medium">Notes:</span> {alert.notes}
              </div>
            )}

            {detailed && (
              <>
                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {alert.assignedVet ? (
                      <>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={alert.assignedVet.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{alert.assignedVet.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{alert.assignedVet.name}</p>
                          <p className="text-xs text-muted-foreground">{alert.assignedVet.specialty}</p>
                        </div>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleAssignVet(alert.id)}>
                        Assign Vet
                      </Button>
                    )}
                  </div>

                  {alert.status === "pending" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Mark Resolved
                    </Button>
                  ) : (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Resolved
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {detailed && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filter === "resolved" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("resolved")}
            >
              Resolved
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast({
                title: "Alerts Refreshed",
                description: "Latest alerts have been loaded.",
              })
              setAlerts(generateVetAlerts())
            }}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Checkup
          </Button>
        </div>
      )}

      {displayAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">No alerts found</h3>
          <p className="text-sm text-muted-foreground">All animals are healthy and within normal parameters.</p>
        </div>
      ) : (
        displayAlerts.map(renderAlertCard)
      )}

      {!detailed && alerts.length > limit! && (
        <Button variant="outline" className="w-full" size="sm">
          View All Alerts
        </Button>
      )}
    </div>
  )
}
