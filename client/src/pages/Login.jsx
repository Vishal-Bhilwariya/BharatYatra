import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login, googleLogin } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      await googleLogin({
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
        avatar: decoded.picture
      });
      navigate('/');
    } catch (err) {
      setError('Google login failed');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* HD Background Image - subtle */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
          alt="India"
          className="w-full h-full object-cover opacity-10 dark:opacity-5"
        />
      </div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-400 to-pink-400 dark:from-orange-900/40 dark:to-pink-900/40 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-400 dark:from-yellow-900/40 dark:to-orange-900/40 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400 to-red-400 dark:from-pink-900/40 dark:to-red-900/40 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-20 h-20 border-4 border-orange-300/30 dark:border-orange-700/30 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 border-4 border-yellow-300/30 dark:border-yellow-700/30 rounded-lg rotate-45 animate-float animation-delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-orange-300/20 to-pink-300/20 dark:from-orange-700/20 dark:to-pink-700/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 dark:from-yellow-700/20 dark:to-orange-700/20 rounded-full animate-ping"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-2xl mb-4 transform hover:scale-110 transition-transform">
              <span className="text-4xl">🇮🇳</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-orange-500" />
              Continue your journey with BharatYatra
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Logging in...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Google Login - Temporarily Disabled */}
            {import.meta.env.VITE_GOOGLE_CLIENT_ID && import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'your_google_client_id_here' && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 font-medium">Or continue with</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google login failed')}
                    useOneTap
                    theme="outline"
                    size="large"
                  />
                </div>
              </>
            )}

            {/* Signup Link */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
                Create Account →
              </Link>
            </p>
          </div>

          {/* Footer Text */}
          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
            By continuing, you agree to BharatYatra's Terms & Privacy Policy
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -15px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 10px) rotate(-5deg); }
        }
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(8deg); }
        }
        @keyframes float-diagonal-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -15px) rotate(-8deg); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, 15px) rotate(-3deg); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        .animate-float-diagonal {
          animation: float-diagonal 9s ease-in-out infinite;
        }
        .animate-float-diagonal-reverse {
          animation: float-diagonal-reverse 8s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}
