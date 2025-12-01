/**
 * YouTube Engagement Analysis
 * Calculates reply rate and ghost score based on comment data
 */

import type { YouTubeCommentThread, VideoAnalysis, GhostScoreTier } from "@/lib/types";
import { GHOST_SCORE_TIERS } from "@/lib/youtube/constants";

export function analyzeEngagement(
  videoId: string,
  title: string,
  channelId: string,
  stats: {
    views: number;
    likes: number;
    comments: number;
  },
  threads: YouTubeCommentThread[]
): VideoAnalysis {
  // Handle edge case: no comments
  if (threads.length === 0) {
    return {
      videoId,
      title,
      channelId,
      stats,
      engagement: {
        totalThreadsAnalyzed: 0,
        threadsWithCreatorReply: 0,
        replyRate: 0,
        ghostScore: 100,
      },
      tier: GHOST_SCORE_TIERS[4], // Serial Ghoster
      error: "No comments found on this video",
    };
  }

  // Count threads where creator replied
  let threadsWithReply = 0;

  for (const thread of threads) {
    if (hasCreatorReply(thread, channelId)) {
      threadsWithReply++;
    }
  }

  // Calculate metrics
  const replyRate = (threadsWithReply / threads.length) * 100;
  const ghostScore = 100 - replyRate;
  const tier = getTierByScore(ghostScore);

  return {
    videoId,
    title,
    channelId,
    stats,
    engagement: {
      totalThreadsAnalyzed: threads.length,
      threadsWithCreatorReply: threadsWithReply,
      replyRate: Math.round(replyRate * 10) / 10,
      ghostScore: Math.round(ghostScore),
    },
    tier,
  };
}

/**
 * Check if creator replied in a comment thread
 */
function hasCreatorReply(
  thread: YouTubeCommentThread,
  channelId: string
): boolean {
  // Check replies to the top-level comment
  if (thread.replies?.comments && Array.isArray(thread.replies.comments)) {
    return thread.replies.comments.some(
      (reply) => reply.snippet?.authorChannelId?.value === channelId
    );
  }
  return false;
}

/**
 * Get ghost score tier based on reply rate percentage
 */
export function getTierByScore(ghostScore: number): GhostScoreTier {
  // Note: ghostScore is 100 - replyRate
  // So high ghostScore = low reply rate
  const replyRate = 100 - ghostScore;

  if (replyRate >= 80) {
    return GHOST_SCORE_TIERS[0]; // Community Champion
  }
  if (replyRate >= 50) {
    return GHOST_SCORE_TIERS[1]; // Engaged Creator
  }
  if (replyRate >= 25) {
    return GHOST_SCORE_TIERS[2]; // Part-Time Replier
  }
  if (replyRate >= 10) {
    return GHOST_SCORE_TIERS[3]; // Occasional Visitor
  }
  return GHOST_SCORE_TIERS[4]; // Serial Ghoster
}

/**
 * Calculate engagement metrics
 */
export function calculateEngagementMetrics(stats: {
  views: number;
  likes: number;
  comments: number;
}): {
  likeRate: number;
  commentRate: number;
  totalEngagement: number;
} {
  const likeRate =
    stats.views > 0 ? (stats.likes / stats.views) * 100 : 0;
  const commentRate =
    stats.views > 0 ? (stats.comments / stats.views) * 100 : 0;
  const totalEngagement = likeRate + commentRate;

  return {
    likeRate: Math.round(likeRate * 100) / 100,
    commentRate: Math.round(commentRate * 100) / 100,
    totalEngagement: Math.round(totalEngagement * 100) / 100,
  };
}
