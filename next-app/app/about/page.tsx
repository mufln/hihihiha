"use client";

import React from 'react'
import AboutTitle from '@/components/titles/about'
import { useState } from 'react'

export default function CardWithBackground() {

  const [activeComponent, setActiveComponent] = useState<string>('first');

  const showFirstComponent = () => setActiveComponent('first');
  const showSecondComponent = () => setActiveComponent('second');
  const showThirdComponent = () => setActiveComponent('third');
  const showFourthComponent = () => setActiveComponent('fourth');

  return (
    <div  className=' bg-black p-10 w-full'>
    <AboutTitle/>
    <img src="/team.png" className='w-full h-full'></img>
    <div className='flex p-4 gap-4 flex-wrap'>
      <button onClick={showFirstComponent} className='border-2 border-red-600 text-white rounded-[30px] px-4 py-2 hover:border-green-500 hover:bg-green-500 hover:text-black' >Результаты сезонов</button>
      <button onClick={showSecondComponent} className='border-2 border-red-600 text-white rounded-[30px] px-4 py-2 hover:border-green-500 hover:bg-green-500 hover:text-black' >История клуба</button>
      <button onClick={showThirdComponent} className='border-2 border-red-600 text-white rounded-[30px] px-4 py-2 hover:border-green-500 hover:bg-green-500 hover:text-black' >Партнеры</button>
    </div>
    <div>
            {activeComponent === 'first' && <FirstComponent/>}
            {activeComponent === 'second' && <SecondComponent/>}
            {activeComponent === 'third' && <ThirdComponent/>}
    </div>
    </div>
  )
}
function FirstComponent() {
  
  const results = [
    {season: "24/25", achivements: "Футбольный клуб Кокос Групп победил в региональном чемпионате Лиги чемпионов против мадридского «Реала»"},
    {season: "23/24", achivements: "Футбольный клуб Кокос Групп победил в региональном чемпионате Лиги чемпионов против мадридского «Реала»"},
    {season: "22/23", achivements: "Футбольный клуб Кокос Групп победил в региональном чемпионате Лиги чемпионов против мадридского «Реала»"},
    {season: "21/22", achivements: "Футбольный клуб Кокос Групп победил в региональном чемпионате Лиги чемпионов против мадридского «Реала»"},
    {season: "20/21", achivements: "Футбольный клуб Кокос Групп победил в региональном чемпионате Лиги чемпионов против мадридского «Реала»"},
  ]

  return (
    <table className='table-auto border-collapse border-spacing-0 w-full'>
      <thead>
        <tr>
          <th className='text-xl font-bold pr-2'>Сезон</th>
          <th className='border-b-2 border-gray-500 text-xl'>Достижения</th>
        </tr>
      </thead>
      <tbody className=''>
        {results.map((item, index) => (
          <tr key={index}>
            <td className=' text-red-600 font-bold text-3xl text-center py-3 pr-2'>{item.season}</td>
            <td className='border-b-2 border-gray-500 py-3'>{item.achivements}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SecondComponent() {
  return (
    <div>
      <div className='text-justify text-xl'>
        <p>
          Футбольный клуб "Кокос Групп" был основан в 2015 году в небольшом прибрежном городе, который славился своими кокосовыми плантациями. Идея создания команды принадлежала группе молодых предпринимателей, которые решили объединить свою любовь к футболу и бизнесу, связав название клуба с главным продуктом их региона.
        </p>
          С самого начала "Кокос Групп" стремился к тому, чтобы стать не просто футбольной командой, а настоящим символом местного сообщества. Клуб активно поддерживал молодежные инициативы и организовывал различные спортивные мероприятия для жителей города. Это позволило "Кокос Групп" быстро завоевать популярность среди местных жителей и привлечь талантливых игроков из окрестностей.
        <p>
          Первый успех пришел к клубу в 2018 году, когда "Кокос Групп" выиграл региональный чемпионат, что позволило ему выйти на национальную арену. Этот триумф стал возможен благодаря сплоченной команде и талантливому тренеру, который смог раскрыть потенциал каждого игрока.
        </p>
        <p>
          На протяжении следующих нескольких лет клуб продолжал развиваться, инвестируя в инфраструктуру и молодёжную академию. Это привлекло внимание крупных спонсоров, и вскоре "Кокос Групп" стал одним из самых перспективных клубов в стране.
        </p>
        <p>
          К 2023 году "Кокос Групп" уже прочно закрепился в высшем дивизионе национального чемпионата. Клуб продолжал радовать своих болельщиков яркой и атакующей игрой, а также занимался благотворительной деятельностью, поддерживая различные социальные проекты в регионе.
        </p>
        <p>
          Сегодня "Кокос Групп" — это не только успешная футбольная команда, но и важная часть жизни города, вдохновляющая молодёжь на новые достижения и объединяющая людей вокруг спорта и общих ценностей.
        </p>
      </div>
    </div>
    
  )
}

function ThirdComponent() {
  
  const partners = [
    {logo: "/image.png", name: "Catland Company"},
    {logo: "/image.png", name: "Catland Company"},
    {logo: "/image.png", name: "Catland Company"},
    {logo: "/image.png", name: "Catland Company"},
    {logo: "/image.png", name: "Catland Company"}
  ]
  
  return (
    <div className='flex flex-wrap gap-4 justify-center'>
      {partners.map((item, index) => (
        <div className='w-1/4 p-4' key={index}>
          <img src={item.logo} className='w-full aspect-square'></img>
          <h2 className='w-full text-center text-2xl font-bold'>{item.name}</h2>
        </div>
      ))}
    </div>
  )
}