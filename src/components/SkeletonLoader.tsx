export default function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="animate-pulse space-y-2">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="animate-pulse space-y-2">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="animate-pulse space-y-2">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
};
