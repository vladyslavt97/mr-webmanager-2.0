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
  console.log('req.body: ', req.body);
  
   try {
        const client = await clientPromise;
        const db = client.db("Maxim_Rysanov");
        const collection = db.collection('concerts-2023');

        const documents = [
          { year: "2023", date, viola, conductor, location, programme, link }
        ];
        const insertedConcert = await collection.insertMany(documents);
        console.log(insertedConcert.insertedIds[0].toString());
        const afterInsetion = [
          { _id: new ObjectId(insertedConcert.insertedIds[0].toString()),year: "2023", date, viola, conductor, location, programme, link }
        ];
        res.json({value: afterInsetion})
   } catch (e) {
       console.error(e);
   }
}