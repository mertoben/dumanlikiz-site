import { NextResponse } from 'next/server'; import { deleteReservation,listReservationsAdmin,db } from '@/lib/db';
export const dynamic='force-dynamic';
function checkAuth(req:Request){const key=req.headers.get('x-admin-key')||'';const expected=process.env.ADMIN_KEY||'changeme';return key===expected;}
export async function GET(req:Request){if(!checkAuth(req))return NextResponse.json({error:'Unauthorized'},{status:401});const {searchParams}=new URL(req.url);const from=searchParams.get('from')||undefined;return NextResponse.json(listReservationsAdmin(from));}
export async function DELETE(req:Request){if(!checkAuth(req))return NextResponse.json({error:'Unauthorized'},{status:401});const {searchParams}=new URL(req.url);const id=Number(searchParams.get('id')||0);if(!id)return NextResponse.json({error:'id gerekli'},{status:400});deleteReservation(id);await db.write();return NextResponse.json({ok:true});}
