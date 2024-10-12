'use client'
 
import { useRouter } from 'next/navigation'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import ShopTitle from '@/components/titles/shop'

import Image from "next/image"
import { Badge, StarIcon } from "lucide-react"
// import { it } from 'node:test'

const items = [
    { id: 1, title: "Товар 1", image: "/image.png", price: "199 p" },
    { id: 2, title: "Товар 2", image: "/image.png", price: "199 p" },
    { id: 3, title: "Товар 3", image: "/image.png", price: "199 p" },
    { id: 4, title: "Товар 4", image: "/image.png", price: "199 p" },
    { id: 5, title: "Товар 5", image: "/image.png", price: "199 p" },
  ]

export default function CardWithBackground() {
  const router = useRouter();
  return (
    <div  className=' bg-white p-10 w-full '>
      <div className='flex flex-wrap justify-between content-center justify-between gap-4'>
        <ShopTitle/> 
        <Button onClick={() => router.push('/shop/cart')} className="w-full bg-black p-4 rounded-3xl text-xl max-w-max mr-16">Корзина</Button>
      </div>
    
    <div className="flex flex-wrap gap-4 justify-start my-10">
        {items.map((item) => (
          <Card key={item.id} onClick={() => router.push('/shop/product')} className="bg-black p-8 rounded-3xl"
          style={{
            width: '20rem',
            aspectRatio: '3/4',
            borderRadius: '30px',
            marginBottom: '1rem',
            backgroundPosition: 'center center',
          }}>
            <CardHeader className="relative p-0">
              <Image
                src={`${item.image}`}
                alt="Product image"
                width={300}
                height={400}
                className="object-cover rounded-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold mr-2">{item.price}</span>
                {/* <span className="text-sm text-gray-500 line-through">249.99р</span> */}
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <button onClick={() => router.push('/shop/product')} className="w-full bg-[#E02A26] p-4 rounded-3xl text-xl text-center">Подробнее</button>
            </CardFooter>
          </Card>))}
    </div>
    </div>
  )
}

