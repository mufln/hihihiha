'use client'

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useRouter } from 'next/navigation'

import React from 'react'
import { Button } from '@/components/ui/button'
import MatchesTitle from '@/components/titles/matches'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CalendarIcon, MapPinIcon, Clock } from "lucide-react"

import Image from "next/image"
import DateFilter from "@/components/panels/date-filter"
import NameFilter from "@/components/panels/name-filter"
import LiveStreamCard from "@/components/panels/live"
// import { it } from 'node:test'

const items = [
    { title: 'Высший дивизион - 24 тур', date: '30.02.2025', time: '15:00', place: 'Вернадка парк #1',  teamA: {n: 'ФК Кокос', image: '/image.png'}, teamB: {n: 'неФК Кокос', image: '/image.png'}, score: ''},
    { title: 'Высший дивизион - 24 тур', date: '20.09.2023', time: '15:00', place: 'Вернадка парк #1',  teamA: {n: 'ФК Кокос', image: '/image.png'}, teamB: {n: 'неФК Кокос', image: '/image.png'}, score: ''},
    { title: 'Высший дивизион - 24 тур', date: '20.09.2023', time: '15:00', place: 'Вернадка парк #1',  teamA: {n: 'ФК Кокос', image: '/image.png'}, teamB: {n: 'неФК Кокос', image: '/image.png'}, score: '10:0'},
    { title: 'Высший дивизион - 24 тур', date: '20.09.2023', time: '15:00', place: 'Вернадка парк #1',  teamA: {n: 'ФК Кокос', image: '/image.png'}, teamB: {n: 'неФК Кокос', image: '/image.png'}, score: '10:0'},
    { title: 'Высший дивизион - 24 тур', date: '20.09.2023', time: '15:00', place: 'Вернадка парк #1',  teamA: {n: 'ФК Кокос', image: '/image.png'}, teamB: {n: 'неФК Кокос', image: '/image.png'}, score: '10:0'},    
  ]

export default function CardWithBackground() {
  const router = useRouter();
  
  return (
    <div  className=' bg-white p-10 w-full '>
      <MatchesTitle/> 

    <div className="flex flex-wrap gap-4 justify-start my-10">
        <DateFilter/>
        <NameFilter/>
    </div>
    
    <div className="flex flex-wrap gap-4 justify-start my-10">
        {items.map((item) => (
          <Card className="w-full bg-black rounded-3xl p-8 flex flex-col gap-2"
          style={{
            width: '20rem',
            borderRadius: '30px',
            marginBottom: '1rem',
            backgroundPosition: 'center center',
          }}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className='border-none bg-[#26E065] text-black MuseoBoldItalic px-2 py-1 rounded-3xl'>{item.title}</Badge>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col gap-2 justify-center items-center'>
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <img src={item.teamA.image} alt="Team A Logo" className="w-16 h-16 mx-auto mb-2 rounded-full" />
                <h3 className="">{item.teamA.n}</h3>
              </div>
              <div className="text-center flex flex-col gap-1 items-center">
                {item.score === '' ? <div className="text-3xl font-bold mx-auto">VS</div> : <div className="text-3xl font-bold mx-auto">{item.score}</div>}
                <span>{item.date}</span>
                <Badge variant="secondary" className='border-none bg-[#E02A26] text-white MuseoBold px-2 py-1 rounded-3xl max-w-max'>
                    {item.time}
                </Badge>
                {/* <div className="text-sm text-muted-foreground mt-1 mx-auto text-center"></div> */}

              </div>
              <div className="text-center">
                <img src={item.teamB.image} alt="Team B Logo" className="w-16 h-16 mx-auto mb-2  rounded-full" />
                <h3 className="">{item.teamB.n}</h3>
              </div>
            </div>
            <Badge variant="secondary" className='border-none bg-[#26E065] text-black px-2 py-1 rounded-3xl flex max-w-max'>
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span className="MuseoBoldItalic">{item.place}</span>
            </Badge>
          </CardContent>
        </Card>))}
    </div>

    <LiveStreamCard/>
    </div>
  )
}

