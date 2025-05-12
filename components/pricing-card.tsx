import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant?: "default" | "outline"
  highlighted?: boolean
  delay?: number
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  highlighted = false,
  delay = 0,
}: PricingCardProps) {
  return (
    <Card
      className={`overflow-hidden border-2 transition-all duration-300 animate-fade-in ${
        highlighted ? "border-primary shadow-lg scale-105 bg-primary/5" : "border-primary/10 hover:border-primary/30"
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {highlighted && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">Most Popular</div>
      )}
      <CardHeader className="pb-0">
        <div className="text-center">
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="mt-4 mb-2">
            <span className="text-4xl font-bold">{price}</span>
            <span className="text-muted-foreground ml-1">/month</span>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={buttonVariant} className="w-full" asChild>
          <Link href="/signup">{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
