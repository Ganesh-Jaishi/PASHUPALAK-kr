"use client"

import LivestockCategoryPage from "@/components/livestock-category-page"
import { MilkIcon as Cow } from "lucide-react"

export default function CattlePage() {
  return <LivestockCategoryPage category="cattle" title="Cattle" icon={<Cow className="h-6 w-6 text-primary" />} />
}
