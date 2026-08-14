import { useState } from 'react'
import { SectionHead, Reveal } from '@/components/fx'
import { CHARACTERS, COMICS, QUIZ, FAQS } from '@/data/extras'

const SIDE_STYLE: Record<string, { label: string; bg: string }> = {
  hero: { label: '英雄', bg: 'hsl(var(--spidey))' },
  ally: { label: '盟友', bg: 'hsl(var(--electric))' },
  villain: { label: '反派', bg: 'hsl(var(--ink))' },
}

export function Characters() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="characters" en="WHO'S WHO" zh="角色图鉴 · 点卡翻面" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {CHARACTERS.map((c, i) => {
          const s = SIDE_STYLE[c.side]
          const isFlip = flipped.has(i)
          return (
            <Reveal key={c.name} delay={(i % 4) * 0.06}>
              <button onClick={() => toggle(i)} className={`flip w-full text-left h-64 ${isFlip ? 'flipped' : ''}`} aria-label={`${c.name}卡片`}>
                <div className="flip-inner">
                  {/* 正面 */}
                  <div className="flip-face panel corner-alt-a halftone p-4 flex flex-col">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-black tracking-widest text-white px-1.5 py-0.5 border-2 border-[hsl(var(--ink))]" style={{ background: s.bg }}>{s.label}</span>
                      <span className="text-[10px] opacity-50 font-bold">点击翻面 ↻</span>
                    </div>
                    <h3 className="font-black text-xl mt-2">{c.name}</h3>
                    <p className="font-display text-xs tracking-widest opacity-55">{c.en}</p>
                    <p className="mt-1 text-xs font-bold text-[hsl(var(--spidey))]">{c.tag}</p>
                    <p className="mt-2 text-sm leading-relaxed opacity-85 line-clamp-4">{c.bio}</p>
                  </div>
                  {/* 背面 */}
                  <div className="flip-face flip-back panel corner-alt-b p-4 flex flex-col" style={{ background: 'hsl(var(--night-2))', color: 'hsl(var(--paper))' }}>
                    <span className="font-display text-xs tracking-widest text-[hsl(var(--ember))]">冷知识 / 近况</span>
                    <h3 className="font-black text-lg mt-1">{c.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed opacity-90">{c.back}</p>
                    <span className="mt-auto text-[10px] opacity-50 font-bold self-end">点击翻回 ↻</span>
                  </div>
                </div>
              </button>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export function Comics() {
  return (
    <section className="py-16 md:py-24 border-y-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night-2))] halftone-dark">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHead id="comics" en="COMIC ORIGINS" zh="一切始于一本 12 美分的漫画" />
        <div className="space-y-5">
          {COMICS.map((c, i) => (
            <Reveal key={c.year + c.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="panel corner-alt-a halftone grid md:grid-cols-[150px_1fr] overflow-hidden">
                <div className="px-5 py-4 flex md:flex-col items-center md:items-start justify-center gap-2 text-white" style={{ background: i % 2 ? 'hsl(var(--ink))' : 'hsl(var(--spidey))' }}>
                  <span className="font-display text-3xl" style={{ textShadow: '2px 2px 0 rgba(0,0,0,.6)' }}>{c.year}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-lg">{c.title} <span className="ml-2 font-display text-xs tracking-widest opacity-55">{c.en}</span></h3>
                  <p className="mt-1.5 text-sm leading-relaxed opacity-85">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Quiz() {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const q = QUIZ[idx]

  const pick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.ans) setScore((s) => s + 1)
  }
  const next = () => {
    if (idx + 1 >= QUIZ.length) setFinished(true)
    else { setIdx(idx + 1); setPicked(null) }
  }
  const reset = () => { setIdx(0); setPicked(null); setScore(0); setFinished(false) }

  const verdict = score >= 7 ? '蜘蛛感应全开!你就是行走的蜘蛛侠百科。' : score >= 4 ? '不错的蜘蛛感应,补几部关键片就能满级。' : '感应还在冬眠——从「极速补课」路线开始吧!'

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="quiz" en="SPIDER-SENSE TEST" zh="测测你的蜘蛛感应" />
      <Reveal>
        <div className="panel corner-alt-a halftone max-w-3xl mx-auto p-6 md:p-8">
          {!finished ? (
            <>
              <div className="flex items-center justify-between text-xs font-black mb-4">
                <span>第 {idx + 1} / {QUIZ.length} 题</span>
                <span>当前得分 {score}</span>
              </div>
              <div className="h-2 border-2 border-[hsl(var(--ink))] bg-white mb-6">
                <div className="h-full transition-all duration-300" style={{ width: `${(idx / QUIZ.length) * 100}%`, background: 'linear-gradient(90deg, hsl(var(--spidey)), hsl(var(--ember)))' }} />
              </div>
              <h3 className="font-black text-lg md:text-xl leading-relaxed">{q.q}</h3>
              <div className="mt-5 grid gap-3">
                {q.opts.map((o, i) => {
                  let cls = 'bg-white hover:bg-[hsl(var(--paper-dim))]'
                  if (picked !== null) {
                    if (i === q.ans) cls = 'bg-[#3aa655] text-white'
                    else if (i === picked) cls = 'bg-[hsl(var(--spidey))] text-white'
                    else cls = 'bg-white opacity-50'
                  }
                  return (
                    <button key={i} onClick={() => pick(i)}
                      className={`text-left border-[3px] border-[hsl(var(--ink))] px-4 py-3 font-bold text-sm transition-all ${cls} ${picked === null ? 'hover:-translate-y-0.5 hover:shadow-[4px_4px_0_hsl(var(--ink))]' : ''}`}>
                      <span className="font-display mr-2">{String.fromCharCode(65 + i)}.</span>{o}
                    </button>
                  )
                })}
              </div>
              {picked !== null && (
                <div className="mt-5 border-[3px] border-[hsl(var(--ink))] bg-white p-4 drop-in">
                  <p className="text-sm leading-relaxed"><b>{picked === q.ans ? '✓ 答对了!' : '✗ 答错了。'}</b>{q.why}</p>
                  <button onClick={next} className="mt-3 px-5 py-2 bg-[hsl(var(--ink))] text-[hsl(var(--paper))] font-black text-sm hover:opacity-85">
                    {idx + 1 >= QUIZ.length ? '查看成绩 →' : '下一题 →'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 drop-in">
              <div className="burst w-32 h-32 mx-auto font-display text-4xl rotate-[-6deg]">{score}<span className="text-lg">/{QUIZ.length}</span></div>
              <p className="mt-6 font-black text-xl">{verdict}</p>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <button onClick={reset} className="btn-web"><span>再测一次</span></button>
                <a href="#paths" className="px-5 py-3 border-[3px] border-[hsl(var(--ink))] font-black bg-white text-sm hover:bg-[hsl(var(--paper-dim))]">去补片 →</a>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="max-w-6xl mx-auto px-4 pb-20 md:pb-28">
      <SectionHead id="faq" en="BEFORE YOU GO" zh="进场前的最后问答" />
      <div className="max-w-3xl space-y-3">
        {FAQS.map((f, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="panel corner-alt-b overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 font-black halftone">
                <span>{f.q}</span>
                <span className="font-display text-xl shrink-0 transition-transform duration-200" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {open === i && (
                <p className="px-5 py-4 text-sm leading-relaxed border-t-[3px] border-[hsl(var(--ink))] bg-white/60 drop-in">{f.a}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
