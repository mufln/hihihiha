'use client'
 
import { useRouter } from 'next/navigation'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from 'next/link'
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
      <div className='flex flex-wrap justify-between space-y-4'>
        <ShopTitle/> 
        <Link href="/shop/cart" className="w-full bg-black p-4 rounded-3xl text-xl max-w-max mr-16">Корзина</Link>
      </div>
    
    <div className="flex flex-wrap gap-4 justify-start my-10">
        {items.map((item) => (
          <Card key={item.id} onClick={() => router.push('/shop/product')} className="w-full max-w-sm bg-black p-8 rounded-3xl">
            <CardHeader className="relative p-0">
              <Image
                src={`${item.image}`}
                alt="Product image"
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
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
              <button onClick={() => router.push('/shop/product')} className="w-full bg-[#E02A26] p-4 rounded-xl text-xl text-center">Купить</button>
            </CardFooter>
          </Card>))}
    </div>
    </div>
  )
}

