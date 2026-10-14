import Link from 'next/link';
import { ArrowRight, Coffee, MapPin, Sparkles } from 'lucide-react';

const values = [
  { icon: Coffee, title: 'Pha chế mỗi ngày', body: 'Đồ uống được chuẩn bị sau khi bạn đặt món, giữ trọn hương vị và độ tươi mới.' },
  { icon: Sparkles, title: 'Đặt món gọn nhẹ', body: 'Chọn món, tùy chỉnh size và topping rồi thanh toán trực tuyến trong vài bước.' },
  { icon: MapPin, title: 'Nhận tại quầy', body: 'Theo dõi trạng thái đơn và ghé quầy nhận món khi đã sẵn sàng.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf7] text-[#3f2417]">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b86f38]">Câu chuyện BrewLite</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Cà phê ngon, ngày mới nhẹ nhàng hơn.</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#704329]/70">BrewLite giúp bạn chọn đồ uống yêu thích, đặt trước và thanh toán không tiền mặt để tiết kiệm thời gian chờ tại quầy.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e9de] text-[#704329]"><Icon size={22} /></div>
              <h2 className="mt-5 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#704329]/65">{body}</p>
            </article>
          ))}
        </div>
        <Link href="/menu" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#704329] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5b3522]">Khám phá menu <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}
