"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ComparisonResults from "@/components/comparison-results"
import Footer from "@/components/footer"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recommendations, setRecommendations] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setIsLoading(true)
    setSearchQuery(query)

    setTimeout(() => {
      const dummyRecommendations = {
        input: query,
        user_based: [
          {
            id: 1,
            judul: "Deep Work",
            pengarang: "Cal Newport",
            kategori: "Self Development",
            skor: 0.91,
            cover: "/deep-work-book-cover.jpg",
          },
          {
            id: 2,
            judul: "Make Time",
            pengarang: "Jake Knapp",
            kategori: "Productivity",
            skor: 0.88,
            cover: "/essentialism-book-cover.jpg",
          },
          {
            id: 3,
            judul: "The Power of Habit",
            pengarang: "Charles Duhigg",
            kategori: "Psychology",
            skor: 0.87,
            cover: "/power-of-habit-book-cover.jpg",
          },
        ],
        item_based: [
          {
            id: 4,
            judul: "Essentialism",
            pengarang: "Greg McKeown",
            kategori: "Productivity",
            skor: 0.92,
            cover: "/essentialism-book-cover.jpg",
          },
          {
            id: 5,
            judul: "Focus",
            pengarang: "Daniel Goleman",
            kategori: "Self Development",
            skor: 0.89,
            cover: "/power-of-habit-book-cover.jpg",
          },
          {
            id: 6,
            judul: "Tiny Habits",
            pengarang: "BJ Fogg",
            kategori: "Psychology",
            skor: 0.86,
            cover: "/atomic-habits-cover.png",
          },
        ],
        evaluasi: {
          user_based: { MAE: 0.45, RMSE: 0.52, Precision: 0.84, Recall: 0.79 },
          item_based: { MAE: 0.41, RMSE: 0.48, Precision: 0.88, Recall: 0.83 },
        },
      }
      setRecommendations(dummyRecommendations)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero onSearch={handleSearch} isLoading={isLoading} />
      {recommendations && <ComparisonResults data={recommendations} onNewSearch={() => setRecommendations(null)} />}
      <Footer />
    </main>
  )
}
