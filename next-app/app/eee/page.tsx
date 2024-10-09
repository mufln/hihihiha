import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CardWithBackground() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="w-full overflow-hidden">
        <div className="relative h-[200px]">
          <img
            src="/placeholder.svg?height=200&width=400"
            alt="Card background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl font-bold text-white">
              Красивое место
            </CardTitle>
          </CardHeader>
        </div>
        <CardContent className="pt-4">
          <p className="text-muted-foreground">
            Это удивительное место, которое стоит посетить. Насладитесь прекрасными видами и незабываемыми впечатлениями.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Подробнее</Button>
        </CardFooter>
      </Card>
    </div>
  )
}