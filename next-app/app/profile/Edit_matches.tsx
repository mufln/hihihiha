'use client'


import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import {Select, SelectItem} from "@nextui-org/select";
import {boolean} from "property-information/lib/util/types";
// import {Select, SelectItem} from "@nextui-org/select";

async function getMatches() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/', {
        method: "GET",
        credentials: "include"
    })
    return response.json();
}


async function addMatch(props: any) {

    let body = {
        "op1_id": Number(props.p1),
        "op2_id": Number(props.p2),
        "op1_score": Number(props.score1),
        "op2_score": Number(props.score2),
        "math_date": props.date,
        "is_finished": props.is_finished,
        "location": props.location,
        "tour": props.tour
    }
    console.log(body)
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    })
    props.queryClient.invalidateQueries({queryKey: ["matches"]})
    return response.json();
}

async function getTeams() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teams/', {
        method: "GET",
        credentials:"include"
    })
    return response.json();
}

async function deleteMatch(id: number, queryClient: any) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/' + id, {
        method: "DELETE",
        credentials:"include"
    })
    queryClient.invalidateQueries({queryKey: ["matches"]})
    return response.json();
}

async function updateMatch(props: any) {
    let body = {
        "op1_id": Number(props.p1),
        "op2_id": Number(props.p2),
        "op1_score": Number(props.score1),
        "op2_score": Number(props.score2),
        "math_date": props.date,
        "is_finished": props.is_finished,
        "location": props.location,
        "tour": props.tour
    }
    console.log(body)
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/' + props.id, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    })
    props.queryClient.invalidateQueries({queryKey: ["matches"]})
    return response.json();
}

function AddMatch(props: {teams: any, editing_existing: boolean, match:any}) {
    const queryClient = useQueryClient();
    let teams = props.teams
    let match = props.match
    let id = match ? match.id : null
    console.log(match)
    let editing_existing = props.editing_existing
    const  [p1, setP1] = useState(match ? match.op1_id : null)
    const  [p2, setP2] = useState(match ? match.op2_id : null)
    const [score1, setScore1] = useState(match ? match.op1_score : 0)
    const [score2, setScore2] = useState(match ? match.op2_score : 0)
    const [is_finished, setIsFinished] = useState(match ? match.is_finished : false)
    const [date, setDate] = useState(match ? match.math_date : new Date())
    const [location, setLocation] = useState(match ? match.location : '')
    const [tour, setTour] = useState(match ? match.tour : "1/2")
    useEffect(() => {
        console.log(p1)
        console.log(p2)
    }, [p1, p2])
    return (
    <div className="flex-wrap flex w-full gap-2 border rounded-lg p-2">
        <select className="p-2 border border-black  rounded-lg" defaultValue={p1} onChange={(e) => setP1(e.target.value)}>
            {teams.map((team: any) => <option key={team.id} value={team.id}>{team.name}</option>) }
        </select>
        <input type="number" onChange={(e) => setScore1(e.target.value)} defaultValue={score1} className="p-1 max-w-16 border border-black rounded-lg" placeholder="Счет"/>
        <div className="my-auto font-bold">:</div>
        <input type="number" onChange={(e) => setScore2(e.target.value)} defaultValue={score2} className="p-1 truncate max-w-16 border border-black  rounded-lg" placeholder="Счет"/>
        <select className="p-2 border border-black  rounded-lg" onChange={(e) => setP2(e.target.value)} defaultValue={p2}>
            {teams.map((team: any) => <option key={team.id} value={team.id}>{team.name}</option>) }
        </select>
        <input type="datetime-local" onChange={(e) => setDate(e.target.value)} defaultValue={date} className="p-2 max-w-52 border border-black  rounded-lg" placeholder="Дата"/>
        <input type="text" className="p-2 ml-2 border border-black  rounded-lg" placeholder="Место" defaultValue={location} onChange={(e) => setLocation(e.target.value)}/>
        <input type="text" className="p-2 ml-2 border border-black  rounded-lg" placeholder="Тур" defaultValue={tour} onChange={(e) => setTour(e.target.value)}/>
        <div className="flex flex-row border  border-black px-2 rounded-lg">
        <div className="my-auto">Завершен?</div>
        <input type="checkbox" className="p-2 ml-2 border border-black  rounded-lg" defaultChecked={is_finished} onChange={() => setIsFinished(!is_finished)}/>
        </div>
        {!editing_existing && (<button onClick={() => {
            addMatch({p1, p2, score1, score2, date, is_finished, location, tour, queryClient})
            queryClient.invalidateQueries({queryKey: ["matches"]})
        }} className="mr-0 ml-auto border-2 border border-black text-sm hover:text-white hover:bg-black duration-100 p-2 rounded-lg">Добавить матч</button>)}
        {editing_existing &&
            <>
            <button onClick={() => {
                updateMatch({id, p1, p2, score1, score2, date, is_finished, location, tour, queryClient})
                queryClient.invalidateQueries({queryKey: ["matches"]})
            }} className="mr-0 ml-auto border-2 border border-black text-sm hover:text-white hover:bg-black duration-100 p-2 rounded-lg">Изменить матч</button>
            <button onClick={() => {
                deleteMatch(id, queryClient)

            }} className="border border-2 border-black hover:text-white mr-0 hover:bg-black duration-100 rounded w-10">X</button>
            </>
        }
    </div>)
}

export default function Edit_matches() {
    const {data, status} = useQuery({
        queryKey: ['matches'],
        queryFn: getMatches
    })
    const {data: teams, status: statusTeams} = useQuery({
        queryKey: ['teams'],
        queryFn: getTeams
    })
    return (
        <div className="bg-white w-full gap-4 text-black flex flex-wrap gap-2">
            <h1 className="text-2xl font-bold flex flex-row">Матчи</h1>
            {statusTeams === "success" && status === "success" && <AddMatch teams={teams} editing_existing={false} match={null}/> }
            {status === 'error' && <p>{status}</p>}
            {status === 'pending' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {statusTeams === "success" && status === "success" && (
                data.map((item: any) => (
                    <AddMatch teams={teams} editing_existing={true} key={item.id} match={item}/>
                )))}
        </div>
    )
}