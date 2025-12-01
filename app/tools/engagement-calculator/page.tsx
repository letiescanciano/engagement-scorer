'use client';

/**
 * YouTube Engagement Calculator Main Page
 * Located at /tools/engagement-calculator
 */

import { useState } from 'react';
import type { AnalysisResponse } from '@/lib/types';
import { Navbar } from '@/app/components/Navbar';
import { VideoInput } from '@/app/components/VideoInput';
import { LoadingState } from '@/app/components/LoadingState';
import { ErrorMessage } from '@/app/components/ErrorMessage';
import { CTABanner } from '@/app/components/CTABanner';
import { CommunityFeatures } from '@/app/components/CommunityFeatures';
import { RelatedContent } from '@/app/components/RelatedContent';
import { CreatePostFeature } from '@/app/components/CreatePostFeature';
import Image from 'next/image';

type PageState = 'input' | 'loading' | 'error';

export default function EngagementCalculatorPage() {
  const [state, setState] = useState<PageState>('input');
  const [error, setError] = useState<string>('');
  const [urlCount, setUrlCount] = useState(1);

  const handleAnalyze = async (urls: string[]) => {
    setUrlCount(urls.length);
    setState('loading');
    setError('');

    try {
      const response = await fetch('/api/youtube/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      const data = (await response.json()) as AnalysisResponse;

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to analyze videos');
        setState('error');
        return;
      }

      if (data.results) {
        // Store results in sessionStorage for the results page
        sessionStorage.setItem('analysisResults', JSON.stringify(data.results));
        // Redirect to results page
        window.location.href = '/tools/engagement-calculator/results';
      } else {
        setError('No results returned');
        setState('error');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to analyze videos';
      setError(errorMessage);
      setState('error');
    }
  };

  const handleReset = () => {
    setState('input');
    setError('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Header and input form integrated */}
      <div className="bg-gradient-to-b from-[#1f2937] to-[#111827] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <div className="text-center mb-6">
            <p className="text-sm font-semibold tracking-wider text-[var(--color-primary)] uppercase">
              YouTube Engagement Analyzer
            </p>
          </div>

          {/* Main headline */}
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              See how you engage with your audience
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Analyze your YouTube videos and discover your engagement score. Understand how often you reply to comments.
            </p>
          </div>

          {/* Three-step process visualization */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-300 text-[var(--color-brand-dark)] font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold text-white mb-2 text-lg">
                Paste URLs
              </h3>
              <p className="text-sm text-gray-400">
                Enter up to 3 YouTube video URLs
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-300 text-[var(--color-brand-dark)] font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold text-white mb-2 text-lg">Analyze</h3>
              <p className="text-sm text-gray-400">
                We analyze your comment replies
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-300 text-[var(--color-brand-dark)] font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold text-white mb-2 text-lg">
                Get Score
              </h3>
              <p className="text-sm text-gray-400">
                See your engagement metrics
              </p>
            </div>
          </div>

          {state === "input" && (
            <div className="bg-white rounded-2xl p-8 sm:p-10">
              <p className="text-[var(--color-gray-600)] mb-8">
                Paste your YouTube video URLs below to analyze your engagement
              </p>
              <VideoInput onAnalyze={handleAnalyze} isLoading={false} />
            </div>
          )}
        </div>
      </div>

      <main className="w-full">
        {/* Loading State */}
        {state === "loading" && (
          <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <LoadingState count={urlCount} />
            </div>
          </div>
        )}

        {/* Error State */}
        {state === "error" && (
          <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <ErrorMessage
                message="Analysis Failed"
                details={error}
                type="error"
                onDismiss={handleReset}
              />
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-brand-primary text-white font-semibold rounded-full hover:bg-brand-primary/90 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CTA Block (Gray Background) */}
     <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-12  rounded-t-3xl shadow-2xl">
                  <div className="max-w-6xl mx-auto grid grid-cols-2">
                    <CTABanner  />
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

      {/* Community Features Section */}
      <CommunityFeatures />
      <CreatePostFeature />

      {/* Related Content Section */}
      <RelatedContent />
    </div>
  );
}
