/**
 * Results Card Component
 * Displays individual video analysis results
 */

import type { VideoAnalysis } from "@/lib/types";
import { formatNumber } from "@/lib/utils/formatters";
import Image from "next/image";

interface ResultsCardProps {
  analysis: VideoAnalysis;
}

export function ResultsCard({ analysis }: ResultsCardProps) {
  if (analysis.error) {
    return (
      <div className="rounded-lg border border-red-200 p-6 shadow-base">
        <div className="text-center">
          <div className="text-4xl mb-3">❌</div>
          <h3 className="text-xl font-bold text-red-700 mb-2">
            Analysis Failed
          </h3>
          <p className="text-red-600">{analysis.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-solid border-gray-50 rounded-lg bg-gray-50 p-4 sm:p-6 lg:p-8 transition-all duration-300 group">
      <div className="flex flex-col item-center">
        {/* Left: Thumbnail */}
        <div className="w-full sm:w-80 h-32 sm:h-45 bg-gray-900 overflow-hidden relative rounded-md mx-auto">
          {analysis.thumbnailUrl ? (
            <Image
              src={analysis.thumbnailUrl}
              alt={analysis.title}
              width={1280}
              height={720}
              priority={false}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎥</div>
                <p className="text-white text-sm">No thumbnail available</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Stats and Ghost Score */}
        <div className="py-3 sm:py-4 flex flex-col justify-between bg-white">
          {/* Video title */}
          <p className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 text-center">
            {analysis.title}
          </p>

          {/* Stats grid */}
          <div className="space-y-4 sm:space-y-6 flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 py-3 sm:py-4">
              {/* Views */}
              <div className="text-center px-2 sm:px-3 bg-gray-50 rounded-lg">
                <div className="text-sm sm:text-xl font-bold text-gray-900">
                  {formatNumber(analysis.stats.views)}
                </div>
                <div className="text-xs text-gray-600 mt-1">Views</div>
              </div>

              {/* Likes */}
              <div className="text-center px-2 sm:px-3 bg-gray-50 rounded-lg">
                <div className="text-sm sm:text-xl font-bold text-gray-900">
                  {formatNumber(analysis.stats.likes)}
                </div>
                <div className="text-xs text-gray-600 mt-1">Likes</div>
              </div>

              {/* Comments */}
              <div className="text-center px-2 sm:px-3 bg-gray-50 rounded-lg">
                <div className="text-sm sm:text-xl font-bold text-gray-900">
                  {formatNumber(analysis.stats.comments)}
                </div>
                <div className="text-xs text-gray-600 mt-1">Comments</div>
              </div>
              {/* Reply rate */}
              <div className="text-center px-2 sm:px-3 bg-gray-50 rounded-lg">
                <p className="text-sm sm:text-xl font-bold text-gray-900">
                  {analysis.engagement.threadsWithCreatorReply}
                </p>
                <div className="text-xs text-gray-600 mt-1">
                  Creator Replies
                </div>
              </div>
            </div>

            {/* Ghost Score Section */}
            <div
              className="flex justify-between gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg items-end"
              style={{ backgroundColor: analysis.tier.bgColor }}
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base sm:text-lg">{analysis.tier.emoji}</span>
                  <span
                    className="text-lg sm:text-2xl font-bold"
                    style={{ color: analysis.tier.color }}
                  >
                    {analysis.engagement.ghostScore}
                  </span>
                </div>
              </div>
              <div
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-4xl text-white text-xs font-semibold h-fit"
                style={{ backgroundColor: analysis.tier.badgeColor }}
              >
                {analysis.tier.label}
              </div>
            </div>
          </div>

          {/* Tier badge */}
        </div>
      </div>
    </div>
  );
}
