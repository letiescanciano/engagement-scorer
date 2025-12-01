/**
 * Loading State Component
 * Displays loading animation while analyzing videos
 */

export function LoadingState({ count = 1 }: { count?: number }) {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="space-y-6">
          {/* Loading spinner */}
          <div className="flex justify-center mb-8">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-[var(--color-gray-200)]"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-primary)] animate-spin"
                style={{
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            </div>
          </div>

          {/* Loading message */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
              Analyzing your videos...
            </h2>
            <p className="text-[var(--color-gray-600)]">
              This may take a moment as we fetch your comment data
            </p>
          </div>

          {/* Skeleton loaders for expected results */}
          <div className="space-y-4 mt-12">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 border border-[var(--color-gray-200)] animate-pulse"
              >
                <div className="space-y-4">
                  <div className="h-6 bg-[var(--color-gray-200)] rounded w-3/4"></div>
                  <div className="flex gap-4">
                    <div className="h-12 bg-[var(--color-gray-200)] rounded w-1/4"></div>
                    <div className="h-12 bg-[var(--color-gray-200)] rounded w-1/4"></div>
                    <div className="h-12 bg-[var(--color-gray-200)] rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS for spinner animation */}
        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
