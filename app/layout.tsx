import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Dumanlıkız Sitesi',
  description: 'Dumanlıkız Sitesi resmi sayfası',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <header className="border-b bg-white">
          <div className="containered flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Dumanlıkız logo" className="h-10 w-auto" />
              <span className="font-semibold">Dumanlıkız Sitesi</span>
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/history" className="hover:underline">Anılar</Link>
              <Link href="/reservations" className="hover:underline font-medium" style={{color:'var(--brand)'}}>Çardak Rezervasyon</Link>
              <Link href="/map" className="hover:underline">Harita</Link>
              <Link href="/admin" className="hover:underline">Yönetim</Link>
            </nav>
          </div>
        </header>
        <main className="containered py-8">{children}</main>
        <footer className="mt-16 border-t py-10 text-sm">
          <div className="containered grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dumanlıkız Sitesi</h4>
              <p>Edremit / Altınoluk – Tahtakuşlar</p>
              <p className="text-gray-600">Yaklaşık koordinatlar: 39.568626, 26.855721</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">İletişim</h4>
              <p>E-posta: dumanlikizsitesi@gmail.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Harita</h4>
              <a className="hover:underline" href="https://maps.google.com/?q=39.568626,26.855721" target="_blank">Google Haritalar’da aç</a>
            </div>
          </div>
          <div className="containered text-gray-600 mt-6">© {new Date().getFullYear()} Dumanlıkız Sitesi Yönetimi</div>
        </footer>
      </body>
    </html>
  );
}
