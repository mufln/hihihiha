'use client'
import { Button } from "@/components/ui/button"
import React, { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const items = [
  { id: 1, title: "Изображение 1", image: "/image.png" },
  { id: 2, title: "Изображение 2", image: "/news_one.png" },
  { id: 3, title: "Изображение 3", image: "/image.png" },
  { id: 4, title: "Изображение 4", image: "/image.png" },
  { id: 5, title: "Изображение 5", image: "/image.png" },
]

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToItem = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth
      scrollRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth
      const scrollPosition = scrollRef.current.scrollLeft
      const newIndex = Math.round(scrollPosition / itemWidth)
      setCurrentIndex(newIndex)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const goToPrevious = () => {
    if (currentIndex > 0) {
      scrollToItem(currentIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      scrollToItem(currentIndex + 1)
    }
  }
  return (
      <main>
        {/* <img src="/image.png" className="min-w-full"/> */}
        <div className="min-w-full">
      <div>
        <div 
          ref={scrollRef}
          className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex">
            {items.map((item, index) => (
              <Card 
                key={item.id} 
                className={`flex-shrink-0 w-full snap-center`}
              >
                <CardContent className="p-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-80 object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Button
          variant="default"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent h-full"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 text-black" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent h-full"
          onClick={goToNext}
          disabled={currentIndex === items.length - 1}
        >
          <ChevronRight className="h-4 w-4 text-black" />
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        {items.map((_, index) => (
          <Button
            key={index}
            size="sm"
            className={`mx-1 w-4 h-4 rounded-full ${currentIndex === index ? "border-white border-2" : "bg-white"}`}
            onClick={() => scrollToItem(index)}
          >
          </Button>
        ))}
      </div>
    </div>
      </main>
  );
}
