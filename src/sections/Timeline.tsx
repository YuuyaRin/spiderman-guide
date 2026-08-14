import { useEffect, useRef, useState } from 'react'
import { SectionHead, useLocalList } from '@/components/fx'
import { FILMS, ERA_META, type EraKey } from '@/data/films'

function NeedDots({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-1" title={`必要度 ${n}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="w-2.5 h-2.5 rounded-full border border-[hsl(var(--ink))]"
          style={{ background: i < n ? 'hsl(var(--spidey))' : 'transparent' }} />
      ))}
    </span>
  )
}

export function Timeline() {
  const [filter, setFilter] = useState<EraKey | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [watched, toggleWatched] = useLocalList('web-archive-watched')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [prog, setProg] = useState(0)

  const list = filter === 'all' ? FILMS : FILMS.filter((f) => f.era === filter)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      setProg(max > 0 ? el.scrollLeft / max : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [filter])

  useEffect(() => { scrollRef.current?.scrollTo({ left: 0 }) }, [filter])

  const eras: (EraKey | 'all')[] = ['all', 'raimi', 'webb', 'mcu', 'verse', 'bnd']

  return (
    <section className="py-16 md:py-24 border-y-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night-2))] halftone-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHead id="timeline" en="THE TIMELINE" zh="全系列时间线 · 2002 → 2026" />
        <div className="-mt-6 mb-8 flex flex-wrap items-center gap-2">
          {eras.map((e) => (
            <button key={e} onClick={() => setFilter(e)}
              className={`px-3 py-1.5 text-sm font-bold border-2 border-[hsl(var(--ink))] transition-all ${filter === e ? 'text-white shadow-[3px_3px_0_hsl(var(--ink))]' : 'bg-[hsl(var(--night))] text-[hsl(var(--paper))]/75 hover:text-white'}`}
              style={filter === e ? { background: e === 'all' ? 'hsl(var(--spidey))' : ERA_META[e].color } : undefined}>
              {e === 'all' ? `全部 (${FILMS.length})` : ERA_META[e].label}
            </button>
          ))}
          <span className="ml-auto hidden md:inline text-xs text-[hsl(var(--muted-foreground))]">← 左右拖动 / 滑动浏览 →</span>
        </div>
      </div>

      {/* 横向滚动胶片带 */}
      <div ref={scrollRef} className="tl-scroll flex gap-6 overflow-x-auto px-4 md:px-[max(1rem,calc(50vw-36rem))] pb-4 pt-2">
        {list.map((f, i) => {
          const meta = ERA_META[f.era]
          const isOpen = openId === f.id
          const isWatched = watched.includes(f.id)
          return (
            <article key={f.id} className="tl-item shrink-0 w-[86vw] sm:w-[420px] drop-in" style={{ animationDelay: `${Math.min(i * 0.06, 0.5)}s` }}>
              <div className={`panel ${i % 2 ? 'corner-alt-b' : 'corner-alt-a'} halftone h-full flex flex-col`}>
                {/* 头部:年份 + 年代标签 */}
                <div className="flex items-stretch border-b-[3px] border-[hsl(var(--ink))]">
                  <div className="px-4 py-3 font-display text-4xl text-white grid place-items-center" style={{ background: meta.color, textShadow: '2px 2px 0 hsl(var(--ink))' }}>
                    {f.year}
                  </div>
                  <div className="flex-1 px-3 py-2">
                    <span className="inline-block text-[10px] font-black tracking-widest px-1.5 py-0.5 text-white" style={{ background: meta.color }}>{meta.en}</span>
                    <h3 className="font-black text-xl leading-tight mt-0.5">{f.cn}</h3>
                    <p className="text-xs opacity-60 font-bold">{f.en}</p>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-sm font-bold leading-relaxed">{f.gist}</p>

                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                    <div><dt className="opacity-55">导演</dt><dd className="font-bold">{f.director}</dd></div>
                    <div><dt className="opacity-55">全球票房</dt><dd className="font-bold">{f.boxOffice}</dd></div>
                    <div className="col-span-2"><dt className="opacity-55">主要对手</dt><dd className="font-bold">{f.villain}</dd></div>
                    <div className="col-span-2"><dt className="opacity-55">上映</dt><dd className="font-bold">{f.release}</dd></div>
                  </dl>

                  <button onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="mt-3 self-start text-xs font-black border-2 border-[hsl(var(--ink))] px-2.5 py-1.5 bg-white hover:bg-[hsl(var(--paper-dim))] transition-colors">
                    {isOpen ? '收起 ▲' : '剧情速览 ▼'}
                  </button>
                  {isOpen && (
                    <div className="mt-2 border-2 border-[hsl(var(--ink))] bg-white p-3 text-sm leading-relaxed drop-in">
                      <p>{f.synopsis}</p>
                      <p className="mt-2 pt-2 border-t-2 border-dashed border-[hsl(var(--ink))]/30 text-xs">
                        <b>与主线的连接:</b>{f.link}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-black opacity-55 mb-1">看《崭新之日》前的必要度</p>
                      <NeedDots n={f.need} />
                    </div>
                    <button onClick={() => toggleWatched(f.id)}
                      className={`text-xs font-black border-2 border-[hsl(var(--ink))] px-3 py-1.5 transition-colors ${isWatched ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))]' : 'bg-[hsl(var(--spidey))] text-white hover:brightness-110'}`}>
                      {isWatched ? '✓ 已看过' : '标记已看'}
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] opacity-60">{f.needNote}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* 进度轨 */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="h-2 border-2 border-[hsl(var(--ink))] bg-[hsl(var(--night))]">
          <div className="h-full transition-[width] duration-150" style={{ width: `${8 + prog * 92}%`, background: 'linear-gradient(90deg, hsl(var(--spidey)), hsl(var(--ember)))' }} />
        </div>
      </div>
    </section>
  )
}
