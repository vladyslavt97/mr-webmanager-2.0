import Link from 'next/link'
import React from 'react'
import AddConcert from './AddConcert'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className='bg-green-600/60 sticky flex justify-evenly items-center text-sm text-center font-bold shadow-lg'>
        <Link href="https://maxim-rysanov.vercel.app/concerts" target="_blank" className='m-2 px-4 py-2 rounded-lg bg-gradient-to-l from-red-200 to-fuchsia-300 drop-shadow-lg'>Real Page</Link>
        <AddConcert />
        <Link href="www.maximrysanov.com" target="_blank" className='m-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-600 drop-shadow-lg'>Contacts</Link>
    </div>
  )
}