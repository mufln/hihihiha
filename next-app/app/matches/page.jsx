'use client'

import { useRouter } from 'next/navigation'
import Matches from '@/components/panels/matches'
import React from 'react'
import MatchesTitle from '@/components/titles/matches'
import DateFilter from "@/components/panels/date-filter"
import NameFilter from "@/components/panels/name-filter"
import LiveStreamCard from "@/components/panels/live"
// import { it } from 'node:test'

export default function CardWithBackground() {
  const router = useRouter();
  
  return (
    <div  className=' bg-white p-10 w-full '>
      <MatchesTitle/> 

    <div className="flex flex-wrap gap-4 justify-start my-10">
        <DateFilter/>
        <NameFilter/>
    </div>
    
    <Matches/>

    <LiveStreamCard/>
    </div>
  )
}

