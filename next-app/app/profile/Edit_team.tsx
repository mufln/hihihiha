// 'use client'
import React, {useState} from "react";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";


const queryClient = new QueryClient();
async function addPlayer(id: number, name: string, bio: string, joined: string, role: string, left: string, logo_ref: any) {
    let fd = new FormData();
    let body = {
        "name": name,
        "bio": bio,
        "joined_at": joined,
        "role": role,
    }
    if(left !== ""){
        body["left_at"] = left
    }
    console.log(typeof logo_ref.current.value)
    if( logo_ref.current.value !== ""){
        fd.append("file", logo_ref.current.files[0]);
        let logo_response = await (await fetch(process.env.NEXT_PUBLIC_API_URL + '/resources/', {
            method: "POST",
            body: fd,
            credentials: "include"

        })).json()
        // console.log(logo_response.id)
        body["media"] = [logo_response.id]
    }
    let url = process.env.NEXT_PUBLIC_API_URL + '/team/'
    if(id !== null){
        url += + id + "/"
    }
    console.log(body)
    let response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    return response.json();
}

function AddPlayer(props: {player: any, editing_existing: boolean }) {
    let player = props.player
    // console.log(player)
    let editing_existing = props.editing_existing
    const [name, setName] = useState(player ? player.name: "")
    const [bio, setBio] = useState(player ? player.bio: "")
    const [joined, setJoined] = useState(player ? player.joined_at : "")
    const [role, setRole] = useState(player ? player.role : "")
    const [left, setLeft] = useState(player ? player.left_at : "")
    let id = player ? player.id : null
    // console.log(joined)
    const fileInput = React.useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    return (
        <div className="flex flex-wrap bg-white my-2 border-2 border p-2 rounded-lg gap-2">
            <input className="border rounded px-2"  defaultValue={player ? player.name: ""} onChange={(e) => setName(e.target.value)}/>
            <img src={process.env.NEXT_PUBLIC_API_URL +"/" + (player ? player.media[0].filename : '')} className=" aspect-square mx-10 max-w-10 w-10 p-1" alt="" />
            <input type="file" name="file"  className="my-auto hover:file:bg-black file:duration-100 hover:file:text-white file:py-2 file:bg-white file:border file:rounded " ref={fileInput} />
            <textarea style={{resize: "none"}} className="border rounded focus:w-full p-2 h-10 focus:h-96 duration-300" defaultValue={player ? player.bio : ""} onChange={(e) => setBio(e.target.value)} placeholder="Биография"/>
            <input type="datetime-local" className="border rounded px-2 w-full" defaultValue={player ? player.joined_at: new Date()} onChange={(e) => setJoined(e.target.value)} placeholder="Дата вступления"/>
            <input type="datetime-local" className="border rounded px-2 w-full" defaultValue={player ? player.left_at: new Date()} onChange={(e) => setLeft(e.target.value)} placeholder="Дата выхода"/>
            <input type="text" className="border rounded px-2 w-full" defaultValue={player ? player.role : ""} onChange={(e) => setRole(e.target.value)} placeholder="Роль"/>
            {!editing_existing && <button className="border border-2 mr-0 border-black hover:text-white hover:bg-black px-2 duration-100 rounded"
                     onClick={() => {
                         addPlayer(null, name, bio, joined, role, left, fileInput)
                         queryClient.invalidateQueries({queryKey: ["team"]})
                     }}>Добавить игрока</button>}
            {editing_existing && <><button className="border border-2 border-black hover:text-white hover:bg-black px-2 duration-100 rounded"
                     onClick={() => {
                         addPlayer(id, name, bio, joined, role, left, fileInput)
                         queryClient.invalidateQueries({queryKey: ["team"]})
                     }}>Изменить игрока</button>
            <button className="border border-2 border-black hover:text-white hover:bg-black px-2 duration-100 rounded"
                    onClick={() => {
                        deletePlayer(player.id)
                        queryClient.invalidateQueries({queryKey: ["team"]})
                    }}>X</button></>}
        </div>
    )
}

async function deletePlayer(id: number) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/team/' + id + "/", {
        method: "DELETE",
        credentials: "include"
    })
    return response.json();
}


async function getTeam() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/team/', {
        method: "GET",
        credentials: "include"
    })
    return response.json();
}

export default function Edit_team() {
    const {status, data} = useQuery({
        queryKey: ['team'],
        queryFn: getTeam
    })
    return (
        <div className = 'text-black bg-white w-full gap-4'>

            <h1 className="text-2xl font-bold text-black">Команда</h1>
            <AddPlayer/>
            {status === 'error' && <p>{status}</p>}
            {status === 'pending' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {status === 'success' && (data.map((player) => (
                <AddPlayer player={player} editing_existing={true} key={player.id}/>
            )))}
        </div>
    )
}