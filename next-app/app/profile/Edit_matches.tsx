'use client'


import {QueryClient, useQuery} from "@tanstack/react-query";
import React from "react";
// import {Select, SelectItem} from "@nextui-org/select";

let queryClient = new QueryClient();

async function getMatches() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches', {
        method: "GET"
    })
    return response.json();
}


async function addMatch() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches', {
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
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/teams/', {
        method: "GET"
    })
    return response.json();
}
async function deleteMatch(id: number) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/' + id, {
        method: "DELETE"
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


export default function Edit_matches() {
    const {data, status} = useQuery({
        queryKey: ['matches'],
        queryFn: getMatches
    })
    const {data: teams, status: statusTeams} = useQuery({
        queryKey: ['teams'],
        queryFn: () => getTeams()
    })
    console.log(teams)
    console.log(data)
    return (
        <div className="bg-white p-5 w-full gap-4 text-black">
            <h1 className="text-2xl font-bold flex flex-row">Матчи

            </h1>
            <div className="flex my-2 border-2 border p-2 rounded-lg">
                {/*<Select items={teams} label="Выберите первую команду" className="w-1/2">*/}
                {/*    {(team) => <SelectItem key={team.id}>{team.name}</SelectItem>}*/}
                {/*</Select>*/}
                {/*<Select items={teams} label="Выберите вторую команду" className="w-1/2">*/}
                {/*    {(team) => <SelectItem key={team.id}>{team.name}</SelectItem>}*/}
                {/*</Select>*/}
                <button onClick={() => addMatch()}
                        className="mr-0  ml-auto border-2 border border-black text-xs hover:text-white hover:bg-black duration-100 p-2 rounded-lg">Добавить матч</button>
            </div>
            {status === 'error' && <p>{status}</p>}
            {status === 'loading' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {status === 'success' && (
                data.map((item) => (

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