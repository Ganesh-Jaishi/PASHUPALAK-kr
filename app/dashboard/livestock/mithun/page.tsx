"use client"

import LivestockCategoryPage from "@/components/livestock-category-page"
import { MilkIcon as Cow } from "lucide-react"

export default function MithunPage() {
  return (
    <LivestockCategoryPage category="mithun" title="Mithun" icon={<Cow className="h-6 w-6 text-primary rotate-45" />} />
  )
}
