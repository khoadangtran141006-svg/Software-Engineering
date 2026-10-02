"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useOrdersStore } from "@/stores/orders-store";

function formatPrice(price: number) {
  return `${price.toLocaleString("vi-VN")}đ`;
}

type PaymentMethod = "qr" | "wallet";

export default function PaymentPage() {
  const router = useRouter();

  const clearCart = useCartStore((state) => state.clearCart);

  const addOrder = useOrdersStore((state) => state.addOrder);

  const cartItems = useCartStore((state) => state.items);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("qr");

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [walletAccount, setWalletAccount] =
    useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.unitPrice * item.quantity,
      0,
    );
  }, [cartItems]);

  const totalQuantity = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [cartItems]);

  const serviceFee = 0;
  const total = subtotal + serviceFee;

  /*
   * MOCK PAYMENT FLOW
   *
   * Hiện tại frontend chỉ mô phỏng quá trình thanh toán.
   * Sau này sẽ thay bằng:
   *
   * POST /orders
   * POST /payments
   *
   * và xử lý trạng thái PAID / PAYMENT_FAILED
   * ở backend.
   */
  function handlePayment() {
  if (cartItems.length === 0 || isProcessing) {
    return;
  }

  setIsProcessing(true);

  window.setTimeout(() => {
    const orderId = `BL-${Math.floor(100000 + Math.random() * 900000)}`;

    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "PAID" as const,
      paymentMethod:
        paymentMethod === "wallet"
          ? ("Ví điện tử" as const)
          : ("QR Code" as const),
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        category: item.category,
        size: item.size,
        toppings: [...item.toppings],
        note: item.note,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
      })),
      totalQuantity,
      total,
    };

    /*
     * 1. Lưu đơn hàng
     */
    addOrder(newOrder);

    /*
     * 2. Xóa toàn bộ giỏ hàng
     */
    clearCart();

    /*
     * 3. Chuyển sang màn hình thành công
     */
    router.push(
      `/order-success?payment=${paymentMethod}&order=${orderId}`,
    );
  }, 1200);
}

  /*
   * EMPTY CART
   */
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#fcfaf7] text-[#3f2417]">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <section className="border-b border-[#eadfd5] bg-[#f3e9de]">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b86f38]">
                Checkout
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-[#3f2417] sm:text-5xl lg:text-6xl">
                Thanh toán
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#704329]/65 sm:text-base">
                Hoàn tất đơn hàng của bạn một cách nhanh
                chóng và thuận tiện.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl rounded-[28px] border border-dashed border-[#d9c4b2] bg-[#f8f1ea] px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#704329] shadow-sm">
              <ShoppingBag size={26} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#3f2417]">
              Chưa có sản phẩm để thanh toán
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#704329]/60">
              Hãy thêm ít nhất một món vào giỏ hàng
              trước khi tiến hành thanh toán.
            </p>

            <Link
              href="/menu"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#704329] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5b3522] hover:shadow-lg hover:shadow-[#704329]/15 active:scale-[0.98]"
            >
              Khám phá menu
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfaf7] text-[#3f2417]">
      {/* =======================================================
          PAGE HEADER
      ======================================================== */}
      <section className="border-b border-[#eadfd5] bg-[#f3e9de]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b86f38]">
              Checkout
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-[#3f2417] sm:text-5xl lg:text-6xl">
              Thanh toán đơn hàng
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#704329]/65 sm:text-base">
              Kiểm tra lại món uống và chọn phương thức
              thanh toán phù hợp với bạn.
            </p>
          </div>
        </div>
      </section>

      {/* =======================================================
          CHECKOUT CONTENT
      ======================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_390px] lg:gap-10">
          {/* ===================================================
              LEFT — ORDER
          ==================================================== */}
          <div>
            {/* BACK TO CART */}
            <Link
              href="/cart"
              className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#704329]/65 transition hover:text-[#704329]"
            >
              <ArrowLeft size={17} />
              Quay lại giỏ hàng
            </Link>

            {/* ORDER HEADER */}
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b86f38]">
                  Your order
                </p>

                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#3f2417]">
                  Đơn hàng của bạn
                </h2>
              </div>

              <span className="rounded-full border border-[#eadfd5] bg-white px-3.5 py-2 text-xs font-medium text-[#704329]/60">
                {totalQuantity} món
              </span>
            </div>

            {/* ORDER ITEMS */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.cartKey}
                  className="overflow-hidden rounded-[24px] border border-[#eadfd5] bg-white shadow-[0_10px_35px_rgba(63,36,23,0.05)]"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex gap-4 sm:gap-5">
                      {/* IMAGE */}
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f1e7dc] sm:h-28 sm:w-28">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* INFO */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#b86f38]">
                              {item.category}
                            </p>

                            <h3 className="mt-1 text-base font-semibold tracking-[-0.02em] text-[#3f2417] sm:text-lg">
                              {item.name}
                            </h3>
                          </div>

                          <span className="shrink-0 rounded-full bg-[#f3e9de] px-3 py-1.5 text-xs font-semibold text-[#704329]">
                            × {item.quantity}
                          </span>
                        </div>

                        {/* SIZE + TOPPINGS */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#f3e9de] px-3 py-1.5 text-xs font-medium text-[#704329]">
                            Size {item.size}
                          </span>

                          {item.toppings.map((topping) => (
                            <span
                              key={topping}
                              className="rounded-full border border-[#eadfd5] bg-[#fcfaf7] px-3 py-1.5 text-xs text-[#704329]/70"
                            >
                              {topping}
                            </span>
                          ))}
                        </div>

                        {/* NOTE */}
                        {item.note && (
                          <div className="mt-3 rounded-xl bg-[#fcfaf7] px-3.5 py-2.5">
                            <p className="text-xs leading-5 text-[#704329]/65">
                              <span className="font-semibold text-[#704329]">
                                Ghi chú:
                              </span>{" "}
                              {item.note}
                            </p>
                          </div>
                        )}

                        {/* PRICE */}
                        <div className="mt-4 flex items-end justify-between gap-4">
                          <span className="text-xs text-[#704329]/45">
                            {formatPrice(item.unitPrice)} ×{" "}
                            {item.quantity}
                          </span>

                          <span className="text-lg font-bold tracking-[-0.03em] text-[#704329]">
                            {formatPrice(
                              item.unitPrice *
                                item.quantity,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ORDER NOTICE */}
            <div className="mt-6 flex gap-3 rounded-2xl border border-[#eadfd5] bg-[#f8f1ea] px-4 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#704329]">
                <ShoppingBag size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#3f2417]">
                  Kiểm tra đơn hàng
                </p>

                <p className="mt-1 text-xs leading-5 text-[#704329]/55">
                  Bạn có thể quay lại giỏ hàng để thay đổi
                  số lượng hoặc tùy chỉnh món trước khi
                  thanh toán.
                </p>
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT — PAYMENT
          ==================================================== */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[28px] border border-[#eadfd5] bg-white shadow-[0_15px_45px_rgba(63,36,23,0.08)]">
              {/* PAYMENT HEADER */}
              <div className="bg-[#3f2417] px-6 py-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8a15a]">
                      Payment
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      Thanh toán
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <CreditCard size={19} />
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* =================================================
                    PAYMENT METHODS
                ================================================== */}
                <div>
                  <p className="text-sm font-semibold text-[#3f2417]">
                    Phương thức thanh toán
                  </p>

                  <div className="mt-4 space-y-3">
                    {/* QR CODE */}
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentMethod("qr")
                      }
                      aria-pressed={paymentMethod === "qr"}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        paymentMethod === "qr"
                          ? "border-[#704329] bg-[#f8f1ea] shadow-sm"
                          : "border-[#eadfd5] bg-white hover:border-[#d9c4b2] hover:bg-[#fcfaf7]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            paymentMethod === "qr"
                              ? "bg-[#704329] text-white"
                              : "bg-[#f3e9de] text-[#704329]"
                          }`}
                        >
                          <QrCode size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-[#3f2417]">
                              QR Code
                            </p>

                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                paymentMethod === "qr"
                                  ? "border-[#704329] bg-[#704329] text-white"
                                  : "border-[#d9c4b2] bg-white"
                              }`}
                            >
                              {paymentMethod === "qr" && (
                                <Check size={12} />
                              )}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-[#704329]/50">
                            Quét mã để thanh toán nhanh chóng
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* E-WALLET */}
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentMethod("wallet")
                      }
                      aria-pressed={
                        paymentMethod === "wallet"
                      }
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        paymentMethod === "wallet"
                          ? "border-[#704329] bg-[#f8f1ea] shadow-sm"
                          : "border-[#eadfd5] bg-white hover:border-[#d9c4b2] hover:bg-[#fcfaf7]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            paymentMethod === "wallet"
                              ? "bg-[#704329] text-white"
                              : "bg-[#f3e9de] text-[#704329]"
                          }`}
                        >
                          <WalletCards size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-[#3f2417]">
                              Ví điện tử
                            </p>

                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                paymentMethod === "wallet"
                                  ? "border-[#704329] bg-[#704329] text-white"
                                  : "border-[#d9c4b2] bg-white"
                              }`}
                            >
                              {paymentMethod ===
                                "wallet" && (
                                <Check size={12} />
                              )}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-[#704329]/50">
                            Thanh toán qua ví điện tử
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* =================================================
                    PAYMENT DETAIL
                ================================================== */}
                <div className="mt-5">
                  {paymentMethod === "qr" ? (
                    <div className="rounded-2xl border border-[#eadfd5] bg-[#fcfaf7] p-5">
                      <div className="flex flex-col items-center text-center">
                        {/* QR MOCK */}
                        <div className="flex h-44 w-44 items-center justify-center rounded-2xl border border-[#eadfd5] bg-white p-4 shadow-sm">
                          <div className="grid h-full w-full grid-cols-7 grid-rows-7 gap-1 opacity-90">
                            {Array.from(
                              { length: 49 },
                              (_, index) => {
                                const shouldFill =
                                  (index * 17 +
                                    index * index) %
                                    7 <
                                  3;

                                return (
                                  <span
                                    key={index}
                                    className={
                                      shouldFill
                                        ? "rounded-[1px] bg-[#3f2417]"
                                        : "rounded-[1px] bg-transparent"
                                    }
                                  />
                                );
                              },
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#704329]">
                          <Smartphone size={14} />
                          Quét mã để thanh toán
                        </div>

                        <p className="mt-2 max-w-xs text-xs leading-5 text-[#704329]/50">
                          Mở ứng dụng ngân hàng hoặc ví điện
                          tử và quét mã QR để tiếp tục.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#eadfd5] bg-[#fcfaf7] p-5">
                      <label
                        htmlFor="wallet-account"
                        className="block text-sm font-semibold text-[#3f2417]"
                      >
                        Tài khoản ví điện tử
                      </label>

                      <div className="relative mt-3">
                        <Smartphone
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#704329]/35"
                        />

                        <input
                          id="wallet-account"
                          type="text"
                          value={walletAccount}
                          onChange={(event) =>
                            setWalletAccount(
                              event.target.value,
                            )
                          }
                          placeholder="Nhập số điện thoại hoặc tài khoản"
                          className="h-12 w-full rounded-2xl border border-[#dfd0c3] bg-white pl-11 pr-4 text-sm text-[#3f2417] outline-none transition placeholder:text-[#704329]/30 focus:border-[#704329]/50 focus:ring-4 focus:ring-[#704329]/8"
                        />
                      </div>

                      <p className="mt-3 text-xs leading-5 text-[#704329]/45">
                        Đây là giao diện mô phỏng. Thông tin
                        thanh toán thực tế sẽ được xử lý bởi
                        payment gateway.
                      </p>
                    </div>
                  )}
                </div>

                {/* =================================================
                    ORDER SUMMARY
                ================================================== */}
                <div className="my-6 h-px bg-[#eadfd5]" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#704329]/60">
                      Tạm tính
                    </span>

                    <span className="font-medium text-[#3f2417]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#704329]/60">
                      Phí dịch vụ
                    </span>

                    <span className="font-medium text-[#3f2417]">
                      {serviceFee === 0
                        ? "Miễn phí"
                        : formatPrice(serviceFee)}
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-4 pt-1">
                    <span className="text-sm font-semibold text-[#3f2417]">
                      Tổng cộng
                    </span>

                    <span className="text-2xl font-bold tracking-[-0.03em] text-[#704329]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    PAYMENT BUTTON
                ================================================== */}
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#704329] px-5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(112,67,41,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#5b3522] hover:shadow-[0_14px_30px_rgba(112,67,41,0.22)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isProcessing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Đang xử lý thanh toán...
                    </>
                  ) : (
                    <>
                      Thanh toán {formatPrice(total)}

                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {/* SECURITY */}
                <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#704329]/45">
                  <ShieldCheck size={14} />

                  <span>
                    Thanh toán an toàn và được bảo mật
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] text-[#704329]/35">
                  <LockKeyhole size={12} />

                  <span>
                    Thông tin thanh toán được bảo vệ
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}