import {useQuery} from "@tanstack/react-query";
import React, {useState} from "react";


async function getTeams() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teams/', {
        method: "GET"
    })
    return response.json();
}

async function addTeam(name: string, logo_ref: any ) {
    let fd = new FormData();
    fd.append("file", logo_ref.current.files[0]);
    // console.log(logo.)
    let logo_response = await (await fetch(process.env.NEXT_PUBLIC_API_URL + '/resources/', {
        method: "POST",
        body: fd,
        credentials: "include"
    })).json()
    console.log(logo_response.id)
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teams/', {
        method: "POST",
        credentials: "include",
        // headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            {
                "name": name,
                "logo": logo_response.id
            })
    })
    return response.json();
}


async function updateTeam(id: number, name: string, logo_ref: any) {
    let fd = new FormData();
    fd.append("file", logo_ref.current.files[0]);
    // console.log(logo.)
    let logo_response = await (await fetch(process.env.NEXT_PUBLIC_API_URL + '/resources/', {
        method: "POST",
        body: fd,
        credentials: "include"
    })).json()
    console.log(logo_response.id)
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teams/', {
        method: "POST",
        credentials: "include",
        // headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            {
                "name": name,
                "logo": logo_response.id
            })
    })
}


async function deleteTeam(id: number) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teams/' + id, {
        method: "DELETE",
        credentials: "include"
    })
    return response.json();
}


function AddTeam() {
    const [name, setName] = useState("")
    // const [logo, setLogo] = useState("")
    const fileInput = React.useRef<HTMLInputElement>(null);
    return (
        <div className="flex my-2 border-2 border p-2 rounded-lg gap-2">
            <div>Имя команды</div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-1/5 border rounded px-2 "/>
            <input type="file" name="file" ref={fileInput} />
            {/*<input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} className="w-1/5"/>*/}
            <button className="border border-2 text-sm border-black hover:text-white mr-0 ml-auto hover:bg-black duration-100 rounded w-fit px-2" onClick={() => addTeam(name, fileInput)}>Добавить команду</button>
        </div>
    )
}


export default function Edit_teams() {
    const {data: teams, status} = useQuery({
        queryKey: ['teams'],
        queryFn: getTeams
    })
    console.log(teams)
    return (

        <div className = 'text-black'>

            <h1 className="text-2xl font-bold text-black">Команды</h1>
            <AddTeam/>
            {status === 'error' && <p>{status}</p>}
            {status === 'pending' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {status === 'success' && (
                teams.map((item: any) => (
                    <div key={item.id} className="flex my-2 border-2 border p-2 rounded-lg">
                        <input className="m-2" defaultValue={item.name}/>
                        <img src={process.env.NEXT_PUBLIC_API_URL +"/" +item.logo} className=" aspect-square mx-10 max-w-10 p-1" alt="logo"></img>
                        <button className="border border-2 border-black hover:text-white mr-0 ml-auto hover:bg-black duration-100 rounded w-10" onClick={() => deleteTeam(item.id)}>X</button>
                    </div>)))}
        </div>
    )
}