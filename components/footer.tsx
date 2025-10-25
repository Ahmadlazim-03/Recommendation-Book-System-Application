"use client"

import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">
              © 2025 Ahmad Lazim — Sistem Rekomendasi Buku Berbasis Collaborative Filtering
            </p>
            <p className="text-xs text-primary-foreground/70 mt-2">Universitas Airlangga (UNAIR)</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <p className="text-xs text-primary-foreground/60 text-center">
            Sistem ini menggunakan Item-Based Collaborative Filtering untuk memberikan rekomendasi buku yang personal
            dan akurat.
          </p>
        </div>
      </div>
    </footer>
  )
}
