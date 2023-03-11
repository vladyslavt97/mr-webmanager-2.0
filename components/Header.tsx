import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className='bg-green-600/60 sticky flex justify-evenly items-center text-sm text-center font-bold shadow-lg'>
        <Link href="www.maximrysanov.com" target="_blank" className='m-2 px-4 py-2 rounded-lg border-2 border-red-400 bg-red-300 drop-shadow-lg'>Real Page</Link>
        <button className='m-2 px-4 py-2 rounded-lg border-2 border-blue-400 bg-blue-200 font-bold drop-shadow-lg'>Add a new concert</button>
        <Link href="www.maximrysanov.com" target="_blank" className='m-2 px-4 py-2 rounded-lg border-2 border-red-400 bg-red-300 drop-shadow-lg'>Contacts</Link>
    </div>
  )
}