'use client'
import "../../styles/tbody.css";
import React, {useState} from 'react';
import TeamTitle from '@/components/titles/team';
import {useRouter} from "next/navigation";
import Link from "next/link";
import {QueryClient, useQuery} from "@tanstack/react-query";


const queryClient = new QueryClient();


let getTeam = async () => {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL+ '/team/', {
        method: "GET",
        credentials: "include"
    })
    return response.json();
}



export default function Component() {
    const router = useRouter();
    const previewData = [
        {
            title: 'Иван Иванов',
            desc: 'Вратарь',
            backgrounndImage: 'url(https://img.freepik.com/free-photo/young-attractive-football-player_144627-5781.jpg?t=st=1728554882~exp=1728558482~hmac=bef19a7411506bce5ebdfe6775cadee6ea8258218c318c67f0bd6f9d83a88a15&w=900)'
        },
        {
            title: 'Петр Петров',
            desc: 'Защитник',
            backgrounndImage: 'url(https://img.freepik.com/free-photo/young-sportsman-posing-near-soccer-ball_23-2147820696.jpg?t=st=1728554963~exp=1728558563~hmac=0570e41138ed949f4bc894f8f63b6a669d1e803c07b3ff18519d8968a4985497&w=900)'
        },
        {
            title: 'Александр Александров',
            desc: 'Нападающий',
            backgrounndImage: 'url(https://img.freepik.com/free-photo/soccer-player-with-ball-standing-knee-play-football_176420-16453.jpg?t=st=1728555008~exp=1728558608~hmac=3a86375a2a0f0c2465597de0479b3f3db7a5a1708f3165251af28adfab658896&w=900)'
        },
        {
            title: 'Б. Ю. Александров',
            desc: 'Нападающий',
            backgrounndImage: 'url(https://img.freepik.com/free-photo/soccer-player-with-ball-standing-knee-play-football_176420-16453.jpg?t=st=1728555008~exp=1728558608~hmac=3a86375a2a0f0c2465597de0479b3f3db7a5a1708f3165251af28adfab658896&w=900)'
        },
        {
            title: 'Чипи Чапов',
            desc: 'Нападающий',
            backgrounndImage: 'url(https://avatars.mds.yandex.net/get-shedevrum/5570741/img_491b62a286fd11efb8d3f67acb6a4d8d/orig)'
        },
        {
            title: 'Дуби Дубинин',
            desc: 'Нападающий',
            backgrounndImage: 'url(https://avatars.mds.yandex.net/get-shedevrum/5570741/img_b5b38b9886fd11efb424c6eb7d220bbe/orig)'
        }

    ]
    const {data, status} = useQuery({
        queryKey: ['team'],
        queryFn: getTeam
    })
    console.log(data)
    return (
        <div className='Body bg-white lg:p-10 p-2 w-full'>
            <TeamTitle/>
            <div className=" my-10 flex-wrap flex mx-auto ">
                {status === 'error' && <p>{status}</p>}
                {status === 'loading' &&
                    <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
                {status === 'success' && (
                data.map((item) => (
                    <div className='preview duration-300 lg:w-96 w-80 hover:' key={item.id}
                         onClick={() => {
                            router.push("/team/player?id="+item.id)
                         }}
                         style={{backgroundImage: "url("+ process.env.NEXT_PUBLIC_API_URL + item.media[0].filename +")"}}>
                            <div
                                className='h-full hover:pt-0 lg:text-lg text-md bg-gradient-to-t from-black from-10% to-40% truncate hover:opacity-100 rounded-lg py-4 duration-300 opacity-100 lg:opacity-0 text-center '>
                                <h2 className="lg:mt-96 mt-80">{item.name}</h2>
                                <p className="">{item.role}</p>

                            </div>
                    </div>
                )))}
            </div>
        </div>
    )
}

// export default Body;
