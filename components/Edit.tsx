"use client"

import { FormEvent, useEffect, useState } from "react";
import {AiFillEdit} from "react-icons/ai"
import { useStore } from "./State";

type Props = {
    id: string,
    concert: ConcertType
}

interface ConcertType {
  date: string,
  viola: string,
  conductor: string,
  location: string,
  programme: String[],
  link: string
}

interface ConcertsState {
  concerts: Object,
  editConcertDb: (newArr: Object) => void;
}

export default function Edit(props: Props) {
    const concerts = useStore((state: ConcertsState) => state.concerts);
    const editConcertDb = useStore((state: ConcertsState) => state.editConcertDb);

    let prog = props.concert.programme.toString();

    const [open, openEditMode] = useState(false);

    const [date, setDate] = useState(props.concert.date);
    const [viola, setViola] = useState(props.concert.viola);
    const [conductor, setConductor] = useState(props.concert.conductor);
    const [location, setLocation] = useState(props.concert.location);
    const [programme, setProgramme] = useState(prog);
    const [link, setLink] = useState(props.concert.link);

    const updateDB = async (e: FormEvent) => {
        e.preventDefault(); 
        
        let programmeArr = programme.toString().replace(/, /g, ",").split(",")
        
        try {
      const response = await fetch('/api/edit-concert', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: props.id, date: date, viola: viola, conductor: conductor, location: location, programme: programmeArr, link: link})
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        let index = concerts.findIndex((el:any)=>el._id === userData.value._id)
        const newConcerts = [...concerts];
        newConcerts[index] = userData.value;
        editConcertDb(newConcerts);
        openEditMode(false)
            return userData;
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
    }


  return (
    <div>
        <div onClick={()=>openEditMode(!open)} className="cursor-pointer">
            <AiFillEdit color="blue"/>
        </div>
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
                    <textarea className="editinputs h-60" onChange={e=>setProgramme(e.target.value)} value={programme} placeholder="programme"/>
                    <button className="bg-green-300 rounded-lg border-2 border-green-700 ">update</button>
                </form>
            </div>
            </div>}
    </div>
  )
}