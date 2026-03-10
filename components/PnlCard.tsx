'use client'

import { forwardRef } from 'react'
import type { StatsData } from '@/app/page'

const TEMPLATES: Record<string, { bg: string; overlay: string }> = {
  '1': { bg: 'linear-gradient(135deg, #0a0f1a 0%, #12192a 50%, #0a1020 100%)', overlay: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 100%)' },
  '2': { bg: 'radial-gradient(ellipse at 30% 10%, #1a104a 0%, #080C14 50%, #0d1a14 100%)', overlay: 'linear-gradient(160deg, rgba(80,40,180,0.25) 0%, rgba(0,0,0,0.5) 100%)' },
  '3': { bg: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)', overlay: 'rgba(0,0,0,0.4)' },
  '4': { bg: 'linear-gradient(135deg, #0f0a05 0%, #1e1408 50%, #0a0f05 100%)', overlay: 'linear-gradient(135deg, rgba(100,60,0,0.3) 0%, rgba(0,0,0,0.5) 100%)' },
  '5': { bg: 'linear-gradient(135deg, #060814 0%, #0c0a20 40%, #06141e 100%)', overlay: 'linear-gradient(135deg, rgba(0,200,255,0.08) 0%, rgba(150,0,255,0.1) 100%)' },
}

function getGrade(pct: number) {
  if (pct >= 90) return 'S+'
  if (pct >= 80) return 'A'
  if (pct >= 65) return 'B+'
  if (pct >= 50) return 'B'
  if (pct >= 35) return 'C'
  return 'D'
}

const PnlCard = forwardRef<HTMLDivElement, { stats: StatsData }>(({ stats }, ref) => {
  const { fasting, tarawih, tadarus, tahajjud, charity, username, year, accentColor, template, customBg, overlayOn } = stats

  const fp = Math.round((fasting / 30) * 100)
  const tp = Math.round((tarawih / 30) * 100)
  const dp = Math.round((tadarus / 30) * 100)
  const overall = Math.round((fp + tp + dp) / 3)
  const grade = getGrade(overall)

  const tmpl = TEMPLATES[template]
  const bgStyle = customBg
    ? { backgroundImage: `url(${customBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: tmpl.bg }

  const overlayStyle = overlayOn
    ? { background: customBg ? 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 100%)' : tmpl.overlay }
    : { opacity: 0 }

  const statsRows = [
    { label: 'FASTING', icon: '🌙', val: fasting, pct: fp },
    { label: 'TARAWIH', icon: '🕌', val: tarawih, pct: tp },
    { label: 'TADARUS', icon: '📖', val: tadarus, pct: dp },
  ]

  return (
    <div
      ref={ref}
      style={{
        width: 480,
        maxWidth: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        background: '#0a0f1a',
        boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, ...bgStyle }} />
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, ...overlayStyle }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '1.6rem', color: '#E8EAF0' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace", opacity: 0.5 }}>
            RAMADAN STATS
          </span>
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', fontFamily: "'IBM Plex Mono', monospace", padding: '0.25rem 0.6rem', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.7)' }}>
            {year}
          </span>
        </div>

        {/* Username */}
        <div style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.2rem' }}>{username}</div>
        <div style={{ fontSize: '0.68rem', fontFamily: "'IBM Plex Mono', monospace", opacity: 0.5, letterSpacing: '0.08em', marginBottom: '1rem' }}>Ibadah Performance Report</div>

        {/* Score */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.8rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', marginBottom: '0.8rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.62rem', fontFamily: "'IBM Plex Mono', monospace", opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>OVERALL CONSISTENCY</div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: accentColor }}>{overall}%</div>
          </div>
          <div style={{ fontSize: '0.75rem', fontFamily: "'IBM Plex Mono', monospace", padding: '0.3rem 0.7rem', borderRadius: 8, fontWeight: 600, letterSpacing: '0.05em', background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}55` }}>
            {grade}
          </div>
        </div>

        {/* Stat bars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {statsRows.map(s => (
            <div key={s.label} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 10, padding: '0.65rem 0.7rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.6rem', fontFamily: "'IBM Plex Mono', monospace", opacity: 0.55, letterSpacing: '0.04em' }}>{s.icon} {s.label}</span>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.85rem', fontWeight: 700, color: accentColor, marginBottom: '0.3rem' }}>{s.val}/30</div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.pct}%`, background: accentColor, borderRadius: 100 }} />
              </div>
              <div style={{ fontSize: '0.6rem', fontFamily: "'IBM Plex Mono', monospace", marginTop: '0.25rem', opacity: 0.6 }}>{s.pct}%</div>
            </div>
          ))}
        </div>

        {/* Tahajjud + charity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
          {[
            { icon: '🌟', label: 'TAHAJJUD', val: `${tahajjud} nights` },
            { icon: '💛', label: 'CHARITY', val: `${charity} times` },
          ].map(m => (
            <div key={m.label} style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '0.65rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: '0.6rem', fontFamily: "'IBM Plex Mono', monospace", opacity: 0.5, letterSpacing: '0.06em' }}>{m.label}</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>{m.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '0.8rem' }}>
          <span style={{ fontSize: '0.58rem', fontFamily: "'IBM Plex Mono', monospace", opacity: 0.35, letterSpacing: '0.08em' }}>ramadanstats.app</span>
          <span style={{ fontSize: '0.7rem', fontFamily: "'Noto Naskh Arabic', serif", opacity: 0.5 }}>بارك الله فيك</span>
        </div>
      </div>
    </div>
  )
})

PnlCard.displayName = 'Ramadan Card'
export default PnlCard
