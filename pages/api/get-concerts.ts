import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object[]>
) {
    try {
       const client = await clientPromise;
       const db = client.db("Maxim_Rysanov");
       const concerts = await db.collection("concerts-2023").find({}).sort({ metacritic: -1 }).toArray();
       res.json(concerts)
   } catch (e) {
       console.error(e);
   }
}
