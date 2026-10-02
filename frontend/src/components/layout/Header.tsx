'use client';

import Link from 'next/link';
import {
  Coffee,
  ShoppingCart,
  UserRound,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/stores/cart-store';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalQuantity = useCartStore(
    (state) => state.getTotalQuantity(),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfd5]/80 bg-[#fcfaf7]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5a321f] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Coffee size={21} strokeWidth={2.2} />
          </div>

          <div>
            <div className="text-[18px] font-bold tracking-[-0.03em] text-[#3f2417]">
              BrewLite
            </div>
            <div className="hidden text-[9px] font-medium uppercase tracking-[0.22em] text-[#a3948b] sm:block">
              More than just coffee
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[#3f2417] transition-colors hover:text-[#9a6546]"
          >
            Trang chủ
          </Link>

          <Link
            href="/menu"
            className="text-sm font-medium text-[#806f64] transition-colors hover:text-[#9a6546]"
          >
            Menu
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-[#806f64] transition-colors hover:text-[#9a6546]"
          >
            Về chúng tôi
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2 md:flex">
          

          <Link
          id="cart-button"
            href="/cart"
            aria-label="Giỏ hàng"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#3f2417] transition-all hover:bg-[#f2e9df]"
          >
            <ShoppingCart size={19} strokeWidth={1.8} />

            <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#e8a15a] px-1 text-[9px] font-bold text-white">
  {totalQuantity}
</span>
          </Link>

          <Link
            href="/login"
            aria-label="Tài khoản"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#3f2417] transition-all hover:bg-[#f2e9df]"
          >
            <UserRound size={19} strokeWidth={1.8} />
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Mở menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#3f2417] hover:bg-[#f2e9df] md:hidden"
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#eadfd5] bg-[#fcfaf7] px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#3f2417] hover:bg-[#f2e9df]"
            >
              Trang chủ
            </Link>

            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#3f2417] hover:bg-[#f2e9df]"
            >
              Menu
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#3f2417] hover:bg-[#f2e9df]"
            >
              Về chúng tôi
            </Link>

            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#3f2417] hover:bg-[#f2e9df]"
            >
              Giỏ hàng
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#3f2417] hover:bg-[#f2e9df]"
            >
              Đăng nhập
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}