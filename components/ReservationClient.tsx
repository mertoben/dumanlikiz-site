'use client';
import { useEffect,useMemo,useState } from 'react';import dayjs from 'dayjs';
type Gazebo={id:number;name:string};type Res={id:number;gazebo_id:number;date:string;start_time:string;end_time:string;unit_number:string;name:string;phone?:string;note?:string};
function timeSlots(start=9,end=23){const slots:{start:string,end:string}[]=[];for(let h=start;h<end;h++){const s=String(h).padStart(2,'0')+':00';const e=String(h+1).padStart(2,'0')+':00';slots.push({start:s,end:e});}return slots;}
export default function ReservationClient(){
const [gazebos,setGazebos]=useState<Gazebo[]>([]);const [date,setDate]=useState<string>(dayjs().format('YYYY-MM-DD'));const [gazeboId,setGazeboId]=useState<number|undefined>(undefined);
const [reservations,setReservations]=useState<Res[]>([]);const [selected,setSelected]=useState<{start:string,end:string}|null>(null);
const [form,setForm]=useState({unit_number:'',name:'',phone:'',note:'',duration:1,captchaAnswer:'',captchaQ:''});const [loading,setLoading]=useState(false);const [message,setMessage]=useState<string|null>(null);
const genCaptcha=()=>{const a=Math.floor(Math.random()*8)+1,b=Math.floor(Math.random()*8)+1;const q=`${a} + ${b} = ?`;setForm(f=>({...f,captchaQ:q,captchaAnswer:''}));return a+b};const [captchaSum,setCaptchaSum]=useState(0);
useEffect(()=>{fetch('/api/gazebos').then(r=>r.json()).then(setGazebos);setCaptchaSum(genCaptcha());},[]);
useEffect(()=>{fetch('/api/reservations?date='+date).then(r=>r.json()).then(setReservations);},[date]);
useEffect(()=>{if(gazebos.length&&gazeboId===undefined)setGazeboId(gazebos[0].id);},[gazebos,gazeboId]);
const slots=useMemo(()=>timeSlots(9,23),[]);const isBooked=(gId:number,s:string,e:string)=>reservations.some(r=>r.gazebo_id===gId&&!(r.end_time<=s||r.start_time>=e));
const handleBook=async()=>{if(!selected||gazeboId===undefined)return;if(String(Number(form.captchaAnswer))!==String(captchaSum)){setMessage('Güvenlik sorusu hatalı. Tekrar deneyin.');setCaptchaSum(genCaptcha());return;}
const start=selected.start;const endHour=Number(selected.start.split(':')[0])+Number(form.duration);const end=String(endHour).padStart(2,'0')+':00';setLoading(true);
try{const res=await fetch('/api/reservations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({gazebo_id:gazeboId,date,start_time:start,end_time:end,unit_number:form.unit_number.trim(),name:form.name.trim(),phone:form.phone.trim(),note:form.note.trim()})});
const data=await res.json();if(!res.ok)throw new Error(data.error||'Rezervasyon başarısız.');setMessage('Rezervasyon alındı ✅');setSelected(null);setForm({...form,unit_number:'',name:'',phone:'',note:'',duration:1,captchaAnswer:''});setCaptchaSum(genCaptcha());
const list=await fetch('/api/reservations?date='+date).then(r=>r.json());setReservations(list);}catch(e:any){setMessage(e.message);}finally{setLoading(false);} };
return(<div className='grid lg:grid-cols-3 gap-8'>
<div className='lg:col-span-2 card p-6'>
  <div className='grid md:grid-cols-3 gap-4 mb-6'>
    <div><label>Tarih</label><input type='date' value={date} onChange={e=>setDate(e.target.value)} /></div>
    <div><label>Çardak</label><select value={gazeboId} onChange={e=>setGazeboId(Number(e.target.value))}>{gazebos.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select></div>
    <div className='text-sm text-gray-600 flex items-end'>Rezervasyon aralığı: 09:00 - 23:00</div>
  </div>
  <div className='overflow-x-auto'><table className='min-w-full text-sm'><thead><tr className='text-left border-b'><th className='py-2 pr-4'>Saat</th><th className='py-2'>Durum</th></tr></thead><tbody>
  {slots.map(slot=>{const booked=gazeboId?isBooked(gazeboId,slot.start,slot.end):true;return(<tr key={slot.start} className='border-b'>
    <td className='py-2 pr-4 font-medium'>{slot.start} - {slot.end}</td>
    <td className='py-2'>{booked?(<span className='inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700'>Rezerve</span>):(<button className='btn btn-primary' onClick={()=>setSelected(slot)}>Yer Ayırt</button>)}</td>
  </tr>);})}
  </tbody></table></div>
</div>
<div className='card p-6'><h3 className='font-semibold mb-3'>Rezervasyon Bilgileri</h3>
  <div className='space-y-3'>
    <div><label>Daire No *</label><input value={form.unit_number} onChange={e=>setForm({...form,unit_number:e.target.value})} placeholder='Örn: A3-12'/></div>
    <div><label>Ad Soyad *</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder='Adınız Soyadınız'/></div>
    <div><label>Telefon</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder='+90...'/></div>
    <div><label>Not</label><textarea rows={3} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder='Doğum günü, misafir, vb.'/></div>
    <div><label>Süre (saat) *</label><select value={form.duration} onChange={e=>setForm({...form,duration:Number(e.target.value)})}><option value={1}>1</option><option value={2}>2</option></select><p className='text-xs text-gray-500 mt-1'>Günlük üst limit: 2 saat / daire</p></div>
    <div><label>Güvenlik Sorusu: {form.captchaQ}</label><input value={form.captchaAnswer} onChange={e=>setForm({...form,captchaAnswer:e.target.value})} placeholder='Cevap'/></div>
    <div className='pt-2'><button disabled={!selected||!form.unit_number||!form.name||loading} onClick={handleBook} className='btn btn-primary w-full'>{loading?'Gönderiliyor...':selected?`${selected.start} için Yer Ayırt`:'Saat Seçiniz'}</button>{selected&&(<p className='text-xs text-gray-600 mt-2'>Seçili: {selected.start} - {selected.end}</p>)}{message&&<p className='text-sm mt-3'>{message}</p>}</div>
  </div>
</div>
</div>) }