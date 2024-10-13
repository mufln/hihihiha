'use client'


import {QueryClient, useQuery} from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import {Select, SelectItem} from "@nextui-org/select";
// import {Select, SelectItem} from "@nextui-org/select";

let queryClient = new QueryClient();

async function getMatches() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/', {
        method: "GET",
        credentials: "include"
    })
    return response.json();
}


async function addMatch() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            {
                op1: 1,
                op2: 2,
                g1: 0,
                g2: 10
            })
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

async function updateMatch(id: number) {

    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/' + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            {
                op1: 1,
                op2: 2,
                g1: 0,
                g2: 10
            })
    })
    return response.json();
}

function AddMatch(props: any) {
    let teams = props.teams
    const  [p1, setP1] = useState(null)
    const  [p2, setP2] = useState(null)
    useEffect(() => {
        console.log(p1)
        console.log(p2)
    }, [p1, p2])
    // return (<div>a</div>)
    return (
    <div className="flex-wrap flex w-full gap-2 border rounded-lg p-2">
        <select className="p-2 border border-black  rounded-lg" onChange={(e) => setP1(e.target.value)}>
            {teams.map((team: any) => <option key={team.id} value={team.id}>{team.name}</option>) }
        </select>
        <input type="number" className="p-1 max-w-16 border border-black rounded-lg" placeholder="Счет"/>
        <div className="my-auto font-bold">:</div>
        <input type="number" className="p-1 truncate max-w-16 border border-black  rounded-lg" placeholder="Счет"/>
        <select className="p-2 border border-black  rounded-lg" onChange={(e) => setP2(e.target.value)}>
            {teams.map((team: any) => <option key={team.id} value={team.id}>{team.name}</option>) }
        </select>
        <input type="datetime-local" className="p-2 max-w-52 border border-black  rounded-lg" placeholder="Дата"/>
        <div className="flex flex-row border  border-black px-2 rounded-lg">
        <div className="my-auto">Завершен?</div>
        <input type="checkbox" className="p-2 ml-2 border border-black  rounded-lg" placeholder="Завершен"/>
        </div>
        <button onClick={() => addMatch()}
                className="mr-0 ml-auto border-2 border border-black text-sm hover:text-white hover:bg-black duration-100 p-2 rounded-lg">Добавить матч</button>
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
            {statusTeams === "success" && <AddMatch teams={teams}/> }
            {status === 'error' && <p>{status}</p>}
            {status === 'pending' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {status === 'success' && (
                data.map((item: any) => (

                    <div key={item.id} className="flex my-2 border-2 border p-2 rounded-lg">
                        <div>Играет</div>
                        <div className="mx-2 border border-1 border-black px-1 rounded">{item.op1.name}</div>
                        <div>Против</div>
                        <div className="mx-2 border border-1 border-black px-1 rounded">{item.op2.name}</div>
                        <div>Счет</div>
                        <div className="mx-2 font-bold px-1 rounded">{item.op1_score}</div>
                        <div>:</div>
                        <div className="mx-2 font-bold px-1 rounded">{item.op2_score}</div>
                        <div>Дата</div>
                        <div className="mx-2 font-bold px-1 rounded">{item.math_date}</div>
                        <button onClick={() => deleteMatch(item.id)}
                                className="border border-2 border-black hover:text-white mr-0 ml-auto hover:bg-black duration-100 rounded w-10">X
                        </button>
                    </div>)))}
        </div>
    )
}