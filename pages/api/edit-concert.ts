import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface RequestBody {
  link: string;
  id: string;
  year: number,
  date: string,
  viola: string,
  conductor: string,
  location: string,
  programme: String[],
}

export async function POST(request: Request & { body: RequestBody }, response: Response) {
  console.log('rq', request.body);
  
  const {id, date, viola, conductor, location, programme, link} = request.body;
  console.log('id, date, viola, conductor, location, programme, link: ', id, date, viola, conductor, location, programme, link);
  
   try {
        const client = await clientPromise;
        const db = client.db("Maxim_Rysanov"); //db name
        const collection = db.collection('concerts-2023');
        const concertsUpd = await collection//collection name
           .findOneAndUpdate({ _id: new ObjectId(id) }, {$set: {date: date, viola: viola, conductor: conductor, location: location, programme: programme, link: link}}, { returnDocument: "after" }  );
        console.log('concertsUpd.value', concertsUpd);
        
           return NextResponse.json(concertsUpd.value);
   } catch (e) {
       console.error(e);
   }
  return new Response('Hello, Next.js!')
}