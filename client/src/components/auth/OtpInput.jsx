import { useEffect, useState } from "react";

export default function OtpInput({ value, onChange, onResend, resendAt, loading }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!resendAt) return 0;
      const diff = Math.ceil((new Date(resendAt).getTime() - Date.now()) / 1000);
      return Math.max(diff, 0);
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [resendAt]);

  return (
    <div className="space-y-3">
      <input
        type="text"
        maxLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder="Enter 6-digit OTP"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        required
      />

      <button
        type="button"
        onClick={onResend}
        disabled={loading || timeLeft > 0}
        className="text-sm text-emerald-700 disabled:text-gray-400"
      >
        {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
      </button>
    </div>
  );
}
