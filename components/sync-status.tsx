"use client"

import { Wifi, WifiOff, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SyncStatusProps {
  status: "online" | "offline" | "syncing"
}

export default function SyncStatus({ status }: SyncStatusProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            {status === "online" && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                <Wifi className="h-3 w-3 mr-1 animate-pulse-slow" />
                <span>Online</span>
              </Badge>
            )}
            {status === "offline" && (
              <Badge variant="destructive" className="animate-pulse-slow">
                <WifiOff className="h-3 w-3 mr-1" />
                <span>Offline</span>
              </Badge>
            )}
            {status === "syncing" && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                <span>Syncing...</span>
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            {status === "online"
              ? "Connected to the cloud. All data is being synchronized in real-time."
              : status === "syncing"
                ? "Synchronizing data with the cloud. Please wait..."
                : "Operating in offline mode. Data will sync when connection is restored."}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
