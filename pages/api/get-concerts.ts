import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object[]>
) {
    try {
       const client = await clientPromise;
       const db = client.db("Maxim_Rysanov"); //db name

       const concerts = await db
           .collection("concerts-2023")//collection name
           .find({})//gives everything
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();//returns json
        
       res.json(concerts)
   } catch (e) {
       console.error(e);
   }
}
