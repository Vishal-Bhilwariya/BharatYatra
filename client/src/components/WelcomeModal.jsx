import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, UserPlus, LogIn } from 'lucide-react';

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    const userToken = localStorage.getItem('userToken');
    
    if (!hasVisited && !userToken) {
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasVisited', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">🇮🇳</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome to BharatYatra!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your digital companion to explore incredible India
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Explore 28+ States</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Discover hidden gems across India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🍛</span>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Local Cuisines</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Taste authentic regional flavors</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">AI Recommendations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized travel plans</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/signup"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-medium"
          >
            <UserPlus size={20} />
            Create Account
          </Link>
          <Link
            to="/login"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition font-medium"
          >
            <LogIn size={20} />
            Login
          </Link>
          <button
            onClick={handleClose}
            className="w-full text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
