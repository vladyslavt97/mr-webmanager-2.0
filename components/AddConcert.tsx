import { FormEvent, useState } from "react"
import { useStore } from "./State";

type Props = {}

// interface ConcertType {
//   date: string,
//   viola: string,
//   conductor: string,
//   location: string,
//   programme: String[],
//   link: string
// }
interface ConcertsState {
  concerts: Object,
  insertConcert: (newArr: Object) => void;
}

export default function AddConcert({}: Props) {
    const concerts = useStore((state: ConcertsState) => state.concerts);
    const insertConcert = useStore((state: ConcertsState) => state.insertConcert);

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState("");
    const [viola, setViola] = useState("");
    const [conductor, setConductor] = useState("");
    const [location, setLocation] = useState("");
    const [programme, setProgramme] = useState("");
    const [link, setLink] = useState("");


    const insertNewConcert = async (e: FormEvent) => {
        e.preventDefault(); 
        let programmeArr = programme.replace(/, /g, ",").split(",")
        
        try {
      const response = await fetch('/api/insert-concert', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({date: date, viola: viola, conductor: conductor, location: location, programme: programmeArr, link: link})
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const insertedConcert = await response.json();
        const toInsert = [...concerts];
        toInsert.push(insertedConcert.value[0])
        insertConcert(toInsert);
        setOpen(false)
            return insertedConcert;
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
    }

  return (
    <div>
        <button className='m-2 px-4 py-2 rounded-lg border-2 border-blue-400 bg-blue-200 font-bold drop-shadow-lg'
        onClick={()=>setOpen(!open)}>Add a new concert</button>
        {open && <div className="flex justify-center items-center w-[100vw] h-[100vh] fixed top-0 left-0 z-10">
            <div className="w-[100vw] h-[100vh] bg-black/80" onClick={()=>setOpen(!open)}></div>
            <div className="bg-green-900 fixed top-50 left-50 flex justify-end items-end flex-col rounded-lg">
                <button onClick={()=>setOpen(!open)} className="pt-2 pr-2 text-red-700 font-bold z-20">X</button>
                <form onSubmit={insertNewConcert} className="flex flex-col z-10">
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