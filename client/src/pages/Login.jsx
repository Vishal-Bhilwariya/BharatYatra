import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Mail, Lock, Eye, EyeOff, MapPin, AlertCircle } from 'lucide-react';

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
    
    // Inline validation simulation
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
      setError('Google auth failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-900">
      
      {/* 🖼️ LEFT PANE - High Definition Graphic (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Taj Mahal Gateway"
          className="w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        {/* Branding Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-emerald-400" size={28} />
            <span className="text-2xl font-bold tracking-tight">BharatYatra</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4 drop-shadow-lg text-emerald-50">
            Discover the soul of India.
          </h2>
          <p className="text-emerald-100/80 text-lg max-w-md">
            Join thousands of travelers crafting the perfect journey across 28 states and over 700 destinations.
          </p>
        </div>
      </div>

      {/* 🔐 RIGHT PANE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
        
        {/* Decorative elements for the form side */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full filter blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-md w-full relative z-10">
          
          <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
            <MapPin className="text-emerald-600 dark:text-emerald-400" size={32} />
            <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">BharatYatra</span>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Please enter your details to sign in.</p>
          </div>

          {/* Error Toast */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm border border-red-200 dark:border-red-800/50 animate-shake">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                <Link to="/forgot-password" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transform hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Social Auth Separator */}
          {import.meta.env.VITE_GOOGLE_CLIENT_ID && import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'your_google_client_id_here' && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 font-medium">Alternatively</span>
                </div>
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Authentication Failed.')}
                  useOneTap
                  theme="outline"
                  shape="pill"
                  size="large"
                />
              </div>
            </>
          )}

          {/* Sign Up Redirect */}
          <p className="mt-10 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
