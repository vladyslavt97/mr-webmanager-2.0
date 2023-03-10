import { BsFillTrash3Fill } from 'react-icons/bs';
type Props = {
    id: string
}

export default function Delete(props: Props) {
  return (
    <div><BsFillTrash3Fill color='red'/></div>
  )
}