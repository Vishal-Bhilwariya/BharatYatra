import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">
            BharatYatra
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Explore India state by state — culture, cities, food,
            transport and language, all in one platform.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orange-400">
                Explore States
              </Link>
            </li>
            <li>
              <Link to="/translator" className="hover:text-orange-400">
                Translator
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* FEATURES */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Features
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-400">
                State & City Guide
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orange-400">
                Tourist Places
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orange-400">
                Food & Transport Info
              </Link>
            </li>
            <li>
              <Link to="/translator" className="hover:text-orange-400">
                Language Translator
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL / OWNER */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Legal
          </h3>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BharatYatra
          </p>
          <p className="text-sm text-gray-400 mt-1">
            All rights reserved.
          </p>
          <p className="text-sm text-orange-400 mt-2 font-medium">
            Built & Owned by Vishal
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        Made with ❤️ in India 🇮🇳
      </div>
    </footer>
  );
};

export default Footer;
