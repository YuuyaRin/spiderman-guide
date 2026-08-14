import { SectionHead, Reveal } from '@/components/fx'
import { THREADS } from '@/data/story'
import { LORE } from '@/data/story'
import { useState } from 'react'

const STATUS: Record<string, { label: string; cls: string }> = {
  done: { label: '已回收', cls: 'bg-[#3aa655] text-white' },
  pending: { label: '悬而未决', cls: 'bg-[#ffd23e] text-[hsl(var(--ink))]' },
  ongoing: { label: '持续中', cls: 'bg-[hsl(var(--electric))] text-white' },
}

/** 红线连接符:桌面横线,移动竖线 */
function StringLink({ flip }: { flip?: boolean }) {
  return (
    <div className="flex md:items-center justify-center" aria-hidden>
      {/* 横(桌面) */}
      <svg viewBox="0 0 80 24" className="hidden md:block w-16 h-6">
        <path d="M2 12 Q 20 2, 40 12 T 78 12" fill="none" stroke="#e8292e" strokeWidth="2.5" />
        <circle cx="2" cy="12" r="3.5" fill="#e8292e" stroke="#0a0a12" strokeWidth="1.5" />
        <circle cx="78" cy="12" r="3.5" fill="#e8292e" stroke="#0a0a12" strokeWidth="1.5" />
      </svg>
      {/* 竖(移动) */}
      <svg viewBox="0 0 24 56" className={`md:hidden w-6 h-10 ${flip ? 'rotate-180' : ''}`}>
        <path d="M12 2 Q 2 18, 12 28 T 12 54" fill="none" stroke="#e8292e" strokeWidth="2.5" />
        <circle cx="12" cy="2" r="3.5" fill="#e8292e" stroke="#0a0a12" strokeWidth="1.5" />
        <circle cx="12" cy="54" r="3.5" fill="#e8292e" stroke="#0a0a12" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export function Threads() {
  return (
    <section className="py-16 md:py-24 border-y-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night-2))] halftone-dark">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHead id="threads" en="FORESHADOW WALL" zh="伏笔红线墙 · 千丝万缕的联系" />
        <p className="-mt-6 mb-10 text-[hsl(var(--muted-foreground))] max-w-2xl">
          蜘蛛侠电影最迷人的地方:一颗 9 年前的彩蛋会在新片里炸响。这些红线,串起了三代电影。
        </p>
        <div className="space-y-6 md:space-y-8">
          {THREADS.map((t, i) => {
            const s = STATUS[t.status]
            return (
              <Reveal key={t.id} delay={Math.min(i * 0.04, 0.2)}>
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-1 md:gap-4 items-stretch">
                  {/* 伏笔 */}
                  <div className={`panel panel-pop ${i % 2 ? 'corner-alt-a' : 'corner-alt-b'} halftone p-4`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-xs tracking-widest opacity-55">伏笔 · SETUP</span>
                      <span className="text-[10px] font-black border-2 border-[hsl(var(--ink))] bg-white px-1.5 py-0.5">{t.plantYear}</span>
                    </div>
                    <p className="mt-1 font-black">{t.plant}</p>
                    <p className="mt-1.5 text-sm leading-relaxed opacity-85">{t.plantDesc}</p>
                  </div>
                  <StringLink flip={i % 2 === 1} />
                  {/* 回收 */}
                  <div className={`panel panel-pop ${i % 2 ? 'corner-alt-b' : 'corner-alt-a'} halftone p-4`} style={{ background: 'linear-gradient(135deg, #f3ede0, #f8e8d8)' }}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-xs tracking-widest text-[hsl(var(--spidey))]">回收 · PAYOFF</span>
                      <span className={`text-[10px] font-black border-2 border-[hsl(var(--ink))] px-1.5 py-0.5 ${s.cls}`}>{s.label}</span>
                    </div>
                    <p className="mt-1 font-black">{t.payoff} <span className="text-xs font-bold opacity-55">{t.payoffYear}</span></p>
                    <p className="mt-1.5 text-sm leading-relaxed opacity-85">{t.payoffDesc}</p>
                    <p className="mt-2 pt-2 border-t-2 border-dashed border-[hsl(var(--ink))]/25 text-xs font-black text-[hsl(var(--spidey))]">◈ {t.title}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Lore() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="lore" en="WORLD BIBLE" zh="设定百科 · 看懂世界观的十二把钥匙" />
      <div className="grid md:grid-cols-2 gap-4 items-start">
        {LORE.map((l, i) => {
          const isOpen = open === i
          return (
            <Reveal key={l.title} delay={(i % 2) * 0.05}>
              <div className={`panel ${i % 2 ? 'corner-alt-b' : 'corner-alt-a'} overflow-hidden`}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left px-5 py-4 halftone flex items-center justify-between gap-3">
                  <span>
                    <span className="block font-black">{l.title}</span>
                    <span className="block font-display text-[10px] tracking-widest opacity-55 mt-0.5">{l.en}</span>
                  </span>
                  <span className="font-display text-xl shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {isOpen && (
                  <p className="px-5 py-4 text-sm leading-relaxed border-t-[3px] border-[hsl(var(--ink))] bg-white/60 drop-in">{l.desc}</p>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
