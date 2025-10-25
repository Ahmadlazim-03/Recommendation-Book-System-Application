"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, ArrowLeft, Users, BookOpen } from "lucide-react"
import BookCard from "./book-card"
import PerformanceChart from "./performance-chart"
import Toast from "./toast"

interface Recommendation {
  id: number
  judul: string
  pengarang: string
  kategori: string
  skor: number
  cover: string
}

interface ComparisonResultsProps {
  data: {
    input: string
    user_based: Recommendation[]
    item_based: Recommendation[]
    evaluasi: {
      user_based: { MAE: number; RMSE: number; Precision: number; Recall: number }
      item_based: { MAE: number; RMSE: number; Precision: number; Recall: number }
    }
  }
  onNewSearch: () => void
}

export default function ComparisonResults({ data, onNewSearch }: ComparisonResultsProps) {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)

  const handleFeedback = (type: "yes" | "no") => {
    setFeedback(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const itemBasedBetter = data.evaluasi.item_based.Precision > data.evaluasi.user_based.Precision

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
            Perbandingan hasil antara User-Based dan Item-Based Collaborative Filtering
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* User-Based Column */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-lg border-2 border-blue-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Users size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">User-Based</h3>
                  <p className="text-sm text-blue-100">Collaborative Filtering</p>
                </div>
              </div>
              <p className="text-sm text-blue-50 mt-3">
                Merekomendasikan buku berdasarkan preferensi pengguna yang memiliki selera serupa
              </p>
              <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 text-xs">
                <div>
                  <p className="text-blue-100">Precision</p>
                  <p className="font-bold text-lg">{(data.evaluasi.user_based.Precision * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-blue-100">Recall</p>
                  <p className="font-bold text-lg">{(data.evaluasi.user_based.Recall * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {data.user_based.map((book, index) => (
                <div key={book.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <BookCard book={book} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Item-Based Column */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-lg border-2 border-amber-400">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <BookOpen size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Item-Based</h3>
                  <p className="text-sm text-amber-100">Collaborative Filtering</p>
                </div>
              </div>
              <p className="text-sm text-amber-50 mt-3">
                Merekomendasikan buku berdasarkan kesamaan karakteristik dan fitur buku yang relevan
              </p>
              <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 text-xs">
                <div>
                  <p className="text-amber-100">Precision</p>
                  <p className="font-bold text-lg">{(data.evaluasi.item_based.Precision * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-amber-100">Recall</p>
                  <p className="font-bold text-lg">{(data.evaluasi.item_based.Recall * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {data.item_based.map((book, index) => (
                <div key={book.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="border-l-4 border-amber-500 pl-4">
                    <BookCard book={book} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-2">📈 Perbandingan Performa Metode</h3>
          <p className="text-muted-foreground mb-6">
            Visualisasi metrik evaluasi antara kedua metode Collaborative Filtering
          </p>
          <PerformanceChart data={data.evaluasi} />

          {/* Conclusion */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-lg">
            <p className="text-foreground font-medium">
              💡 <span className="font-bold">Kesimpulan:</span> Metode{" "}
              <span className="text-accent font-bold">{itemBasedBetter ? "Item-Based" : "User-Based"}</span>{" "}
              Collaborative Filtering menghasilkan nilai akurasi yang lebih tinggi dalam dataset ini, dengan Precision
              mencapai{" "}
              <span className="font-bold">
                {(itemBasedBetter ? data.evaluasi.item_based.Precision : data.evaluasi.user_based.Precision) * 100}%
              </span>
              .
            </p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">Apakah rekomendasi ini membantu?</h3>
          <div className="flex gap-4 justify-center flex-wrap">
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
