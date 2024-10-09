import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { it } from 'node:test'

const items = [
    { id: 1, title: "Изображение 1", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 2, title: "Изображение 2", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 3, title: "Изображение 3", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 4, title: "Изображение 4", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
    { id: 5, title: "Изображение 5", image: "/image.png", info: "Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями." },
  ]

export default function CardWithBackground() {
  return (
    <div className="grid grid-cols-4 gap-4 bg-white p-10">
        {items.map((item) => (
            <Card className="w-full overflow-hidden bg-black p-8 rounded-lg">
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
                <CardContent className="pt-4">
                <p className="text-muted-foreground">
                    {item.info}
                </p>
                </CardContent>
                <CardFooter>
                <Button className="w-full text-white">Подробнее</Button>
                </CardFooter>
            </Card>))}
    </div>
  )
}