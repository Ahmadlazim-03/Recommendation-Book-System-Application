"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"

interface HeroProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export default function Hero({ onSearch, isLoading }: HeroProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(inputValue)
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
          Temukan Buku Rekomendasi Sesuai Minatmu 📚
        </h1>

        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-12 text-balance max-w-2xl mx-auto">
          Masukkan judul buku yang kamu sukai, dan sistem kami akan menampilkan buku serupa berdasarkan data peminjaman
          menggunakan Collaborative Filtering.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ketik judul buku..."
              className="w-full px-6 py-4 rounded-lg bg-primary-foreground text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary transition-all"
              disabled={isLoading}
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              size={20}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Mencari...</span>
              </>
            ) : (
              <>
                <Search size={20} />
                <span>Cari Rekomendasi</span>
              </>
            )}
          </button>
        </form>

        {/* Info text */}
        <p className="mt-8 text-sm text-primary-foreground/70">
          💡 Coba cari: "Atomic Habits", "Deep Work", atau buku favorit kamu
        </p>
      </div>
    </section>
  )
}
