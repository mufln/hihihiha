import {useQuery} from "@tanstack/react-query";


async function getTeams() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/teams/', {
        method: "GET"
    })
    return response.json();
}

async function addTeam() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/teams/', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            {
                name: "Черепаха",
                logo: "https://cdn.pixabay.com/photo/2015/10/23/22/00/cat-828485__340.png"
            })
    })
    return response.json();
}


async function updateTeam(id: number) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/teams/' + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            {
                name: "Черепаха",
                logo: "https://cdn.pixabay.com/photo/2015/10/23/22/00/cat-828485__340.png"
            })
    })
    return response.json();
}


async function deleteTeam(id: number) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/matches/teams/' + id, {
        method: "DELETE"
    })
    return response.json();
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
            {status === 'error' && <p>{status}</p>}
            {status === 'loading' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {status === 'success' && (
                teams.map((item) => (
                    <div key={item.id} className="flex my-2 border-2 border p-2 rounded-lg">
                        <div>{item.name}</div>
                        <img src={process.env.NEXT_PUBLIC_URL + item.logo} className="rounded-lg aspect-square w-30 p-1" alt="logo"></img>
                    </div>)))}
        </div>
    )
}