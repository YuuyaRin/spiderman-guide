import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CountUp, SplitTitle } from '@/components/fx'
import { FILMS } from '@/data/films'

gsap.registerPlugin(ScrollTrigger)

const NAV = [
  { href: '#paths', label: '观影路线' },
  { href: '#timeline', label: '全系列时间线' },
  { href: '#eras', label: '历代蜘蛛侠' },
  { href: '#universes', label: '宇宙关系' },
  { href: '#recap', label: '英雄无归速通' },
  { href: '#bnd', label: '崭新之日' },
  { href: '#characters', label: '角色图鉴' },
  { href: '#quiz', label: '蜘蛛感应' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const tween = gsap.to(barRef.current, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])
  return (
    <header className="fixed top-0 inset-x-0 z-[100]">
      <div className="backdrop-blur-md bg-[hsl(var(--night)/0.82)] border-b-[3px] border-[hsl(var(--ink))]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2 shrink-0">
            <SpiderMark className="w-7 h-7" />
            <span className="font-display text-lg tracking-wider text-white">WEB ARCHIVE</span>
            <span className="hidden sm:inline text-xs text-[hsl(var(--muted-foreground))]">蜘蛛侠观影档案</span>
          </a>
          <nav className="hidden lg:flex items-center gap-5 text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="u-grow text-[hsl(var(--paper))]/85 hover:text-white">{n.label}</a>
            ))}
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 grid place-items-center border-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--paper))] text-[hsl(var(--ink))] font-black shadow-[3px_3px_0_hsl(var(--ink))]"
            aria-label="菜单"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
        <div ref={barRef} className="h-[3px] origin-left scale-x-0" style={{ background: 'linear-gradient(90deg, hsl(var(--spidey)), hsl(var(--ember)))' }} />
      </div>
      {open && (
        <nav className="lg:hidden bg-[hsl(var(--night-2))] border-b-[3px] border-[hsl(var(--ink))] px-4 py-3 grid grid-cols-2 gap-2">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}
              className="py-2 px-3 border-2 border-[hsl(var(--ink))] bg-[hsl(var(--night))] text-sm font-bold">
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

/** 蜘蛛标志:纯代码绘制 */
export function SpiderMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g stroke="#e8292e" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M18 20 L6 10 M18 24 L4 24 M18 28 L6 38 M20 32 L12 44" />
        <path d="M30 20 L42 10 M30 24 L44 24 M30 28 L42 38 M28 32 L36 44" />
      </g>
      <ellipse cx="24" cy="22" rx="4.5" ry="6" fill="#e8292e" />
      <ellipse cx="24" cy="33" rx="6" ry="8.5" fill="#e8292e" />
    </svg>
  )
}

/** 角落蛛网 */
function WebCorner({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g stroke="rgba(243,237,224,0.22)" strokeWidth="1.2" fill="none">
        <path d="M0 0 L200 200 M0 0 L120 200 M0 0 L40 200 M0 0 L200 120 M0 0 L200 40" />
        <path d="M40 200 Q70 160 120 200 M40 200 Q60 140 100 160 Q140 180 120 200" opacity=".7" />
        <path d="M100 160 Q140 120 200 120 M60 120 Q110 90 160 100" opacity=".55" />
        <path d="M30 80 Q80 55 130 60 M20 40 Q60 25 90 30" opacity=".45" />
      </g>
    </svg>
  )
}

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景 20% 视差
      gsap.to(bgRef.current, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', scrub: true },
      })
      // 大标题逐词入场
      gsap.fromTo('.hero-word', { opacity: 0, y: 60, rotate: 4 }, {
        opacity: 1, y: 0, rotate: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.15,
      })
      gsap.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7 })
      gsap.fromTo('.hero-stat', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.95 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={rootRef} className="relative min-h-[100svh] night-city overflow-hidden flex flex-col">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 halftone-dark" />
        <WebCorner className="absolute -top-6 -left-6 w-64 h-64 md:w-96 md:h-96" />
        <WebCorner className="absolute -top-6 -right-6 w-64 h-64 md:w-96 md:h-96 -scale-x-100" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* 吊着的蜘蛛 */}
      <div className="absolute top-0 right-[12%] md:right-[18%] z-10 swing" aria-hidden>
        <div className="w-px h-28 md:h-40 bg-[hsl(var(--paper))]/40 mx-auto" />
        <SpiderMark className="w-10 h-10 md:w-14 md:h-14 drop-shadow-[0_4px_12px_rgba(232,41,46,.5)]" />
      </div>

      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 max-w-5xl mx-auto w-full">
        <p className="hero-word en-over !text-[0.72rem] !mb-3">THE COMPLETE SPIDER-MAN FIELD GUIDE · 2002 → 2026</p>
        <h1 className="font-black-latin font-black leading-[1.04] text-[2.6rem] sm:text-6xl md:text-7xl">
          <span className="hero-word inline-block">蜘蛛侠</span>{' '}
          <span className="hero-word inline-block text-transparent" style={{ WebkitTextStroke: '2px hsl(var(--paper))' }}>完全</span>
          <br />
          <span className="hero-word inline-block" style={{ color: 'hsl(var(--spidey))' }}>观影档案</span>
        </h1>
        <p className="hero-sub mt-5 text-base md:text-xl text-[hsl(var(--paper))]/85 max-w-2xl leading-relaxed">
          从 1962 年那本 12 美分的漫画,到 2026 年《蜘蛛侠:崭新之日》——
          三代真人、一位小黑蛛、五个宇宙,一站补齐,放心进影院。
        </p>
        <div className="hero-sub mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#paths" className="btn-web"><span>🕸 选一条观影路线</span></a>
          <a href="#bnd" className="u-grow font-bold text-[hsl(var(--paper))]">直达《崭新之日》专区 ↓</a>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 w-full">
          {[
            { n: 13, s: '部', label: '院线电影(含复联客串)' },
            { n: 4, s: '代', label: '蜘蛛侠扮演者' },
            { n: 64, s: '年', label: '角色历史(1962–2026)' },
            { n: 100, s: '亿+', label: '全系列全球票房(美元)', prefix: '$' },
          ].map((it, i) => (
            <div key={i} className="hero-stat panel-dark corner-alt-a px-3 py-4 text-center">
              <div className="font-display text-3xl md:text-4xl text-white">
                {it.prefix || ''}<CountUp to={it.n} suffix={it.s} />
              </div>
              <div className="mt-1 text-xs md:text-sm text-[hsl(var(--muted-foreground))]">{it.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 跑马灯 */}
      <div className="marquee-band relative z-20 font-display text-lg md:text-xl tracking-widest">
        <div className="marquee-inner">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="inline-flex gap-10 items-center">
              {['能力越大 责任越大', 'WITH GREAT POWER COMES GREAT RESPONSIBILITY', '任何人都可以戴上面具', 'ANYONE CAN WEAR THE MASK', '你的友好邻居蜘蛛侠', 'FRIENDLY NEIGHBORHOOD SPIDER-MAN'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-10">
                  <span>{t}</span><span aria-hidden>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night-2))] halftone-dark">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="en-over">SEE YOU AT THE MOVIES</span>
            <p className="font-display text-3xl md:text-5xl text-white leading-tight">
              <SplitTitle text="影院见,好邻居。" />
            </p>
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed md:text-right">
            <p>票房数据来源:Box Office Mojo / 索尼影业 / 漫威影业公开资料</p>
            <p>《崭新之日》信息以官方预告与发布为准 · 本站为非官方影迷指南,不含新片剧透</p>
            <p className="mt-2">Spider-Man 及相关角色版权归 Marvel / Sony Pictures 所有</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const FILM_COUNT = FILMS.length
