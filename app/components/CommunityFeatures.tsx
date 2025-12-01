/**
 * Community Features Section
 * Highlights key Buffer Community features with left text and right visual blocks
 */


export function CommunityFeatures() {
  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 rounded-t-3xl shadow-2xs">
      <div className="max-w-6xl mx-auto">
        {/* Feature 1: Comment Score (Yellow background) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          {/* Left: Text content */}
          <div className="order-2 lg:order-1 space-y-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Stay real, reply faster
              </h2>
              <p className="text-lg text-gray-600">
                Community makes it easy to keep conversations flowing without
                sounding robotic.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Comment score
                </h3>
                <p className="text-gray-600">
                  Track your consistency, speed, and engagement habits.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Saved replies
                </h3>
                <p className="text-gray-600">
                  Reply faster while keeping your tone authentic.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  AI replies
                </h3>
                <p className="text-gray-600">
                  Smart suggestions that learn your style and sound like you.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual block (Yellow) */}
          <div className="order-1 lg:order-2">
            <div className="rounded-3xl p-8 sm:p-12 aspect-video flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-400">
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Comment score
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Rates your ability to stay engaged with your audience.
                </p>

                {/* Mock gauge visualization */}
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className="w-24 h-24 rounded-full border-4 flex items-center justify-center bg-green-50 border-green-300"
                      style={{
                        borderRightColor: "hsl(40 100% 72%)",
                        borderBottomColor: "hsl(40 100% 72%)",
                      }}
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-300">
                          85
                        </div>
                        <div className="text-xs text-gray-500">/100</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-900">
                          Response rate
                        </span>
                        <span className="font-semibold text-green-300">
                          90%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-300"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-900">
                          Response speed
                        </span>
                        <span className="font-semibold text-yellow-400">
                          55%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: "55%" }}
                        />
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-900">
                          Consistency
                        </span>
                        <span className="font-semibold text-green-300">
                          80%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-300"
                          style={{ width: "80%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
