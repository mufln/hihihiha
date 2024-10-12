"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import  NewsEditor  from '@/components/panels/news-editor'

const items = [
    { id: 'news', title: "Новости"},
    { id: 'players', title: "Игроки"},
    { id: 'matches', title: "Матчи" },
    { id: 'products', title: "Товары"},
]

export default function AdminPanel() {
  const [matchDate, setMatchDate] = useState("")
  const [matchTeams, setMatchTeams] = useState("")
  const [newsTitle, setNewsTitle] = useState("")
  const [newsContent, setNewsContent] = useState("")
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [playerStats, setPlayerStats] = useState("")

  const handleSubmit = (section) => {
    console.log(`Submitting ${section} data`)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="flex-col mx-auto px-4 py-8 text-black bg-white">
      <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>
      <div className="flex flex-col gap-8">
      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="space-x-4 rounded-xl max-w-max py-2">
            {items.map((item, index) => (
                <TabsTrigger value={item.id} className='p-2 rounded-xl bg-black text-white'>
                    {item.title}
                </TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Редактировать расписание матчей</CardTitle>
              <CardDescription>Добавьте новый матч или редактируйте существующий</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit("matches"); }}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="matchDate">Дата</Label>
                    <Input id="matchDate" type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="matchTeams">Команды</Label>
                    <Input id="matchTeams" placeholder="Team A vs Team B" value={matchTeams} onChange={(e) => setMatchTeams(e.target.value)} />
                  </div>
                  <Button type="submit">Add Match</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <NewsEditor/>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Editor</CardTitle>
              <CardDescription>Add or edit products</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit("products"); }}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="productPrice">Price</Label>
                    <Input id="productPrice" type="number" placeholder="0.00" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                  </div>
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="players">
          <Card>
            <CardHeader>
              <CardTitle>Player Statistics Editor</CardTitle>
              <CardDescription>Update player statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit("players"); }}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="playerName">Player Name</Label>
                    <Select onValueChange={setPlayerName}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a player" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="player1">Player 1</SelectItem>
                        <SelectItem value="player2">Player 2</SelectItem>
                        <SelectItem value="player3">Player 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="playerStats">Statistics</Label>
                    <Textarea id="playerStats" placeholder="Goals: 10, Assists: 5, ..." value={playerStats} onChange={(e) => setPlayerStats(e.target.value)} />
                  </div>
                  <Button type="submit">Update Statistics</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="m-8">
        <CardHeader>
          <h1 className="text-4xl mb-4">Редактировать созданные</h1>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Раздел</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Новости</TableCell>
                <TableCell>Какая-то новость</TableCell>
                <Button className="text-white w-full bg-[#E02A26] p-4 rounded-3xl text-nowrap max-w-max m-4">Редактировать</Button>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}