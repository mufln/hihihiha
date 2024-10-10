import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NewsTitle from '@/components/titles/news'
// import { it } from 'node:test'

const items = [
    { id: 1, title: "ПЕТТТР ИВАНОВ ЗАБИВАЕТ ГООООЛ!!!!", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 2, title: "КОМАНДА МОЙСКВАД ПОБЕЖДАЕТ В ХАКАТОНЕЕ!!!", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 3, title: "Изображение 3", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 4, title: "Изображение 4", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 5, title: "Изображение 5", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
  ]

export default function CardWithBackground() {
  return (
    <div  className=' bg-white lg:p-10 md:px-4 px-4 py-2 w-full'>
    <NewsTitle/>

    <div className="flex flex-wrap gap-4 my-10 mx-auto md:mx-10">
        {items.map((item) => (
            <Card key={item.id} className="shadow-md w-max overflow-hidden bg-white rounded-md xl:w-1/4 lg:w-2/5 md:w-2/5 w-full lg:my-10 md:my-4 my-2">
                <div className="">
                <img
                    src={item.image}
                    alt={item.title}
                    className="shadow-sm  max-h-80 lg:max-h-96 w-full object-cover rounded-md"
                />
                {/*<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 " />*/}
                <CardHeader className="relative">

                </CardHeader>
                </div>
                <CardTitle className="xl:text-2xl lg:text-lg md:text-md mx-2 text-sm my-2 font-bold text-black truncate">
                    {item.title}
                </CardTitle>
                <CardContent className="my-2 mx-2 max-w-52">
                <p className="text-black lg:text-lg text-sm">
                    {item.info}
                </p>
                </CardContent>
                <CardFooter>
                <Button className="w-full text-black lg:text-lg md:text-md text-sm">Подробнее</Button>
                </CardFooter>
            </Card>))}
    </div>
    </div>
  )
}