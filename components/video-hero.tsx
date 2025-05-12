"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const videoElement = document.getElementById("hero-video") as HTMLVideoElement

    if (videoElement) {
      if (isPlaying) {
        videoElement.play().catch((error) => {
          console.error("Error playing video:", error)
          setIsPlaying(false)
        })
      } else {
        videoElement.pause()
      }

      videoElement.muted = isMuted
    }
  }, [isPlaying, isMuted])

  return (
    <Card className="overflow-hidden border-2 border-primary/20 shadow-xl rounded-xl animate-float">
      <CardContent className="p-0 relative">
        <div className="aspect-video bg-muted relative overflow-hidden rounded-lg">
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="animate-pulse text-primary">Loading video...</div>
            </div>
          )}

          <video
            id="hero-video"
            className="w-full h-full object-cover"
            poster="/placeholder.svg?height=720&width=1280"
            onLoadedData={() => setVideoLoaded(true)}
            loop
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-farmer-walking-through-a-farm-with-cows-33552-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
          Live Demo
        </div>
      </CardContent>
    </Card>
  )
}
