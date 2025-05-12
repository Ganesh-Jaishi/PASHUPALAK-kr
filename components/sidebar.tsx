"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  BarChart3,
  Brain,
  MilkIcon as Cow,
  Egg,
  Home,
  List,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Stethoscope,
  Sun,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import LanguageSelector from "@/components/language-selector"
import { useMobile } from "@/hooks/use-mobile"

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { t } = useLanguage()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Cow className="h-6 w-6 text-primary animate-float" />
          <span className="text-lg font-bold">PashuPalak</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
              isActive("/dashboard") &&
              !isActive("/dashboard/livestock") &&
              !isActive("/dashboard/health") &&
              !isActive("/dashboard/location") &&
              !isActive("/dashboard/vet-network") &&
              !isActive("/dashboard/ai-insights") &&
              !isActive("/dashboard/analytics")
                ? "text-primary bg-secondary/10"
                : "text-muted-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            {t("dashboard")}
          </Link>
          <Link
            href="/dashboard/health"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
              isActive("/dashboard/health") ? "text-primary bg-secondary/10" : "text-muted-foreground"
            }`}
          >
            <Activity className="h-4 w-4" />
            {t("health_monitoring")}
          </Link>
          <Link
            href="/dashboard/location"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
              isActive("/dashboard/location") ? "text-primary bg-secondary/10" : "text-muted-foreground"
            }`}
          >
            <MapPin className="h-4 w-4" />
            {t("location_tracking")}
          </Link>
          <Link
            href="/dashboard/vet-network"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
              isActive("/dashboard/vet-network") ? "text-primary bg-secondary/10" : "text-muted-foreground"
            }`}
          >
            <Stethoscope className="h-4 w-4" />
            {t("vet_network")}
          </Link>
          <Link
            href="/dashboard/ai-insights"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
              isActive("/dashboard/ai-insights") ? "text-primary bg-secondary/10" : "text-muted-foreground"
            }`}
          >
            <Brain className="h-4 w-4" />
            {t("ai_insights")}
          </Link>
          <Link
            href="/dashboard/analytics"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
              isActive("/dashboard/analytics") ? "text-primary bg-secondary/10" : "text-muted-foreground"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            {t("analytics")}
          </Link>

          <Separator className="my-4" />

          <div className="px-3 py-2">
            <h3 className="mb-2 text-xs font-semibold text-muted-foreground">{t("livestock_categories")}</h3>
            <div className="space-y-1">
              <Link
                href="/dashboard/livestock/list"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
                  isActive("/dashboard/livestock/list") ? "text-primary bg-secondary/10" : "text-muted-foreground"
                }`}
              >
                <List className="h-4 w-4" />
                {t("all_livestock")}
              </Link>
              <Link
                href="/dashboard/livestock/cattle"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
                  isActive("/dashboard/livestock/cattle") ? "text-primary bg-secondary/10" : "text-muted-foreground"
                }`}
              >
                <Cow className="h-4 w-4" />
                {t("cattle")}
              </Link>
              <Link
                href="/dashboard/livestock/mithun"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
                  isActive("/dashboard/livestock/mithun") ? "text-primary bg-secondary/10" : "text-muted-foreground"
                }`}
              >
                <Cow className="h-4 w-4 rotate-45" />
                {t("mithun")}
              </Link>
              <Link
                href="/dashboard/livestock/goats"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
                  isActive("/dashboard/livestock/goats") ? "text-primary bg-secondary/10" : "text-muted-foreground"
                }`}
              >
                <Cow className="h-4 w-4" />
                {t("goats")}
              </Link>
              <Link
                href="/dashboard/livestock/pigs"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
                  isActive("/dashboard/livestock/pigs") ? "text-primary bg-secondary/10" : "text-muted-foreground"
                }`}
              >
                <Cow className="h-4 w-4" />
                {t("pigs")}
              </Link>
              <Link
                href="/dashboard/livestock/poultry"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary/20 ${
                  isActive("/dashboard/livestock/poultry") ? "text-primary bg-secondary/10" : "text-muted-foreground"
                }`}
              >
                <Egg className="h-4 w-4" />
                {t("poultry")}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-4 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{t("language")}</span>
          <LanguageSelector />
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{t("theme")}</span>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">{t("toggle_theme")}</span>
          </Button>
        </div>

        <div className="flex items-center gap-4 rounded-lg border p-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{user?.email}</p>
            <p className="text-xs text-muted-foreground">{t("administrator")}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">{t("log_out")}</span>
          </Button>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">{t("open_menu")}</span>
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="hidden border-r bg-background md:block md:w-64">
      <SidebarContent />
    </div>
  )
}
