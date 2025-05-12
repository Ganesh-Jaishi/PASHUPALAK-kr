import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface TestimonialProps {
  quote: string
  name: string
  role: string
  image: string
  delay?: number
}

export default function Testimonial({ quote, name, role, image, delay = 0 }: TestimonialProps) {
  return (
    <Card
      className="overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardContent className="p-6">
        <div className="mb-4">
          <Quote className="h-8 w-8 text-primary/40" />
        </div>
        <p className="text-lg mb-6">{quote}</p>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={image || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
