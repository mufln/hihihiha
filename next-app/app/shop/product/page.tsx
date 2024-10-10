'use client'
import { useState } from "react"
import Image from "next/image"
import { StarIcon, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src="/image.png"
            alt="Product image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <Badge className="absolute top-4 left-4 bg-green-500">New</Badge>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Premium Wireless Headphones</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 fill-current text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
          </div>
          <p className="text-xl font-bold mb-4">$199.99 <span className="text-sm text-gray-500 line-through ml-2">$249.99</span></p>
          <p className="text-gray-600 mb-6">Experience crystal-clear audio with our latest noise-cancelling technology. Perfect for music lovers and professionals alike.</p>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <Button variant="outline" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <span className="mx-4 text-xl">{quantity}</span>
            <Button variant="outline" onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex gap-4 mb-8">
            <Button className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline">
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {/* Product Information Tabs */}
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Card>
                <CardContent className="pt-6">
                  <p>Our Premium Wireless Headphones offer unparalleled sound quality and comfort. With advanced noise-cancelling technology, you can immerse yourself in your favorite music or podcasts without any distractions.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5">
                    <li>Bluetooth 5.0</li>
                    <li>40mm dynamic drivers</li>
                    <li>Up to 30 hours battery life</li>
                    <li>Active Noise Cancellation</li>
                    <li>Touch controls</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <p>Customer reviews will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}