'use client'

import {QueryClient, useQuery} from "@tanstack/react-query";

let queryClient = new QueryClient();

async function getNews() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/news', {
        method: "GET"
    })
    return response.json();
}

async function addNews() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/news', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(
        {
                title: "Новость",
                description: "Описание"
            })
    })
    return response.json();
}

async function deletePost(id) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/news/'+id, {
        method: "DELETE"
    })
    return response.json();
}

export default function Edit_news() {
    const {data, status} = useQuery({
        queryKey: ['news'],
        queryFn: getNews
    })
    return (
        <div>
            <h1>Новости</h1>
            {status === 'error' && <p>{status}</p>}
            {status === 'loading' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {status === 'success' && (
                data.map((item) => (
                    <div key={item.id} className="flex">{item.title} {item.description}
                        <button onClick={() => deletePost(item.id)}>X</button>
                    </div>)))}
        </div>
    )
}
