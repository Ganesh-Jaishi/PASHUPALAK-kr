"use client"

import { useParams } from "next/navigation"
import { MilkIcon as Cow, Rabbit, Bird, Rat, Squirrel } from "lucide-react"
import LivestockCategoryPage from "@/components/livestock-category-page"
import { useLanguage } from "@/contexts/language-context"

export default function CategoryPage() {
  const params = useParams()
  const { t } = useLanguage()
  const category = params.category as string

  const getCategoryIcon = () => {
    switch (category) {
      case "cattle":
        return <Cow className="h-6 w-6" />
      case "goats":
        return <Rabbit className="h-6 w-6" />
      case "pigs":
        return <Rat className="h-6 w-6" />
      case "poultry":
        return <Bird className="h-6 w-6" />
      case "mithun":
        return <Squirrel className="h-6 w-6" />
      default:
        return <Cow className="h-6 w-6" />
    }
  }

  const getCategoryTitle = () => {
    return t(category)
  }

  const getCategoryDescription = () => {
    switch (category) {
      case "cattle":
        return t("cattleDescription")
      case "goats":
        return t("goatsDescription")
      case "pigs":
        return t("pigsDescription")
      case "poultry":
        return t("poultryDescription")
      case "mithun":
        return t("mithunDescription")
      default:
        return ""
    }
  }

  return (
    <LivestockCategoryPage
      category={category}
      title={getCategoryTitle()}
      description={getCategoryDescription()}
      icon={getCategoryIcon()}
    />
  )
}
