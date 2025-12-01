/**
 * Navigation Bar Component
 * Light navbar matching Buffer's design with logo, navigation, and CTA buttons
 */

export function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-[var(--color-gray-200)] px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold text-[var(--color-gray-900)]">
            ≡ Buffer
          </span>
        </div>

        {/* Navigation Links - Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button className="text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] font-medium transition-colors">
            Features
          </button>
          <button className="text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] font-medium transition-colors">
            Channels
          </button>
          <button className="text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] font-medium transition-colors">
            Resources
          </button>
          <button className="text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] font-medium transition-colors">
            Pricing
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-block text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] font-medium transition-colors">
            Log in
          </button>
          <button className="px-6 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-black font-semibold rounded-full transition-all duration-150 active:scale-95">
            Get started now
          </button>
        </div>
      </div>
    </nav>
  );
}
