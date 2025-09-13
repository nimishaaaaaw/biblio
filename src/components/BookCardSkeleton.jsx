export default function BookCardSkeleton() {
  return (
    <div className="border rounded-lg p-3 shadow animate-pulse">
      <div className="w-full h-60 bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}

// not used.