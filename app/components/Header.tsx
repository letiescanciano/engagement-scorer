/**
 * Page Header Component
 * Displays the tool title, description, and branding following Buffer's free tools dark hero style
 */

export function Header() {
  return (
    <header className="w-full bg text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 mt-8 sm:mx-6 lg:mx-8">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold tracking-wider uppercase">
            YouTube Engagement Analyzer
          </p>
        </div>

        {/* Main headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            See how you engage with your audience
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Analyze your YouTube videos and discover your engagement score. Understand how often you reply to comments.
          </p>
        </div>

        {/* Three-step process visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-300 text-white font-bold text-xl mb-4">
              1
            </div>
            <h3 className="font-semibold text-white mb-2 text-lg">Paste URLs</h3>
            <p className="text-sm text-gray-400">
              Enter up to 3 YouTube video URLs
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-300 text-white font-bold text-xl mb-4">
              2
            </div>
            <h3 className="font-semibold text-white mb-2 text-lg">Analyze</h3>
            <p className="text-sm text-gray-400">
              We analyze your comment replies
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-300 text-gray-900 font-bold text-xl mb-4">
              3
            </div>
            <h3 className="font-semibold text-white mb-2 text-lg">Get Score</h3>
            <p className="text-sm text-gray-400">
              See your engagement metrics
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
