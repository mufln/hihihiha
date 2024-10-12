import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Linkedin, Clock, ThumbsUp, MessageCircle } from "lucide-react"

export default function NewsArticle() {
  return (
    <div className="bg-white p-10 w-full text-black font-normal">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">New Breakthrough in Quantum Computing Promises Faster Problem Solving</h1>
        <div className="relative aspect-video mb-8">
          <Image
            src="/image.png"
            alt="Quantum Computer"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="prose mt-4 text-justify">
          <p className="lead">
            In a groundbreaking development, scientists at the Quantum Frontiers Institute have achieved a major milestone in quantum computing, potentially revolutionizing the field and paving the way for solving complex problems at unprecedented speeds.
          </p>

          <h2 className="text-2xl">The Quantum Leap</h2>
          <p>
            The team, led by Dr. Alex Johnson, has successfully demonstrated a new method of quantum error correction that significantly increases the stability and reliability of quantum bits, or qubits. This breakthrough addresses one of the most significant challenges in quantum computing: maintaining quantum states for longer periods.
          </p>

          <blockquote>
            "This is a game-changer for quantum computing. We're now able to maintain quantum coherence for durations that were previously thought impossible," said Dr. Johnson.
          </blockquote>

          <h2 className="text-2xl">Implications for the Future</h2>
          <p>
            The implications of this breakthrough are far-reaching. Quantum computers with this new error correction method could potentially solve complex problems in fields such as:
          </p>
          <ul className="list-disc">
            <li>Drug discovery and development</li>
            <li>Climate modeling and weather prediction</li>
            <li>Financial modeling and risk assessment</li>
            <li>Optimization of supply chains and logistics</li>
          </ul>

          <p>
            While practical applications are still years away, this development brings us significantly closer to realizing the full potential of quantum computing.
          </p>
        </div>
      </article>
    </div>
  )
}