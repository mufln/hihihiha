"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, Clock } from "lucide-react"

export default function NameFilter() {
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
    <Card className="w-full max-w-max p-8 text-black space-y-2">
      <CardHeader>
        <CardTitle className="MuseoBold">Фильтровать по турниру</CardTitle>
      </CardHeader>
      <CardContent>
      <Input id="match" placeholder="Введите название турнира" className="p-2 mb-4"/>
          <div className="flex space-x-4">
            <Button onClick={handleApplyFilter} className="flex-1 rounded-3xl bg-black text-white">
              Применить
            </Button>
            <Button onClick={handleResetFilter} variant="outline" className="flex-1 rounded-3xl bg-[#E02A26] text-white">
              Сброс
            </Button>
          </div>

      </CardContent>
    </Card>
  )
}
