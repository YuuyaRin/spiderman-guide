import { SectionHead, Reveal, useLocalFlag } from '@/components/fx'
import { NWH_BEATS, BND_FACTS, BND_CAST, BND_KNOW } from '@/data/extras'

/** 《英雄无归》结局速通 —— 剧透闸门 */
export function Recap() {
  const [unlocked, setUnlocked] = useLocalFlag('web-archive-spoiler')
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="recap" en="NO WAY HOME RECAP" zh="宿命速通:《英雄无归》结局" />
      <p className="-mt-6 mb-8 text-[hsl(var(--muted-foreground))] max-w-2xl">
        《崭新之日》的一切都建立在这个结局之上。本节包含《英雄无归》的完整剧透——
        没看过的话,先去补片;看过但记不清的,解锁速通。
      </p>

      <div className={`spoiler-veil ${unlocked ? '' : 'locked'}`}>
        <div className="spoiler-body">
          <ol className="relative border-l-[3px] border-[hsl(var(--spidey))] ml-3 space-y-6">
            {NWH_BEATS.map((b, i) => (
              <li key={b.k} className="relative pl-8">
                <span className="absolute -left-[19px] top-0 w-9 h-9 grid place-items-center font-display text-white border-[3px] border-[hsl(var(--ink))] shadow-[3px_3px_0_hsl(var(--ink))]"
                  style={{ background: i === NWH_BEATS.length - 1 ? 'linear-gradient(135deg, hsl(var(--spidey)), hsl(var(--ember)))' : 'hsl(var(--night-2))' }}>
                  {b.k}
                </span>
                <h3 className="font-black text-lg">{b.t}</h3>
                <p className="mt-1 text-sm text-[hsl(var(--paper))]/80 leading-relaxed max-w-3xl">{b.d}</p>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10">
            <div className="panel corner-alt-a halftone p-5 max-w-3xl">
              <p className="font-black text-lg">一句话总结</p>
              <p className="mt-1 text-sm leading-relaxed">
                彼得赢了战斗,却输掉了「彼得·帕克」这个人生:MJ、内德、哈皮、全世界都不再记得他。
                他搬进小公寓,缝好自制战衣,继续当好邻居蜘蛛侠。<b>这就是《崭新之日》开场的世界。</b>
              </p>
            </div>
          </Reveal>
        </div>

        {!unlocked && (
          <div className="absolute inset-0 z-10 grid place-items-center p-4">
            <div className="panel corner-alt-b halftone p-6 md:p-8 text-center max-w-md drop-in">
              <div className="burst w-20 h-20 mx-auto font-display text-xl rotate-[-8deg]">剧透<br/>警告</div>
              <p className="mt-4 font-black text-xl">前方是《英雄无归》完整剧透</p>
              <p className="mt-2 text-sm opacity-75 leading-relaxed">如果你还没看过这部 2021 年的电影,强烈建议先补片再回来。</p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => setUnlocked(true)} className="btn-web"><span>我看过了,解锁</span></button>
                <a href="#paths" className="px-5 py-3 border-[3px] border-[hsl(var(--ink))] font-black bg-white hover:bg-[hsl(var(--paper-dim))] transition-colors text-sm">
                  先去补片 →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/** 《崭新之日》专区 —— 零剧透 */
export function BrandNewDay() {
  return (
    <section id="bnd" className="relative py-16 md:py-24 border-y-[3px] border-[hsl(var(--ink))] overflow-hidden night-city">
      <div className="absolute inset-0 halftone-dark" />
      <div className="absolute inset-0 vignette" />
      <div className="relative max-w-6xl mx-auto px-4">
        <Reveal>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="en-over !mb-0">ZERO-SPOILER ZONE</span>
            <span className="text-[10px] font-black tracking-widest bg-[hsl(var(--paper))] text-[hsl(var(--ink))] px-2 py-0.5 border-2 border-[hsl(var(--ink))]">本区零剧透</span>
          </div>
          <h2 className="font-black-latin font-black text-4xl md:text-6xl mt-3 leading-tight">
            蜘蛛侠:崭新之日
            <span className="block text-xl md:text-2xl mt-2 text-[hsl(var(--paper))]/70 font-display tracking-wider">SPIDER-MAN: BRAND NEW DAY · 2026</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* 左:官方确认信息 */}
          <Reveal className="lg:col-span-3">
            <div className="panel corner-alt-a halftone p-6 h-full">
              <h3 className="font-black text-xl mb-4">官方确认信息</h3>
              <dl className="space-y-3">
                {BND_FACTS.map((f) => (
                  <div key={f.label} className="grid grid-cols-[92px_1fr] gap-3 text-sm border-b-2 border-dashed border-[hsl(var(--ink))]/20 pb-3">
                    <dt className="font-black opacity-60">{f.label}</dt>
                    <dd className="font-bold leading-relaxed">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <h4 className="font-black mt-5 mb-3 text-sm opacity-60">剧情前提(来自官方预告,无关键剧透)</h4>
              <ul className="space-y-2.5">
                {BND_KNOW.map((k, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                    <span className="shrink-0 mt-0.5 w-4 h-4 bg-[hsl(var(--spidey))] border-2 border-[hsl(var(--ink))]" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 右:卡司 */}
          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="panel-dark corner-alt-b p-6 h-full">
              <h3 className="font-black text-xl mb-1">确认阵容</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">以官方发布为准;角色未公开者已标注</p>
              <ul className="divide-y-2 divide-dashed divide-white/10">
                {BND_CAST.map((c) => (
                  <li key={c.a} className="py-2.5 flex items-baseline justify-between gap-3 text-sm">
                    <div>
                      <span className="font-black">{c.a}</span>
                      <span className="block text-xs text-[hsl(var(--muted-foreground))]">{c.note}</span>
                    </div>
                    <span className="text-right text-[hsl(var(--ember))] font-bold shrink-0">{c.r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* 片名含义 */}
        <Reveal className="mt-6">
          <div className="panel corner-alt-b halftone p-6 md:p-8">
            <span className="font-display text-sm tracking-widest text-[hsl(var(--spidey))]">WHY "BRAND NEW DAY"?</span>
            <h3 className="font-black text-2xl mt-1">片名彩蛋:一部 2008 年的漫画名篇</h3>
            <div className="mt-4 grid md:grid-cols-2 gap-5 text-sm leading-relaxed">
              <p>
                漫画《仅剩之日》(One More Day, 2007)中,身份曝光、梅婶垂死的彼得与恶魔交易,
                以<b>婚姻与身份</b>为代价改写现实——随后开启的《崭新之日》(Brand New Day, 2008)里,
                全世界都忘了蜘蛛侠是谁,彼得从零开始。这条争议名篇,正是《英雄无归》结局的漫画原型。
              </p>
              <p>
                电影把这个标题接了过来:被遗忘的彼得、空白的社交关系、从头再来的街头英雄。
                制片艾米·帕斯卡已确认本片是<b>全新三部曲的第一章</b>——所以别指望多元宇宙大场面,
                这一次,故事属于皇后区的街头。
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
