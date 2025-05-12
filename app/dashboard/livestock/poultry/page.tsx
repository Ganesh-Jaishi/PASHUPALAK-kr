"use client"

import LivestockCategoryPage from "@/components/livestock-category-page"
import { Egg } from "lucide-react"

export default function PoultryPage() {
  return <LivestockCategoryPage category="poultry" title="Poultry" icon={<Egg className="h-6 w-6 text-primary" />} />
}
