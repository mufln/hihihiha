import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPinIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function GameInfo() {

    const gameData = {
        title: 'Высший дивизион - 24 тур', 
        date: '20.09.2023', 
        time: '15:00', 
        place: 'Вернадка парк #1',  
        teamA: {n: 'ФК Кокос', image: '/image.png', players: [
            {id: 1, name:"Чипи Чапов", role: "Защитник"},
            {id: 2, name:"Дуби Дубинин", role: "Нападающий"},
            {id: 3, name:"Александр Александров", role: "Вратарь"}
            ]}, 
        teamB: {n: 'неФК Кокос', image: '/image.png', players: [
            {id: 4, name:"Иван Иванов", role: "Защитник"},
            {id: 5, name:"Петр Петров", role: "Нападающий"},
            {id: 6, name:"Б. Ю. Александров", role: "Вратарь"}
        ]},
        video: "https://rutube.ru/play/embed/0f0a1902a9e5a9fbfa80b5494e436f2c",
        status: "Игра началась",
        score: "3:0"
    }
    
    const statisticsData = [
        { name: "Удары в створ", total: [2, 1]},
        { name: "Фолы", total: [2, 1]},
        { name: "Угловые", total: [2, 1]},
        { name: "Оффсайды", total: [2, 1]},
        { name: "% владения мячом", total: [60, 40]},
        { name: "Предупреждения", total: [2, 1]},
        { name: "Удаления", total: [0, 1]},
    ]

    const StatisticsBar = ({ name, total }: { name: string; total: number[] }) => {
        const sum = total[0] + total[1];
        const percentage1 = ((total[0] / sum) * 100).toFixed(1);
        const percentage2 = ((total[1] / sum) * 100).toFixed(1);

        return (
            <div className='mb-4'>
                <div className='font-bold text-center'>{name}</div>
                <div className='flex items-center'>
                    <div className="bg-red-600 h-2  rounded-l-xl" style={{width: `${percentage1}%`}}></div>
                    <div className="bg-green-500 h-2 rounded-r-xl" style={{width: `${percentage2}%`}}></div>
                </div>
                <div className="flex justify-between text-sm mt-1">
                    <span>{total[0]}</span>
                    <span>{total[1]}</span>
                </div>
            </div>
        )
    }

    return (
        <div className='text-black bg-white w-full h-full'> 
            <Card className="w-full rounded-3xl p-8 flex flex-col gap-2"
                style={{
                    width: '20rem',
                    borderRadius: '30px',
                    marginBottom: '1rem',
                    backgroundPosition: 'center center',
                }}>
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                    <Badge variant="secondary" className='border-none bg-[#26E065] text-black MuseoBoldItalic px-2 py-1 rounded-3xl'>{gameData.title}</Badge>
                    </div>
                </CardHeader>
                <CardContent className='flex flex-col gap-2 justify-center items-center'>
                    <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                        <img src={gameData.teamA.image} alt="Team A Logo" className="w-16 h-16 mx-auto mb-2 rounded-full" />
                        <h3 className="">{gameData.teamA.n}</h3>
                    </div>
                    <div className="text-center flex flex-col gap-1 items-center">
                        {gameData.score === '' ? <div className="text-3xl font-bold mx-auto">VS</div> : <div className="text-3xl font-bold mx-auto">{gameData.score}</div>}
                        <span>{gameData.date}</span>
                        <Badge variant="secondary" className='border-none bg-[#E02A26] text-white MuseoBold px-2 py-1 rounded-3xl max-w-max'>
                            {gameData.time}
                        </Badge>
                        {/* <div className="text-sm text-muted-foreground mt-1 mx-auto text-center"></div> */}

                    </div>
                    <div className="text-center">
                        <img src={gameData.teamB.image} alt="Team B Logo" className="w-16 h-16 mx-auto mb-2  rounded-full" />
                        <h3 className="">{gameData.teamB.n}</h3>
                    </div>
                    </div>
                    <Badge variant="secondary" className='border-none bg-[#26E065] text-black px-2 py-1 rounded-3xl flex max-w-max'>
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span className="MuseoBoldItalic">{gameData.place}</span>
                    </Badge>
                </CardContent>
                </Card>

               <div className='w-full p-3'>
                   <h1 className='text-3xl font-bold mb-4'>Команды</h1>
                   <div className='flex flex-wrap gap-8'>
                    <div className='space-y-2 p-2 w-full'>
                        <Badge variant="secondary" className='border-none bg-[#E02A26] text-white text-xl MuseoBoldItalic px-2 py-1 rounded-3xl max-w-max'>{gameData.teamA.n}</Badge>
                       <div className='overflow-x-hidden h-30'>
                           {gameData.teamA.players.map((item, index) => (
                               <div className='flex justify-between border-b-2' key={index}>
                                <p className='text-xl text-center mb-0 mt-4 whitespace-nowrap mr-4 max-w-[50%] text-ellipsis overflow-hidden'>
                                    {item.name}</p>
                                <p className='text-xl text-center mb-0 mt-4'>{item.role}</p>
                                </div>
                           ))}
                       </div>
                        </div>
                        <div className=' space-y-2 p-2 w-full'>
                        <Badge variant="secondary" className='border-none bg-[#26E065] text-xl MuseoBoldItalic px-2 py-1 rounded-3xl max-w-max'>{gameData.teamB.n}</Badge>
                       <div className='overflow-x-hidden h-30'>
                           {gameData.teamB.players.map((item, index) => (
                               <div className='flex justify-between border-b-2' key={index}>
                                       <p className='text-xl text-center mb-0 mt-4 whitespace-nowrap mr-4 max-w-[50%] text-ellipsis overflow-hidden'>
                                        {item.name}</p>
                                       <p className='text-xl text-center mb-0 mt-4'>{item.role}</p>
                                </div>
                            //    {index === gameData.teamB.players.length - 1 ? null : <div className='w-1/2'></div>}
                            //    </div>
                           ))}
                       </div>
                        </div>
                   </div>
               </div>

               <div className='w-full p-3'>
                   <h1 className='text-3xl font-bold mb-4'>Статистика матча</h1>
                   <div className='w-full p-3 md:grid grid-cols-2 gap-x-10'>
                        {statisticsData.map((item, index) => (
                            <StatisticsBar name={item.name} total={item.total} key={index}/>
                        ))}
                   </div>
               </div>

            </div>
    )
}