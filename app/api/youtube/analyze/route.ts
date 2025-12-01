/**
 * YouTube Video Analysis API Route
 * POST /api/youtube/analyze
 * Body: { urls: string[] }
 */

import { NextRequest, NextResponse } from "next/server";
import type { AnalysisResponse, AnalysisRequest } from "@/lib/types";
import { extractVideoId } from "@/lib/youtube/extractVideoId";
import {
  fetchVideoMetadata,
  fetchCommentThreads,
} from "@/lib/youtube/client";
import { analyzeEngagement } from "@/lib/youtube/analyzer";
import { ANALYSIS_LIMITS, ERROR_MESSAGES } from "@/lib/youtube/constants";

export async function POST(request: NextRequest): Promise<NextResponse<AnalysisResponse>> {
  try {
    const body = (await request.json()) as AnalysisRequest;

    // Validate request body
    if (!body.urls || !Array.isArray(body.urls)) {
      return NextResponse.json(
        { success: false, error: ERROR_MESSAGES.INVALID_URL },
        { status: 400 }
      );
    }

    const { urls } = body;

    // Validate number of URLs
    if (urls.length < ANALYSIS_LIMITS.MIN_VIDEOS) {
      return NextResponse.json(
        { success: false, error: ERROR_MESSAGES.TOO_FEW_URLS },
        { status: 400 }
      );
    }

    if (urls.length > ANALYSIS_LIMITS.MAX_VIDEOS) {
      return NextResponse.json(
        { success: false, error: ERROR_MESSAGES.TOO_MANY_URLS },
        { status: 400 }
      );
    }

    // Extract video IDs
    const videoIdResults = urls.map((url) => ({
      url,
      result: extractVideoId(url),
    }));

    // Check for extraction failures
    const failedExtractions = videoIdResults.filter(
      (item) => !item.result.success
    );

    if (failedExtractions.length === urls.length) {
      // All URLs failed to extract video ID
      return NextResponse.json(
        {
          success: false,
          error: ERROR_MESSAGES.INVALID_URL,
        },
        { status: 400 }
      );
    }

    // Analyze videos in parallel
    const analyses = await Promise.allSettled(
      videoIdResults.map(async (item) => {
        if (!item.result.success) {
          return {
            error: item.result.error || ERROR_MESSAGES.INVALID_URL,
          };
        }

        const videoId = item.result.videoId!;

        try {
          // Fetch video metadata
          const metadata = await fetchVideoMetadata(videoId);

          // Fetch comment threads
          const threads = await fetchCommentThreads(
            videoId,
            ANALYSIS_LIMITS.MAX_COMMENTS_PER_VIDEO
          );

          // Analyze engagement
          const analysis = analyzeEngagement(
            videoId,
            metadata.snippet.title,
            metadata.snippet.channelId,
            {
              views: parseInt(metadata.statistics.viewCount || "0"),
              likes: parseInt(metadata.statistics.likeCount || "0"),
              comments: parseInt(metadata.statistics.commentCount || "0"),
            },
            threads
          );

          // Add thumbnail URL
          return {
            ...analysis,
            thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

          // Handle specific error cases
          if (errorMessage.includes("not found") || errorMessage.includes("private")) {
            return {
              videoId,
              title: "Unknown",
              channelId: "",
              stats: { views: 0, likes: 0, comments: 0 },
              engagement: {
                totalThreadsAnalyzed: 0,
                threadsWithCreatorReply: 0,
                replyRate: 0,
                ghostScore: 0,
              },
              tier: {
                label: "Unknown",
                emoji: "❓",
                message: "",
                color: "#999999",
                range: { min: 0, max: 100 },
              },
              error: ERROR_MESSAGES.VIDEO_NOT_FOUND,
            };
          }

          if (errorMessage.includes("QUOTA")) {
            return {
              videoId,
              title: "Unknown",
              channelId: "",
              stats: { views: 0, likes: 0, comments: 0 },
              engagement: {
                totalThreadsAnalyzed: 0,
                threadsWithCreatorReply: 0,
                replyRate: 0,
                ghostScore: 0,
              },
              tier: {
                label: "Unknown",
                emoji: "⏱️",
                message: "",
                color: "#999999",
                range: { min: 0, max: 100 },
              },
              error: ERROR_MESSAGES.API_QUOTA_EXCEEDED,
            };
          }

          console.error(`Analysis failed for ${videoId}:`, error);
          return {
            videoId,
            title: "Unknown",
            channelId: "",
            stats: { views: 0, likes: 0, comments: 0 },
            engagement: {
              totalThreadsAnalyzed: 0,
              threadsWithCreatorReply: 0,
              replyRate: 0,
              ghostScore: 0,
            },
            tier: {
              label: "Unknown",
              emoji: "❓",
              message: "",
              color: "#999999",
              range: { min: 0, max: 100 },
            },
            error: ERROR_MESSAGES.API_ERROR,
          };
        }
      })
    );

    // Extract results from Promise.allSettled
    const results = analyses.map((settlement) => {
      if (settlement.status === "fulfilled") {
        return settlement.value;
      }
      return {
        error: ERROR_MESSAGES.API_ERROR,
      };
    });

    // Check if any analyses had errors
    const hasErrors = results.some((r) => "error" in r && r.error);

    return NextResponse.json({
      success: !hasErrors || results.some((r) => !("error" in r) || !r.error),
      results: results,
      partialFailure: hasErrors && results.some((r) => !("error" in r) || !r.error),
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}
