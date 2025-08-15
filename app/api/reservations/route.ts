import { NextResponse } from 'next/server'; import { z } from 'zod'; import dayjs from 'dayjs';
import { createReservation,hasDailyLimit,isOverlapping,listReservationsByDate,db } from '@/lib/db';
export const dynamic='force-dynamic';
export async function GET(req:Request){const {searchParams}=new URL(req.url);const date=searchParams.get('date');if(!date)return NextResponse.json({error:'date zorunlu'},{status:400});return NextResponse.json(listReservationsByDate(date));}
const schema=z.object({gazebo_id:z.number().int().positive(),date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),start_time:z.string().regex(/^\d{2}:\d{2}$/),end_time:z.string().regex(/^\d{2}:\d{2}$/),unit_number:z.string().min(1).max(20),name:z.string().min(2).max(60),phone:z.string().max(30).optional().default(''),note:z.string().max(200).optional().default('')});
export async function POST(req:Request){const body=await req.json();const parsed=schema.safeParse({...body,gazebo_id:Number(body.gazebo_id)});if(!parsed.success){return NextResponse.json({error:'Geçersiz veri',details:parsed.error.flatten()},{status:400});}
const {gazebo_id,date,start_time,end_time,unit_number,name,phone,note}=parsed.data;const s=dayjs(`${date}T${start_time}`),e=dayjs(`${date}T${end_time}`);
if(!s.isBefore(e))return NextResponse.json({error:'Başlangıç saati bitişten önce olmalı'},{status:400});const hours=e.diff(s,'hour');if(hours<1||hours>2)return NextResponse.json({error:'Süre 1-2 saat arasında olmalı'},{status:400});
const open=dayjs(`${date}T09:00`),close=dayjs(`${date}T23:00`);if(s.isBefore(open)||e.isAfter(close))return NextResponse.json({error:'Rezervasyon saatleri 09:00-23:00 arasıdır'},{status:400});
if(isOverlapping(gazebo_id,date,start_time,end_time))return NextResponse.json({error:'Bu saat aralığı için zaten rezervasyon var'},{status:409});
if(hasDailyLimit(unit_number,date,2))return NextResponse.json({error:'Günlük 2 saat limitine ulaştınız'},{status:409});
const id=createReservation({gazebo_id,date,start_time,end_time,unit_number,name,phone,note});await db.write();return NextResponse.json({ok:true,id},{status:201});}
