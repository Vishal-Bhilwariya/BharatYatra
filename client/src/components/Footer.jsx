import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">
            BharatYatra
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Explore India state by state — culture, cities, food,
            transport and language, all in one platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Explore States
              </Link>
            </li>
            <li>
              <Link to="/translator" className="text-gray-300 hover:text-orange-400 transition-colors">
                Translator
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Features
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                State & City Guide
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Tourist Places
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Food & Transport Info
              </Link>
            </li>
            <li>
              <Link to="/translator" className="text-gray-300 hover:text-orange-400 transition-colors">
                Language Translator
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Legal
          </h3>
          <div className="text-sm space-y-2">
            <p className="text-gray-400">
              © {new Date().getFullYear()} BharatYatra
            </p>
            <p className="text-gray-400">
              All rights reserved to Vishal.
            </p>
            <p className="text-orange-400 font-medium">
              Built & Owned by Vishal
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        Made with ❤️ in India 🇮🇳
      </div>
    </footer>
  );
};

export default Footer;
