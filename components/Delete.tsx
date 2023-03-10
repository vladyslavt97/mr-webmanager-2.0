import { BsFillTrash3Fill } from 'react-icons/bs';
type Props = {
    id: string
}

export default function Delete(props: Props) {
  const deleteId = async () => {
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
    <div onClick={deleteId} className="cursor-pointer"><BsFillTrash3Fill color='red'/></div>
  )
}