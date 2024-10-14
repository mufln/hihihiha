'use client'
import React, {Suspense} from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Linkedin, Clock, ThumbsUp, MessageCircle } from "lucide-react"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";

async function getNew(id: any) {
  let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts/'+ id + "/", {
    method: "GET",
    credentials: "include",
    headers: {"accept":"application/json"}
  });
  // console.log(response.json())
  return response.json();
}

function SuspenseNews() {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { data, status } = useQuery({
    queryKey: ['post'],
    queryFn: () => getNew(id)
  })
  return (
      <div className="bg-white p-10 w-full text-black font-normal">
        <article className="max-w-3xl mx-auto">
          {status === "error" && <p>{status}</p>}
          {status === "pending" &&
              <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
          {status === "success" &&
              <>
                <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                <div className="relative aspect-video mb-8">
                  <Image
                      src={process.env.NEXT_PUBLIC_API_URL + data.media[0].filename}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                  />
                </div>
                <div className="prose mt-4 text-justify">
                  {data.text_md}
                </div></>}
        </article>
      </div>
  )
}
export default function NewsArticle() {
  return (
  <Suspense>
    <SuspenseNews/>
  </Suspense>
  )
}