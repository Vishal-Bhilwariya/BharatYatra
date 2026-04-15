const nodemailer = require("nodemailer");

const isSmtpConfigured =
  !!process.env.SMTP_HOST &&
  !!process.env.SMTP_PORT &&
  !!process.env.SMTP_USER &&
  !!process.env.SMTP_PASS;

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : nodemailer.createTransport({ jsonTransport: true });

const getOtpTemplate = ({ otp, purpose, expiryMinutes }) => {
  const title = purpose === "signup" ? "BharatYatra Signup OTP" : "BharatYatra Password Reset OTP";
  const actionText =
    purpose === "signup"
      ? "Use this OTP to verify your email and complete account registration."
      : "Use this OTP to reset your BharatYatra password.";

  return {
    subject: title,
    text: `${actionText}\n\nYour OTP is: ${otp}\nThis OTP expires in ${expiryMinutes} minutes.\n\nIf you did not request this, ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #1f2937;">
        <h2 style="margin-bottom: 8px;">${title}</h2>
        <p style="margin-top: 0;">${actionText}</p>
        <p style="margin-bottom: 8px;">Your One-Time Password (OTP):</p>
        <div style="font-size: 30px; letter-spacing: 8px; font-weight: 700; color: #0f766e; margin: 8px 0 16px;">
          ${otp}
        </div>
        <p style="margin: 0;">This OTP expires in <strong>${expiryMinutes} minutes</strong>.</p>
        <p style="margin-top: 16px; font-size: 13px; color: #4b5563;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  };
};

const sendOtpEmail = async ({ email, otp, purpose, expiryMinutes }) => {
  const template = getOtpTemplate({ otp, purpose, expiryMinutes });

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.SMTP_USER || "no-reply@bharatyatra.app",
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  };

  const result = await transporter.sendMail(mailOptions);

  if (!isSmtpConfigured) {
    console.log(`[DEV EMAIL] OTP for ${email}: ${otp}`);
  }

  return result;
};

module.exports = {
  sendOtpEmail,
};
