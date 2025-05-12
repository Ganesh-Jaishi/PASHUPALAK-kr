// Mock data for livestock
export type LivestockCategory = "cattle" | "mithun" | "goats" | "pigs" | "poultry"
export type HealthStatus = "healthy" | "warning" | "alert"
export type AlertStatus = "critical" | "pending" | "resolved"
export type Gender = "male" | "female"

export interface LivestockAnimal {
  id: string
  name: string
  category: LivestockCategory
  breed: string
  age: number // in months
  weight: number // in kg
  gender: Gender
  healthStatus: HealthStatus
  deviceId: string
  deviceStatus: "online" | "offline" | "battery_low"
  location: {
    latitude: number
    longitude: number
    lastUpdated: string
  }
  healthMetrics: {
    temperature: number // in Celsius
    heartRate: number // in BPM
    activity: number // in steps per day
    stress: number // 0-100 scale
    lastUpdated: string
  }
  alerts: Array<{
    id: string
    type: string
    message: string
    status: AlertStatus
    timestamp: string
  }>
  productivity: {
    metric: string
    value: number
    unit: string
    history: Array<{
      date: string
      value: number
    }>
  }
}

export interface LivestockSummary {
  category: LivestockCategory
  count: number
  healthStatus: {
    healthy: number
    warning: number
    alert: number
  }
  deviceStatus: {
    online: number
    offline: number
    battery_low: number
  }
}

// Generate mock livestock data
export const generateLivestockData = (): {
  animals: LivestockAnimal[]
  summary: Record<LivestockCategory, LivestockSummary>
} => {
  const categories: LivestockCategory[] = ["cattle", "mithun", "goats", "pigs", "poultry"]
  const healthStatuses: HealthStatus[] = ["healthy", "warning", "alert"]
  const deviceStatuses = ["online", "offline", "battery_low"]
  const genders: Gender[] = ["male", "female"]

  const animals: LivestockAnimal[] = []
  const summary: Record<LivestockCategory, LivestockSummary> = {
    cattle: createEmptySummary("cattle"),
    mithun: createEmptySummary("mithun"),
    goats: createEmptySummary("goats"),
    pigs: createEmptySummary("pigs"),
    poultry: createEmptySummary("poultry"),
  }

  // Generate cattle
  generateAnimalsForCategory("cattle", 25, animals, summary)

  // Generate mithun
  generateAnimalsForCategory("mithun", 15, animals, summary)

  // Generate goats
  generateAnimalsForCategory("goats", 40, animals, summary)

  // Generate pigs
  generateAnimalsForCategory("pigs", 30, animals, summary)

  // Generate poultry
  generateAnimalsForCategory("poultry", 100, animals, summary)

  return { animals, summary }

  function createEmptySummary(category: LivestockCategory): LivestockSummary {
    return {
      category,
      count: 0,
      healthStatus: {
        healthy: 0,
        warning: 0,
        alert: 0,
      },
      deviceStatus: {
        online: 0,
        offline: 0,
        battery_low: 0,
      },
    }
  }

  function generateAnimalsForCategory(
    category: LivestockCategory,
    count: number,
    animals: LivestockAnimal[],
    summary: Record<LivestockCategory, LivestockSummary>,
  ) {
    const breeds = getCategoryBreeds(category)

    for (let i = 0; i < count; i++) {
      const healthStatus = getRandomItem(healthStatuses)
      const deviceStatus = getRandomItem(deviceStatuses) as "online" | "offline" | "battery_low"
      const gender = getRandomItem(genders)

      const animal: LivestockAnimal = {
        id: `${category}-${i + 1}`,
        name: `${category.charAt(0).toUpperCase() + category.slice(1)} #${i + 1}`,
        category,
        breed: getRandomItem(breeds),
        age: Math.floor(Math.random() * 60) + 1, // 1-60 months
        weight: Math.floor(Math.random() * 300) + 200,
        gender,
        healthStatus,
        deviceId: `DEV-${category.substring(0, 3).toUpperCase()}-${i + 1}`,
        deviceStatus,
        location: {
          latitude: 20 + Math.random() * 10,
          longitude: 70 + Math.random() * 10,
          lastUpdated: new Date().toISOString(),
        },
        healthMetrics: {
          temperature: 38.5 + Math.random() * 1.5,
          heartRate: 70 + Math.random() * 20,
          activity: 60 + Math.random() * 40,
          stress: 20 + Math.random() * 30,
          lastUpdated: new Date().toISOString(),
        },
        alerts: [],
        productivity: {
          metric: getCategoryProductivityMetric(category),
          value: Math.floor(Math.random() * 20) + 5,
          unit: getCategoryProductivityUnit(category),
          history: generateProductivityHistory(),
        },
      }

      animals.push(animal)

      // Update summary
      summary[category].count++
      summary[category].healthStatus[healthStatus]++
      summary[category].deviceStatus[deviceStatus]++
    }
  }

  function getCategoryBreeds(category: LivestockCategory): string[] {
    switch (category) {
      case "cattle":
        return ["Gir", "Sahiwal", "Red Sindhi"]
      case "mithun":
        return ["Arunachalee Mithun", "Nagaland Mithun"]
      case "goats":
        return ["Black Bengal", "Jamunapari"]
      case "pigs":
        return ["Large White Yorkshire", "Landrace"]
      case "poultry":
        return ["Aseel", "Kadaknath"]
      default:
        return ["Unknown"]
    }
  }

  function getCategoryProductivityMetric(category: LivestockCategory): string {
    switch (category) {
      case "cattle":
        return "Milk Production"
      case "mithun":
        return "Meat Production"
      case "goats":
        return "Milk Production"
      case "pigs":
        return "Weight Gain"
      case "poultry":
        return "Egg Production"
      default:
        return "Productivity"
    }
  }

  function getCategoryProductivityUnit(category: LivestockCategory): string {
    switch (category) {
      case "cattle":
        return "liters/day"
      case "mithun":
        return "kg/month"
      case "goats":
        return "liters/day"
      case "pigs":
        return "kg/month"
      case "poultry":
        return "eggs/week"
      default:
        return "units"
    }
  }

  function generateProductivityHistory(): Array<{ date: string; value: number }> {
    const history = []
    const now = new Date()

    for (let i = 0; i < 6; i++) {
      const date = new Date(now)
      date.setMonth(date.getMonth() - (5 - i))

      history.push({
        date: date.toISOString().split("T")[0],
        value: Math.floor(Math.random() * 20) + 5,
      })
    }

    return history
  }

  function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }
}

// Create a singleton instance of the data
let livestockData: ReturnType<typeof generateLivestockData> | null = null

export function getLivestockData() {
  if (!livestockData) {
    livestockData = generateLivestockData()
  }
  return livestockData
}

// Add the missing refreshLivestockData function
export function refreshLivestockData() {
  // Generate new data
  livestockData = generateLivestockData()
  return livestockData
}

// Get animals by category
export function getAnimalsByCategory(category: LivestockCategory) {
  const data = getLivestockData()
  return data.animals.filter((animal) => animal.category === category)
}

// Get a specific animal by ID
export function getAnimalById(id: string) {
  const data = getLivestockData()
  return data.animals.find((animal) => animal.id === id)
}

export const getLivestockByCategory = (categoryId: number) => {
  const data = getLivestockData()
  const categoryMap: Record<number, LivestockCategory> = {
    1: "cattle",
    2: "mithun",
    3: "goats",
    4: "pigs",
    5: "poultry",
  }

  const category = categoryMap[categoryId]

  if (!category) {
    return []
  }

  return data.animals.filter((animal) => animal.category === category)
}

export const getCategoryIdByName = (categoryName: string): number => {
  switch (categoryName) {
    case "cattle":
      return 1
    case "mithun":
      return 2
    case "goats":
      return 3
    case "pigs":
      return 4
    case "poultry":
      return 5
    default:
      return 0
  }
}

// Get category name from URL parameter
export const getCategoryFromParam = (param: string): LivestockCategory => {
  const validCategories: LivestockCategory[] = ["cattle", "mithun", "goats", "pigs", "poultry"]
  return validCategories.includes(param as LivestockCategory) ? (param as LivestockCategory) : "cattle" // Default to cattle if invalid
}
