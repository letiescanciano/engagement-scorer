"use client";

/**
 * YouTube Engagement Calculator Results Page
 * Located at /tools/engagement-calculator/results
 * Displays analysis results with compact ghost score section and CTAs
 */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { VideoAnalysis } from "@/lib/types";
import { Navbar } from "@/app/components/Navbar";
import { GhostScore } from "@/app/components/GhostScore";
import { ResultsCard } from "@/app/components/ResultsCard";
import { CTABanner } from "@/app/components/CTABanner";
import { CommunityFeatures } from "@/app/components/CommunityFeatures";
import { RelatedContent } from "@/app/components/RelatedContent";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { CreatePostFeature } from '@/app/components/CreatePostFeature';

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<VideoAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load results from sessionStorage on mount
  React.useEffect(() => {
    const storedResults = sessionStorage.getItem("analysisResults");
    if (storedResults) {
      try {
        const parsed = JSON.parse(storedResults);
        setResults(parsed);
      } catch (e) {
        console.error("Failed to parse results:", e);
      }
    }
    setIsLoading(false);
  }, []);

  const handleBackToAnalyzer = () => {
    sessionStorage.removeItem("analysisResults");
    router.push("/tools/engagement-calculator");
  };

  const successfulResults = results.filter((r) => !("error" in r));

  const aggregateMetrics =
    successfulResults.length > 0
      ? {
          avgReplyRate:
            successfulResults.reduce(
              (sum, r) => sum + r.engagement.replyRate,
              0
            ) / successfulResults.length,
          avgGhostScore:
            successfulResults.reduce(
              (sum, r) => sum + r.engagement.ghostScore,
              0
            ) / successfulResults.length,
          totalViews: successfulResults.reduce(
            (sum, r) => sum + r.stats.views,
            0
          ),
          totalComments: successfulResults.reduce(
            (sum, r) => sum + r.stats.comments,
            0
          ),
        }
      : null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navbar />

      <main className="w-full">
        {/* Loading or No Results */}
        {isLoading && (
          <div className="bg-white px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-gray-500">Loading results...</div>
            </div>
          </div>
        )}

        {!isLoading && successfulResults.length === 0 && (
          <div className="bg-white px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-500 mb-6">
                No results found. Please analyze some videos.
              </p>
              <button
                onClick={handleBackToAnalyzer}
                className="px-8 py-3 bg-brand-dark text-white font-semibold rounded-full hover:bg-brand-dark/90 transition-all"
              >
                Go Back to Analyzer
              </button>
            </div>
          </div>
        )}

        {!isLoading && successfulResults.length > 0 && (
          <>
            {/* Block 1: Video Analysis + Ghost Score (White Background) */}
            <div className="w-full bg-primary px-4 sm:px-6 lg:px-12 py-16">
              <div className="mx-auto">
                {successfulResults.length === 1 ? (
                  // Single video: Compact side-by-side layout
            <div>
                    <GhostScore
                      score={successfulResults[0].engagement.ghostScore}
                      tier={successfulResults[0].tier}
                      replyRate={successfulResults[0].engagement.replyRate}
                      totalThreads={
                        successfulResults[0].engagement.totalThreadsAnalyzed
                      }
                    />
                    <div className="mx-auto w-100 pt-10">
                      <ResultsCard analysis={successfulResults[0]} />
                    </div>
                  </div>
                ) : (
                  // Multiple videos: Stack layout
                  <div>
                    <GhostScore
                      score={Math.round(aggregateMetrics!.avgGhostScore)}
                      tier={successfulResults[0].tier}
                      replyRate={aggregateMetrics!.avgReplyRate}
                      totalThreads={aggregateMetrics!.totalComments}
                    />

                    <div
                      className={cn("grid mt-10 gap-4", {
                        "grid-cols-3": successfulResults.length === 3,
                        "grid-cols-2": successfulResults.length === 2,
                      })}
                    >
                      {successfulResults.map((result) => (
                        <ResultsCard key={result.videoId} analysis={result} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-12  rounded-t-3xl shadow-2xl">
              <div className="max-w-6xl mx-auto grid grid-cols-2">
                <CTABanner ghostScore={aggregateMetrics?.avgGhostScore || 0} />
                <div className="w-full h-120 bg-gray-900 overflow-hidden relative rounded-md mx-auto">
                  <Image
                    src={
                      "https://s3.us-east-1.amazonaws.com/static.buffer.com/login/public/img/community.png"
                    }
                    alt="community screenshot"
                    width={1280}
                    height={720}
                    priority={true}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>


      <CommunityFeatures />

      <CreatePostFeature />

      <RelatedContent />
    </div>
  );
}
