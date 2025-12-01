/**
 * YouTube Video Metadata API Route
 * Fetches quick metadata (title, thumbnail, stats) for video preview
 */

import { NextResponse } from 'next/server';
import type { MetadataResponse } from '@/lib/types';
import { extractVideoId } from '@/lib/youtube/extractVideoId';
import { fetchVideoMetadata } from '@/lib/youtube/client';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Extract video ID from URL
    const idResult = extractVideoId(url);
    if (!idResult.success) {
      return NextResponse.json(
        { success: false, error: idResult.error },
        { status: 400 }
      );
    }

    const videoId = idResult.videoId!;

    // Fetch video metadata from YouTube API
    const metadata = await fetchVideoMetadata(videoId);

    // Build thumbnail URL - YouTube uses standard thumbnail naming
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    const response: MetadataResponse = {
      success: true,
      metadata: {
        videoId,
        title: metadata.snippet.title,
        thumbnailUrl,
        stats: {
          views: parseInt(metadata.statistics.viewCount || '0'),
          likes: parseInt(metadata.statistics.likeCount || '0'),
          comments: parseInt(metadata.statistics.commentCount || '0'),
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch video metadata';

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
