'use client'

import {useRouter} from 'next/navigation'
import Matches from '@/components/panels/matches'
import React from 'react'
import MatchesTitle from '@/components/titles/matches'
import DateFilter from "@/components/panels/date-filter"
import NameFilter from "@/components/panels/name-filter"
import LiveStreamCard from "@/components/panels/live"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {MapPinIcon} from "lucide-react";
// import { it } from 'node:test'



async function getMatches(){
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/', {
        method: "GET",
        credentials: "include"
    })
    return response.json();
}


function Match(props: any) {
    let match = props.match
    let date = new Date(match.math_date)
    return(
        <div className="w-full max-w-xl bg-black rounded-3xl p-8 flex flex-col gap-2">
            <CardHeader className="pb-2">
                <div className="flex items-center">
                    <Badge variant="secondary" className='border-none bg-[#26E065] text-black MuseoBoldItalic px-2 py-1 rounded-3xl'>{match.tour}</Badge>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-2 '>
                <div className="flex items-center mb-4 justify-between">
                    <div className="text-center">
                        <img src={process.env.NEXT_PUBLIC_API_URL+ "/"+ match.op1.logo} alt="Team A Logo" className="w-32 h-32 mx-auto mb-2 rounded-full" />
                        <h3 className="w-32">{match.op1.name}</h3>
                    </div>
                    <div className="text-center flex flex-col gap-1 items-center">
                        {match.is_finished === false ? <div className="text-3xl font-bold mx-auto">VS</div> : <div className="text-3xl font-bold mx-auto">{match.op1_score} : {match.op2_score}</div>}
                        <span>{date.getFullYear()}-{date.getMonth()}-{date.getDate()}</span>
                        <Badge variant="secondary" className='border-none bg-[#E02A26] text-white MuseoBold px-2 py-1 rounded-3xl max-w-max'>
                            {date.getHours()}:{date.getMinutes()}
                        </Badge>
                        {/* <div className="text-sm text-muted-foreground mt-1 mx-auto text-center"></div> */}

                    </div>
                    <div className="text-center h-full">
                        <img src={process.env.NEXT_PUBLIC_API_URL+ "/"+match.op2.logo} alt="Team B Logo" className="w-32 h-32 mx-auto mb-2  rounded-full" />
                        <h3 className="w-32">{match.op2.name}</h3>
                    </div>
                </div>
                <Badge variant="secondary" className='border-none bg-[#26E065] text-black px-2 py-1 rounded-3xl flex mx-auto max-w-max'>
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span className="MuseoBoldItalic text-emerald-900">{match.location}</span>
                </Badge>
            </CardContent>
        </div>
    )
}

export default function CardWithBackground() {
    const queryClient = useQueryClient();
    const {data, status} = useQuery({
        queryKey: ['matches'],
        queryFn: getMatches
    })
    const router = useRouter();
    return (
        <div className=' bg-white p-10 w-full '>
            <MatchesTitle/>

            <div className="flex flex-wrap gap-4 justify-start my-10">
                <DateFilter/>
                <NameFilter/>
            </div>
            <div className="flex flex-wrap gap-4 place-content-center">
            {status==="success" && data.map(
                (match: any) => <Match match={match}/>
            )}
            </div>

            <LiveStreamCard/>
        </div>
    )
}

