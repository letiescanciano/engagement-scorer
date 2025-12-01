/**
 * Core TypeScript interfaces for YouTube Engagement Calculator
 */

export interface VideoAnalysis {
  videoId: string;
  title: string;
  channelId: string;
  thumbnailUrl?: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  engagement: {
    totalThreadsAnalyzed: number;
    threadsWithCreatorReply: number;
    replyRate: number;
    ghostScore: number;
  };
  tier: GhostScoreTier;
  error?: string;
}

export interface GhostScoreTier {
  label: string;
  emoji: string;
  message: string;
  color: string;
  bgColor: string;
  badgeColor: string;
  range: {
    min: number;
    max: number;
  };
}

export interface VideoInput {
  url: string;
}

export interface AnalysisRequest {
  urls: string[];
}

export interface AnalysisResponse {
  success: boolean;
  results?: (VideoAnalysis | { error: string })[];
  error?: string;
  partialFailure?: boolean;
}

export interface YouTubeVideoMetadata {
  snippet: {
    channelId: string;
    title: string;
    description: string;
  };
  statistics: {
    viewCount: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export interface YouTubeCommentThread {
  snippet: {
    topLevelComment: {
      snippet: {
        textDisplay: string;
        authorChannelId?: {
          value: string;
        };
      };
    };
    totalReplyCount: number;
  };
  replies?: {
    comments: Array<{
      snippet: {
        textDisplay: string;
        authorChannelId?: {
          value: string;
        };
      };
    }>;
  };
}

export interface YouTubeCommentThreadsResponse {
  items: YouTubeCommentThread[];
  nextPageToken?: string;
}

export interface YouTubeVideoResponse {
  items: YouTubeVideoMetadata[];
}

export interface ExtractVideoIdResult {
  success: boolean;
  videoId?: string;
  error?: string;
}

export interface ApiError {
  error: string;
  status?: number;
  details?: Record<string, unknown>;
}

export interface VideoMetadata {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
}

export interface MetadataResponse {
  success: boolean;
  metadata?: VideoMetadata;
  error?: string;
}

export interface VideoCard {
  id: string;
  url: string;
  videoId?: string;
  metadata?: VideoMetadata;
  loading: boolean;
  error?: string;
}

export interface RelatedContentBlock {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  backgroundColor: string;
}
