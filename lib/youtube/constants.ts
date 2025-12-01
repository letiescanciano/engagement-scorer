/**
 * Ghost Score Tier Definitions and Constants
 */

import type { GhostScoreTier } from "@/lib/types";

/**
 * Ghost Score Tiers
 * Based on creator reply rate percentage
 * replyRate = (threadsWithCreatorReply / totalThreads) * 100
 * ghostScore = 100 - replyRate
 */
export const GHOST_SCORE_TIERS: GhostScoreTier[] = [
  {
    label: "Community Champion",
    emoji: "🏆",
    message: "You're crushing it! Keep engaging with your audience.",
    color: "hsl(106 60% 66%)", // Green 500
    bgColor: "hsl(103 64% 95%)", // Green 50
    badgeColor: "hsl(106 60% 66%)", // Green 500
    range: {
      min: 80, // 80%+ reply rate
      max: 100,
    },
  },
  {
    label: "Engaged Creator",
    emoji: "💬",
    message: "Solid engagement! There's still room to grow.",
    color: "hsl(175 51% 36%)", // Aqua 800
    bgColor: "hsl(175 63% 88%)", // Aqua 100
    badgeColor: "hsl(175 51% 36%)", // Aqua 800
    range: {
      min: 50, // 50-79% reply rate
      max: 79,
    },
  },
  {
    label: "Part-Time Replier",
    emoji: "👋",
    message: "You're engaging, but leaving opportunity on the table.",
    color: "hsl(40 100% 67%)", // Yellow 500
    bgColor: "hsl(38 100% 95%)", // Yellow 50
    badgeColor: "hsl(40 100% 67%)", // Yellow 500
    range: {
      min: 25, // 25-49% reply rate
      max: 49,
    },
  },
  {
    label: "Occasional Visitor",
    emoji: "👀",
    message: "Your audience wants to hear from you more often.",
    color: "hsl(25 94% 61%)", // Orange 600
    bgColor: "hsl(22 100% 95%)", // Orange 50
    badgeColor: "hsl(25 94% 61%)", // Orange 600
    range: {
      min: 10, // 10-24% reply rate
      max: 24,
    },
  },
  {
    label: "Serial Ghoster",
    emoji: "👻",
    message: "Don't leave your community hanging. Start replying!",
    color: "hsl(7 92% 65%)", // Coral 600
    bgColor: "hsl(11 91% 95%)", // Coral 50
    badgeColor: "hsl(7 92% 65%)", // Coral 600
    range: {
      min: 0, // 0-9% reply rate
      max: 9,
    },
  },
];

/**
 * YouTube API Endpoints
 */
export const YOUTUBE_API = {
  VIDEOS: "https://www.googleapis.com/youtube/v3/videos",
  COMMENT_THREADS: "https://www.googleapis.com/youtube/v3/commentThreads",
} as const;

/**
 * API Error Messages
 */
export const ERROR_MESSAGES = {
  INVALID_URL: "Please enter a valid YouTube URL",
  VIDEO_NOT_FOUND: "Video not found or is private",
  COMMENTS_DISABLED: "Comments are disabled on this video",
  NO_COMMENTS: "No comments found on this video",
  API_QUOTA_EXCEEDED:
    "API quota exceeded. Please try again later or contact support.",
  API_ERROR: "Failed to fetch video data. Please try again.",
  INVALID_API_KEY: "YouTube API key is not configured",
  TOO_MANY_URLS: "Please analyze up to 3 videos at a time",
  TOO_FEW_URLS: "Please provide at least 1 video URL",
} as const;

/**
 * Analysis Limits
 */
export const ANALYSIS_LIMITS = {
  MIN_VIDEOS: 1,
  MAX_VIDEOS: 3,
  MAX_COMMENTS_PER_VIDEO: 200,
  COMMENT_ANALYSIS_TIMEOUT: 30000, // 30 seconds
} as const;

export const SIGNUP_URL =
  "https://login.buffer.com/signup?product=buffer&plan=free&cycle=year&cta=engagement-calculator&redirect=https://publish.buffer.com/comments";
