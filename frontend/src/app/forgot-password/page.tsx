"use client";

import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { FormEvent, useState } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { requestPasswordReset } from "@/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    try {
      const result = await requestPasswordReset(email.trim());
      setMessage(result.message);
      if (result.resetToken) setToken(result.resetToken);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kh\u00f4ng th\u1ec3 g\u1eedi y\u00eau c\u1ea7u");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3e9de] p-4 sm:p-8">
      <section className="mx-auto mt-8 max-w-xl rounded-[28px] border border-[#eadfd5] bg-white p-7 shadow-[0_20px_60px_rgba(63,36,23,0.08)] sm:mt-16 sm:p-10">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-[#704329]/70 hover:text-[#704329]"><ArrowLeft size={16} />{"\u0110\u0103ng nh\u1eadp"}</Link>
        <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e9de] text-[#704329]"><KeyRound size={22} /></div>
        <h1 className="mt-5 text-3xl font-semibold text-[#3f2417]">{"Qu\u00ean m\u1eadt kh\u1ea9u?"}</h1>
        <p className="mt-3 text-sm leading-6 text-[#704329]/65">{"Nh\u1eadp email t\u00e0i kho\u1ea3n. Ch\u00fang t\u00f4i s\u1ebd g\u1eedi li\u00ean k\u1ebft \u0111\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u n\u1ebfu email t\u1ed3n t\u1ea1i."}</p>

        {!token && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label htmlFor="reset-email" className="block text-sm font-semibold text-[#3f2417]">Email</label>
            <input id="reset-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-[#dfd0c3] bg-[#fcfaf7] px-4 text-sm outline-none focus:border-[#704329]" />
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            {message && <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-800">{message}</p>}
            <button disabled={submitting} className="h-12 w-full rounded-xl bg-[#704329] text-sm font-semibold text-white disabled:opacity-60">
              {submitting ? "\u0110ang g\u1eedi..." : "G\u1eedi y\u00eau c\u1ea7u"}
            </button>
          </form>
        )}
        {token && <>
          <p role="status" className="mt-5 rounded-xl bg-green-50 p-3 text-sm text-green-800">{message}</p>
          <ResetPasswordForm token={token} />
        </>}
      </section>
    </main>
  );
}
