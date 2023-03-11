import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  value : object;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {id, date, viola, conductor, location, programme, link} = req.body;
   try {
        const client = await clientPromise;
        const db = client.db("Maxim_Rysanov");
        const collection = db.collection('concerts-2023');
        const updatedConcert = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, 
            {$set: {date: date, viola: viola, conductor: conductor, location: location, programme: programme, link: link}}, { returnDocument: "after" }  
           );
        updatedConcert.value && res.json({value: updatedConcert.value})
   } catch (e) {
       console.error(e);
   }
}