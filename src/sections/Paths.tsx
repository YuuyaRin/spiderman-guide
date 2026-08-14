import { useMemo } from 'react'
import { SectionHead, Reveal, useLocalList } from '@/components/fx'
import { FILMS, WATCH_PATHS } from '@/data/films'

export function Paths() {
  const [done, toggle] = useLocalList('web-archive-watched')
  const filmMap = useMemo(() => new Map(FILMS.map((f) => [f.id, f])), [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="paths" en="CHOOSE YOUR PATH" zh="先选路线,再补作业" />
      <p className="-mt-6 mb-6 text-[hsl(var(--muted-foreground))] max-w-2xl">
        不管你现在站在哪里,都有一条通往《崭新之日》的最短路径。勾选你看过的片子,进度会保存在本机。
      </p>

      {/* 总备战进度 */}
      <Reveal className="mb-10">
        <div className="panel-dark corner-alt-b halftone-dark px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="font-display text-sm tracking-widest text-[hsl(var(--ember))]">MY PROGRESS · 我的备战进度</span>
          <div className="flex-1 h-4 border-2 border-[hsl(var(--ink))] bg-[hsl(var(--night))] overflow-hidden">
            <div className="h-full transition-all duration-500"
              style={{ width: `${Math.round((done.filter((id) => id !== 'bnd').length / (FILMS.length - 1)) * 100)}%`, background: 'linear-gradient(90deg, hsl(var(--spidey)), hsl(var(--ember)))' }} />
          </div>
          <span className="font-black text-sm whitespace-nowrap">
            {done.filter((id) => id !== 'bnd').length} / {FILMS.length - 1} 部
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {done.includes('hc') && done.includes('nwh')
              ? '核心课程已修完,可以进场了!🎬'
              : done.includes('nwh')
                ? '再补一部《英雄归来》,前因更完整'
                : done.includes('hc')
                  ? '还差最关键的一部:《英雄无归》'
                  : '从《英雄归来》开始,性价比最高'}
          </span>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {WATCH_PATHS.map((p, idx) => {
          const watched = p.films.filter((id) => done.includes(id)).length
          const pct = Math.round((watched / p.films.length) * 100)
          return (
            <Reveal key={p.id} delay={idx * 0.08}>
              <article className={`panel panel-pop ${idx % 2 ? 'corner-alt-b' : 'corner-alt-a'} halftone h-full flex flex-col p-5`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-display text-sm tracking-widest text-[hsl(var(--spidey))]">{p.en}</span>
                    <h3 className="text-2xl font-black mt-1">{p.title}</h3>
                  </div>
                  <span className="shrink-0 text-xs font-bold border-2 border-[hsl(var(--ink))] px-2 py-1 bg-white">{p.time}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{p.desc}</p>

                <div className="mt-4 h-3 border-2 border-[hsl(var(--ink))] bg-white overflow-hidden">
                  <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, hsl(var(--spidey)), hsl(var(--ember)))' }} />
                </div>
                <p className="mt-1 text-xs font-bold">{watched}/{p.films.length} · {pct}% 完成</p>

                <ul className="mt-4 space-y-2 flex-1">
                  {p.films.map((id) => {
                    const f = filmMap.get(id)!
                    const checked = done.includes(id)
                    return (
                      <li key={id}>
                        <button onClick={() => toggle(id)}
                          className={`w-full text-left flex items-center gap-2.5 border-2 border-[hsl(var(--ink))] px-2.5 py-2 text-sm transition-colors ${checked ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))]' : 'bg-white hover:bg-[hsl(var(--paper-dim))]'}`}>
                          <span className={`w-4 h-4 shrink-0 grid place-items-center border-2 ${checked ? 'border-[hsl(var(--paper))] bg-[hsl(var(--spidey))] text-white' : 'border-[hsl(var(--ink))]'}`}>
                            {checked && '✓'}
                          </span>
                          <span className={checked ? 'line-through opacity-70' : ''}>
                            {f.cn} <span className="opacity-60 text-xs">{f.year}</span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
