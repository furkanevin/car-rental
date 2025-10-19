export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl h-[360px] animate-pulse" />
          <div className="bg-white rounded-xl h-[360px] animate-pulse" />
        </div>
        <div className="bg-white rounded-xl h-[200px] animate-pulse mt-6" />
      </div>
    </div>
  );
}
