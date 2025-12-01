/**
 * CTA Banner Component
 * Call-to-action for Buffer Community feature following Buffer's free tools style
 */

import { SIGNUP_URL } from '@/lib/youtube/constants';
import { ArrowRightIcon } from "lucide-react";

interface CTABannerProps {
  ghostScore?: number;
}

export function CTABanner({ ghostScore }: CTABannerProps) {

  const ctaHeading = "Ready to build deeper connections with your audience?";
  let ctaDescription =
    "Buffer Community helps you manage all your conversations in one place, so you can reply faster and grow stronger.";

  if (ghostScore !== undefined) {
    if (ghostScore <= 20) {
      ctaDescription =
        "You're already engaging well! Buffer Community makes it even easier to manage all your conversations in one place.";
    } else if (ghostScore >= 80) {
      ctaDescription =
        "Start replying to more comments. Buffer Community helps you never miss a conversation with your audience.";
    }
  }

  return (
    <div className="max-w-2xl flex flex-col space-y-6 w-full px-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
        {ctaHeading}
      </h2>
      <p className="text-lg text-gray-600 my-8 leading-relaxed">
        {ctaDescription}
      </p>

      <a
        href={SIGNUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit px-6 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]  font-semibold rounded-full flex items-center mt-10 "
      >
        Try Buffer Community free <ArrowRightIcon className="h-4 w-4 ml-4" />
      </a>
    </div>
  );

}
