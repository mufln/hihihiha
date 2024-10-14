'use client'


import {QueryClient, useQuery} from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import {Select, SelectItem} from "@nextui-org/select";
import {boolean} from "property-information/lib/util/types";
// import {Select, SelectItem} from "@nextui-org/select";

let queryClient = new QueryClient();

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
        "match_date": props.date,
        "is_finished": props.is_finished
    }
    console.log(body)
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    })
    return response.json();
}

async function getTeams() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teams/', {
        method: "GET",
        credentials:"include"
    })
    return response.json();
}

async function deleteMatch(id: number) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/' + id, {
        method: "DELETE",
        credentials:"include"
    })
    return response.json();
}

async function updateMatch(props: any) {
    let body = {
        "op1_id": Number(props.p1),
        "op2_id": Number(props.p2),
        "op1_score": Number(props.score1),
        "op2_score": Number(props.score2),
        "math_date": props.date,
        "is_finished": props.is_finished
    }
    console.log(body)
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/' + props.id, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    })
    return response.json();
}

function AddMatch(props: {teams: any, editing_existing: boolean, match:any}) {
    let teams = props.teams
    let match = props.match
    let id = match ? match.id : null
    console.log(match)
    let editing_existing = props.editing_existing
    const  [p1, setP1] = useState(match ? match.op1_id : teams[0].id)
    const  [p2, setP2] = useState(match ? match.op2_id : teams[0].id)
    const [score1, setScore1] = useState(match ? match.op1_score : 0)
    const [score2, setScore2] = useState(match ? match.op2_score : 0)
    const [is_finished, setIsFinished] = useState(match ? match.is_finished : false)
    const [date, setDate] = useState(match ? match.math_date : new Date())

    useEffect(() => {
        console.log(p1)
        console.log(p2)
    }, [p1, p2])
    return (
    <div className="flex-wrap flex w-full gap-2 border rounded-lg p-2">
        <select className="p-2 border border-black  rounded-lg" defaultValue={match ? match.op1_id : 0} onChange={(e) => setP1(e.target.value)}>
            {teams.map((team: any) => <option key={team.id} value={team.id}>{team.name}</option>) }
        </select>
        <input type="number" onChange={(e) => setScore1(e.target.value)} defaultValue={match ? match.op1_score : 0} className="p-1 max-w-16 border border-black rounded-lg" placeholder="Счет"/>
        <div className="my-auto font-bold">:</div>
        <input type="number" onChange={(e) => setScore2(e.target.value)} defaultValue={match ? match.op2_score : 0} className="p-1 truncate max-w-16 border border-black  rounded-lg" placeholder="Счет"/>
        <select className="p-2 border border-black  rounded-lg" onChange={(e) => setP2(e.target.value)} defaultValue={match ? match.op2_id : 0}>
            {teams.map((team: any) => <option key={team.id} value={team.id}>{team.name}</option>) }
        </select>
        <input type="datetime-local" onChange={(e) => setDate(e.target.value)} defaultValue={match ? match.math_date : new Date()} className="p-2 max-w-52 border border-black  rounded-lg" placeholder="Дата"/>
        <div className="flex flex-row border  border-black px-2 rounded-lg">
        <div className="my-auto">Завершен?</div>
        <input type="checkbox" className="p-2 ml-2 border border-black  rounded-lg" checked={is_finished} onChange={(e) => setIsFinished(e.target.checked)} placeholder="Завершен"/>
        </div>
        {!editing_existing && (<button onClick={() => addMatch({p1, p2, score1, score2, date, is_finished})} className="mr-0 ml-auto border-2 border border-black text-sm hover:text-white hover:bg-black duration-100 p-2 rounded-lg">Добавить матч</button>)}
        {editing_existing &&
            <>
            <button onClick={() => updateMatch({id, p1, p2, score1, score2, date, is_finished})} className="mr-0 ml-auto border-2 border border-black text-sm hover:text-white hover:bg-black duration-100 p-2 rounded-lg">Изменить матч</button>
            <button onClick={() => deleteMatch(id)} className="border border-2 border-black hover:text-white mr-0 hover:bg-black duration-100 rounded w-10">X</button>
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
        <div className="bg-white w-full gap-4 text-black">
            <h1 className="text-2xl font-bold flex flex-row">Матчи</h1>
            {statusTeams === "success" && status === "success" && <AddMatch teams={teams} editing_existing={false} match={null}/> }
            {status === 'error' && <p>{status}</p>}
            {status === 'pending' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {statusTeams === "success" && status === "success" && (
                data.map((item: any) => (
                    <AddMatch teams={teams} editing_existing={true} match={item}/>
                )))}
        </div>
    )
}