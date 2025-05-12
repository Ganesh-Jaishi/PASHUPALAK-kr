export default function Loading() {
  return (
    <div className="p-6">
      <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
