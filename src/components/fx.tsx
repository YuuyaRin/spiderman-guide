import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** 滚动进入视口时的批量揭示(0.15s stagger,fade + 上浮) */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 0.85, delay, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      },
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

/** 逐词动力标题(每个词独立 span,translate3d(0,30px,0)→0,0.05s stagger) */
export function SplitTitle({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = el.querySelectorAll('span[data-w]')
    gsap.set(spans, { opacity: 0, y: 30 })
    const tween = gsap.to(spans, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [text])
  const words = text.split('')
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} data-w className="inline-block will-change-transform">{w === ' ' ? ' ' : w}</span>
      ))}
    </span>
  )
}

/** 章节标题:EN 小字在上,中文大标题在下 */
export function SectionHead({ en, zh, id }: { en: string; zh: string; id?: string }) {
  return (
    <Reveal className="mb-10 md:mb-14" >
      <div id={id} className="scroll-mt-24">
        <span className="en-over">{en}</span>
        <h2 className="font-black-latin text-3xl md:text-5xl font-black leading-tight">
          <SplitTitle text={zh} />
        </h2>
        <div className="mt-4 h-[3px] w-24" style={{ background: 'linear-gradient(90deg, hsl(var(--spidey)), hsl(var(--ember)))' }} />
      </div>
    </Reveal>
  )
}

/** 数字滚动 */
export function CountUp({ to, suffix = '', className = '' }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: to, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => { el.textContent = `${Math.round(obj.v).toLocaleString()}${suffix}` },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [to, suffix])
  return <span ref={ref} className={className}>0{suffix}</span>
}

/** 全局状态:剧透解锁 + 观影打卡 */
export function useLocalFlag(key: string, init = false) {
  const [v, setV] = useState<boolean>(() => {
    try { return localStorage.getItem(key) === '1' } catch { return init }
  })
  const set = (nv: boolean) => {
    setV(nv)
    try { localStorage.setItem(key, nv ? '1' : '0') } catch { /* noop */ }
  }
  return [v, set] as const
}

export function useLocalList(key: string) {
  const [list, setList] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
  })
  const toggle = (id: string) => {
    setList((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* noop */ }
      return next
    })
  }
  return [list, toggle] as const
}
