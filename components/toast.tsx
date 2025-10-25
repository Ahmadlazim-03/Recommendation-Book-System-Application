"use client"

import { CheckCircle, Info } from "lucide-react"

interface ToastProps {
  message: string
  type?: "success" | "info"
}

export default function Toast({ message, type = "success" }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 animate-fade-in-up">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
          type === "success" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
      >
        {type === "success" ? <CheckCircle size={20} /> : <Info size={20} />}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}
