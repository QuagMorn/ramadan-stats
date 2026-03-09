'use client'

import { useState, useRef } from 'react'
import type { StatsData } from '@/app/page'

const ACCENTS = ['#C9A84C', '#00C9A7', '#6C63FF', '#FF6B6B', '#0EA5E9', '#F472B6']

const TEMPLATES = [
  { id: '1', label: 'Geometric', bg: 'linear-gradient(135deg,#0a0f1a,#12192a,#0a1020)' },
  { id: '2', label: 'Crescent',  bg: 'linear-gradient(135deg,#1a1040,#080C14,#0d1a14)' },
  { id: '3', label: 'Minimal',   bg: 'linear-gradient(180deg,#0a0a0a,#111)' },
  { id: '4', label: 'Lantern',   bg: 'linear-gradient(135deg,#0f0a05,#1a1005,#0a0f05)' },
  { id: '5', label: 'Neon',      bg: 'linear-gradient(135deg,#060814,#0c0a1e,#06141e)' },
]

export default function InputForm({ onGenerate, initialStats }: {
  onGenerate: (s: StatsData) => void
  initialStats: StatsData
}) {
  const [form, setForm] = useState(initialStats)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof StatsData, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => set('customBg', ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const fieldStyle = {
    background: 'var(--surface2)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 10,
    padding: '0.65rem 0.9rem',
    color: 'var(--text)',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

      {/* Section: Stats */}
      <SectionLabel num="01" label="Worship Stats" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
        {[
          { key: 'fasting', icon: '🌙', label: 'Fasting (Puasa)' },
          { key: 'tarawih', icon: '🕌', label: 'Tarawih' },
          { key: 'tadarus', icon: '📖', label: 'Tadarus / Quran' },
          { key: 'tahajjud', icon: '🌟', label: 'Tahajjud' },
          { key: 'charity', icon: '💛', label: 'Charity / Sedekah' },
        ].map(f => (
          <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.72rem', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--muted)', letterSpacing: '0.06em' }}>
              {f.icon} {f.label}
            </label>
            <input
              type="number"
              min={0}
              max={f.key === 'fasting' || f.key === 'tarawih' || f.key === 'tadarus' ? 30 : undefined}
              value={form[f.key as keyof StatsData] as number}
              onChange={e => set(f.key as keyof StatsData, parseInt(e.target.value) || 0)}
              style={fieldStyle}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.72rem', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--muted)', letterSpacing: '0.06em' }}>Username</label>
          <input type="text" value={form.username} maxLength={24} onChange={e => set('username', e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.72rem', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--muted)', letterSpacing: '0.06em' }}>Ramadan Year</label>
          <input type="text" value={form.year} maxLength={20} onChange={e => set('year', e.target.value)} style={fieldStyle} />
        </div>
      </div>

      {/* Section: Accent */}
      <SectionLabel num="02" label="Accent Color" />
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {ACCENTS.map(c => (
          <div
            key={c}
            onClick={() => set('accentColor', c)}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: c, cursor: 'pointer',
              border: form.accentColor === c ? '2.5px solid white' : '2px solid transparent',
              transform: form.accentColor === c ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.15s, border-color 0.15s',
            }}
          />
        ))}
      </div>

      {/* Section: Template */}
      <SectionLabel num="03" label="Card Background" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem', marginBottom: '1.2rem' }}>
        {TEMPLATES.map(t => (
          <div
            key={t.id}
            onClick={() => { set('template', t.id); set('customBg', null) }}
            style={{
              aspectRatio: '1.6', borderRadius: 8, cursor: 'pointer', overflow: 'hidden',
              border: form.template === t.id && !form.customBg ? '2px solid white' : '2px solid transparent',
              transition: 'transform 0.15s, border-color 0.15s',
              transform: form.template === t.id && !form.customBg ? 'scale(1.05)' : 'scale(1)',
              position: 'relative', background: t.bg,
            }}>
            <span style={{ position: 'absolute', bottom: 3, left: 0, right: 0, textAlign: 'center', fontSize: '0.5rem', fontFamily: "'IBM Plex Mono', monospace", color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>
              {t.label}
            </span>
          </div>
        ))}
      </div>

      {/* Section: Upload */}
      <SectionLabel num="04" label="Custom Background (optional)" />
      <div
        onClick={() => fileRef.current?.click()}
        style={{ border: '1.5px dashed rgba(201,168,76,0.3)', borderRadius: 12, padding: '1.2rem', textAlign: 'center', cursor: 'pointer', position: 'relative', marginBottom: '0.8rem' }}>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>📁</div>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Click to upload image</p>
        <p style={{ fontSize: '0.7rem', color: 'var(--muted)', opacity: 0.5, marginTop: '0.2rem' }}>JPG, PNG, WebP</p>
      </div>

      {form.customBg && (
        <div style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', marginBottom: '0.8rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={form.customBg} alt="Preview" style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
          <button onClick={() => set('customBg', null)}
            style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
        </div>
      )}

      {/* Overlay toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
        <div
          onClick={() => set('overlayOn', !form.overlayOn)}
          style={{
            width: 36, height: 20, background: form.overlayOn ? 'var(--gold)' : 'var(--surface2)',
            borderRadius: 100, position: 'relative', cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.1)', transition: 'background 0.2s', flexShrink: 0,
          }}>
          <div style={{ position: 'absolute', top: 2, left: form.overlayOn ? 18 : 2, width: 14, height: 14, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
        </div>
        <span>Dark overlay for readability</span>
      </div>

      {/* CTA */}
      <button
        onClick={() => onGenerate(form)}
        style={{
          width: '100%', padding: '1rem',
          background: 'linear-gradient(135deg, #C9A84C, #E8B84B)',
          color: '#080C14', border: 'none', borderRadius: 12,
          fontFamily: "'Syne', sans-serif", fontSize: '1rem', fontWeight: 700,
          letterSpacing: '0.05em', cursor: 'pointer',
          transition: 'transform 0.15s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.target as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(201,168,76,0.35)' }}
        onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = ''; (e.target as HTMLButtonElement).style.boxShadow = '' }}>
        ✨ Generate My Ramadan Card
      </button>
    </div>
  )
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
      {num} — {label}
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}
