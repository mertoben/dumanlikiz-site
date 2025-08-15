import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="card p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10">
            <span className="badge badge-olive mb-3">Edremit • Altınoluk • Tahtakuşlar</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Dumanlıkız Sitesi</h1>
            <p className="text-gray-700 mb-6">
              Ege’nin zeytin kokulu sahilinde, komşuluk kültürünü yaşatan yazlık sitemizin
              resmi sayfasına hoş geldiniz. Buradan duyuruları takip edebilir ve
              <b> çardak</b> alanları için <b>rezervasyon</b> yapabilirsiniz.
            </p>
            <div className="flex gap-3">
              <Link href="/reservations" className="btn btn-primary">Çardak Rezervasyon</Link>
              <Link href="/map" className="btn btn-secondary">Haritada Gör</Link>
            </div>
          </div>
          <picture>
            {/* Telifsiz, Ege hissi veren görsel (yer tutucu). Canlıda kendi fotoğrafınızı koyabilirsiniz. */}
            <img
              src="https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=1600&auto=format&fit=crop"
              alt="Ege sahili"
              className="h-full w-full object-cover"
            />
          </picture>
        </div>
      </section>

      {/* OLANAKLAR */}
      <section className="section">
        <h2 className="text-xl font-semibold mb-4">Site Olanakları</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {t:'Yüzme Havuzu',d:'Yaz sezonunda düzenli bakım'},
            {t:'Tenis Kortu',d:'Rezervasyon/kurallara uygun kullanım'},
            {t:'Mini Futbol Sahası',d:'Çocuklar için güvenli alan'},
            {t:'Sahil & Çardaklar',d:'Günlük 2 saat / hane limiti'},
          ].map((c)=>(
            <div key={c.t} className="card p-5">
              <h3 className="font-semibold">{c.t}</h3>
              <p className="text-gray-600 text-sm">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Not: olanaklar topluluk paylaşımlarına ve saha bilgisine dayalıdır. Yönetim güncellemeleriyle değişebilir.</p>
      </section>

      {/* HIZLI ERİŞİM */}
      <section className="section">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Çardak Kuralları (Özet)</h3>
            <ul className="list-disc text-sm text-gray-700 ml-5 space-y-1">
              <li>09:00–23:00 arası kullanım</li>
              <li>Günlük maksimum 2 saat / hane</li>
              <li>Çakışma engeli; 15 dk gecikmede iptal</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Harita & Ulaşım</h3>
            <p className="text-sm text-gray-700 mb-2">Edremit/Altınoluk – Tahtakuşlar mevkii</p>
            <a className="text-sm underline" href="https://maps.google.com/?q=39.568626,26.855721" target="_blank">Google Harita’da aç</a>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Anı Albümü</h3>
            <p className="text-sm text-gray-700">Topluluktan fotoğraflar, eski etkinlikler…</p>
            <Link className="text-sm underline" href="/history">Anılara göz at</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
