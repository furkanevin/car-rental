export default function OrdersLoading() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded w-48" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-96" />
        </div>

        {/* Orders List Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="p-4 sm:p-6">
                {/* Order Header Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-64" />
                    <div className="h-3 bg-gray-200 rounded w-32" />
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-24" />
                </div>

                {/* Order Content Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Car Image & Info Skeleton */}
                  <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 w-full sm:w-40 h-32 bg-gray-200 rounded-lg" />
                    <div className="flex-grow space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                        <div className="h-4 bg-gray-200 rounded w-32" />
                      </div>
                    </div>
                  </div>

                  {/* Rental Details Skeleton */}
                  <div className="lg:col-span-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                        <div className="h-3 bg-gray-200 rounded w-20" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                        <div className="h-3 bg-gray-200 rounded w-20" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions Skeleton */}
                  <div className="lg:col-span-2 flex flex-col justify-between">
                    <div className="text-right mb-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-8 bg-gray-200 rounded w-full" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
