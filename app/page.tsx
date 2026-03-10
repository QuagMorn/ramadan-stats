'use client'

import { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import PnlCard from '@/components/PnlCard'
import InputForm from '@/components/InputForm'

export type StatsData = {
  fasting: number
  tarawih: number
  tadarus: number
  tahajjud: number
  charity: number
  username: string
  year: string
  accentColor: string
  template: string
  customBg: string | null
  overlayOn: boolean
}

const defaultStats: StatsData = {
  fasting: 22,
  tarawih: 18,
  tadarus: 15,
  tahajjud: 7,
  charity: 4,
  username: 'Al-Biruni',
  year: '1447 H / 2026 M',
  accentColor: '#C9A84C',
  template: '1',
  customBg: null,
  overlayOn: true,
}

export default function HomePage() {
  const [stats, setStats] = useState<StatsData>(defaultStats)
  const [generated, setGenerated] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [toast, setToast] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleGenerate = (newStats: StatsData) => {
    setStats(newStats)
    setGenerated(true)
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true })
      const link = document.createElement('a')
      link.download = `ramadan-stats-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch {
      alert('Download failed. Please try again.')
    }
    setDownloading(false)
  }, [])

  const handleShare = useCallback(async () => {
    const fp = Math.round((stats.fasting / 30) * 100)
    const tp = Math.round((stats.tarawih / 30) * 100)
    const dp = Math.round((stats.tadarus / 30) * 100)
    const overall = Math.round((fp + tp + dp) / 3)
    const text = `🌙 My Ramadan Card — ${stats.username}\nOverall Consistency: ${overall}%\nFasting: ${stats.fasting}/30 • Tarawih: ${stats.tarawih}/30 • Tadarus: ${stats.tadarus}/30\n\nGenerate yours at ramadanstats.app`

    if (navigator.share && cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true })
        const res = await fetch(dataUrl)
        const blob = await res.blob()
        await navigator.share({
          title: 'My Ramadan Stats',
          text,
          files: [new File([blob], 'ramadan-stats.png', { type: 'image/png' })],
        })
        return
      } catch {}
    }
    navigator.clipboard.writeText(text)
    showToast('Caption copied to clipboard!')
  }, [stats])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-5 pb-20">
      {/* Header */}
      <header className="text-center pt-10 pb-8">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 text-xs font-mono text-gold tracking-widest uppercase mb-5">
          ☪ Ramadan 1447H
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none"
          style={{ background: 'linear-gradient(135deg, #F0D080 0%, #C9A84C 40%, #00C9A7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Ramadan Stats
        </h1>
        <div className="font-arabic text-xl text-gold/70 mt-1">رمضان المبارك</div>
        <p className="text-[var(--muted)] text-sm mt-2">Generate your shareable Worship PnL Card — no account needed.</p>
      </header>

      {/* Form */}
      <InputForm onGenerate={handleGenerate} initialStats={defaultStats} />

      {/* Card Preview */}
      {generated && (
        <div ref={previewRef} className="animate-fade-up mt-2">
          <p className="text-center text-xs font-mono tracking-widest uppercase text-[var(--muted)] mb-4">— Your Card Preview —</p>
          <div className="flex justify-center mb-5">
            <PnlCard ref={cardRef} stats={stats} />
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-bg transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #E8B84B)', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}>
              {downloading ? '⏳ Generating...' : '⬇ Download PNG'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-gold/20 bg-[var(--surface2)] text-[var(--text)] transition-all hover:-translate-y-0.5 hover:shadow-lg">
              ↗ Share Card
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-[var(--surface2)] border border-gold/20 text-sm font-mono px-5 py-2.5 rounded-full transition-opacity duration-300 z-50 pointer-events-none ${toast ? 'opacity-100' : 'opacity-0'}`}>
        {toast}
      </div>
    </div>
  )
}
