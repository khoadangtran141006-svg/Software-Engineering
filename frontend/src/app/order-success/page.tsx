"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  Clock3,
  Coffee,
  Home,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
} from "lucide-react";

function formatPrice(price: number) {
  return `${price.toLocaleString("vi-VN")}đ`;
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const orderCode = searchParams.get("order") ?? "BL-000000";

  const paymentMethod =
    searchParams.get("payment") === "wallet"
      ? "Ví điện tử"
      : "QR Code";

  const orderInfo = {
    code: orderCode,
    status: "Đã thanh toán",
    totalItems: 1,
    total: 35000,
  };

  return (
    <main className="min-h-screen bg-[#fcfaf7] text-[#3f2417]">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="border-b border-[#eadfd5] bg-[#f3e9de]">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* SUCCESS ICON */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-[#704329]/10 [animation-duration:2.5s]" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#704329] text-white shadow-[0_15px_35px_rgba(112,67,41,0.22)]">
                <Check size={38} strokeWidth={2.5} />
              </div>
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#b86f38]">
              Order confirmed
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-[#3f2417] sm:text-5xl lg:text-6xl">
              Đặt hàng thành công!
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#704329]/60 sm:text-base">
              Cảm ơn bạn đã đặt hàng tại BrewLite. Đơn hàng của bạn đã được ghi
              nhận và đang được chuẩn bị.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <section className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          {/* =====================================================
              ORDER CARD
          ====================================================== */}
          <div className="overflow-hidden rounded-[28px] border border-[#eadfd5] bg-white shadow-[0_18px_55px_rgba(63,36,23,0.08)]">
            {/* ORDER CODE */}
            <div className="bg-[#3f2417] px-6 py-7 text-white sm:px-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8a15a]">
                    Mã đơn hàng
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                    {orderInfo.code}
                  </h2>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white">
                  <Check size={14} />
                  {orderInfo.status}
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {/* QUANTITY */}
                <div className="rounded-2xl bg-[#fcfaf7] px-4 py-4">
                  <div className="flex items-center gap-2 text-[#704329]/40">
                    <ShoppingBag size={15} />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                      Số lượng
                    </p>
                  </div>

                  <p className="mt-2 text-lg font-bold text-[#3f2417]">
                    {orderInfo.totalItems} món
                  </p>
                </div>

                {/* PAYMENT */}
                <div className="rounded-2xl bg-[#fcfaf7] px-4 py-4">
                  <div className="flex items-center gap-2 text-[#704329]/40">
                    <ReceiptText size={15} />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                      Thanh toán
                    </p>
                  </div>

                  <p className="mt-2 text-lg font-bold text-[#3f2417]">
                    {paymentMethod}
                  </p>
                </div>

                {/* TOTAL */}
                <div className="rounded-2xl bg-[#fcfaf7] px-4 py-4">
                  <div className="flex items-center gap-2 text-[#704329]/40">
                    <Coffee size={15} />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                      Tổng cộng
                    </p>
                  </div>

                  <p className="mt-2 text-lg font-bold text-[#704329]">
                    {formatPrice(orderInfo.total)}
                  </p>
                </div>
              </div>

              {/* =================================================
                  ORDER STATUS
              ================================================== */}
              <div className="my-8 h-px bg-[#eadfd5]" />

              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b86f38]">
                      Order status
                    </p>

                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[#3f2417]">
                      Trạng thái đơn hàng
                    </h3>
                  </div>

                  <span className="text-xs font-medium text-[#704329]/45">
                    Đã nhận đơn
                  </span>
                </div>

                {/* STATUS TIMELINE */}
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  {/* STEP 1 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#f3e9de] bg-[#704329] text-white shadow-[0_8px_20px_rgba(112,67,41,0.15)]">
                      <Check size={16} />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-[#3f2417]">
                      Đã nhận đơn
                    </p>

                    <p className="mt-1 text-[10px] text-[#704329]/40">
                      Thành công
                    </p>
                  </div>

                  {/* STEP 2 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#f3e9de] bg-[#704329] text-white shadow-[0_8px_20px_rgba(112,67,41,0.15)]">
                      <Clock3 size={16} />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-[#3f2417]">
                      Đơn hàng đang được chuẩn bị
                    </p>

                    <p className="mt-1 text-[10px] text-[#704329]/40">
                      Vui lòng chờ trong giây lát
                    </p>
                  </div>

                  {/* STEP 3 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#f3e9de] bg-white text-[#704329]/25">
                      <PackageCheck size={16} />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-[#704329]/45">
                      Sẵn sàng nhận
                    </p>

                    <p className="mt-1 text-[10px] text-[#704329]/35">
                      Đang chờ xử lý
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  NOTICE
              ================================================== */}
              <div className="mt-8 rounded-2xl border border-[#eadfd5] bg-[#f3e9de]/50 p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#704329] text-white">
                    <Coffee size={15} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#3f2417]">
                      Cảm ơn bạn đã chọn BrewLite
                    </p>

                    <p className="mt-1 text-xs leading-6 text-[#704329]/60">
                      Đơn hàng của bạn đang được chuẩn bị. Bạn có thể theo dõi
                      lịch sử đơn hàng để xem lại thông tin chi tiết.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================== */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/orders"
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-[#eadfd5] bg-white px-5 py-4 text-sm font-semibold text-[#3f2417] transition hover:border-[#704329]/30 hover:bg-[#fcfaf7]"
                >
                  <ReceiptText size={17} />

                  <span>Xem lịch sử đơn hàng</span>

                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="/menu"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-[#704329] px-5 py-4 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(112,67,41,0.16)] transition hover:bg-[#5f3824]"
                >
                  <ShoppingBag size={17} />

                  <span>Tiếp tục mua hàng</span>

                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              {/* HOME */}
              <div className="mt-5 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#704329]/50 transition hover:text-[#704329]"
                >
                  <Home size={14} />
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function OrderSuccessLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fcfaf7] text-[#3f2417]">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#704329] text-white">
          <Coffee size={24} />
        </div>

        <p className="mt-5 text-sm font-medium text-[#704329]/60">
          Đang tải thông tin đơn hàng...
        </p>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}