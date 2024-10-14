'use client'


import {useRef} from "react";
import {cookies} from "next/headers";
import {useQueryClient} from "@tanstack/react-query";

async function login(log: any, password: any, queryClient:any) {
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
    queryClient.invalidateQueries({queryKey: ['user']})
    return response.json();
}

function LoginForm() {
    const queryClient = useQueryClient();
    let log = useRef(null);
    let password = useRef(null);
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="text-black">
            <h1 className="text-2xl font-bold ">Вход</h1>
            <form className="flex my-2 border-2 border p-2 rounded-lg gap-2" onSubmit={e => e.preventDefault()}>
                Логин
                <input type="text" className="w-1/5 border rounded px-2 " ref={log}/>
                Пароль
                <input type="password" className="w-1/5 border rounded px-2 " ref={password}/>
                <button onClick={() => login(log, password, queryClient)}
                        className="border border-2 text-sm border-black hover:text-white mr-0 ml-auto hover:bg-black duration-100 rounded w-fit px-2">Войти
                </button>
            </form>
        </div>
    )
}

async function register(log: any, password: any, full_name: any, email: any) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/register/', {
        method: "POST",
        headers: {"Content-Type": "application/json",
        "accept": "application/json"},
        // credentials: "include",
        // origin: "http://localhost:8000",
        body: JSON.stringify(
            {
                "username": log.current.value,
                "password": password.current.value,
                "full_name": full_name.current.value,
                "email": email.current.value,
            })
    })
    console.log(response)
    return response.json();
}

function Register() {
    let log = useRef(null);
    let password = useRef(null);
    let full_name = useRef(null);
    let email = useRef(null);
    return (
        <div className="text-black">
            <h1 className="text-2xl font-bold ">Регистрация</h1>
            <form className="flex my-2 border-2 border p-2 rounded-lg gap-2" onSubmit={e => e.preventDefault()}>
                Имя
                <input type="text" className="w-1/5 border rounded px-2 " ref={full_name}/>
                Логин
                <input type="text" className="w-1/5 border rounded px-2 " ref={log}/>
                Пароль
                <input type="password" className="w-1/5 border rounded px-2 " ref={password}/>
                Почта
                <input type="text" className="w-1/5 border rounded px-2 " ref={email}/>
                <button onClick={() => register(log, password, full_name, email)}
                        className="border border-2 text-sm border-black hover:text-white mr-0 ml-auto hover:bg-black duration-100 rounded w-fit px-2">Войти
                </button>
            </form>
        </div>
    )
}

export default function Login() {
    return (
        <><Register/><LoginForm/></>)
}