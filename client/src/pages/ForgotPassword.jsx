import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OtpInput from "../components/auth/OtpInput";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { user, forgotPassword, resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [resendAt, setResendAt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (user) return <Navigate to="/" replace />;

  const onRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
      setResendAt(data.resendAvailableAt);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send reset OTP.");
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
      setResendAt(data.resendAvailableAt);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  const onReset = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email, otp, newPassword);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset password</h1>
        <p className="text-sm text-gray-500 mb-6">Step {step} of 2</p>

        {error && <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}
        {message && <div className="mb-4 rounded-lg bg-emerald-50 text-emerald-700 px-4 py-3 text-sm">{message}</div>}

        {step === 1 && (
          <form onSubmit={onRequestOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send reset OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={onReset} className="space-y-4">
            <OtpInput value={otp} onChange={setOtp} onResend={onResend} resendAt={resendAt} loading={loading} />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              minLength={6}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg disabled:opacity-60"
            >
              {loading ? "Updating password..." : "Reset password"}
            </button>
          </form>
        )}

        <p className="text-sm text-gray-600 mt-6 text-center">
          <Link to="/login" className="text-emerald-700 hover:text-emerald-800">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
