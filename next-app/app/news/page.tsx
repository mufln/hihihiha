'use client'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NewsTitle from '@/components/titles/news'
import { useRouter } from 'next/navigation'
// import { it } from 'node:test'

const items = [
    { id: 1, title: "Изображение 1", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 2, title: "Изображение 2", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 3, title: "Изображение 3", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 4, title: "Изображение 4", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 5, title: "Изображение 5", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
  ]

export default function CardWithBackground() {
  const router = useRouter();
  return (
    <div  className=' bg-white p-10 w-full'>
    <NewsTitle/>

    <div className="flex flex-wrap justify-start gap-4 my-10">
        {items.map((item) => (
            <Card key={item.id} onClick={() => router.push('/news/newspage')} className="w-max overflow-hidden bg-black p-8 rounded-3xl">
                <div className="relative h-[200px]">
                <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 " />
                <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold text-white">
                    {item.title}
                    </CardTitle>
                </CardHeader>
                </div>
                <CardContent className="py-4 max-w-52">
                <p className="text-muted-foreground text-sm">
                    {item.info}
                </p>
                </CardContent>
                <CardFooter>
                <Button className="w-full text-white">Подробнее</Button>
                </CardFooter>
            </Card>))}
    </div>
    </div>
  )
}