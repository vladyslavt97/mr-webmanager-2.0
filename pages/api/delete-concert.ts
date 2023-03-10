import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest) => {
    const {id} = req.body;
   try {
        const client = await clientPromise;
        const db = client.db("Maxim_Rysanov");
        const collection = db.collection('concerts-2023');
        await collection.deleteOne({ _id: new ObjectId(id)});
   } catch (e) {
       console.error(e);
   }
};  