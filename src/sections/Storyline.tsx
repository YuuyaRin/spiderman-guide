import { useState } from 'react'
import { SectionHead, Reveal, useLocalFlag } from '@/components/fx'
import { CHAIN, STORYLINE } from '@/data/story'

/** 60 秒核心脉络:无关键剧透的逻辑链路 */
export function Chain() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="chain" en="THE THROUGHLINE" zh="60 秒看懂整条故事线" />
      <p className="-mt-6 mb-10 text-[hsl(var(--muted-foreground))] max-w-2xl">
        不管宇宙怎么重启、演员怎么更换,蜘蛛侠六十年的故事其实只有一条链路。先记住它,后面所有细节都能挂上来。
      </p>
      <div className="relative">
        <div className="absolute left-[22px] md:left-1/2 top-2 bottom-2 w-[3px] -translate-x-1/2" style={{ background: 'linear-gradient(180deg, hsl(var(--spidey)), hsl(var(--ember)))' }} />
        <ol className="space-y-8">
          {CHAIN.map((s, i) => (
            <Reveal key={s.k} delay={Math.min(i * 0.05, 0.25)}>
              <li className={`relative flex flex-col md:flex-row gap-4 md:gap-0 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
                {/* 节点 */}
                <div className="absolute left-[22px] md:left-1/2 top-1 -translate-x-1/2 w-11 h-11 grid place-items-center font-display text-white border-[3px] border-[hsl(var(--ink))] shadow-[3px_3px_0_hsl(var(--ink))] z-10"
                  style={{ background: i === CHAIN.length - 1 ? 'linear-gradient(135deg, hsl(var(--spidey)), hsl(var(--ember)))' : 'hsl(var(--night-2))' }}>
                  {s.k}
                </div>
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 ? 'md:pl-14' : 'md:pr-14'}`}>
                  <div className={`panel panel-pop ${i % 2 ? 'corner-alt-b' : 'corner-alt-a'} halftone p-5`}>
                    <span className="font-display text-xs tracking-widest text-[hsl(var(--spidey))]">{s.en}</span>
                    <h3 className="font-black text-xl mt-0.5">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed opacity-85">{s.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.films.map((f) => (
                        <span key={f} className="text-[10px] font-bold border-2 border-[hsl(var(--ink))] bg-white px-1.5 py-0.5">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** 主线剧情全梳理:MCU 六部曲详细剧情(剧透闸门) */
export function Storyline() {
  const [unlocked, setUnlocked] = useLocalFlag('web-archive-spoiler')
  const [open, setOpen] = useState<string | null>('cw')
  return (
    <section className="py-16 md:py-24 border-y-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night-2))] halftone-dark">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHead id="storyline" en="THE FULL STORY" zh="主线剧情全梳理 · 不用补片也能懂" />
        <p className="-mt-6 mb-8 text-[hsl(var(--muted-foreground))] max-w-2xl">
          没时间一部部补?没关系。从内战到《英雄无归》结局,再到新片开场前的四年空白——
          完整剧情都在这里,读完即达标。<b className="text-[hsl(var(--paper))]">本节含全部主线剧透</b>,已上闸门。
        </p>

        <div className={`spoiler-veil ${unlocked ? '' : 'locked'}`}>
          {!unlocked && (
            <div className="panel corner-alt-b halftone p-6 md:p-8 text-center max-w-md mx-auto mb-6 relative z-10">
              <div className="burst w-20 h-20 mx-auto font-display text-xl rotate-[-8deg]">剧透<br />警告</div>
              <p className="mt-4 font-black text-xl">前方是 2016–2021 全部主线剧透</p>
              <p className="mt-2 text-sm opacity-75 leading-relaxed">
                这里是「不补片也能懂」的完整剧情梳理。想保留初见惊喜,请先去补片;想一次看懂,直接解锁。
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => setUnlocked(true)} className="btn-web"><span>我要全看懂,解锁</span></button>
                <a href="#paths" className="px-5 py-3 border-[3px] border-[hsl(var(--ink))] font-black bg-white hover:bg-[hsl(var(--paper-dim))] transition-colors text-sm">
                  先去看片 →
                </a>
              </div>
            </div>
          )}
          <div className="spoiler-body space-y-4" style={unlocked ? undefined : { maxHeight: 380, overflow: 'hidden', maskImage: 'linear-gradient(180deg,#000 20%,transparent)', WebkitMaskImage: 'linear-gradient(180deg,#000 20%,transparent)' }}>
            {STORYLINE.map((ch) => {
              const isOpen = open === ch.id
              return (
                <article key={ch.id} className="panel corner-alt-a halftone overflow-hidden">
                  <button onClick={() => setOpen(isOpen ? null : ch.id)}
                    className="w-full text-left px-5 py-4 flex items-center gap-3 md:gap-4 hover:bg-white/60 transition-colors">
                    <span className="shrink-0 font-display text-lg text-white bg-[hsl(var(--spidey))] border-2 border-[hsl(var(--ink))] px-2 py-0.5">{ch.year}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-black text-lg leading-tight truncate">{ch.film}</span>
                      <span className="block font-display text-xs tracking-widest opacity-55">{ch.en}</span>
                    </span>
                    <span className="font-display text-2xl shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 pt-2 border-t-[3px] border-[hsl(var(--ink))] drop-in">
                      <p className="text-sm font-bold leading-relaxed opacity-80">{ch.intro}</p>
                      <ol className="mt-4 space-y-4">
                        {ch.beats.map((b, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="shrink-0 mt-0.5 w-6 h-6 grid place-items-center text-xs font-black text-white border-2 border-[hsl(var(--ink))] bg-[hsl(var(--ink))]">{i + 1}</span>
                            <div>
                              <h4 className="font-black text-sm">{b.t}</h4>
                              <p className="mt-1 text-sm leading-relaxed opacity-85">{b.d}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      {ch.quote && (
                        <blockquote className="mt-5 border-l-4 border-[hsl(var(--spidey))] bg-white/70 px-4 py-3 text-sm font-bold">
                          「{ch.quote}」
                        </blockquote>
                      )}
                      <p className="mt-4 pt-3 border-t-2 border-dashed border-[hsl(var(--ink))]/30 text-sm font-bold text-[hsl(var(--spidey))]">
                        ▸ {ch.outro}
                      </p>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
