"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, Clock } from "lucide-react"

export default function DateFilter() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleApplyFilter = () => {
    console.log("Filtering from", startDate, "to", endDate)
    // Here you would typically call a function to apply the filter
  }

  const handleResetFilter = () => {
    setStartDate(null)
    setEndDate(null)
    console.log("Filter reset")
    // Here you would typically call a function to reset the filter
    }

  return (
    <Card className="w-full max-w-md p-8 text-black space-y-2">
      <CardHeader>
        <CardTitle className="MuseoBold">Фильтровать по дате</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] flex justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>С даты</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white text-black">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] flex justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>По дату</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white  text-black">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleApplyFilter} className="flex-1 rounded-3xl bg-black text-white">
              Применить
            </Button>
            <Button onClick={handleResetFilter} variant="outline" className="flex-1 rounded-3xl bg-[#E02A26] text-white">
              Сброс
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
