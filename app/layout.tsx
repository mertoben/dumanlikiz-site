import './globals.css';import Link from 'next/link';
export const metadata={title:'Dumanlıkız Sitesi',description:'Dumanlıkız Sitesi resmi web sitesi ve çardak rezervasyon sistemi.'};
export default function RootLayout({children}:{children:React.ReactNode}){
return(<html lang='tr'><body>
<header className='border-b bg-white'><div className='containered flex items-center justify-between h-16'>
  <Link href='/' className='flex items-center gap-2'><img src='/logo.svg' alt='logo' className='h-8 w-8'/><span className='font-semibold'>Dumanlıkız Sitesi</span></Link>
  <nav className='flex gap-4 text-sm'><Link href='/history' className='hover:underline'>Tarihçe & Anılar</Link><Link href='/reservations' className='hover:underline font-medium text-teal-700'>Çardak Rezervasyon</Link><Link href='/admin' className='hover:underline'>Yönetim</Link></nav>
</div></header>
<main className='containered py-8'>{children}</main>
<footer className='mt-16 border-t py-10 text-sm text-gray-600'><div className='containered flex items-center justify-between'><p>© {new Date().getFullYear()} Dumanlıkız Sitesi Yönetimi</p><p>İletişim: siteyonetimi@example.com</p></div></footer>
</body></html>) }