export default function SuccessLoading() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Success Header Skeleton */}
        <div className="bg-white rounded-xl p-8 mb-6 text-center shadow-sm animate-pulse">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-200 rounded-full w-24 h-24" />
          </div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mx-auto mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
        </div>

        {/* Car Details Skeleton */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 w-full sm:w-64 h-40 bg-gray-200 rounded-lg" />
            <div className="flex-grow space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Rental Details Skeleton */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-16 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-200 rounded" />
            </div>
            <div className="space-y-4">
              <div className="h-16 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Important Information Skeleton */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 animate-pulse">
          <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
          <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
