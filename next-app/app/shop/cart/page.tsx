'use client'
import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {useRouter} from "next/navigation"
import CartTitle from "@/components/titles/cart"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Носки ФК Кокос", price: 199.99, quantity: 1, image: "/image.png" },
    { id: 2, name: "Футболка ФК Кокос", price: 699.99, quantity: 1, image: "/image.png" },
    { id: 3, name: "Кружка ФК Кокос", price: 1299.99, quantity: 1, image: "/image.png" },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const router = useRouter();

  return (
    <div className="p-10 w-full bg-white text-black">
        <CartTitle/>
      <Card className="space-y-4">   
      <CardContent>
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center py-4">
            <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md mr-4" />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price.toFixed(2)}р</p>
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 w-8 text-center">{item.quantity}</span>
              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="ml-4" onClick={() => removeItem(item.id)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">Итог:</div>
        <div className="text-lg font-semibold">{total.toFixed(2)}р</div>
      </CardFooter>
      <CardFooter>
        <Button className="text-white w-full bg-[#E02A26] p-4 rounded-3xl text-nowrap max-w-max mr-16">Оформить заказ</Button>
      </CardFooter>
      </Card>
    </div>
  )
}