
import { useEffect, useState } from 'react';
import Delete from './Delete';
import Edit from './Edit';
import { useStore } from './State';

interface ConcertType {
    _id: string,
  year: number,
  date: string,
  viola: string,
  conductor: string,
  location: string,
  programme: String[],
  link: string
}

interface ConcertsState {
  concerts: Object,
  setConcerts: (data: Object) => void;
}


export default function Concerts() {
    const concerts = useStore((state: ConcertsState) => state.concerts);
    const setConcerts = useStore((state: ConcertsState) => state.setConcerts);
    useEffect(() => {
        fetch('/api/get-concerts')
        .then(response => response.json())
        .then(data => {
            setConcerts(data)
        })
        .catch(error => {
            console.error(error);
        });
    }, [setConcerts]);
    
    return (
    <div className='flex justify-center flex-col items-center'>      
        {concerts.map((concert: ConcertType) => (
            <div key={concert._id} className="m-3">
                <div className='flex flex-row'>
                    <h2 className=' font-semibold'>{concert.date}</h2>&nbsp;{concert.viola !== "" && <h2>{concert.viola}</h2>}&nbsp;{concert.conductor !== "" && <h2>{concert.conductor}</h2>}
                </div>
                <h5>{concert.location}<br/>
                {concert.programme.map((prog, ind)=>(
                    <div key={ind}>
                    <p>♪ {prog}</p>
                    </div>
                ))}
                {concert.link && <a href={concert.link}><h4 className='italic underline'>more details</h4></a>}
                </h5>
                
                <div className='flex flex-row justify-end'>
                    <Edit id={concert._id} concert={concert}/>&nbsp;&nbsp;&nbsp;<Delete id={concert._id}/>
                </div>
            </div>
          ))}
    </div>
  )
}