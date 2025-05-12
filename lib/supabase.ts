import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for the browser with persistent storage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: "pashupalak-auth",
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Types for our database tables
export type User = {
  id: string
  full_name: string | null
  phone_text: string | null
  farm_name: string | null
  created_at: string
  updated_at: string
}

export type Livestock = {
  id: number
  user_id: string
  category_id: number
  tag_id: string
  name: string | null
  breed: string | null
  birth_date: string | null
  gender: "male" | "female" | "other" | null
  weight: number | null
  status: "active" | "inactive" | "sold" | "deceased"
  notes: string | null
  created_at: string
  updated_at: string
}

export type LivestockCategory = {
  id: number
  name: string
  description: string | null
  created_at: string
}

export type HealthMetric = {
  id: number
  livestock_id: number
  temperature: number | null
  heart_rate: number | null
  activity_level: number | null
  stress_level: number | null
  recorded_at: string
  is_real_time: boolean
  device_id: string | null
}

export type GeoLocation = {
  id: number
  livestock_id: number
  latitude: number
  longitude: number
  speed: number | null
  direction: number | null
  battery_level: number | null
  recorded_at: string
  is_real_time: boolean
  device_id: string | null
}

export type Alert = {
  id: number
  user_id: string
  livestock_id: number
  alert_type: "health" | "geo_fence" | "system"
  severity: "info" | "warning" | "critical"
  title: string
  description: string | null
  is_read: boolean
  is_resolved: boolean
  resolved_at: string | null
  resolved_by: string | null
  created_at: string
}
