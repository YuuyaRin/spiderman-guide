import { useState } from 'react'
import { SectionHead, Reveal } from '@/components/fx'
import { ERA_PROFILES, UNIVERSES } from '@/data/extras'

export function Eras() {
  const [active, setActive] = useState(0)
  const p = ERA_PROFILES[active]
  const rows: [string, string][] = [
    ['活跃年代', p.period], ['代表作', p.films], ['气质基调', p.tone], ['战衣', p.suit],
    ['蛛丝', p.web], ['挚爱', p.love], ['梅婶', p.may], ['名场面', p.signature], ['如今的他', p.endState],
  ]
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="eras" en="FOUR GENERATIONS" zh="四代蜘蛛侠,一种精神" />
      <Reveal>
        <div className="flex flex-wrap gap-2 mb-6">
          {ERA_PROFILES.map((e, i) => (
            <button key={e.key} onClick={() => setActive(i)}
              className={`px-4 py-2 font-black border-[3px] border-[hsl(var(--ink))] transition-all text-sm md:text-base ${i === active ? 'text-white shadow-[4px_4px_0_hsl(var(--ink))] -translate-y-0.5' : 'bg-[hsl(var(--night-2))] text-[hsl(var(--paper))]/70 hover:text-white'}`}
              style={i === active ? { background: e.color } : undefined}>
              {e.actorCN}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal key={p.key}>
        <div className="panel corner-alt-a halftone overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* 左侧代号块 */}
            <div className="md:w-64 shrink-0 p-6 flex md:flex-col justify-between items-start text-white" style={{ background: p.color }}>
              <div>
                <p className="font-display text-sm tracking-widest opacity-90">{p.actor.toUpperCase()}</p>
                <p className="font-black text-3xl leading-tight" style={{ textShadow: '2px 2px 0 hsl(var(--ink))' }}>{p.actorCN}</p>
                <p className="mt-1 font-bold text-sm opacity-90">{p.period}</p>
              </div>
              <svg viewBox="0 0 48 48" className="w-14 h-14 md:w-20 md:h-20 md:mt-10 opacity-90" aria-hidden>
                <g stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round">
                  <path d="M18 20 L6 10 M18 24 L4 24 M18 28 L6 38 M20 32 L12 44 M30 20 L42 10 M30 24 L44 24 M30 28 L42 38 M28 32 L36 44" />
                </g>
                <ellipse cx="24" cy="22" rx="4.5" ry="6" fill="#fff" />
                <ellipse cx="24" cy="33" rx="6" ry="8.5" fill="#fff" />
              </svg>
            </div>
            {/* 右侧属性 */}
            <dl className="flex-1 divide-y-2 divide-dashed divide-[hsl(var(--ink))]/25">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[88px_1fr] md:grid-cols-[120px_1fr] gap-3 px-5 py-3 text-sm">
                  <dt className="font-black opacity-60">{k}</dt>
                  <dd className="leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-3xl">
          三代真人交替的背后是版权流转:雷米三部曲止于创作分歧,超凡系列止于票房,而 2015 年索尼与漫威的一纸共享协议,
          让蜘蛛侠「借住」进了漫威电影宇宙——每一次换人,都是一次时代的转身。
        </p>
      </Reveal>
    </section>
  )
}

export function Universes() {
  const [sel, setSel] = useState('mcu')
  const active = UNIVERSES.find((u) => u.id === sel)!
  return (
    <section className="py-16 md:py-24 border-y-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night-2))] halftone-dark">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHead id="universes" en="MULTIVERSE MAP" zh="一张图搞懂五个宇宙" />
        <p className="-mt-6 mb-8 text-[hsl(var(--muted-foreground))] max-w-2xl">
          蜘蛛侠的电影版权在索尼手里,漫威影业只有「借用权」——这就是所有宇宙分合的根源。点开每个宇宙看看:
        </p>
        <div className="grid md:grid-cols-[240px_1fr] gap-6">
          <Reveal className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {UNIVERSES.map((u) => (
              <button key={u.id} onClick={() => setSel(u.id)}
                className={`shrink-0 text-left px-4 py-3 border-[3px] border-[hsl(var(--ink))] transition-all ${sel === u.id ? 'text-white shadow-[4px_4px_0_hsl(var(--ink))]' : 'bg-[hsl(var(--night))] hover:bg-[hsl(var(--muted))]'}`}
                style={sel === u.id ? { background: u.color } : undefined}>
                <span className="block text-[10px] font-black tracking-widest opacity-80">{u.en}</span>
                <span className="font-black">{u.title}</span>
              </button>
            ))}
          </Reveal>
          <Reveal key={active.id}>
            <div className="panel corner-alt-b halftone p-6 drop-in">
              <h3 className="font-black text-2xl">{active.title}</h3>
              <p className="mt-1 text-sm opacity-70 font-bold">{active.desc}</p>
              <ul className="mt-4 space-y-3">
                {active.points.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="shrink-0 w-6 h-6 grid place-items-center font-display text-white border-2 border-[hsl(var(--ink))]" style={{ background: active.color }}>{i + 1}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 pt-3 border-t-2 border-dashed border-[hsl(var(--ink))]/30 text-xs opacity-70 leading-relaxed">
                连通规则:《英雄无归》的多元宇宙裂缝,让雷米/超凡宇宙的反派与蜘蛛侠短暂进入 MCU;动画《蜘蛛宇宙》则在自己的多重宇宙里运转。
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
