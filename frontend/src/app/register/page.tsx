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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="min-h-screen bg-[#f3e9de] p-3 sm:p-5 lg:p-7">
      <div className="relative mx-auto flex min-h-[calc(100vh-24px)] max-w-[1500px] overflow-hidden rounded-[30px] bg-[#fcfaf7] shadow-[0_25px_80px_rgba(63,36,23,0.12)] sm:min-h-[calc(100vh-40px)] lg:min-h-[calc(100vh-56px)]">
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
        <section className="flex flex-1 items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-14 xl:px-20">
          <div className="w-full max-w-[480px]">
            {/* Back */}
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#704329]/55 transition hover:text-[#704329]"
            >
              <ArrowLeft size={16} />
              Về trang chủ
            </Link>

            {/* Register Card */}
            <div className="rounded-[28px] border border-[#eadfd5] bg-white p-7 shadow-[0_20px_60px_rgba(63,36,23,0.08)] sm:p-9 lg:p-10">
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
                className="mt-8 space-y-4"
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
                    required
                    className="h-13 w-full rounded-2xl border border-[#dfd0c3] bg-[#fcfaf7] px-4 text-sm text-[#3f2417] outline-none transition placeholder:text-[#704329]/30 focus:border-[#704329]/50 focus:bg-white focus:ring-4 focus:ring-[#704329]/8"
                  />
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
                    required
                    className="h-13 w-full rounded-2xl border border-[#dfd0c3] bg-[#fcfaf7] px-4 text-sm text-[#3f2417] outline-none transition placeholder:text-[#704329]/30 focus:border-[#704329]/50 focus:bg-white focus:ring-4 focus:ring-[#704329]/8"
                  />
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
                      placeholder="Tối thiểu 8 ký tự"
                      minLength={8}
                      required
                      className="h-13 w-full rounded-2xl border border-[#dfd0c3] bg-[#fcfaf7] px-4 pr-12 text-sm text-[#3f2417] outline-none transition placeholder:text-[#704329]/30 focus:border-[#704329]/50 focus:bg-white focus:ring-4 focus:ring-[#704329]/8"
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
                </div>

                {/* TERMS */}
                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) =>
                      setAcceptedTerms(event.target.checked)
                    }
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

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={!acceptedTerms}
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