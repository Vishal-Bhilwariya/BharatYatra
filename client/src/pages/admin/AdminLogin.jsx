import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAdmin } from "../../context/AdminContext";
import { User, Lock, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAdmin();
  const navigate = useNavigate();

  const adminName = "Vishal";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/admin/login", { username, password });
      if (res.data.success) {
        login(res.data.data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("Access denied. Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a1f] relative overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.12),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(0,255,255,0.05)_100%)] bg-[length:100%_40px] animate-pulse"></div>

      {/* Neon Frame */}
      <div className="relative z-10 w-full max-w-md rounded-3xl p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_80px_rgba(0,255,255,0.45)]">
        <div className="bg-[#0b1229] rounded-3xl px-8 py-10 text-white backdrop-blur-xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.6)]">
              <ShieldCheck className="text-cyan-400" size={30} />
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-wider">
              Welcome back,{" "}
              <span className="text-cyan-400">{adminName}</span>
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Secure access to BharatYatra Admin Suite
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-400 text-center border border-red-500/30 rounded-lg py-2 bg-red-500/10">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#0f1736] border border-cyan-500/30 rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm tracking-widest placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0f1736] border border-cyan-500/30 rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm tracking-widest placeholder-gray-500"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-cyan-400"
                />
                Remember me
              </label>
              <span className="hover:text-cyan-400 cursor-pointer transition">
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold tracking-widest shadow-[0_0_30px_rgba(0,255,255,0.7)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "AUTHENTICATING..." : "LOG IN"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-8">
            © 2025 BharatYatra Admin • All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
