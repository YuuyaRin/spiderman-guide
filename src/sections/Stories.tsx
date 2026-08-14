import { useMemo, useState } from 'react'
import { SectionHead, Reveal, useLocalFlag, useLocalList } from '@/components/fx'
import { FILM_STORIES } from '@/data/stories'
import { FILMS, ERA_META } from '@/data/films'

/**
 * 编年史:每部电影分章剧情推演
 * 全部内容含剧透 → 复用全局剧透闸门(web-archive-spoiler)
 */
export function Stories() {
  const [unlocked, setUnlocked] = useLocalFlag('web-archive-spoiler')
  const [cur, setCur] = useState('sm1')
  const [watched, toggleWatched] = useLocalList('web-archive-watched')

  const filmMap = useMemo(() => new Map(FILMS.map((f) => [f.id, f])), [])
  const story = FILM_STORIES.find((s) => s.id === cur)!
  const film = filmMap.get(cur)!
  const meta = ERA_META[film.era]
  const idx = FILM_STORIES.findIndex((s) => s.id === cur)
  const prev = FILM_STORIES[idx - 1]
  const next = FILM_STORIES[idx + 1]
  const isWatched = watched.includes(cur)

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="stories" en="THE CHRONICLE" zh="编年史 · 逐部分章推演" />
      <p className="-mt-6 mb-8 text-[hsl(var(--muted-foreground))] max-w-2xl">
        每部电影拆成 5–6 章,一步步看完故事如何发生;片尾还有「承上启下」,把散落的珠子串成一条线。
        <b className="text-[hsl(var(--paper))]">含全部老片剧透</b>,与「主线全梳理」共用剧透闸门。
      </p>

      <div className={`spoiler-veil ${unlocked ? '' : 'locked'}`}>
        {!unlocked && (
          <div className="panel corner-alt-b halftone p-6 md:p-8 text-center max-w-md mx-auto mb-6 relative z-10">
            <div className="burst w-20 h-20 mx-auto font-display text-xl rotate-[-8deg]">剧透<br />警告</div>
            <p className="mt-4 font-black text-xl">编年史含 10 部电影的完整剧透</p>
            <p className="mt-2 text-sm opacity-75 leading-relaxed">
              这里会一步步讲完每部电影的全部情节(不含《崭新之日》)。想保留初见惊喜请先去补片;想一次看懂,直接解锁。
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => setUnlocked(true)} className="btn-web"><span>我要全看懂,解锁</span></button>
              <a href="#paths" className="px-5 py-3 border-[3px] border-[hsl(var(--ink))] font-black bg-white hover:bg-[hsl(var(--paper-dim))] transition-colors text-sm">
                先去看片 →
              </a>
            </div>
          </div>
        )}
        <div className="spoiler-body" style={unlocked ? undefined : { maxHeight: 380, overflow: 'hidden', maskImage: 'linear-gradient(180deg,#000 20%,transparent)', WebkitMaskImage: 'linear-gradient(180deg,#000 20%,transparent)' }}>
          {/* 影片选择器:按年代分组 */}
          <div className="mb-8 flex gap-3 overflow-x-auto pb-3 tl-scroll">
            {FILM_STORIES.map((s) => {
              const f = filmMap.get(s.id)!
              const m = ERA_META[f.era]
              const on = s.id === cur
              return (
                <button key={s.id} onClick={() => setCur(s.id)}
                  className={`shrink-0 border-[3px] border-[hsl(var(--ink))] px-4 py-2.5 text-left transition-all ${on ? 'shadow-[4px_4px_0_hsl(var(--ink))] -translate-y-0.5' : 'bg-[hsl(var(--night-2))] hover:-translate-y-0.5'}`}
                  style={on ? { background: m.color } : undefined}>
                  <span className={`block font-display text-xs tracking-widest ${on ? 'text-white/85' : 'text-[hsl(var(--muted-foreground))]'}`}>{f.year} · {m.en}</span>
                  <span className={`block font-black text-base leading-tight ${on ? 'text-white' : 'text-[hsl(var(--paper))]/90'}`}>{f.cn}</span>
                </button>
              )
            })}
          </div>

          {/* 本片头版 */}
          <Reveal key={cur}>
            <article className="panel corner-alt-a halftone overflow-hidden">
              <div className="flex flex-wrap items-stretch border-b-[3px] border-[hsl(var(--ink))]">
                <div className="px-5 py-4 grid place-items-center text-white" style={{ background: meta.color }}>
                  <span className="font-display text-3xl" style={{ textShadow: '2px 2px 0 hsl(var(--ink))' }}>{film.year}</span>
                </div>
                <div className="flex-1 min-w-[220px] px-5 py-3">
                  <span className="inline-block text-[10px] font-black tracking-widest px-1.5 py-0.5 text-white" style={{ background: meta.color }}>{meta.label}</span>
                  <h3 className="font-black text-2xl leading-tight mt-0.5">{film.cn} <span className="font-display text-sm tracking-widest opacity-55">{film.en}</span></h3>
                  <p className="mt-1 text-xs font-bold opacity-70">导演 {film.director} · 对手 {film.villain}</p>
                </div>
                <button onClick={() => toggleWatched(cur)}
                  className={`self-center m-3 text-xs font-black border-2 border-[hsl(var(--ink))] px-3 py-2 transition-colors ${isWatched ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))]' : 'bg-[hsl(var(--spidey))] text-white hover:brightness-110'}`}>
                  {isWatched ? '✓ 已看过本片' : '标记已看'}
                </button>
              </div>

              {/* 分章 */}
              <ol className="relative px-5 md:px-8 py-7 space-y-7">
                <div className="absolute left-[34px] md:left-[44px] top-9 bottom-9 w-[3px] -translate-x-1/2"
                  style={{ background: `linear-gradient(180deg, ${meta.color}, hsl(var(--ink)))` }} />
                {story.chapters.map((c, i) => (
                  <li key={i} className="relative flex gap-4 md:gap-5">
                    <span className="shrink-0 z-10 w-10 h-10 grid place-items-center font-display text-white border-[3px] border-[hsl(var(--ink))] shadow-[3px_3px_0_hsl(var(--ink))]"
                      style={{ background: i === story.chapters.length - 1 ? 'hsl(var(--ink))' : meta.color }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 border-[3px] border-[hsl(var(--ink))] bg-white p-4 shadow-[4px_4px_0_hsl(var(--ink))]">
                      <h4 className="font-black text-base md:text-lg">{c.t}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed opacity-85">{c.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* 承上启下 + 观看贴士 */}
              <div className="grid md:grid-cols-2 border-t-[3px] border-[hsl(var(--ink))]">
                <div className="p-5 md:border-r-[3px] border-[hsl(var(--ink))] bg-white/60">
                  <span className="en-over !text-[0.62rem]">承上启下 · LEGACY</span>
                  <p className="text-sm leading-relaxed font-bold opacity-90">{story.legacy}</p>
                </div>
                <div className="p-5 bg-[hsl(var(--night-2))] text-[hsl(var(--paper))] halftone-dark border-t-[3px] md:border-t-0 border-[hsl(var(--ink))]">
                  <span className="en-over !text-[0.62rem]">观看贴士 · PRO TIP</span>
                  <p className="text-sm leading-relaxed opacity-90">{story.watch}</p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* 上一部 / 下一部:串联 */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {prev ? (
              <button onClick={() => setCur(prev.id)}
                className="text-left border-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night-2))] px-4 py-3 font-bold text-sm text-[hsl(var(--paper))]/85 hover:text-white hover:-translate-y-0.5 transition-all shadow-[3px_3px_0_hsl(var(--ink))]">
                ← 上一部<br /><span className="font-black text-base">{filmMap.get(prev.id)!.cn}</span>
              </button>
            ) : <span />}
            {next ? (
              <button onClick={() => setCur(next.id)}
                className="text-right border-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night-2))] px-4 py-3 font-bold text-sm text-[hsl(var(--paper))]/85 hover:text-white hover:-translate-y-0.5 transition-all shadow-[3px_3px_0_hsl(var(--ink))]">
                下一部 →<br /><span className="font-black text-base">{filmMap.get(next.id)!.cn}</span>
              </button>
            ) : (
              <a href="#bnd" className="text-right border-[3px] border-[hsl(var(--ink))] px-4 py-3 font-bold text-sm shadow-[3px_3px_0_hsl(var(--ink))] hover:-translate-y-0.5 transition-all text-[hsl(var(--ink))]" style={{ background: 'hsl(var(--spidey))' }}>
                <span className="text-white">编年史读完 →<br /><span className="font-black text-base">去《崭新之日》专区</span></span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
