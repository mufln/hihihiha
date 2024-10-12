import React from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import NewsTitle from '@/components/titles/news'
// import { it } from 'node:test'

const items = [
    {
        id: 1,
        title: "ПЕТТТР ИВАНОВ ЗАБИВАЕТ ГООООЛ!!!! ADFJH KGSD HJKLFGHD SLKJG HJKLHSD KJLG",
        image: "https://img.championat.com/s/732x488/news/big/m/v/krasnodar-vyigral-v-1-m-ture-na-chto-sposobny_15971549521046909251.jpg",
        info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями."
    },
    {
        id: 2,
        title: "КОМАНДА МОЙСКВАД ПОБЕЖДАЕТ В ХАКАТОНЕЕ!!!",
        image: "https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/6/97/347125904729976.webp",
        info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями."
    },
    {
        id: 3,
        title: "Изображение 3",
        image: "/image.png",
        info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями."
    },
    {
        id: 4,
        title: "Изображение 4",
        image: "/image.png",
        info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями."
    },
    {
        id: 5,
        title: "Изображение 5",
        image: "/image.png",
        info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями."
    },
]


export default function CardWithBackground() {
    return (
        <div className='lg:p-10 bg-white md:px-4 px-4 py-2 w-full'>
            <NewsTitle/>

            <div className="flex flex-wrap gap-4 my-10 lg:mx-12 place-content-center ">
                {items.map((item) => (
                    <Card key={item.id}
                          className=" border w-full duration-300 lg:max-w-3xl md:max-w-2xl overflow-hidden rounded-md ">
                        <div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="shadow-sm w-full aspect-video object-cover rounded-md bg-gradient-to-r from-indigo-500"
                            />
                            {/*<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 " />*/}
                        </div>
                        <CardTitle
                            className="xl:text-2xl duration-300 lg:text-lg md:text-md xl:m-10 lg:m-6 md:m-4 m-2 text-sm my-2 font-bold text-black box-content h-32">
                            {item.title}
                        </CardTitle>
                    </Card>))}
            </div>
        </div>
    )
}