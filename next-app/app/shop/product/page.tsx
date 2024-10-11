'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShopTitle from "@/components/titles/shop"

const item = {id: 1, title: "Носки ФК Кокос", price: '599 p', 
              info: `Носки ФК Кокос - это идеальный выбор для тех, кто ценит комфорт и стиль. 
                      Эти носки изготовлены из мягкой и приятной ткани, которая обеспечивает 
                      отличную вентиляцию и сухость ног даже при интенсивных нагрузках.
                      Удобная и эластичная конструкция носков позволяет им свободно растягиваться и 
                      сжиматься, обеспечивая идеальную посадку на ноге. Кроме того, носки имеют антипотную 
                      пропитку, которая предотвращает образование неприятного запаха.Выберите свой любимый 
                      цвет из трех доступных вариантов: белый, черный или яркий красный. Носки ФК Кокос - это 
                      отличный способ добавить стиля и комфорта в ваш ежедневный образ.`,
              colors: [
                {col: 'white', img:'https://masterpiecer-images.s3.yandex.net/e6b5636c840911eebd093abd0be4d755:upscaled'},
                {col: 'black', img:'https://avatars.mds.yandex.net/get-shedevrum/13110292/img_f072e00f879f11ef87fda6cf79f878e2/orig'},
                {col: '[#E02A26]', img:'https://avatars.mds.yandex.net/get-shedevrum/5570741/img_d5dad554879f11efaa3626f09d66c8ac/orig'},
              ]
            }

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState(0)
  const [imageUrl, setImageUrl] = useState(item.colors[color].img)

  const handleColorChange = (index: number) => {
    setColor(index)
    setImageUrl(item.colors[index].img)
  }

  const router = useRouter();

  return (
    <div className="p-10 w-full bg-white text-black">
      <div className='flex flex-wrap content-center justify-between gap-4'>
        <ShopTitle/> 
        <Button onClick={() => router.push('/shop/cart')} className="text-white w-full bg-black p-4 rounded-3xl text-xl max-w-max mr-16">Корзина</Button>
      </div>
      <div className="flex flex-wrap gap-10 my-10">
        {/* Product Image */}
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            width: '20rem',
            aspectRatio: '3/4',
            borderRadius: '30px',
            marginBottom: '1rem',
            backgroundPosition: 'center center',
          }}
        ></div>
        {/* Product Details */}
        <div className="flex flex-col justify-start items-start content-start">
          <h1 className="text-3xl mb-2">{item.title}</h1>
          {/* <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 fill-current text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
          </div> */}
          <p className="text-xl font-bold mb-4">{item.price}
            {/* <span className="text-sm text-gray-500 line-through ml-2">$249.99</span> */}
            </p>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <Button variant="outline" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <span className="mx-4 text-md">{quantity}</span>
            <Button variant="outline" onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex gap-4 mb-8 text-left">
            <Button className="flex-1 flex bg-[#E02A26] p-4 rounded-3xl text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Добавить в корзину
            </Button>
          </div>
          <div className=" text-left mb-8">
            <span className="text-sm opacity-30">Цвет</span>
            <div className="flex flex-wrap gap-2 my-4">
              {item.colors.map((c,index) => (
                <Button 
                  variant="outline"
                  key={index} 
                  onClick={() => handleColorChange(index)}
                  className={`p-0 w-12 h-12 bg-${c.col} rounded-3xl ${c.col === 'white' ? 'border-2 border-black' : ''}`}>
                  {color === index ? 
                    <div className="w-full h-full bg-black bg-opacity-50 rounded-3xl flex justify-center items-center">
                      <Check size={32} color="#ffffff" />
                    </div> 
                  : null}
                </Button>
                ))}
              </div>
            </div>
        </div>

            <div className="text-left text-sm opacity-30">
              <span>Описание</span>
              <p className="mt-4 text-justify max-w-96">{item.info}</p>
            </div>
      </div>
    </div>
  )
}