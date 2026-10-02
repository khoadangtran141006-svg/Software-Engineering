import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  CreditCard,
  Heart,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Cà phê sữa",
    description: "Đậm đà, thơm béo và cân bằng.",
    price: "30.000đ",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
    tag: "Bán chạy",
  },
  {
    id: 2,
    name: "Cà phê đen",
    description: "Hương cà phê nguyên bản mạnh mẽ.",
    price: "25.000đ",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
    tag: "Classic",
  },
  {
    id: 3,
    name: "Bạc xỉu",
    description: "Mềm mại, béo ngậy và dễ uống.",
    price: "35.000đ",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85",
    tag: "Được yêu thích",
  },
];

const benefits = [
  {
    icon: Coffee,
    title: "Cà phê chất lượng",
    description: "Tuyển chọn hạt cà phê cao cấp",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Nhanh chóng đến tận tay bạn",
  },
  {
    icon: CreditCard,
    title: "Thanh toán tiện lợi",
    description: "Cashless, đơn giản và an toàn",
  },
];

const categories = [
  {
    title: "Coffee",
    subtitle: "Đậm đà & nguyên bản",
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Tea",
    subtitle: "Thanh mát mỗi ngày",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Milk Tea",
    subtitle: "Ngọt ngào & béo mịn",
    image:
      "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#fcfaf7] text-[#241711]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-4 pb-6 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative min-h-[560px] overflow-hidden rounded-[28px] bg-[#3f2417] sm:min-h-[620px] lg:min-h-[650px]">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=90')",
              }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#21120c]/90 via-[#21120c]/65 to-[#21120c]/10" />

            {/* Decorative glow */}
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#e8a15a]/20 blur-3xl" />

            <div className="relative flex min-h-[560px] items-center px-7 py-16 sm:px-12 lg:min-h-[650px] lg:px-20">
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md">
                  <Sparkles size={14} />
                  More than just coffee
                </div>

                <h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
                  Good Coffee
                  <br />
                  <span className="text-[#efb36f]">Better Days</span>
                </h1>

                <p className="mt-7 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
                  Những ly cà phê tuyệt hảo, khởi đầu cho những điều tuyệt vời.
                  Đặt món nhanh chóng và tận hưởng khoảnh khắc của riêng bạn.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/menu"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#e8a15a] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#efb36f]"
                  >
                    Khám phá menu
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <a
                    href="#featured"
                    className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                  >
                    Xem món nổi bật
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-white/65">
                  <span className="flex items-center gap-2">
                    <Check size={15} className="text-[#efb36f]" />
                    Thanh toán không tiền mặt
                  </span>

                  <span className="flex items-center gap-2">
                    <Check size={15} className="text-[#efb36f]" />
                    Đặt món nhanh
                  </span>
                </div>
              </div>
            </div>

            {/* Floating rating card */}
            <div className="absolute bottom-6 right-6 hidden rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:block lg:bottom-10 lg:right-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#efb36f] text-[#3f2417]">
                  <Heart size={19} fill="currentColor" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Made with care
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">
                    For your better day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}
      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group flex items-center gap-4 rounded-2xl border border-[#eadfd5] bg-white/60 px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_40px_rgba(63,36,23,0.07)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3e9de] text-[#704329] transition-colors duration-300 group-hover:bg-[#e8d5c3]">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#3f2417]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#9a8b80]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================= */}
      <section id="featured" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#9a6546]">
                BrewLite selection
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#3f2417] sm:text-5xl">
                Món được yêu thích
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#806f64] sm:text-base">
                Những lựa chọn quen thuộc được BrewLite chuẩn bị để bạn bắt
                đầu một ngày thật dễ chịu.
              </p>
            </div>

            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#704329]"
            >
              Xem toàn bộ menu
              <ChevronRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group overflow-hidden rounded-[24px] border border-[#eadfd5] bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(63,36,23,0.10)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${product.image}')`,
                    }}
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#704329] backdrop-blur-md">
                    {product.tag}
                  </div>

                  <div
  aria-label={`Yêu thích ${product.name}`}
  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#704329] backdrop-blur-md transition-all hover:bg-white"
>
  <Heart size={16} />
</div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#3f2417]">
                        {product.name}
                      </h3>

                      <p className="mt-1.5 text-sm leading-5 text-[#9a8b80]">
                        {product.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-sm font-bold text-[#704329]">
                      {product.price}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#f0e7df] pt-4">
                    <span className="text-xs font-medium text-[#a3948b]">
                      Từ 25.000đ
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5a321f] text-white transition-transform duration-300 group-hover:scale-110">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY BANNER
      ========================================================= */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#9a6546]">
              Discover your favorite
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#3f2417] sm:text-5xl">
              Chọn theo sở thích
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href="/menu"
                className="group relative min-h-[300px] overflow-hidden rounded-[24px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${category.image}')`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#241711]/85 via-[#241711]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                        {category.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/70">
                        {category.subtitle}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all group-hover:bg-[#e8a15a]">
                      <ArrowRight size={17} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          STORY / CTA
      ========================================================= */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[28px] bg-[#f1e7dc]">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#e8a15a]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#704329]/10 blur-3xl" />

            <div className="relative grid items-center gap-10 px-7 py-14 sm:px-12 lg:grid-cols-2 lg:px-20 lg:py-20">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5a321f] text-white">
                  <Coffee size={21} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a6546]">
                  The BrewLite experience
                </p>

                <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#3f2417] sm:text-5xl">
                  Một ly cà phê.
                  <br />
                  Một khoảnh khắc của riêng bạn.
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-[#806f64] sm:text-base">
                  BrewLite được tạo ra để việc đặt cà phê trở nên đơn giản,
                  nhanh chóng và dễ chịu — từ lúc chọn món cho đến khi bạn cầm
                  ly cà phê trên tay.
                </p>

                <Link
                  href="/menu"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#5a321f] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#704329]"
                >
                  Bắt đầu đặt món
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="relative mx-auto w-full max-w-md">
                <div className="aspect-square overflow-hidden rounded-[28px] shadow-2xl shadow-[#5a321f]/10">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85')",
                    }}
                  />
                </div>

                <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e9de] text-[#704329]">
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#3f2417]">
                        Đặt món nhanh
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#9a8b80]">
                        Tiết kiệm thời gian chờ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST
      ========================================================= */}
      <section className="border-y border-[#eadfd5] bg-white/50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          <div className="text-center">
            <ShieldCheck
              className="mx-auto text-[#704329]"
              size={25}
              strokeWidth={1.7}
            />
            <h3 className="mt-3 text-sm font-semibold text-[#3f2417]">
              Thanh toán an toàn
            </h3>
            <p className="mt-1 text-xs text-[#9a8b80]">
              Bảo mật trong từng giao dịch
            </p>
          </div>

          <div className="text-center">
            <ShoppingBag
              className="mx-auto text-[#704329]"
              size={25}
              strokeWidth={1.7}
            />
            <h3 className="mt-3 text-sm font-semibold text-[#3f2417]">
              Đặt món dễ dàng
            </h3>
            <p className="mt-1 text-xs text-[#9a8b80]">
              Chọn món và thanh toán chỉ trong vài bước
            </p>
          </div>

          <div className="text-center">
            <MapPin
              className="mx-auto text-[#704329]"
              size={25}
              strokeWidth={1.7}
            />
            <h3 className="mt-3 text-sm font-semibold text-[#3f2417]">
              Sẵn sàng nhận món
            </h3>
            <p className="mt-1 text-xs text-[#9a8b80]">
              Đến quầy và nhận đơn nhanh chóng
            </p>
          </div>
        </div>
      </section>

      
    </main>
  );
}