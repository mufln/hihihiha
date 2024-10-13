"use client";
import React from 'react'
import {useState} from 'react'
import InfoTitle from './titles/my-info';
import {Edit3} from "lucide-react"
import MyGamesTitle from './titles/my-games';
import MyNewsTitle from './titles/my-news';
import MyBuysTitle from './titles/my-buys';
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import button from "next/link";
import Edit_matches from "./Edit_matches";
import Edit_news from "./Edit_news";
import Edit_team from "./Edit_team";
import Edit_store from "./Edit_store";
import Edit_system from "./Edit_system";
import Edit_teams from "./Edit_teams";
import Login from "@/app/profile/Login";

const queryClient = new QueryClient();

async function getUser() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/me', {
        method: "GET",
        credentials: "include"
    })
    return response.json();
}

export default function CardWithBackground() {
    const userData = {
        id: 1,
        role: "admin",
        login: "Акакий Акакиевич Акакьев",
        avatar: "https://img.freepik.com/free-photo/smiling-young-man-with-crossed-arms-outdoors_1140-255.jpg?t=st=1728669874~exp=1728673474~hmac=4c5e807a6f6043595dc7a3cd523eba02b0fe559a900cac4194b08b80d1b1744e&w=1380",
    }
    const {data, status} = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })
    console.log(data)
    const [activeComponent, setActiveComponent] = useState<string>('login');

    const login = () => setActiveComponent('login');
    const showMatches = () => setActiveComponent('edit_matches');
    const showTeams = () => setActiveComponent('edit_teams');
    const showNews = () => setActiveComponent('edit_news');
    const showTeam = () => setActiveComponent('edit_team');
    const showStore = () => setActiveComponent('edit_store');
    const showSystem = () => setActiveComponent('edit_system');
    const showCart = () => setActiveComponent('cart');

    return (
        <div className=' bg-white p-5 w-full flex gap-4'>
            <div className="bg-white w-min  gap-4 min-w-20">
                <div className="bg-black mb-2 p-4 rounded-lg gap-2 min-w-52">
                    {/*<img src={userData.avatar} className="rounded-lg aspect-square w-30 p-1"></img>*/}
                    <div className=' gap-1'>
                        <h2 className="text-left text-white font-bold text-3xl ">{userData.login}</h2>
                        <div className='text-s text-gray-300'>{userData.role}</div>
                    </div>
                </div>
                <div className=" gap-2 flex flex-wrap text-xl">
                    {status === 'error' && <p>{status}</p>}
                    {status === 'pending' &&
                        <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
                    {/*{(status === 'success' && data.role === "admin") && (*/}
                    <button onClick={showMatches}
                            className="bg-black w-full min-w-52 text-white rounded-lg p-3 hover:font-bold hover:text-black hover:bg-white border-2 border-black duration-100">Матчи</button>
                    <button onClick={showTeams}
                            className="bg-black w-full min-w-52 text-white rounded-lg p-3 hover:font-bold hover:text-black hover:bg-white border-2 border-black duration-100">Команды</button>
                    <button onClick={showNews}
                            className="bg-black w-full min-w-52 text-white rounded-lg p-3 hover:font-bold hover:text-black hover:bg-white border-2 border-black duration-100">Новости </button>
                    <button onClick={showTeam}
                            className="bg-black w-full min-w-52 text-white rounded-lg p-3 hover:font-bold hover:text-black hover:bg-white border-2 border-black duration-100">Команда</button>
                    <button onClick={showStore}
                        className="bg-black w-full min-w-52 text-white rounded-lg p-3 hover:font-bold hover:text-black hover:bg-white border-2 border-black duration-100">Магазин</button>
                    <button onClick={showSystem}
                            className="bg-black w-full min-w-52 text-white rounded-lg p-3 hover:font-bold hover:text-black hover:bg-white border-2 border-black duration-100">Система
                    </button>
                    <button onClick={showCart}
                            className="bg-black w-full min-w-52 text-white rounded-lg p-3 hover:font-bold hover:text-black hover:bg-white border-2 border-black duration-100">Покупки</button>
                    {/*<button className="bg-black w-full text-white rounded-[30px] p-3 hover:font-bold hover:text-black hover:bg-white border-2 border-black " onClick={showFifthComponent}>Панель Управления</button>*/}
                </div>
            </div>
            <section className="w-4/5">
                {activeComponent === 'login' && <Login/> }
                {activeComponent === 'edit_matches' && <Edit_matches/> }
                {activeComponent === 'edit_teams' && <Edit_teams/> }
                {activeComponent === 'edit_news' && <Edit_news/>}
                {activeComponent === 'edit_team' && <Edit_team/>}
                {activeComponent === 'edit_store' && <Edit_store/>}
                {activeComponent === 'edit_system' && <Edit_system/>}
            </section>
        </div>
    )
}

// function DefaultComponent() {
//     const userInfo = [
//         {title: 'Имя', value: 'John Doe'},
//         {title: 'Телефон', value: '123-456-7890'},
//         {title: 'E-mail', value: 'johndoe@gmail.com'},
//         {title: 'Адрес', value: '123 Main St, Anytown, USA'},
//         {title: 'Дата рождения', value: '01/01/1990'},
//         {title: 'Пароль', value: ''}
//     ]
//     //   id: 1,
//     //   login: "JonnyBoy",
//     //   name: "John Doe",
//     //   phone: "123-456-7890",
//     //   email: "johndoe@gmail.com",
//     //   address: "123 Main St, Anytown, USA",
//     //   birthday: "01/01/1990",
//     //   pasword: "12345678",
//     // }
//
//     return (
//         <div>
//             {/* <div className='p-4'><InfoTitle/></div> */}
//             <div className="flex flex-col p-3 text-black">
//                 {userInfo.map((item, index) => (
//                     <div className="flex items-center p-2" key={index}>
//                         <span className='text-base'>{item.title}: {item.value}</span>
//                         <button className="rounded-[30px] p-2 text-xl text-gray-300 hover:opacity-50"><Edit3/></button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }