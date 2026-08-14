import { useMemo, useState } from 'react'
import { SectionHead, Reveal } from '@/components/fx'
import { MAP_NODES, MAP_EDGES, type NodeType } from '@/data/story'

const TYPE_STYLE: Record<NodeType, { fill: string; text: string; label: string }> = {
  hero:    { fill: '#f3ede0', text: '#0a0a12', label: '人物' },
  event:   { fill: '#e8292e', text: '#ffffff', label: '事件' },
  villain: { fill: '#0a0a12', text: '#f3ede0', label: '反派' },
  item:    { fill: '#f59a2e', text: '#0a0a12', label: '关键物' },
  future:  { fill: '#ffd23e', text: '#0a0a12', label: '新片' },
}

function edgePath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const k = 0.18 * len
  const cx = mx - (dy / len) * k, cy = my + (dx / len) * k
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, lx: (x1 + 2 * cx + x2) / 4, ly: (y1 + 2 * cy + y2) / 4 }
}

export function MindMap() {
  const [sel, setSel] = useState('peter')
  const nodeMap = useMemo(() => new Map(MAP_NODES.map((n) => [n.id, n])), [])
  const active = nodeMap.get(sel)!
  const linked = useMemo(() => {
    const s = new Set<string>([sel])
    MAP_EDGES.forEach((e) => {
      if (e.from === sel) s.add(e.to)
      if (e.to === sel) s.add(e.from)
    })
    return s
  }, [sel])

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="mindmap" en="STORY MIND MAP" zh="剧情思维导图 · 千丝万缕一图清" />
      <p className="-mt-6 mb-6 text-[hsl(var(--muted-foreground))] max-w-2xl">
        人物、事件、关键物之间的因果关系全在这张网里。<b className="text-[hsl(var(--paper))]">点击任意节点</b>,查看它的档案,并高亮与它相连的线。
      </p>

      {/* 图例 */}
      <div className="reveal-none flex flex-wrap gap-2 mb-4">
        {(Object.keys(TYPE_STYLE) as NodeType[]).map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 text-xs font-bold text-[hsl(var(--paper))]/80">
            <span className="w-3.5 h-3.5 border-2 border-[hsl(var(--ink))]" style={{ background: TYPE_STYLE[t].fill }} />
            {TYPE_STYLE[t].label}
          </span>
        ))}
        <span className="ml-auto hidden md:inline text-xs text-[hsl(var(--muted-foreground))]">移动端可左右滑动查看整张网</span>
      </div>

      <Reveal>
        <div className="panel-dark corner-alt-a overflow-hidden">
          <div className="overflow-x-auto">
            <svg viewBox="0 0 1200 700" className="min-w-[860px] w-full halftone-dark" role="img" aria-label="蜘蛛侠剧情关系图">
              {/* 边 */}
              {MAP_EDGES.map((e) => {
                const a = nodeMap.get(e.from)!, b = nodeMap.get(e.to)!
                const { d, lx, ly } = edgePath(a.x, a.y, b.x, b.y)
                const hot = e.from === sel || e.to === sel
                return (
                  <g key={e.from + e.to} opacity={hot ? 1 : 0.18} style={{ transition: 'opacity .25s' }}>
                    <path d={d} fill="none" stroke={hot ? '#e8292e' : '#5a5a72'} strokeWidth={hot ? 3 : 1.6} strokeDasharray={hot ? 'none' : '5 5'} />
                    <g transform={`translate(${lx},${ly})`}>
                      <rect x={-e.label.length * 6.2 - 6} y={-10} width={e.label.length * 12.4 + 12} height={20} rx={3}
                        fill={hot ? '#e8292e' : '#16162a'} stroke="#0a0a12" strokeWidth={1.5} />
                      <text textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} fill="#f3ede0">{e.label}</text>
                    </g>
                  </g>
                )
              })}
              {/* 节点 */}
              {MAP_NODES.map((n) => {
                const st = TYPE_STYLE[n.type]
                const w = Math.max(n.label.length * 16, n.sub.length * 7.5) + 30
                const dim = !linked.has(n.id)
                const isSel = n.id === sel
                return (
                  <g key={n.id} transform={`translate(${n.x},${n.y})`} opacity={dim ? 0.35 : 1}
                    style={{ cursor: 'pointer', transition: 'opacity .25s' }}
                    onClick={() => setSel(n.id)}>
                    <rect x={-w / 2 - 4} y={-27} width={w + 8} height={54} rx={10} fill="#e8292e" opacity={isSel ? 1 : 0} />
                    <rect x={-w / 2} y={-23} width={w} height={46} rx={8}
                      fill={st.fill} stroke="#0a0a12" strokeWidth={3} />
                    <text textAnchor="middle" y={-4} dominantBaseline="central" fontSize={15} fontWeight={900} fill={st.text}>{n.label}</text>
                    <text textAnchor="middle" y={13} dominantBaseline="central" fontSize={8.5} fontWeight={700} letterSpacing={1.5} fill={st.text} opacity={0.65}>{n.sub}</text>
                  </g>
                )
              })}
            </svg>
          </div>
          {/* 详情面板 */}
          <div className="border-t-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night))] px-5 py-4 flex items-start gap-4">
            <span className="shrink-0 mt-0.5 px-2 py-1 text-xs font-black border-2 border-[hsl(var(--ink))]"
              style={{ background: TYPE_STYLE[active.type].fill, color: TYPE_STYLE[active.type].text }}>
              {TYPE_STYLE[active.type].label}
            </span>
            <div>
              <p className="font-black text-lg leading-tight">{active.label} <span className="ml-2 font-display text-xs tracking-widest text-[hsl(var(--muted-foreground))]">{active.sub}</span></p>
              <p className="mt-1 text-sm text-[hsl(var(--paper))]/85 leading-relaxed">{active.detail}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
