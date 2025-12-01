/**
 * Create Post Feature Section
 * Feature 2: Create Post from Reply with comment thread preview
 */

import { SIGNUP_URL } from '@/lib/youtube/constants';

export function CreatePostFeature() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white">
      {/* Left: Visual block (Green) */}
      <div>
        <div className="rounded-3xl p-8 sm:p-12 aspect-video flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-300 to-green-400">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
            <div className="space-y-4">
              {/* Comment thread preview */}
              <div className="border-l-4 border-green-300 pl-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">
                      amy.florela23
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Wow, these dog photos are absolutely stunning! What kind
                      c...
                    </p>
                  </div>
                </div>
              </div>

              {/* Reply preview */}
              <div className="pl-10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">
                      Replying to @amy.florela23
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      For capturing such sharp and vibrant dog phot...
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                className="w-full px-4 text-right text-gray-900 py-2 bg-gray-500 font-semibold rounded-full flex items-center mt-10 "
                href={SIGNUP_URL}
              >
                Start replying now...
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Text content */}
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            From replies to content gold
          </h2>
        </div>

        {/* Feature list */}
        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Create post from reply
            </h3>
            <p className="text-gray-600">
              Instantly give a reply its own spotlight.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              Comment insights
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-50 text-green-700">
                Coming soon!
              </span>
            </h3>
            <p className="text-gray-600">
              Uncover themes and ideas from your replies for fresh inspiration.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button className="px-8 py-3 bg-brand-dark text-white font-semibold rounded-full transition-colors hover:bg-brand-dark/90">
            Start replying now →
          </button>
        </div>
      </div>
    </div>
  );
}
