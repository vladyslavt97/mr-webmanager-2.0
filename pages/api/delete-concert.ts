import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

type Data = {
  message : string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.body;
   try {
        const client = await clientPromise;
        const db = client.db("Maxim_Rysanov");
        const collection = db.collection('concerts-2023');
        await collection.deleteOne({ _id: new ObjectId(id)});
        res.json({message: "all good"})
   } catch (e) {
       console.error(e);
   }
};  