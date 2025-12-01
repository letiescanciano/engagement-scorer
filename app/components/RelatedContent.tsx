/**
 * Related Content Component
 * Displays a grid of related blog posts and resources
 * Designed to be placeholders that can be updated with real URLs later
 */

import type { RelatedContentBlock } from "@/lib/types";
import Image from "next/image";

interface RelatedContentProps {
  blocks?: RelatedContentBlock[];
}

// Default placeholder blocks
const DEFAULT_BLOCKS: RelatedContentBlock[] = [
  {
    id: "1",
    title: "How I Turned One Community Conversation Into Weeks' Worth of Content",
    description:
      "Learn how to maximize the value of your community conversations and turn them into multiple pieces of engaging content.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    url: "https://buffer.com/resources/community-conversation-content/",
    backgroundColor: "from-green-400 to-green-500",
  },
  {
    id: "2",
    title: "Top 11 Social Media Engagement Tools to Build Your Community",
    description:
      "Discover the best tools and strategies to increase engagement with your social media audience and grow your community.",
    imageUrl:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
    url: "https://buffer.com/resources/social-media-engagement-tools/",
    backgroundColor: "from-teal-400 to-teal-500",
  },
  {
    id: "3",
    title: "Replying to Comments Boosts Engagement by 5-42% on These Major Platforms",
    description:
      "Understand why and how replying to comments is crucial for building engagement and strengthening your community.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    url: "https://buffer.com/resources/replying-to-comments-boosts-engagement/",
    backgroundColor: "from-purple-400 to-purple-500",
  },
];

export function RelatedContent({ blocks = DEFAULT_BLOCKS }: RelatedContentProps) {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">
            Level up your skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 max-w-3xl">
            Everything you need to supercharge your posts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you are new to engaging with your audience or a seasoned creator, we have included our most valuable resources to help you win.
          </p>
        </div>

        {/* Content blocks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block) => (
            <a
              key={block.id}
              href={block.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-3xl overflow-hidden shadow-base transition-all duration-300 bg-gray-100"
            >
              {/* Image container */}
              <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${block.backgroundColor}`}>
                <Image
                  src={block.imageUrl}
                  alt={block.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {block.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {block.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-end">
                  <div className="text-2xl text-gray-300 group-hover:text-brand-primary transition-all duration-300 group-hover:translate-x-2">
                    →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
