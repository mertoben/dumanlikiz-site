import { JSONFilePreset } from 'lowdb/node'
import path from 'path'
export type Gazebo={id:number;name:string}
export type Reservation={id:number;gazebo_id:number;date:string;start_time:string;end_time:string;unit_number:string;name:string;phone?:string;note?:string;created_at:string}
type Data={gazebos:Gazebo[];reservations:Reservation[];lastId:number}
const file=path.join(process.cwd(),'data.json')
export const db=await JSONFilePreset<Data>(file,{gazebos:[
{id:1,name:'Çardak 1'},{id:2,name:'Çardak 2'},{id:3,name:'Çardak 3'},{id:4,name:'Çardak 4'},{id:5,name:'Çardak 5'},{id:6,name:'Çardak 6'}
],reservations:[],lastId:0})
export function listGazebos(){return db.data.gazebos}
export function listReservationsByDate(date:string){return db.data.reservations.filter(r=>r.date===date).sort((a,b)=>a.start_time.localeCompare(b.start_time))}
export function listReservationsAdmin(fromDate?:string){const arr=db.data.reservations.slice().sort((a,b)=>a.date===b.date?a.start_time.localeCompare(b.start_time):a.date.localeCompare(b.date));return fromDate?arr.filter(r=>r.date>=fromDate):arr}
export function isOverlapping(g:number,d:string,s:string,e:string){return db.data.reservations.some(r=>r.gazebo_id===g&&r.date===d&&!(r.end_time<=s||r.start_time>=e))}
export function hasDailyLimit(u:string,d:string,maxH:number){const rows=db.data.reservations.filter(r=>r.unit_number===u&&r.date===d);const total=rows.reduce((sum,r)=>{const[sh,sm]=r.start_time.split(':').map(Number);const[eh,em]=r.end_time.split(':').map(Number);return sum+((eh*60+em)-(sh*60+sm))/60},0);return total>=maxH}
export function createReservation(rec:Omit<Reservation,'id'|'created_at'>){const id=++db.data.lastId;const created_at=new Date().toISOString();db.data.reservations.push({id,created_at,...rec});return id}
export function deleteReservation(id:number){db.data.reservations=db.data.reservations.filter(r=>r.id!==id)}