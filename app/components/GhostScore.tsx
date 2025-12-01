"use client";

/**
 * Ghost Score Component
 * Displays the engagement score with visual representation and tier information
 */

import type { GhostScoreTier } from "@/lib/types";
import { RefreshCw } from 'lucide-react';
import { useRouter } from "next/navigation";

interface GhostScoreProps {
  score: number;
  tier: GhostScoreTier;
  replyRate: number;
  totalThreads: number;
}

export function GhostScore({
  score,
  tier,
  replyRate,
  totalThreads,
}: GhostScoreProps) {
  const router = useRouter();

  const handleAnalyzeMore = () => {
    sessionStorage.removeItem("analysisResults");
    router.push("/tools/engagement-calculator");
  };

  return (
    <div className="flex items-center">
      <div
        className="p-4 rounded-lg flex flex-col items-center space-y-6 max-h-96 w-full relative"
        style={{ backgroundColor: tier.bgColor }}
      >
        <div className="absolute top-2 right-2">
          <div onClick={handleAnalyzeMore} className="bg-white rounded-full px-2 py-2 flex items-center cursor-pointer">
            <RefreshCw className="h-4 w-4 mr-2" />
            Analyze More Videos
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <p className="text-4xl">{tier.emoji}</p>
          <p className="text-5xl font-bold" style={{ color: tier.color }}>
            {score}
          </p>
        </div>
        <div className="text-center ">
          <p className=" text-xl font-semibold h-fit">You are a {tier.label}</p>
          <p>{tier.message}</p>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-base flex p-4 gap-4">
          <div className="text-center px-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">
              {replyRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600 mt-1">Reply Rate</div>
          </div>
          <div className="text-center px-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">
              {totalThreads}
            </div>
            <div className="text-xs text-gray-600 mt-1">Comments analyzed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
