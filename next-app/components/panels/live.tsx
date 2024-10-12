"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Youtube, MessageCircle } from "lucide-react"

interface Comment {
  id: number;
  user: string;
  text: string;
  avatar: string;
}

interface LiveStreamCardProps {
  platform?: "youtube" | "vk";
}

export default function LiveStreamCard({ platform = "youtube" }: LiveStreamCardProps) {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: "User1", text: "Great match!", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, user: "User2", text: "Exciting game!", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, user: "User3", text: "What a goal!", avatar: "/placeholder.svg?height=32&width=32" },
  ])
  const [newComment, setNewComment] = useState("")

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, {
        id: comments.length + 1,
        user: "You",
        text: newComment.trim(),
        avatar: "/placeholder.svg?height=32&width=32"
      }])
      setNewComment("")
    }
  }

  return (
    <Card className="w-full p-8 text-black">
      <CardHeader>
        <CardTitle className="flex items-center MuseoBold mb-4">
          {platform === "youtube" ? (
            <Youtube className="mr-2 h-6 w-6 text-red-600" />
          ) : (
            <svg className="mr-2 h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm-4.895 9.868L7.11 7.316l1.263-.632 2.842 1.79 2.842-1.79 1.263.632-3.679 2.552v3.79h-1.263v-3.79h.001z" />
            </svg>
          )}
          Прямая трансляция
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <iframe width="720" height="405" src="https://rutube.ru/play/embed/32979350fb661bee76fa53cb5d84b006/" allow="clipboard-write; autoplay" ></iframe>
        <div>
            <h2>Комментарии</h2>
            <ScrollArea className="h-max w-full rounded-md border p-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={comment.avatar} alt={comment.user} />
                    <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold mb-2">{comment.user}</p>
                    <p className="text-sm text-gray-500">{comment.text}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}