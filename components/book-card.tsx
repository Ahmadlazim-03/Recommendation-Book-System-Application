"use client"

interface BookCardProps {
  book: {
    id: number
    judul: string
    pengarang: string
    kategori: string
    skor: number
    cover: string
  }
}

export default function BookCard({ book }: BookCardProps) {
  const similarityPercentage = Math.round(book.skor * 100)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Book Cover */}
      <div className="relative h-64 bg-muted overflow-hidden">
        <img
          src={book.cover || "/placeholder.svg"}
          alt={book.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Similarity Badge */}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {similarityPercentage}%
        </div>
      </div>

      {/* Book Info */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {book.judul}
        </h3>

        <p className="text-sm text-muted-foreground mb-3">
          oleh <span className="font-medium text-foreground">{book.pengarang}</span>
        </p>

        {/* Category Badge */}
        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4">
          {book.kategori}
        </div>

        {/* Similarity Meter */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-muted-foreground">Kemiripan</span>
            <span className="text-xs font-bold text-primary">{similarityPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500"
              style={{ width: `${similarityPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
