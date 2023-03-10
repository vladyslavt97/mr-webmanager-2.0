import clientPromise from "@/lib/mongodb";
import { ChangeStream, ChangeStreamDocument } from "mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  concerts: ChangeStream<Document, ChangeStreamDocument<Document>>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
       const client = await clientPromise;
       const db = client.db("Maxim_Rysanov"); //db name

       const changeStream = await db
           .collection("concerts-2023")//collection name
           .watch();
        // console.log('changes: ', changeStream);
        
        console.log('herer');
        
        changeStream.on('change', (change: any)=> {
          console.log('changeee', change);
          const updatedDoc = change.updateDescription;
          console.log('ups',updatedDoc);
                 res.json(updatedDoc)
        })
        

   } catch (e) {
       console.error(e);
   }
}