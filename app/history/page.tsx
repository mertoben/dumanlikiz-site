export const dynamic='force-dynamic';
export default function History(){return(<div className='space-y-8'>
<div className='prose max-w-none'><h1>Tarihçe & Anı Albümü</h1><p>Bu alanda sitemizin geçmişinden anılar ve fotoğraflar yayınlanacaktır.</p></div>
<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>{[1,2,3,4,5,6,7,8].map(i=>(<img key={i} className='rounded-lg object-cover h-40 w-full' src={`https://picsum.photos/seed/dumanlikiz-${i}/600/400`} alt={`Anı ${i}`} />))}</div>
</div>) }