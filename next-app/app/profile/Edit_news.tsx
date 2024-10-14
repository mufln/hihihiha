'use client'

import {QueryClient, useQuery} from "@tanstack/react-query";
import React from "react";

let queryClient = new QueryClient();

async function getNews() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts/', {
        method: "GET"
    })
    return response.json();
}

async function addNews() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts/', {
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
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts/'+id + "/", {
        method: "DELETE"
    })
    return response.json();
}


function News(props: {post: any}){
    return(
        <div>

        </div>
    )
}




export default function Edit_news() {
    const {data, status} = useQuery({
        queryKey: ['news'],
        queryFn: getNews
    })
    return (
        <div className="bg-white w-full gap-4 text-black">
            <h1 className="text-2xl font-bold flex flex-row">Новости</h1>
            {status === 'error' && <p>{status}</p>}
            {status === 'pending' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {status === "success" &&}
        </div>
    )
}
