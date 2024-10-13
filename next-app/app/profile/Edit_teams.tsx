import {useQuery} from "@tanstack/react-query";
import React, {useState} from "react";
import {json} from "stream/consumers";


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
                "logo_id": logo_response.id
            })
    })
    return response.json();
}


async function updateTeam(id: number, name: string, logo_ref: any) {
    let body = {"name": name}
    console.log(logo_ref.current.value)
    if( typeof logo_ref.current.value !== "undefined"){
        let fd = new FormData();
        fd.append("file", logo_ref.current.files[0]);
        let logo_response = await (await fetch(process.env.NEXT_PUBLIC_API_URL + '/resources/', {
            method: "POST",
            body: fd,
            credentials: "include"
        })).json()
        console.log(logo_response.id)
        body["logo_id"] = logo_response.id
    }
    console.log(body)
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teams/'+id+"/", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
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
    const fileInput = React.useRef<HTMLInputElement>(null);
    return (
        <div className="flex bg-white my-2 border-2 border p-2 rounded-lg gap-2">
            <div>Имя команды</div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-1/5 border rounded px-2 "/>
            <input type="file" className="my-auto hover:file:bg-black file:duration-100 hover:file:text-white file:py-2 file:bg-white file:border file:rounded "  name="file" ref={fileInput} />
            {/*<input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} className="w-1/5"/>*/}
            <button className="border border-2 text-sm border-black hover:text-white mr-0 ml-auto hover:bg-black duration-100 rounded w-fit px-2" onClick={() => addTeam(name, fileInput)}>Добавить команду</button>
        </div>
    )
}

function Team(props: any){
    const [name, setName] = useState(props.item.name)
    const fileInput = React.useRef<HTMLInputElement>(null);
    console.log(props.item.id)
    return (
        <div key={props.item.id} className="flex my-2 bg-white border-2 border p-2 rounded-lg justify-between">
            <input className="m-2" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
            <img src={process.env.NEXT_PUBLIC_API_URL +"/" +props.item.logo} className=" aspect-square mx-10 max-w-10 p-1" alt="logo" />
            <input type="file" name="file" className="my-auto hover:file:bg-black file:duration-100 hover:file:text-white file:py-2 file:bg-white file:border file:rounded " ref={fileInput} />
            <button className="border border-2 border-black hover:text-white hover:bg-black px-2 duration-100 rounded" onClick={() => updateTeam(props.item.id, name, fileInput)}>Изменить</button>
            <button className="border border-2 border-black hover:text-white hover:bg-black duration-100 rounded w-10" onClick={() => deleteTeam(props.item.id)}>X</button>
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
            {status === 'success' && (teams.map((props: any) => ( <Team item={props} key={props.id}/> )))}
        </div>
    )
}