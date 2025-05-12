"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = {
  code: string
  name: string
  flag: string
}

type Translations = {
  [key: string]: string
}

type LanguageContextType = {
  currentLanguage: Language
  languages: Language[]
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Available languages
export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা (Bengali)", flag: "🇧🇩" },
  { code: "as", name: "অসমীয়া (Assamese)", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
  { code: "ngl", name: "नागालैंड (Nagaland)", flag: "🇮🇳" },
  { code: "mni", name: "মৈতৈলোন্ (Manipuri)", flag: "🇮🇳" },
  { code: "miz", name: "Mizo ṭawng (Mizo)", flag: "🇮🇳" },
]

// Translations for different languages
const translations: Record<string, Translations> = {
  en: {
    // Dashboard
    dashboard: "Dashboard",
    dashboard_description: "Overview of your livestock health, location, and productivity metrics",
    loading_dashboard: "Loading Dashboard",
    loading_dashboard_description: "Fetching the latest data from your livestock...",
    total_livestock: "Total Livestock",
    health_status: "Health Status",
    recent_alerts: "Recent Alerts",
    iot_devices: "IoT Devices",
    online: "Online",
    offline: "Offline",
    battery_low: "Battery Low",
    healthy: "Healthy",
    warning: "Warning",
    alert: "Alert",
    view_all: "View All",
    view_all_alerts: "View all alerts",
    refresh_data: "Refresh Data",
    refreshing: "Refreshing...",
    data_refreshed: "Data Refreshed",
    data_refreshed_description: "The latest data has been loaded successfully.",
    add_livestock: "Add Livestock",
    add_livestock_description: "Add new livestock to your inventory",
    add_animal: "Add Animal",
    add_new: "Add New",

    // Health Monitoring
    health_monitoring: "Health Monitoring",
    health_monitoring_description: "Real-time health metrics from IoT sensors attached to your livestock",
    health_metrics: "Health Metrics",
    health_metrics_description: "Detailed health metrics for your livestock",
    health_metrics_overview: "Health Metrics Overview",
    health_metrics_overview_description: "Overview of health metrics across all your livestock",
    temperature: "Temperature",
    heart_rate: "Heart Rate",
    activity: "Activity",
    stress: "Stress Level",
    temperature_distribution: "Temperature Distribution",
    temperature_distribution_description: "Distribution of temperature readings across your livestock",
    heart_rate_distribution: "Heart Rate Distribution",
    heart_rate_distribution_description: "Distribution of heart rate readings across your livestock",
    export_health_data: "Export Health Data",
    schedule_checkup: "Schedule Checkup",
    of_total: "of total",
    overview: "Overview",
    health_issues: "Health Issues",
    health_history: "Health History",
    animals_with_health_issues: "Animals with Health Issues",
    animals_with_health_issues_description: "List of animals that require attention due to health issues",
    all_animals_healthy: "All Animals Healthy",
    all_animals_healthy_description: "There are no animals with health issues at the moment",
    health_check_history: "Health Check History",
    health_check_history_description: "History of health checks performed on your livestock",
    routine_health_check: "Routine Health Check",
    animals_checked: "Animals checked",
    completed: "Completed",
    performed_by: "Performed by",
    view_report: "View Report",

    // Location Tracking
    location_tracking: "Location Tracking",
    location_tracking_description: "Real-time location data and geo-fence monitoring for your livestock",
    current_location: "Current Location",
    current_location_description: "Current location of your livestock",
    live_map: "Live Map",
    boundary_alerts: "Boundary Alerts",
    movement_history: "Movement History",
    total_animals_tracked: "Total Animals Tracked",
    with_active_trackers: "With active trackers",
    inside_boundary: "Inside Boundary",
    outside_boundary: "Outside Boundary",
    live_location_map: "Live Location Map",
    live_location_map_description: "Real-time map showing the location of your livestock",
    boundary_alerts_description: "Alerts for animals that have crossed geo-fence boundaries",
    movement_history_description: "Historical movement data for your livestock",
    all_animals_inside_boundary: "All Animals Inside Boundary",
    all_animals_inside_boundary_description: "There are no animals outside the geo-fence boundaries at the moment",
    since: "Since",
    locate: "Locate",
    last_updated: "Last updated",
    track_now: "Track Now",
    view_history: "View History",
    export_location_data: "Export Location Data",
    add_geofence: "Add Geofence",

    // Vet Network
    vet_network: "Vet Network",
    vet_network_description: "Connect with veterinarians and get timely assistance for your livestock",

    // AI Insights
    ai_insights: "AI Insights",
    ai_insights_title: "AI Insights: Predicts disease, optimizes breeding, and boosts livestock productivity",
    ai_insights_description: "Advanced analytics and AI-powered insights to improve your livestock management",

    // Analytics
    analytics: "Analytics",
    analytics_description: "Comprehensive analytics and reports for your livestock farm",
    livestock_distribution: "Livestock Distribution",
    livestock_distribution_description: "Breakdown of your livestock by category and health status",
    productivity_trends: "Productivity Trends",
    productivity_trends_description: "Productivity metrics for different livestock categories over time",

    // System Status
    system_status: "System Status",
    system_status_description: "Synchronization status and system health information",

    // Livestock Categories
    livestock_categories: "LIVESTOCK CATEGORIES",
    all_categories: "All Categories",
    cattle: "Cattle",
    mithun: "Mithun",
    goats: "Goats",
    pigs: "Pigs",
    poultry: "Poultry",
    all_livestock: "All Livestock",

    // Animal Details
    animal_details: "Animal Details",
    animal_id: "Animal ID",
    name: "Name",
    breed: "Breed",
    age: "Age",
    weight: "Weight",
    gender: "Gender",
    male: "Male",
    female: "Female",
    category: "Category",
    device_id: "Device ID",
    added_on: "Added on",
    years: "years",
    months: "months",
    current_status: "Current Status",
    device_status: "Device Status",
    view_health_details: "View Health Details",
    view_location: "View Location",
    recent_activity: "Recent Activity",
    health_trends: "Health Trends",
    productivity_trends: "Productivity Trends",
    no_recent_alerts: "No Recent Alerts",
    veterinary_visits: "Veterinary Visits",
    treatments: "Treatments",
    schedule_vet_visit: "Schedule Vet Visit",
    location_history: "Location History",
    location_history_description: "Historical location data for this animal",
    recent_locations: "Recent Locations",
    export_location_data: "Export Location Data",
    productivity_metrics: "Productivity Metrics",
    productivity_metrics_description: "Productivity metrics and trends for this animal",
    productivity_history: "Productivity History",
    productivity_analysis: "Productivity Analysis",
    productivity_analysis_text: "Analysis of productivity trends and patterns for this animal",
    productivity_analysis_point_1: "Productivity has been steadily increasing over the past month",
    productivity_analysis_point_2: "Current performance is above average for this breed and age",
    productivity_analysis_point_3: "Seasonal variations are within expected ranges",
    recommendations: "Recommendations",
    productivity_recommendation_1: "Maintain current feeding regimen which is showing positive results",
    productivity_recommendation_2: "Consider adjusting protein intake to further improve productivity",
    productivity_recommendation_3: "Schedule regular health checks to sustain productivity levels",
    generate_detailed_report: "Generate Detailed Report",
    alerts_and_notifications: "Alerts and Notifications",
    alerts_description: "Alerts and notifications for this animal",
    alert_details_text: "Detailed information about this alert including time, location, and severity",
    no_alerts: "No Alerts",
    no_alerts_description: "There are no alerts for this animal at the moment",
    configure_alert_settings: "Configure Alert Settings",
    growth_rate: "Growth Rate",
    peak_production: "Peak Production",
    latitude: "Latitude",
    longitude: "Longitude",
    stress_level: "Stress Level",
    animal_not_found: "Animal Not Found",
    animal_not_found_description: "The animal you are looking for could not be found",
    go_back: "Go Back",
    print: "Print",
    download: "Download",
    share: "Share",
    edit: "Edit",
    delete: "Delete",
    printing: "Printing",
    printing_animal_details: "Printing animal details for",
    downloading: "Downloading",
    downloading_animal_details: "Downloading animal details for",
    sharing: "Sharing",
    sharing_animal_details: "Sharing animal details for",
    edit_animal: "Edit Animal",
    editing: "Editing",
    delete_animal: "Delete Animal",
    deleting: "Deleting",
    alert_resolved: "Alert Resolved",
    alert_resolved_description: "The alert has been marked as resolved",
    critical: "Critical",
    pending: "Pending",
    resolved: "Resolved",

    // Livestock Inventory
    livestock_inventory: "Livestock Inventory",
    manage_your: "Manage your",
    search: "Search",
    filter_by_category: "Filter by Category",
    sort_by: "Sort by",
    grid: "Grid",
    list: "List",
    id: "ID",
    actions: "Actions",
    view_details: "View Details",
    no_animals_found: "No Animals Found",
    no_animals_found_description: "No animals match your search criteria",
    clear_filters: "Clear Filters",
    export: "Export",
    export_data: "Export Data",
    export_data_description: "Exporting livestock data to CSV",
    total: "Total",

    // Other
    back: "Back",
    back_to_list: "Back to List",
    language: "Language",
    theme: "Theme",
    toggle_theme: "Toggle Theme",
    administrator: "Administrator",
    log_out: "Log Out",
    open_menu: "Open Menu",
  },
  hi: {
    // Dashboard
    dashboard: "डैशबोर्ड",
    dashboard_description: "आपके पशुधन के स्वास्थ्य, स्थान और उत्पादकता मेट्रिक्स का अवलोकन",
    loading_dashboard: "डैशबोर्ड लोड हो रहा है",
    loading_dashboard_description: "आपके पशुधन से नवीनतम डेटा प्राप्त किया जा रहा है...",
    total_livestock: "कुल पशुधन",
    health_status: "स्वास्थ्य स्थिति",
    recent_alerts: "हाल के अलर्ट",
    iot_devices: "IoT उपकरण",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    battery_low: "बैटरी कम",
    healthy: "स्वस्थ",
    warning: "चेतावनी",
    alert: "अलर्ट",
    view_all: "सभी देखें",
    view_all_alerts: "सभी अलर्ट देखें",
    refresh_data: "डेटा रिफ्रेश करें",
    refreshing: "रिफ्रेश हो रहा है...",
    data_refreshed: "डेटा रिफ्रेश हो गया",
    data_refreshed_description: "नवीनतम डेटा सफलतापूर्वक लोड किया गया है।",
    add_livestock: "पशुधन जोड़ें",
    add_livestock_description: "अपनी इन्वेंटरी में नया पशुधन जोड़ें",
    add_animal: "पशु जोड़ें",
    add_new: "नया जोड़ें",

    // Health Monitoring
    health_monitoring: "स्वास्थ्य निगरानी",
    health_monitoring_description: "आपके पशुधन से जुड़े IoT सेंसर से रीयल-टाइम स्वास्थ्य मेट्रिक्स",

    // Livestock Categories
    livestock_categories: "पशुधन श्रेणियां",
    cattle: "गाय",
    mithun: "मिथुन",
    goats: "बकरियां",
    pigs: "सूअर",
    poultry: "मुर्गी पालन",

    // Other translations would go here...
  },
  bn: {
    // Dashboard
    dashboard: "ড্যাশবোর্ড",
    dashboard_description: "আপনার পশুসম্পদের স্বাস্থ্য, অবস্থান এবং উৎপাদনশীলতা মেট্রিক্সের সংক্ষিপ্ত বিবরণ",
    loading_dashboard: "ড্যাশবোর্ড লোড হচ্ছে",
    loading_dashboard_description: "আপনার পশুসম্পদ থেকে সর্বশেষ তথ্য আনা হচ্ছে...",
    total_livestock: "মোট পশুসম্পদ",
    health_status: "স্বাস্থ্য অবস্থা",
    recent_alerts: "সাম্প্রতিক সতর্কতা",
    iot_devices: "IoT ডিভাইস",
    online: "অনলাইন",
    offline: "অফলাইন",
    battery_low: "ব্যাটারি কম",
    healthy: "সুস্থ",
    warning: "সতর্কতা",
    alert: "সতর্কতা",
    view_all: "সব দেখুন",
    view_all_alerts: "সব সতর্কতা দেখুন",
    refresh_data: "ডাটা রিফ্রেশ করুন",
    refreshing: "রিফ্রেশ হচ্ছে...",
    data_refreshed: "ডাটা রিফ্রেশ হয়েছে",
    data_refreshed_description: "সর্বশেষ ডাটা সফলভাবে লোড করা হয়েছে।",
    add_livestock: "পশুসম্পদ যোগ করুন",
    add_livestock_description: "আপনার ইনভেন্টরিতে নতুন পশুসম্পদ যোগ করুন",
    add_animal: "পশু যোগ করুন",
    add_new: "নতুন যোগ করুন",

    // Health Monitoring
    health_monitoring: "স্বাস্থ্য পর্যবেক্ষণ",
    health_monitoring_description: "আপনার পশুসম্পদের সাথে সংযুক্ত IoT সেন্সর থেকে রিয়েল-টাইম স্বাস্থ্য মেট্রিক্স",

    // Livestock Categories
    livestock_categories: "পশুসম্পদ বিভাগ",
    cattle: "গরু",
    mithun: "মিথুন",
    goats: "ছাগল",
    pigs: "শূকর",
    poultry: "হাঁস-মুরগি",

    // Other translations would go here...
  },
  as: {
    // Dashboard
    dashboard: "ডেশ্ববৰ্ড",
    dashboard_description: "আপোনাৰ পশুধনৰ স্বাস্থ্য, অৱস্থান আৰু উৎপাদনশীলতা মেট্ৰিক্সৰ সাৰাংশ",
    loading_dashboard: "ডেশ্ববৰ্ড লোড হৈ আছে",
    loading_dashboard_description: "আপোনাৰ পশুধনৰ পৰা শেহতীয়া তথ্য আনি থকা হৈছে...",
    total_livestock: "মুঠ পশুধন",
    health_status: "স্বাস্থ্যৰ অৱস্থা",
    recent_alerts: "শেহতীয়া সতৰ্কতা",
    iot_devices: "IoT ডিভাইচ",
    online: "অনলাইন",
    offline: "অফলাইন",
    battery_low: "বেটাৰী কম",
    healthy: "সুস্থ",
    warning: "সতৰ্কতা",
    alert: "সতৰ্কতা",
    view_all: "সকলো চাওক",
    view_all_alerts: "সকলো সতৰ্কতা চাওক",
    refresh_data: "তথ্য ৰিফ্ৰেশ্ব কৰক",
    refreshing: "ৰিফ্ৰেশ্ব হৈ আছে...",
    data_refreshed: "তথ্য ৰিফ্ৰেশ্ব হ'ল",
    data_refreshed_description: "শেহতীয়া তথ্য সফলতাৰে লোড কৰা হ'ল।",
    add_livestock: "পশুধন যোগ কৰক",
    add_livestock_description: "আপোনাৰ ইনভেণ্টৰীত নতুন পশুধন যোগ কৰক",
    add_animal: "পশু যোগ কৰক",
    add_new: "নতুন যোগ কৰক",

    // Health Monitoring
    health_monitoring: "স্বাস্থ্য পৰ্যবেক্ষণ",
    health_monitoring_description: "আপোনাৰ পশুধনৰ লগত সংযুক্ত IoT ছেন্সৰৰ পৰা ৰিয়েল-টাইম স্বাস্থ্য মেট্ৰিক্স",

    // Livestock Categories
    livestock_categories: "পশুধন শ্ৰেণী",
    cattle: "গৰু",
    mithun: "মিথুন",
    goats: "ছাগলী",
    pigs: "গাহৰি",
    poultry: "কুকুৰা-হাঁহ",

    // Other translations would go here...
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguageCode = localStorage.getItem("preferredLanguage")
    if (savedLanguageCode) {
      const language = languages.find((lang) => lang.code === savedLanguageCode)
      if (language) {
        setCurrentLanguage(language)
      }
    }
  }, [])

  const handleSetLanguage = (language: Language) => {
    setCurrentLanguage(language)

    localStorage.setItem("preferredLanguage", language.code)
  }

  const t = (key: string) => {
    return translations[currentLanguage.code]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, languages, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
