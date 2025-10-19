import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-[#3563E9] sm:text-3xl">
                MORENT
              </h2>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/featured"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  href="/partnership"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Partnership
                </Link>
              </li>
              <li>
                <Link
                  href="/business-relation"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Business Relation
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/events"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/podcast"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  href="/invite"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Invite a friend
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Socials</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-[#3563E9]"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-sm font-semibold text-gray-900">
            ©2022 MORENT. All rights reserved
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <Link
              href="/privacy-policy"
              className="text-sm font-semibold text-gray-900 transition-colors hover:text-[#3563E9]"
            >
              Privacy & Policy
            </Link>
            <Link
              href="/terms-condition"
              className="text-sm font-semibold text-gray-900 transition-colors hover:text-[#3563E9]"
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
