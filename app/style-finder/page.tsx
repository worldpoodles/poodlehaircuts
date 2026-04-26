'use client'

import { useState, useRef, useCallback } from 'react'
import { POODLE_CUTS, PoodleCut } from '../../lib/cuts'

type Step = 1 | 2 | 3
type DifficultyFilter = 'All' | 'Easy' | 'Medium' | 'Advanced'

const CATEGORIES = ['All', 'Popular', 'Trending', 'Warm Weather', 'Cold Weather', 'Classic', 'Show', 'Practical', 'Creative']

export default function StyleFinderPage() {
  const [step, setStep] = useState<Step>(1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedCut, setSelectedCut] = useState<PoodleCut | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [diffFilter, setDiffFilter] = useState<DifficultyFilter>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Filter cuts
  const filteredCuts = POODLE_CUTS.filter(cut => {
    const matchCat = categoryFilter === 'All' || cut.category === categoryFilter
    const matchDiff = diffFilter === 'All' || cut.difficulty === diffFilter
    const matchSearch = !searchTerm || cut.name.toLowerCase().includes(searchTerm.toLowerCase()) || cut.desc.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCat && matchDiff && matchSearch
  })

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, or WEBP)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB')
      return
    }
    setError(null)
    setUploadedFile(file)
    const reader = new FileReader()
    reader.onload = e => {
      setUploadedImage(e.target?.result as string)
      setStep(2)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedCut) return
    setIsGenerating(true)
    setError(null)
    setStep(3)

    const formData = new FormData()
    formData.append('image', uploadedFile)
    formData.append('cut', selectedCut.slug)
    formData.append('prompt', selectedCut.aiPrompt)

    try {
      const res = await fetch('/api/transform', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setResultImage(data.imageUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsGenerating(false)
    }
  }

  const reset = () => {
    setStep(1)
    setUploadedImage(null)
    setUploadedFile(null)
    setSelectedCut(null)
    setResultImage(null)
    setError(null)
    setIsGenerating(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '48px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ background: 'rgba(200,119,58,0.25)', color: '#e8a070', marginBottom: 16 }}>
            ✦ AI Style Preview
          </div>
          <h1 style={{ color: 'var(--cream)', fontSize: 'clamp(32px, 4vw, 52px)', marginBottom: 12 }}>
            Poodle Haircut Finder
          </h1>
          <p style={{ color: 'rgba(250,248,244,0.65)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            Upload your poodle's photo, choose a cut, and see an AI preview instantly — free.
          </p>
        </div>
      </div>

      {/* Progress steps */}
      <div style={{ background: 'var(--warm-white)', borderBottom: '1px solid var(--border)', padding: '0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {([
              [1, 'Upload photo'],
              [2, 'Choose style'],
              [3, 'See result'],
            ] as [number, string][]).map(([n, label], i) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '16px 0',
                  opacity: step >= n ? 1 : 0.4,
                  transition: 'opacity 0.2s',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: step > n ? 'var(--caramel)' : step === n ? 'var(--ink)' : 'var(--border)',
                    color: step >= n ? 'var(--cream)' : 'var(--ink-faint)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 500, flexShrink: 0,
                    transition: 'background 0.3s',
                  }}>
                    {step > n ? '✓' : n}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: step === n ? 500 : 400, color: step >= n ? 'var(--ink)' : 'var(--ink-faint)' }}>
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div style={{
                    flex: 1, height: 1,
                    background: step > n + 1 ? 'var(--caramel)' : 'var(--border)',
                    margin: '0 16px',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px 80px' }}>
        {error && (
          <div style={{
            background: '#fdf2f2', border: '1px solid #fca5a5',
            borderRadius: 'var(--radius-md)', padding: '12px 16px',
            marginBottom: 24, color: '#991b1b', fontSize: 14,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} style={{ color: '#991b1b', fontSize: 18, lineHeight: 1, cursor: 'pointer', background: 'none', border: 'none' }}>×</button>
          </div>
        )}

        {/* STEP 1: Upload */}
        {step === 1 && (
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div
              ref={dropZoneRef}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onDragEnter={e => { e.preventDefault(); if (dropZoneRef.current) dropZoneRef.current.style.borderColor = 'var(--caramel)' }}
              onDragLeave={e => { if (dropZoneRef.current) dropZoneRef.current.style.borderColor = 'var(--border-dark)' }}
              style={{
                border: '2px dashed var(--border-dark)',
                borderRadius: 'var(--radius-xl)',
                padding: '64px 40px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
                background: 'var(--warm-white)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--caramel)'; (e.currentTarget as HTMLElement).style.background = 'var(--caramel-light)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-dark)'; (e.currentTarget as HTMLElement).style.background = 'var(--warm-white)' }}
            >
              <div style={{ fontSize: 56, marginBottom: 20 }}>📷</div>
              <h2 style={{ fontSize: 22, marginBottom: 12 }}>Upload your poodle's photo</h2>
              <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
                Drag and drop, or click to browse.<br/>
                JPG, PNG or WEBP · max 10MB
              </p>
              <button className="btn-primary" type="button">Choose photo</button>
              <p style={{ marginTop: 20, fontSize: 12, color: 'var(--ink-faint)' }}>
                💡 Tip: Front-facing photo in good light works best
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f) }}
            />

            {/* Sample photos hint */}
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 12 }}>Don't have a photo handy?</p>
              <button
                onClick={() => {
                  // Use a placeholder for demo - in production use real sample poodle images
                  setUploadedImage('/images/sample-poodle.jpg')
                  setUploadedFile(new File([], 'sample.jpg', { type: 'image/jpeg' }))
                  setStep(2)
                }}
                style={{ fontSize: 13, color: 'var(--caramel)', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}
              >
                Use a sample poodle photo →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Choose style */}
        {step === 2 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, alignItems: 'start' }}>
              {/* Sidebar: uploaded photo + info */}
              <div style={{ position: 'sticky', top: 80 }}>
                <div style={{
                  background: 'var(--warm-white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  marginBottom: 16,
                }}>
                  {uploadedImage && (
                    <img src={uploadedImage} alt="Your poodle" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                  )}
                  <div style={{ padding: '12px 16px' }}>
                    <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>Your poodle</p>
                    <button
                      onClick={() => { setStep(1); setUploadedImage(null) }}
                      style={{ fontSize: 12, color: 'var(--ink-faint)', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}
                    >
                      Change photo
                    </button>
                  </div>
                </div>
                {selectedCut && (
                  <div style={{
                    background: 'var(--caramel-light)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    marginBottom: 16,
                  }}>
                    <p style={{ fontSize: 12, color: 'var(--caramel-dark)', fontWeight: 500, marginBottom: 4 }}>Selected</p>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{selectedCut.name}</p>
                  </div>
                )}
                <button
                  onClick={handleGenerate}
                  disabled={!selectedCut}
                  className="btn-primary"
                  style={{
                    width: '100%', justifyContent: 'center',
                    opacity: selectedCut ? 1 : 0.4,
                    cursor: selectedCut ? 'pointer' : 'not-allowed',
                  }}
                >
                  Generate AI Preview ✦
                </button>
                {!selectedCut && (
                  <p style={{ fontSize: 12, color: 'var(--ink-faint)', textAlign: 'center', marginTop: 8 }}>
                    Select a cut first
                  </p>
                )}
              </div>

              {/* Main: cut grid */}
              <div>
                {/* Filters */}
                <div style={{ marginBottom: 20 }}>
                  <input
                    type="text"
                    placeholder="Search cuts (e.g. teddy, lamb, continental...)"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px',
                      border: '1px solid var(--border-dark)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 14, background: 'var(--warm-white)',
                      color: 'var(--ink)', marginBottom: 12,
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    {CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => setCategoryFilter(cat)} style={{
                        padding: '5px 12px', borderRadius: 100, fontSize: 12,
                        border: '1px solid',
                        borderColor: categoryFilter === cat ? 'var(--caramel)' : 'var(--border)',
                        background: categoryFilter === cat ? 'var(--caramel-light)' : 'transparent',
                        color: categoryFilter === cat ? 'var(--caramel-dark)' : 'var(--ink-muted)',
                        cursor: 'pointer', transition: 'all 0.15s', fontWeight: categoryFilter === cat ? 500 : 400,
                      }}>{cat}</button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {(['All', 'Easy', 'Medium', 'Advanced'] as DifficultyFilter[]).map(d => (
                      <button key={d} onClick={() => setDiffFilter(d)} style={{
                        padding: '4px 10px', borderRadius: 100, fontSize: 11,
                        border: '1px solid',
                        borderColor: diffFilter === d ? 'var(--ink)' : 'var(--border)',
                        background: diffFilter === d ? 'var(--ink)' : 'transparent',
                        color: diffFilter === d ? 'var(--cream)' : 'var(--ink-muted)',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}>{d}</button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                  {filteredCuts.map(cut => (
                    <div
                      key={cut.slug}
                      onClick={() => setSelectedCut(cut)}
                      style={{
                        border: `2px solid ${selectedCut?.slug === cut.slug ? 'var(--caramel)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: selectedCut?.slug === cut.slug ? 'var(--caramel-light)' : 'var(--warm-white)',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{
                        background: selectedCut?.slug === cut.slug ? 'rgba(200,119,58,0.15)' : 'var(--border)',
                        padding: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 40,
                        position: 'relative',
                      }}>
                        {cut.emoji}
                        {selectedCut?.slug === cut.slug && (
                          <div style={{
                            position: 'absolute', top: 8, right: 8,
                            width: 20, height: 20, borderRadius: '50%',
                            background: 'var(--caramel)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, color: 'white', fontWeight: 700,
                          }}>✓</div>
                        )}
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 4, lineHeight: 1.3 }}>{cut.name}</div>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                          <span style={{
                            fontSize: 10, padding: '2px 6px', borderRadius: 100, fontWeight: 500,
                            background: cut.difficulty === 'Easy' ? 'var(--sage-light)' : cut.difficulty === 'Advanced' ? 'var(--blush)' : 'var(--caramel-light)',
                            color: cut.difficulty === 'Easy' ? 'var(--sage)' : cut.difficulty === 'Advanced' ? '#c55' : 'var(--caramel-dark)',
                          }}>{cut.difficulty}</span>
                          <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{cut.maintenance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredCuts.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--ink-muted)' }}>
                    No cuts match your filters. <button onClick={() => { setCategoryFilter('All'); setDiffFilter('All'); setSearchTerm('') }} style={{ color: 'var(--caramel)', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}>Reset filters</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Result */}
        {step === 3 && (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 8, fontSize: 'clamp(24px, 3vw, 36px)' }}>
              {isGenerating ? 'Generating your preview...' : `${selectedCut?.name} — Before & After`}
            </h2>
            {isGenerating && (
              <p style={{ textAlign: 'center', color: 'var(--ink-muted)', marginBottom: 32 }}>
                AI is transforming your poodle's look. This takes about 15–25 seconds.
              </p>
            )}

            {/* Before/After grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
              {/* Before */}
              <div style={{ background: 'var(--warm-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                {uploadedImage && (
                  <img src={uploadedImage} alt="Before" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>📷</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>Before</span>
                </div>
              </div>

              {/* After */}
              <div style={{ background: 'var(--warm-white)', border: `1px solid ${resultImage ? 'var(--caramel)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                {isGenerating ? (
                  <div style={{
                    aspectRatio: '1',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 16, background: 'var(--caramel-light)',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      border: '3px solid var(--caramel-light)',
                      borderTop: '3px solid var(--caramel)',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    <p style={{ fontSize: 13, color: 'var(--caramel-dark)', textAlign: 'center', padding: '0 20px' }}>
                      AI is styling your poodle...
                    </p>
                  </div>
                ) : resultImage ? (
                  <img src={resultImage} alt={`After: ${selectedCut?.name}`} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                ) : (
                  <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--border)', color: 'var(--ink-faint)', fontSize: 14 }}>
                    Preview will appear here
                  </div>
                )}
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>✨</span>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>After — {selectedCut?.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-faint)', display: 'block' }}>AI generated preview</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions after result */}
            {resultImage && selectedCut && (
              <>
                {/* Cut info */}
                <div style={{
                  background: 'var(--warm-white)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)', padding: '24px',
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16, marginBottom: 24, textAlign: 'center',
                }}>
                  {[
                    ['Maintenance', selectedCut.maintenance],
                    ['Frequency', selectedCut.frequency],
                    ['Best for', selectedCut.bestFor],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
                  <a
                    href={selectedCut.shopLink}
                    target="_blank" rel="noopener"
                    className="btn-primary"
                  >
                    Shop accessories for this cut →
                  </a>
                  <a href={`/cuts/${selectedCut.slug}`} className="btn-outline">
                    Full guide for {selectedCut.name}
                  </a>
                </div>

                {/* Share hint */}
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--sage-light)', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ fontSize: 13, color: 'var(--sage)', marginBottom: 4 }}>
                    📱 Screenshot this page and share on TikTok or Instagram with #PoodleHaircuts
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(122,155,126,0.8)' }}>
                    Note: AI previews are for inspiration — results may vary from real grooming.
                  </p>
                </div>
              </>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
              {!isGenerating && (
                <>
                  <button onClick={() => setStep(2)} className="btn-outline">
                    ← Change style
                  </button>
                  <button onClick={reset} className="btn-outline">
                    Start over
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
