import { FormEvent, useEffect, useState } from "react";
import {AiFillEdit} from "react-icons/ai"
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'

type Props = {
    id: string
    concerts: object
}

interface ConcertType {
  date: string,
  viola: string,
  conductor: string,
  location: string,
  programme: String[],
  link: string
}

// export async function getServerSideProps() {

//     try {
//         const client = await clientPromise;
//         const db = client.db("chess");

//         const users = await db
//             .collection("users")
//             .find({})
//             .sort({ metacritic: -1 })
//             .limit(20)
//             .toArray();

//         return {
//             props: { users: JSON.parse(JSON.stringify(users)) },
//         };
//     } catch (e) {
//         console.error(e);
//     }
// }

export default function Edit(props: Props) {
    const [open, openEditMode] = useState(false);
    const [updated, setUpdated] = useState(true);

    const [date, setDate] = useState("");
    const [viola, setViola] = useState("");
    const [conductor, setConductor] = useState("");
    const [location, setLocation] = useState("");
    const [programme, setProgramme] = useState("");
    const [link, setLink] = useState("");

    const updateDB = async (e: FormEvent) => {
        e.preventDefault(); 
        console.log('prog: ', programme);
        
        try {
      const response = await fetch('/api/edit-concert', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: props.id, date: date, viola: viola, conductor: conductor, location: location, programme: programme, link: link})
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
            return userData;
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
        // openEditMode(!open);
        // setUpdated(true)
    }

    // useEffect(()=>{
    //   fetch('/api/get-changes')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('data from changes', data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // },[updated])

  return (
    <div>
        <div onClick={()=>openEditMode(!open)}>
            <AiFillEdit color="blue"/>
        </div>
        {/* <button onClick={updateDB}>try</button> */}
        {open && <div className="flex justify-center items-center w-[100vw] h-[100vh] absolute top-0 left-0">
            <div className="w-[100vw] h-[100vh] bg-black/80"></div>
            <div className="bg-green-900 absolute top-50 left-50 flex justify-end items-end flex-col rounded-lg">
                <button onClick={()=>openEditMode(!open)} className="pt-2 pr-2 text-red-700 font-bold z-10">X</button>
                <form onSubmit={updateDB} className="flex flex-col z-10">
                    <input className="editinputs" type="text" onChange={e=>setDate(e.target.value)} value={date} placeholder="date"/>
                    <input className="editinputs" type="text" onChange={e=>setViola(e.target.value)} value={viola} placeholder="viola"/>
                    <input className="editinputs" type="text" onChange={e=>setConductor(e.target.value)} value={conductor} placeholder="conductor"/>
                    <input className="editinputs" type="text" onChange={e=>setLocation(e.target.value)} value={location} placeholder="location"/>
                    <input className="editinputs" type="text" onChange={e=>setLink(e.target.value)} value={link} placeholder="link"/>
                    <input className="editinputs" type="text" onChange={e=>setProgramme(e.target.value)} value={programme} placeholder="programme"/>
                    <button className="bg-green-300 rounded-lg border-2 border-green-700">update</button>
                </form>
            </div>
            </div>}
    </div>
  )
}