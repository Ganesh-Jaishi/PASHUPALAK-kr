"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { useLanguage } from "@/contexts/language-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { t } = useLanguage()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
