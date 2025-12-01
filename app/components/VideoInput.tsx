"use client";

/**
 * Video Input Component - Card-based interface
 * Allows users to add up to 3 YouTube videos with real-time thumbnail preview and stats
 */

import { useState, useCallback } from "react";
import type { VideoCard, MetadataResponse } from "@/lib/types";
import { extractVideoId } from "@/lib/youtube/extractVideoId";

interface VideoInputProps {
  onAnalyze: (urls: string[]) => Promise<void>;
  isLoading?: boolean;
}

export function VideoInput({ onAnalyze, isLoading = false }: VideoInputProps) {
  const [cards, setCards] = useState<VideoCard[]>([]);
  const [urlInput, setUrlInput] = useState<string>(
    "https://www.youtube.com/watch?v=md7U9vfi-Ow&t=80s"
  );
  const [inputError, setInputError] = useState<string>("");

  // Fetch metadata for a video URL
  const fetchMetadata = useCallback(
    async (url: string, cardId: string) => {
      try {
        const response = await fetch("/api/youtube/metadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        const data = (await response.json()) as MetadataResponse;

        if (!data.success) {
          setCards((prev) =>
            prev.map((card) =>
              card.id === cardId
                ? { ...card, loading: false, error: data.error }
                : card
            )
          );
          return;
        }

        setCards((prev) =>
          prev.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  loading: false,
                  metadata: data.metadata,
                  videoId: data.metadata?.videoId,
                  error: undefined,
                }
              : card
          )
        );
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to fetch metadata";
        setCards((prev) =>
          prev.map((card) =>
            card.id === cardId
              ? { ...card, loading: false, error: errorMsg }
              : card
          )
        );
      }
    },
    []
  );

  // Add a new video card
  const addCard = async () => {
    const url = urlInput.trim();
    setInputError("");

    if (!url) {
      setInputError("Please enter a YouTube URL");
      return;
    }

    // Check if already at max
    if (cards.length >= 3) {
      setInputError("You can add up to 3 videos");
      return;
    }

    // Validate URL format
    const idResult = extractVideoId(url);
    if (!idResult.success) {
      setInputError(idResult.error || "Invalid YouTube URL");
      return;
    }

    // Create new card
    const cardId = Date.now().toString();
    const newCard: VideoCard = {
      id: cardId,
      url,
      videoId: idResult.videoId,
      loading: true,
    };

    setCards((prev) => [...prev, newCard]);
    setUrlInput("");

    // Fetch metadata
    await fetchMetadata(url, cardId);
  };

  // Remove a card
  const removeCard = (cardId: string) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  // Handle Enter key in input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCard();
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInputError("");

    const validCards = cards.filter((card) => card.videoId && !card.error);

    if (validCards.length === 0) {
      setInputError("Please add at least one valid YouTube video");
      return;
    }

    try {
      await onAnalyze(validCards.map((card) => card.url));
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to analyze videos";
      setInputError(errorMsg);
    }
  };

  const hasValidCards = cards.some((c) => c.videoId && !c.error);
  const canAddMore = cards.length < 3;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Error message */}
      {inputError && (
        <div className="p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-lg">
          <p className="text-[var(--color-error)] text-sm font-semibold">
            {inputError}
          </p>
        </div>
      )}

      {/* Input field with button */}
      <div className="flex gap-3">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value);
            setInputError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="https://youtube.com/watch?v=... or youtu.be/..."
          disabled={isLoading || !canAddMore}
          className="flex-1 px-4 py-3 bg-[var(--color-gray-50)] border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:bg-white focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all disabled:opacity-50 placeholder-[var(--color-gray-400)] text-[var(--color-gray-900)]"
        />
        <button
          type="button"
          onClick={addCard}
          disabled={isLoading || !canAddMore}
          className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-black font-semibold rounded-lg transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
        >
          <span>+</span>
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* Helper text */}
      {canAddMore && (
        <p className="text-xs text-[var(--color-gray-500)]">
          Press Enter or click Add to include a video. You can add up to 3
          videos.
        </p>
      )}

      {/* Video cards grid */}
      {cards.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-[var(--color-gray-900)]">
            Added videos ({cards.length}/3)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div key={card.id}>
                <div className="relative aspect-video bg-[var(--color-gray-900)] rounded-lg overflow-hidden shadow-lg group">
                  {/* Thumbnail */}
                  {card.metadata?.thumbnailUrl && (
                    <img
                      src={card.metadata.thumbnailUrl}
                      alt={card.metadata.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Title */}
                    <div className="flex-1 flex items-start">
                      <h3 className="text-white font-semibold text-sm line-clamp-2">
                        {card.metadata?.title}
                      </h3>
                    </div>

                    {/* Stats */}
                    {card.metadata && (
                      <div className="space-y-1 text-white text-xs">
                        <div className="flex justify-between">
                          <span>Views:</span>
                          <span className="font-semibold">
                            {(card.metadata.stats.views / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Likes:</span>
                          <span className="font-semibold">
                            {(card.metadata.stats.likes / 1000).toFixed(1)}K
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Comments:</span>
                          <span className="font-semibold">
                            {(card.metadata.stats.comments / 1000).toFixed(1)}K
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeCard(card.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>

                  {/* Loading state */}
                  {card.loading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Error state */}
                  {card.error && (
                    <div className="absolute inset-0 bg-red-500/90 flex items-center justify-center">
                      <p className="text-white text-xs text-center px-2">
                        {card.error}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!hasValidCards || isLoading}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-black font-semibold py-3 px-6 rounded-full transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing your videos...
          </span>
        ) : (
          `Analyze engagement${
            hasValidCards
              ? ` (${cards.filter((c) => c.videoId && !c.error).length})`
              : ""
          }`
        )}
      </button>
    </form>
  );
}
