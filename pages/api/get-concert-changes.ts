import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  try {
       const client = await clientPromise;
       const db = client.db("Maxim_Rysanov"); //db name

       const concerts = await db
           .collection("concerts-2023")//collection name
           .watch();
        console.log('concerts: ', concerts);
        
        
        concerts.on('change', (change)=> {
          console.log('changeee', change);
          
        })
        
       return NextResponse.json(concerts)
   } catch (e) {
       console.error(e);
   }
  return new Response('Hello, Next.js!')
}