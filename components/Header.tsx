import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className='bg-green-600 sticky flex justify-evenly'>
        <Link href="www.maximrysanov.com" target="_blank" className='m-5 px-4 py-2 rounded-lg border-2 border-red-400 bg-red-300 font-bold'>Real Page</Link>
        <button className='m-5 px-4 py-2 rounded-lg border-2 border-red-400 bg-red-300 font-bold'>Add a new concert</button>
        <Link href="www.maximrysanov.com" target="_blank" className='m-5 px-4 py-2 rounded-lg border-2 border-red-400 bg-red-300 font-bold'>Contact</Link>
    </div>
  )
}