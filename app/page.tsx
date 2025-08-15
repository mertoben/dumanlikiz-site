import Link from 'next/link';
export default function Home(){return(<div className='space-y-10'>
<section className='card p-8'><div className='grid md:grid-cols-2 gap-8 items-center'>
<div><h1 className='text-3xl md:text-4xl font-bold mb-3'>Dumanlıkız Sitesi</h1>
<p className='text-gray-700 mb-6'>Resmi sayfamıza hoş geldiniz. Buradan site duyurularını takip edebilir, <b>çardak</b> alanları için önceden <b>rezervasyon</b> yapabilirsiniz.</p>
<div className='flex gap-3'><Link href='/reservations' className='btn btn-primary'>Çardak Rezervasyon</Link><Link href='/history' className='btn btn-secondary'>Tarihçe & Anılar</Link></div>
</div>
<div className='rounded-lg overflow-hidden'><img src='https://images.unsplash.com/photo-1519680772-8b57f85a67b6?q=80&w=1200&auto=format&fit=crop' alt='Sahil ve çardaklar' /></div>
</div></section></div>) }