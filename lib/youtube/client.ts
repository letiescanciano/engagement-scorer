/**
 * YouTube Data API v3 Client
 * Handles all API calls to YouTube
 */

import type {
  YouTubeVideoResponse,
  YouTubeVideoMetadata,
  YouTubeCommentThreadsResponse,
  YouTubeCommentThread,
} from "@/lib/types";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

function getApiKey() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error("YOUTUBE_API_KEY environment variable is not set");
  }
  return key;
}

interface YouTubeError {
  error: {
    code: number;
    message: string;
  };
}

function isYouTubeError(error: unknown): error is YouTubeError {
  return Boolean(
    error &&
      typeof error === "object" &&
      "error" in error &&
      typeof (error as any).error === "object" &&
      "code" in (error as any).error
  );
}

/**
 * Fetch video metadata (title, stats, channel ID)
 */
export async function fetchVideoMetadata(
  videoId: string
): Promise<YouTubeVideoMetadata> {
  const url = new URL(`${BASE_URL}/videos`);
  url.searchParams.append("part", "snippet,statistics");
  url.searchParams.append("id", videoId);
  url.searchParams.append("key", getApiKey());

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `YouTube API error: ${error.error?.message || "Unknown error"}`
    );
  }

  const data = (await response.json()) as YouTubeVideoResponse;

  if (!data.items || data.items.length === 0) {
    throw new Error("Video not found or is private");
  }

  return data.items[0];
}

/**
 * Fetch comment threads with replies
 * Handles pagination to get up to maxComments threads
 */
export async function fetchCommentThreads(
  videoId: string,
  maxComments: number = 200
): Promise<YouTubeCommentThread[]> {
  const threads: YouTubeCommentThread[] = [];
  let pageToken: string | undefined;
  let requestCount = 0;
  const maxRequests = 10; // Prevent infinite loops

  try {
    while (threads.length < maxComments && requestCount < maxRequests) {
      const url = new URL(`${BASE_URL}/commentThreads`);
      url.searchParams.append("part", "snippet,replies");
      url.searchParams.append("videoId", videoId);
      url.searchParams.append("maxResults", "100");
      url.searchParams.append("key", getApiKey());
      url.searchParams.append("textFormat", "plainText");

      if (pageToken) {
        url.searchParams.append("pageToken", pageToken);
      }

      const response = await fetch(url.toString());
      requestCount++;

      if (!response.ok) {
        const error = await response.json();

        // Handle specific error cases
        if (response.status === 403) {
          if (
            error.error?.message?.includes("commentsDisabled") ||
            error.error?.message?.includes("disabled")
          ) {
            // Comments are disabled on this video
            return [];
          }
          // API quota exceeded
          throw new Error("API_QUOTA_EXCEEDED");
        }

        throw new Error(
          `YouTube API error: ${error.error?.message || "Unknown error"}`
        );
      }

      const data = (await response.json()) as YouTubeCommentThreadsResponse;

      if (data.items) {
        threads.push(...data.items);
      }

      // Check if there are more pages
      if (!data.nextPageToken || threads.length >= maxComments) {
        break;
      }

      pageToken = data.nextPageToken;

      // Small delay between requests to be respectful to API
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return threads.slice(0, maxComments);
  } catch (error) {
    if (error instanceof Error && error.message === "API_QUOTA_EXCEEDED") {
      throw error;
    }
    // If we already got some comments, return them
    if (threads.length > 0) {
      return threads.slice(0, maxComments);
    }
    throw error;
  }
}

/**
 * Check if video has comments enabled
 */
export async function hasCommentsEnabled(
  videoId: string
): Promise<{ enabled: boolean; count: number }> {
  try {
    const metadata = await fetchVideoMetadata(videoId);
    const commentCount = parseInt(metadata.statistics.commentCount || "0");
    return { enabled: commentCount > 0 || commentCount === 0, count: commentCount };
  } catch (error) {
    return { enabled: false, count: 0 };
  }
}
