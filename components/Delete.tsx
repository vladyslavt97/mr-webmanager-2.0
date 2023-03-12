import { useState } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useStore } from './State';

type Props = {
    id: string
}

interface ConcertsState {
  removeConcert: (id: string) => void;
}

export default function Delete(props: Props) {
  const removeConcert = useStore((state: ConcertsState) => state.removeConcert);

  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

  const deleteId = async () => {
    removeConcert(props.id);
    try {
      const response = await fetch('/api/delete-concert', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: props.id})
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const deletedData = await response.json();
        console.log('updated tru:', deletedData);
        
        return deletedData; 
      } catch (error) {
        console.error('Error fetching user data:', error);
    }
  } 
  return (
    <div>
      <div onClick={()=>setDeleteBtnClicked(!deleteBtnClicked)} className="cursor-pointer"><BsFillTrash3Fill className=' fill-gray-400'/></div>
      {deleteBtnClicked && 
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/80 flex justify-center items-center" onClick={()=>setDeleteBtnClicked(!deleteBtnClicked)}>
            <div className='z-10 bg-green-100 p-10 rounded-xl flex flex-col justify-center items-center'>
              <h1>Are you sure?</h1>
              <button onClick={deleteId} className="bg-green-300 rounded-lg px-1 border-2 border-green-700 mt-2">Yes, delete!!!</button>
              <button onClick={()=>setDeleteBtnClicked(!deleteBtnClicked)} className="bg-red-300 rounded-lg px-1 border-2 border-red-700 mt-2">Cancel</button>
            </div>
        </div>}
    </div>
  )
}