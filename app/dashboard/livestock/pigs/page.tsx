"use client"

import LivestockCategoryPage from "@/components/livestock-category-page"
import { MilkIcon as Cow } from "lucide-react"

export default function PigsPage() {
  return <LivestockCategoryPage category="pigs" title="Pigs" icon={<Cow className="h-6 w-6 text-primary" />} />
}
