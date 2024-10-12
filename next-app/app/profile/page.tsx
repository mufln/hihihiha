"use client";
import React from 'react'
import { useState } from 'react'
import InfoTitle from './titles/my-info';
import { Edit3 } from "lucide-react"
import MyGamesTitle from './titles/my-games';
import MyNewsTitle from './titles/my-news';
import MyBuysTitle from './titles/my-buys';


export default function CardWithBackground() {
  const userData = {
        id: 1,
        role: "admin",
        login: "JonnyBoy",
        avatar: "https://img.freepik.com/free-photo/smiling-young-man-with-crossed-arms-outdoors_1140-255.jpg?t=st=1728669874~exp=1728673474~hmac=4c5e807a6f6043595dc7a3cd523eba02b0fe559a900cac4194b08b80d1b1744e&w=1380",
    }

  const [activeComponent, setActiveComponent] = useState<string>('default');

  // const showFirstComponent = () => setActiveComponent('first');
  const showSecondComponent = () => setActiveComponent('second');
  const showThirdComponent = () => setActiveComponent('third');
  const showFourthComponent = () => setActiveComponent('fourth');
  const showFifthComponent = () => setActiveComponent('fifth');

  return (

    
    <div  className=' bg-white p-5 w-full flex gap-4'>
        <div className="bg-white w-1/5 flex flex-col gap-4 min-w-20">
            <div className="bg-black p-4 rounded-lg flex flex-col gap-2 min-w-[200px]">
              <img src={userData.avatar} className="rounded-lg aspect-square w-30 p-1"></img>
              <div className='flex gap-1'>
                <h2 className="text-center text-white font-bold text-3xl ">{userData.login}</h2>
                <div className='text-s text-gray-300'>{userData.role}</div> 
              </div> 
            </div>
            <div className="flex flex-wrap gap-2 text-xl">
              <button className="bg-black text-white rounded-[30px] p-3 hover:bg-green-600 hover:text-black" onClick={showSecondComponent}>Мои Матчи</button>
              <button className="bg-black text-white rounded-[30px] p-3 hover:bg-green-600 hover:text-black" onClick={showThirdComponent}>Мои Новости</button>
              <button className="bg-black text-white rounded-[30px] p-3 hover:bg-green-600 hover:text-black" onClick={showFourthComponent}>Мои Покупки</button>
              <button className="bg-black text-white rounded-[30px] p-3 hover:bg-green-600 hover:text-black" onClick={showFifthComponent}>Панель Управления</button>
            </div> 
        </div>
        <section className="w-4/5">
            {activeComponent === 'default' && <DefaultComponent/>}
            {activeComponent === 'second' && <SecondComponent/>}
            {activeComponent === 'third' && <ThirdComponent/>}
            {activeComponent === 'fourth' && <FourthComponent/>}
            {activeComponent === 'fifth' && <FifthComponent/>}
        </section>
    </div>
  )
}

function DefaultComponent() {
  const userInfo = [
    {title: 'Имя', value: 'John Doe'},
    {title: 'Телефон', value: '123-456-7890'},
    {title: 'E-mail', value: 'johndoe@gmail.com'},
    {title: 'Адрес', value: '123 Main St, Anytown, USA'},
    {title: 'Дата рождения', value: '01/01/1990'},
    {title: 'Пароль', value: ''}
  ]
  //   id: 1,
  //   login: "JonnyBoy",
  //   name: "John Doe",
  //   phone: "123-456-7890",
  //   email: "johndoe@gmail.com",
  //   address: "123 Main St, Anytown, USA",
  //   birthday: "01/01/1990",
  //   pasword: "12345678",
  // }

  return (
    <div>
      {/* <div className='p-4'><InfoTitle/></div> */}
      <div className="flex flex-col p-3 text-black">
        {userInfo.map((item, index) => (
          <div className="flex items-center p-2" key={index}>
            <span className='text-base'>{item.title}: {item.value}</span>
            <button className="rounded-[30px] p-2 text-xl text-gray-300 hover:opacity-50"><Edit3/></button>
          </div>
        ))}
      </div>
    </div>
  )
}
 

  

function SecondComponent() {
  return (
    <div>
      <div className='p-4'><MyGamesTitle/></div>
    </div>
  )
}

function ThirdComponent() {
  return (
    <div>
      <div className='p-4'><MyNewsTitle/></div>
    </div>
  )
}

function FourthComponent() {
  return (
    <div> 
      <div className='p-4'><MyBuysTitle/></div>
    </div>
  )
}

function FifthComponent() {
  return (
    <div> 5-th</div>
  )
}