"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  UserRound,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/auth";
import { EMAIL_PATTERN, suggestEmailFix } from "@/lib/email";

const PASSWORD_MIN_LENGTH = 8;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  function validateEmail(value: string) {
    const suggestion = suggestEmailFix(value);
    const message = !value.trim()
      ? "Vui l\u00f2ng \u0111i\u1ec1n th\u00f4ng tin"
      : !EMAIL_PATTERN.test(value.trim())
        ? "Email kh\u00f4ng h\u1ee3p l\u1ec7"
        : suggestion
          ? `Email c\u00f3 v\u1ebb b\u1ecb g\u00f5 sai t\u00ean mi\u1ec1n. \u00dd b\u1ea1n l\u00e0 ${suggestion}?`
          : "";
    setEmailError(message);
    return !message;
  }

  function validatePassword(value: string) {
    const message = !value
      ? "Vui l\u00f2ng \u0111i\u1ec1n th\u00f4ng tin"
      : value.length >= PASSWORD_MIN_LENGTH
        ? ""
        : `M\u1eadt kh\u1ea9u ph\u1ea3i c\u00f3 \u00edt nh\u1ea5t ${PASSWORD_MIN_LENGTH} k\u00fd t\u1ef1`;
    setPasswordError(message);
    return !message;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const validName = Boolean(name.trim());
    setNameError(validName ? "" : "Vui l\u00f2ng \u0111i\u1ec1n th\u00f4ng tin");
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const data = new FormData(event.currentTarget);
    const confirmation = String(data.get("confirmPassword") ?? "");
    const passwordsMatch = Boolean(confirmation) && confirmation === password;
    setConfirmPasswordError(!confirmation
      ? "Vui l\u00f2ng \u0111i\u1ec1n th\u00f4ng tin"
      : passwordsMatch ? "" : "M\u1eadt kh\u1ea9u x\u00e1c nh\u1eadn kh\u00f4ng kh\u1edbp");
    setTermsError(acceptedTerms ? "" : "Vui l\u00f2ng x\u00e1c nh\u1eadn \u0111i\u1ec1u kho\u1ea3n");
    if (!validName || !validEmail || !validPassword || !passwordsMatch || !acceptedTerms) return;

    setSubmitting(true);
    try {
      await signUp(name.trim(), email.trim(), password);
      setSuccess("\u0110\u0103ng k\u00fd th\u00e0nh c\u00f4ng! B\u1ea1n c\u00f3 th\u1ec3 \u0111\u0103ng nh\u1eadp b\u1eb1ng t\u00e0i kho\u1ea3n v\u1eeba t\u1ea1o.");
      window.setTimeout(() => router.replace("/login?registered=1"), 1500);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u0110\u0103ng k\u00fd th\u1ea5t b\u1ea1i");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="h-dvh overflow-hidden bg-[#f3e9de]">
      <div className="relative mx-auto flex h-full min-h-0 max-w-none overflow-hidden rounded-none bg-[#fcfaf7] shadow-[0_25px_80px_rgba(63,36,23,0.12)]">
        {/* =====================================================
            LEFT BRAND PANEL
        ====================================================== */}
        <section className="relative hidden overflow-hidden bg-[#3f2417] lg:flex lg:w-[48%] lg:flex-col lg:justify-between">
          {/* Decorative circles */}
          <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full border border-white/[0.08]" />

          <div className="absolute -bottom-48 -right-40 h-[520px] w-[520px] rounded-full border border-white/[0.08]" />

          <div className="absolute right-20 top-24 h-32 w-32 rounded-full bg-[#e8a15a]/10 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#704329]/20 blur-3xl" />

          {/* Brand */}
          <div className="relative z-10 px-10 pt-10 xl:px-14 xl:pt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8a15a] text-[#3f2417] shadow-lg shadow-black/10">
                <UserRound size={20} />
              </div>

              <div>
                <div className="text-lg font-bold tracking-[-0.02em] text-white">
                  BrewLite
                </div>

                <div className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/40">
                  More than just coffee
                </div>
              </div>
            </Link>
          </div>

          {/* Main message */}
          <div className="relative z-10 px-10 xl:px-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e8a15a]">
              Join BrewLite
            </p>

            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.03] tracking-[-0.06em] text-white xl:text-[64px]">
              Mỗi ngày
              <br />
              bắt đầu bằng
              <br />
              một điều
              <br />
              tuyệt vời.
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-white/50">
              Tạo tài khoản BrewLite để lưu thông tin, theo dõi
              đơn hàng và tận hưởng trải nghiệm đặt cà phê nhanh
              chóng hơn.
            </p>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center justify-between px-10 pb-10 text-xs text-white/30 xl:px-14 xl:pb-12">
            <span>© 2026 BrewLite</span>

            <span>Crafted with ☕ for better days.</span>
          </div>
        </section>

        {/* =====================================================
            REGISTER AREA
        ====================================================== */}
        <section className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-5 py-4 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-[480px] py-3">
            {/* Back */}
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#704329]/55 transition hover:text-[#704329]"
            >
              <ArrowLeft size={16} />
              Về trang chủ
            </Link>

            {/* Register Card */}
            <div className="rounded-[28px] border border-[#eadfd5] bg-white p-6 shadow-[0_20px_60px_rgba(63,36,23,0.08)] sm:p-8">
              {/* Heading */}
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e9de] text-[#704329]">
                  <UserRound size={21} />
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b86f38]">
                  Create account
                </p>

                <h2 className="mt-2 text-4xl font-semibold tracking-[-0.055em] text-[#3f2417] sm:text-[42px]">
                  Tạo tài khoản
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#704329]/55">
                  Tạo tài khoản để bắt đầu trải nghiệm BrewLite
                  một cách thuận tiện hơn.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-5 space-y-4"
              >
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#3f2417]"
                  >
                    Họ và tên
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setNameError(event.target.value.trim() ? "" : "Vui l\u00f2ng \u0111i\u1ec1n th\u00f4ng tin");
                    }}
                    aria-invalid={Boolean(nameError)}
                    aria-describedby={nameError ? "name-error" : undefined}
                    required
                    className="h-13 w-full rounded-2xl border border-[#dfd0c3] bg-[#fcfaf7] px-4 text-sm text-[#3f2417] outline-none transition placeholder:text-[#704329]/30 focus:border-[#704329]/50 focus:bg-white focus:ring-4 focus:ring-[#704329]/8"
                  />
                  {nameError && <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-700">{nameError}</p>}
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#3f2417]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      validateEmail(event.target.value);
                    }}
                    onBlur={() => validateEmail(email)}
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? "email-error" : undefined}
                    required
                    className={`h-13 w-full rounded-2xl border ${emailError ? "border-red-500" : "border-[#dfd0c3]"} bg-[#fcfaf7] px-4 text-sm text-[#3f2417] outline-none transition placeholder:text-[#704329]/30 focus:border-[#704329]/50 focus:bg-white focus:ring-4 focus:ring-[#704329]/8`}
                  />
                  {emailError && <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-700">{emailError}</p>}
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#3f2417]"
                  >
                    Mật khẩu
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        validatePassword(event.target.value);
                      }}
                      onBlur={() => validatePassword(password)}
                      aria-invalid={Boolean(passwordError)}
                      aria-describedby={passwordError ? "password-error" : undefined}
                      placeholder="Tối thiểu 8 ký tự"
                      minLength={8}
                      required
                      className={`h-13 w-full rounded-2xl border ${passwordError ? "border-red-500" : "border-[#dfd0c3]"} bg-[#fcfaf7] px-4 pr-12 text-sm text-[#3f2417] outline-none transition placeholder:text-[#704329]/30 focus:border-[#704329]/50 focus:bg-white focus:ring-4 focus:ring-[#704329]/8`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label={
                        showPassword
                          ? "Ẩn mật khẩu"
                          : "Hiện mật khẩu"
                      }
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-[#704329]/40 transition hover:bg-[#f3e9de] hover:text-[#704329]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {passwordError && <p id="password-error" role="alert" className="mt-1.5 text-xs text-red-700">{passwordError}</p>}
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-[#3f2417]"
                  >
                    Xác nhận mật khẩu
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      onChange={(event) => setConfirmPasswordError(
                        !event.target.value ? "" : event.target.value === password ? "" : "M\u1eadt kh\u1ea9u x\u00e1c nh\u1eadn kh\u00f4ng kh\u1edbp",
                      )}
                      onBlur={(event) => setConfirmPasswordError(
                        !event.target.value
                          ? "Vui l\u00f2ng \u0111i\u1ec1n th\u00f4ng tin"
                          : event.target.value === password ? "" : "M\u1eadt kh\u1ea9u x\u00e1c nh\u1eadn kh\u00f4ng kh\u1edbp",
                      )}
                      aria-invalid={Boolean(confirmPasswordError)}
                      aria-describedby={confirmPasswordError ? "confirm-password-error" : undefined}
                      placeholder="Nhập lại mật khẩu"
                      minLength={8}
                      required
                      className="h-13 w-full rounded-2xl border border-[#dfd0c3] bg-[#fcfaf7] px-4 pr-12 text-sm text-[#3f2417] outline-none transition placeholder:text-[#704329]/30 focus:border-[#704329]/50 focus:bg-white focus:ring-4 focus:ring-[#704329]/8"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword,
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Ẩn mật khẩu xác nhận"
                          : "Hiện mật khẩu xác nhận"
                      }
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-[#704329]/40 transition hover:bg-[#f3e9de] hover:text-[#704329]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {confirmPasswordError && <p id="confirm-password-error" role="alert" className="mt-1.5 text-xs text-red-700">{confirmPasswordError}</p>}
                </div>

                {/* TERMS */}
                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => {
                      setAcceptedTerms(event.target.checked);
                      setTermsError(event.target.checked ? "" : "Vui l\u00f2ng x\u00e1c nh\u1eadn \u0111i\u1ec1u kho\u1ea3n");
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#d9c4b2] accent-[#704329]"
                    required
                  />

                  <span className="text-xs leading-5 text-[#704329]/55">
                    Tôi đồng ý với{" "}
                    <span className="font-semibold text-[#704329]">
                      điều khoản sử dụng
                    </span>{" "}
                    và{" "}
                    <span className="font-semibold text-[#704329]">
                      chính sách bảo mật
                    </span>{" "}
                    của BrewLite.
                  </span>
                </label>
                {termsError && <p role="alert" className="text-xs text-red-700">{termsError}</p>}

                {/* SUBMIT */}
                {success && <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-800">{success}</p>}
                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting || Boolean(success)}
                  className="mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#704329] px-5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(112,67,41,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#5b3522] hover:shadow-[0_14px_30px_rgba(112,67,41,0.22)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#cdb9a9] disabled:shadow-none disabled:hover:translate-y-0"
                >
                  <Check size={17} />
                  Tạo tài khoản
                </button>
              </form>

              {/* LOGIN */}
              <div className="mt-7 border-t border-[#eadfd5] pt-6 text-center">
                <p className="text-sm text-[#704329]/45">
                  Đã có tài khoản?
                </p>

                <Link
                  href="/login"
                  className="mt-1.5 inline-flex text-sm font-semibold text-[#704329] transition hover:text-[#b86f38]"
                >
                  Đăng nhập →
                </Link>
              </div>

              {/* Security */}
              <div className="mt-6 rounded-2xl bg-[#f8f1ea] px-4 py-3.5 text-center">
                <p className="text-[11px] leading-5 text-[#704329]/45">
                  Tài khoản của bạn được bảo vệ an toàn cùng
                  BrewLite.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
