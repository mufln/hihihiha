'use client'


import {useRef} from "react";
import {cookies} from "next/headers";

async function login(log, password) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded",
        "accept": "application/json"},
        // credentials: "include",
        // origin: "http://localhost:8000",
        body: new URLSearchParams(
            {
                "grant_type": "password",
                "username": log.current.value,
                "password": password.current.value,
                "client_id": log.current.value,
                "client_secret": password.current.value
            })
    })
    return response.json();
}

export default function Login() {
    let log = useRef('');
    let password = useRef('');

    return (
        <div className="text-black">
            <h1 className="text-2xl font-bold ">Login</h1>
            <form className="flex my-2 border-2 border p-2 rounded-lg gap-2" onSubmit={e => e.preventDefault()}>
                Логин
                <input type="text" className="w-1/5 border rounded px-2 " ref={log}/>
                Пароль
                <input type="password" className="w-1/5 border rounded px-2 " ref = {password}/>
                <button onClick={() => login(log, password)} className="border border-2 text-sm border-black hover:text-white mr-0 ml-auto hover:bg-black duration-100 rounded w-fit px-2">Войти</button>
            </form>
        </div>
    )
}