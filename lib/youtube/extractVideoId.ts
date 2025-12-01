/**
 * Extract YouTube video ID from various URL formats
 */

import type { ExtractVideoIdResult } from "@/lib/types";

export function extractVideoId(url: string): ExtractVideoIdResult {
  try {
    const urlObj = new URL(url);

    // youtube.com/watch?v=VIDEO_ID
    if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.pathname === "/watch"
    ) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId && isValidVideoId(videoId)) {
        return { success: true, videoId };
      }
    }

    // youtu.be/VIDEO_ID
    if (urlObj.hostname === "youtu.be") {
      const videoId = urlObj.pathname.slice(1).split("?")[0];
      if (videoId && isValidVideoId(videoId)) {
        return { success: true, videoId };
      }
    }

    // youtube.com/embed/VIDEO_ID
    if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.pathname.startsWith("/embed/")
    ) {
      const videoId = urlObj.pathname.split("/")[2];
      if (videoId && isValidVideoId(videoId)) {
        return { success: true, videoId };
      }
    }

    // youtube.com/shorts/VIDEO_ID
    if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.pathname.startsWith("/shorts/")
    ) {
      const videoId = urlObj.pathname.split("/")[2];
      if (videoId && isValidVideoId(videoId)) {
        return { success: true, videoId };
      }
    }

    return {
      success: false,
      error:
        "Could not extract video ID. Please use a valid YouTube URL (youtube.com, youtu.be, or youtube.com/shorts)",
    };
  } catch (error) {
    return {
      success: false,
      error: "Invalid URL format. Please enter a valid YouTube URL.",
    };
  }
}

/**
 * Check if video ID is valid (11 characters, alphanumeric with - and _)
 */
function isValidVideoId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}
