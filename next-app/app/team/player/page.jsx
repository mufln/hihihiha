'use client'
import Active from "@/components/titles/active-player"
import '../../../styles/tbody.css'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import StatTitle from "@/components/titles/statistics"
import {QueryClient, useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";


const backgroundImage = 'url(https://avatars.mds.yandex.net/get-shedevrum/5570741/img_b5b38b9886fd11efb424c6eb7d220bbe/orig)'
const biograhpy = `Лукас Томпсон начал свою профессиональную карьеру в юношеской академии "Манчестер Юнайтед" в возрасте 8 лет. Он быстро продвигался по служебной лестнице, впечатляя тренеров своей скоростью, ловкостью и мастерством на добивании. В 2013 году он дебютировал на профессиональном уровне за "Манчестер Юнайтед" в матче Лиги чемпионов против мадридского "Реала".
В 2016 году Томпсон перешел в "Пари Сен-Жермен" за рекордную сумму в 60 миллионов евро. За три года работы в "ПСЖ" он выиграл два титула чемпиона Лиги 1, один Кубок Франции и один Кубок Лиги чемпионов. Он также сформировал смертоносное атакующее трио с Неймаром и Килианом Мбаппе, получив прозвище "Лев" за свою бесстрашную и доминирующую игру на поле.
В 2019 году Томпсон вернулся в Премьер-лигу, подписав контракт с "Ливерпулем" за 80 миллионов евро. С тех пор он стал любимцем болельщиков "Энфилда", известный своей неустанной работой, исключительным видением и способностью забивать решающие голы в важных матчах.`
const items = [
    {id: 1, title: "Игры", value: 24},
    {id: 2, title: "Голы", value: 57},
    {id: 3, title: "Передачи", value: 11},
    {id: 4, title: "ЖК", value: 3},
    {id: 5, title: "КК", value: 1},
]


const queryClient = new QueryClient();

async function getPlayer(id) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/team/' + id, {
        method: "GET"
    })

    return response.json();
}


export default function Player() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    let {data, status} = useQuery({
        queryKey: ['player'],
        queryFn: () => getPlayer(id)
    })
    console.log(data)
    const tableData = Array.from({length: 7}, (_, rowIndex) =>
        Array.from({length: 7}, (_, colIndex) => `${rowIndex + 1}-${colIndex + 1}`)
    )
    return (
        <div className="h-full bg-white lg:flex md:flex lg:flex-wrap md:flex-wrap text-black p-4">
            <div className="flex flex-col mb-8">
                <div className="flex-wrap space-x-4">
                    {status === 'error' && <p>{status}</p>}
                    {status === 'loading' &&
                        <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
                    {status === 'success' && (
                        <div className='preview mb-4 mx-auto'
                             style={{backgroundImage: "url(" + process.env.NEXT_PUBLIC_API_URL + data.media[0].filename + ")"}}>
                            <div className="h-full lg:text-lg text-md bg-gradient-to-t from-black/80 from-0% to-30% truncate rounded-lg py-4 duration-300 opacity-100 text-center">
                            <div className="flex-1">

                            </div>
                            </div>
                        </div>)}
                    <Active/>
                    <h2 className="text-4xl">{status === "success" && (data.name)}</h2>
                    <p className="mt-1 text-xl">{status === "success" && data.role}</p>
                </div>
                <div className=" flex mt-4 bg-black text-white rounded-2xl p-2 max-w-max">
                    {items.map((item, index) => (
                        <div className='col m-1' key={index}>
                            <div className="text-base text-center m-2">
                                {item.title}
                            </div>
                            <div className="text-lg font-bold text-center m-2">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" flex flex-col max-w-max text-gray-500 px-6">
                <h2 className="text-4xl">Биография</h2>
                <p className="my-2 max-w-3xl text-justify indent-4">{status === "success" && (data.bio)}</p>
            </div>
            <div className="container flex flex-col mx-auto  mt-8">
                <StatTitle/>
                <Table className="my-4 rounded-lg overflow-hidden border-2 border-black">
                    <TableHeader className="">
                        <TableRow className="">
                            {["", "", "И", "Г", "ПАС.", "ЖК", "КК"].map((item, index) => (
                                <TableHead key={index} className="p-4 text-center border-2 border-black">
                                    {item}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex} className="text-center border-2 border-black">
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}