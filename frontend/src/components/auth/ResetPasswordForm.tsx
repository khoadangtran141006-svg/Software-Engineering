"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { resetPassword } from "@/services/auth";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("M\u1eadt kh\u1ea9u ph\u1ea3i c\u00f3 \u00edt nh\u1ea5t 8 k\u00fd t\u1ef1");
      return;
    }
    if (password !== confirmation) {
      setError("M\u1eadt kh\u1ea9u x\u00e1c nh\u1eadn kh\u00f4ng kh\u1edbp");
      return;
    }

    setSubmitting(true);
    try {
      const result = await resetPassword(token, password);
      setSuccess(result.message);
      setPassword("");
      setConfirmation("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kh\u00f4ng th\u1ec3 c\u1eadp nh\u1eadt m\u1eadt kh\u1ea9u");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block text-sm font-semibold text-[#3f2417]">
        {"M\u1eadt kh\u1ea9u m\u1edbi"}
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
          className="mt-2 h-12 w-full rounded-xl border border-[#dfd0c3] bg-[#fcfaf7] px-4 font-normal outline-none focus:border-[#704329]"
        />
      </label>
      <label className="block text-sm font-semibold text-[#3f2417]">
        {"X\u00e1c nh\u1eadn m\u1eadt kh\u1ea9u m\u1edbi"}
        <input
          type="password"
          autoComplete="new-password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          minLength={8}
          required
          className="mt-2 h-12 w-full rounded-xl border border-[#dfd0c3] bg-[#fcfaf7] px-4 font-normal outline-none focus:border-[#704329]"
        />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {success && <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-800">{success} <Link className="font-semibold underline" href="/login">{"\u0110\u0103ng nh\u1eadp"}</Link></p>}
      <button disabled={submitting || Boolean(success)} className="h-12 w-full rounded-xl bg-[#704329] text-sm font-semibold text-white disabled:opacity-60">
        {submitting ? "\u0110ang c\u1eadp nh\u1eadt..." : "\u0110\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u"}
      </button>
    </form>
  );
}
