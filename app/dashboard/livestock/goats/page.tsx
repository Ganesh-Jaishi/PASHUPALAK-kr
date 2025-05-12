"use client"

import LivestockCategoryPage from "@/components/livestock-category-page"
import { MilkIcon as Cow } from "lucide-react"

export default function GoatsPage() {
  return <LivestockCategoryPage category="goats" title="Goats" icon={<Cow className="h-6 w-6 text-primary" />} />
}
