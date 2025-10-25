"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react"
import BookCard from "./book-card"
import Toast from "./toast"

interface Recommendation {
  id: number
  judul: string
  pengarang: string
  kategori: string
  skor: number
  cover: string
}

interface RecommendationResultsProps {
  data: {
    input: string
    recommendations: Recommendation[]
  }
  onNewSearch: () => void
}

export default function RecommendationResults({ data, onNewSearch }: RecommendationResultsProps) {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)

  const handleFeedback = (type: "yes" | "no") => {
    setFeedback(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <section id="recommendations" className="py-16 px-4 sm:px-6 lg:px-8 bg-background flex-1">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onNewSearch}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={20} />
            Cari Buku Lain
          </button>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Rekomendasi untuk: <span className="text-accent">{data.input}</span>
          </h2>
          <p className="text-muted-foreground">
            Kami menemukan {data.recommendations.length} buku yang serupa berdasarkan pola peminjaman
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.recommendations.map((book, index) => (
            <div key={book.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <BookCard book={book} />
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">Apakah rekomendasi ini membantu?</h3>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleFeedback("yes")}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              <ThumbsUp size={20} />
              Ya, Sangat Membantu
            </button>
            <button
              onClick={() => handleFeedback("no")}
              className="flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              <ThumbsDown size={20} />
              Tidak, Coba Lagi
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast message="Terima kasih atas feedback kamu! 🙏" type={feedback === "yes" ? "success" : "info"} />
      )}
    </section>
  )
}
