import { useEffect, useMemo, useRef, useState } from 'react'
import { SectionHead, Reveal } from '@/components/fx'
import { MAP_NODES, MAP_EDGES, ZONE_META, type NodeType, type Zone } from '@/data/story'

const TYPE_STYLE: Record<NodeType, { fill: string; text: string; label: string }> = {
  hero:    { fill: '#f3ede0', text: '#0a0a12', label: '人物' },
  event:   { fill: '#e8292e', text: '#ffffff', label: '事件' },
  villain: { fill: '#0a0a12', text: '#f3ede0', label: '反派' },
  item:    { fill: '#f59a2e', text: '#0a0a12', label: '关键物' },
  future:  { fill: '#ffd23e', text: '#0a0a12', label: '新片' },
  film:    { fill: '#ffffff', text: '#ffffff', label: '影片' }, // fill 由 zone 色动态覆盖
}

const VB = { w: 1750, h: 950 }

const ZONE_AREAS: { zone: Zone; x: number; y: number; w: number; h: number; label: string }[] = [
  { zone: 'raimi', x: 80, y: 40, w: 400, h: 430, label: '雷米宇宙 · 2002–2007' },
  { zone: 'webb', x: 80, y: 505, w: 400, h: 380, label: '超凡宇宙 · 2012–2014' },
  { zone: 'mcu', x: 525, y: 40, w: 705, h: 640, label: 'MCU 主线 · 2016–2021' },
  { zone: 'verse', x: 1295, y: 55, w: 400, h: 425, label: '蜘蛛宇宙(动画)' },
  { zone: 'bnd', x: 1235, y: 465, w: 500, h: 455, label: '索尼衍生 → 崭新之日' },
]

type Filter = 'all' | 'films' | Zone

function edgePath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const k = Math.min(0.16 * len, 60)
  const cx = mx - (dy / len) * k, cy = my + (dx / len) * k
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, lx: (x1 + 2 * cx + x2) / 4, ly: (y1 + 2 * cy + y2) / 4 }
}

export function MindMap() {
  const [filter, setFilter] = useState<Filter>('all')
  const [sel, setSel] = useState('peter')
  const [hover, setHover] = useState<string | null>(null)
  const [view, setView] = useState({ k: 1, x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)
  const dragRef = useRef<{ px: number; py: number } | null>(null)
  const movedRef = useRef(false)

  // 各宇宙聚焦视角:transform 为 translate 后 scale,screen = (model + t) * k
  const ZONE_FOCUS: Partial<Record<Filter, { k: number; x: number; y: number }>> = {
    raimi: { k: 1.7, x: 875 / 1.7 - 280, y: 475 / 1.7 - 235 },
    webb: { k: 1.7, x: 875 / 1.7 - 280, y: 475 / 1.7 - 695 },
    mcu: { k: 1.5, x: 875 / 1.5 - 880, y: 475 / 1.5 - 370 },
    verse: { k: 1.8, x: 875 / 1.8 - 1495, y: 475 / 1.8 - 265 },
    bnd: { k: 1.6, x: 875 / 1.6 - 1470, y: 475 / 1.6 - 690 },
  }
  const applyFilter = (f: Filter) => {
    setFilter(f)
    setView(ZONE_FOCUS[f] ?? { k: 1, x: 0, y: 0 })
  }

  const nodeMap = useMemo(() => new Map(MAP_NODES.map((n) => [n.id, n])), [])

  const visible = useMemo(() => {
    if (filter === 'all') return new Set(MAP_NODES.map((n) => n.id))
    if (filter === 'films') return new Set(MAP_NODES.filter((n) => n.type === 'film' || n.id === 'bnd').map((n) => n.id))
    return new Set(MAP_NODES.filter((n) => n.zone === filter).map((n) => n.id))
  }, [filter])

  useEffect(() => {
    if (!visible.has(sel)) setSel(filter === 'all' ? 'peter' : [...visible][0])
  }, [filter, visible, sel])

  const active = nodeMap.get(sel) ?? MAP_NODES[0]
  const linked = useMemo(() => {
    const s = new Set<string>([sel])
    MAP_EDGES.forEach((e) => {
      if (e.from === sel) s.add(e.to)
      if (e.to === sel) s.add(e.from)
    })
    return s
  }, [sel])

  // 滚轮缩放(以指针为锚点);需原生监听以便 preventDefault
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = svg.getBoundingClientRect()
      const sx = ((e.clientX - rect.left) / rect.width) * VB.w
      const sy = ((e.clientY - rect.top) / rect.height) * VB.h
      setView((v) => {
        const k2 = Math.min(3, Math.max(0.55, v.k * (e.deltaY < 0 ? 1.15 : 0.87)))
        return { k: k2, x: sx - (sx - v.x) * (k2 / v.k), y: sy - (sy - v.y) * (k2 / v.k) }
      })
    }
    svg.addEventListener('wheel', onWheel, { passive: false })
    return () => svg.removeEventListener('wheel', onWheel)
  }, [])

  const zoomBy = (f: number) =>
    setView((v) => {
      const k2 = Math.min(3, Math.max(0.55, v.k * f))
      return { k: k2, x: VB.w / 2 - (VB.w / 2 - v.x) * (k2 / v.k), y: VB.h / 2 - (VB.h / 2 - v.y) * (k2 / v.k) }
    })

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = { px: e.clientX, py: e.clientY }
    movedRef.current = false
    svgRef.current?.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = dragRef.current
    const svg = svgRef.current
    if (!d || !svg) return
    const rect = svg.getBoundingClientRect()
    const dx = ((e.clientX - d.px) / rect.width) * VB.w
    const dy = ((e.clientY - d.py) / rect.height) * VB.h
    if (Math.abs(e.clientX - d.px) + Math.abs(e.clientY - d.py) > 5) movedRef.current = true
    if (movedRef.current) {
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
      dragRef.current = { px: e.clientX, py: e.clientY }
    }
  }
  const onPointerUp = () => {
    dragRef.current = null
    // 拖拽后的合成 click 会在 pointerup 后立即触发;稍候复位,避免吞掉下一次正常点击
    setTimeout(() => { movedRef.current = false }, 60)
  }
  const clickNode = (id: string) => {
    if (movedRef.current) { movedRef.current = false; return }
    setSel(id)
  }

  const filters: { id: Filter; label: string; color?: string }[] = [
    { id: 'all', label: `全部 (${MAP_NODES.length})` },
    { id: 'mcu', label: 'MCU 主线', color: ZONE_META.mcu.color },
    { id: 'raimi', label: '雷米宇宙', color: ZONE_META.raimi.color },
    { id: 'webb', label: '超凡宇宙', color: ZONE_META.webb.color },
    { id: 'verse', label: '蜘蛛宇宙', color: ZONE_META.verse.color },
    { id: 'bnd', label: '崭新之日', color: ZONE_META.bnd.color },
    { id: 'films', label: '只看影片' },
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <SectionHead id="mindmap" en="STORY MIND MAP" zh="剧情思维导图 · 全作品一张网" />
      <p className="-mt-6 mb-6 text-[hsl(var(--muted-foreground))] max-w-2xl">
        六个宇宙、{MAP_NODES.length} 个节点、{MAP_EDGES.length} 条关系线。<b className="text-[hsl(var(--paper))]">点击节点</b>看档案并高亮关联;
        <b className="text-[hsl(var(--paper))]">拖拽平移、滚轮或按钮缩放</b>,悬浮节点可速览。
      </p>

      {/* 筛选 */}
      <div className="reveal-none flex flex-wrap gap-2 mb-4">
        {filters.map((f) => (
          <button key={f.id} onClick={() => applyFilter(f.id)}
            className={`px-3 py-1.5 text-xs font-black border-2 border-[hsl(var(--ink))] transition-all ${filter === f.id ? 'text-white shadow-[3px_3px_0_hsl(var(--ink))]' : 'bg-[hsl(var(--night))] text-[hsl(var(--paper))]/70 hover:text-white'}`}
            style={filter === f.id ? { background: f.color || 'hsl(var(--spidey))' } : undefined}>
            {f.label}
          </button>
        ))}
        <span className="ml-auto hidden md:inline text-xs text-[hsl(var(--muted-foreground))] self-center">图例:白=人物 红=事件 黑=反派 橙=关键物 黄=新片 彩色=影片(按宇宙)</span>
      </div>

      <Reveal>
        <div className="panel-dark corner-alt-a overflow-hidden relative">
          <svg ref={svgRef} viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full halftone-dark select-none"
            style={{ touchAction: 'none', cursor: dragRef.current ? 'grabbing' : 'grab' }}
            role="img" aria-label="蜘蛛侠全系列剧情关系图"
            onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
            <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
              {/* 宇宙分区底图 */}
              {ZONE_AREAS.filter((a) => filter === 'all' || filter === 'films' || a.zone === filter || (filter === 'bnd' && a.zone === 'bnd')).map((a) => {
                const hasNodes = MAP_NODES.some((n) => visible.has(n.id) && n.x > a.x && n.x < a.x + a.w && n.y > a.y && n.y < a.y + a.h)
                if (!hasNodes) return null
                return (
                  <g key={a.zone} opacity={0.55}>
                    <rect x={a.x} y={a.y} width={a.w} height={a.h} rx={18} fill="none"
                      stroke={ZONE_META[a.zone].color} strokeWidth={2} strokeDasharray="10 8" opacity={0.5} />
                    <text x={a.x + 18} y={a.y + 30} fontSize={15} fontWeight={900} fill={ZONE_META[a.zone].color} opacity={0.9}>{a.label}</text>
                  </g>
                )
              })}
              {/* 边:标签只在选中关联时显示,避免密集区文字堆叠 */}
              {MAP_EDGES.filter((e) => visible.has(e.from) && visible.has(e.to)).map((e) => {
                const a = nodeMap.get(e.from)!, b = nodeMap.get(e.to)!
                const { d, lx, ly } = edgePath(a.x, a.y, b.x, b.y)
                const hot = e.from === sel || e.to === sel
                return (
                  <g key={e.from + e.to + e.label} opacity={hot ? 1 : 0.16} style={{ transition: 'opacity .25s' }}>
                    <path d={d} fill="none" stroke={hot ? '#e8292e' : '#5a5a72'} strokeWidth={hot ? 3.2 : 1.6} strokeDasharray={hot ? 'none' : '5 5'} />
                    {hot && (
                      <g transform={`translate(${lx},${ly})`}>
                        <rect x={-e.label.length * 6.2 - 6} y={-10} width={e.label.length * 12.4 + 12} height={20} rx={3}
                          fill="#e8292e" stroke="#0a0a12" strokeWidth={1.5} />
                        <text textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} fill="#f3ede0">{e.label}</text>
                      </g>
                    )}
                  </g>
                )
              })}
              {/* 节点 */}
              {MAP_NODES.filter((n) => visible.has(n.id)).map((n) => {
                const isFilm = n.type === 'film'
                const st = isFilm
                  ? { fill: ZONE_META[n.zone].color, text: n.zone === 'bnd' ? '#0a0a12' : '#ffffff' }
                  : TYPE_STYLE[n.type]
                const w = Math.max(n.label.length * 16, n.sub.length * 7.5) + 30
                const dim = !linked.has(n.id)
                const isSel = n.id === sel
                return (
                  <g key={n.id} className="map-node" transform={`translate(${n.x},${n.y})`} opacity={dim ? 0.35 : 1}
                    style={{ cursor: 'pointer', transition: 'opacity .25s' }}
                    onClick={() => clickNode(n.id)}
                    onPointerEnter={() => setHover(n.id)} onPointerLeave={() => setHover(null)}>
                    <rect x={-w / 2 - 4} y={-27} width={w + 8} height={54} rx={10} fill="#e8292e" opacity={isSel ? 1 : 0} />
                    <rect x={-w / 2} y={-23} width={w} height={46} rx={8}
                      fill={st.fill} stroke="#0a0a12" strokeWidth={isFilm ? 3.5 : 3} />
                    <text textAnchor="middle" y={-4} dominantBaseline="central" fontSize={isFilm ? 15 : 14.5} fontWeight={900} fill={st.text}>{n.label}</text>
                    <text textAnchor="middle" y={13} dominantBaseline="central" fontSize={8.5} fontWeight={700} letterSpacing={1.5} fill={st.text} opacity={0.65}>{n.sub}</text>
                  </g>
                )
              })}
              {/* 悬浮速览:独立顶层渲染,永远压在所有节点与边之上 */}
              {(() => {
                const n = hover ? nodeMap.get(hover) : null
                if (!n || !visible.has(n.id)) return null
                const tipText = n.detail.length > 30 ? n.detail.slice(0, 30) + '…' : n.detail
                const tipW = Math.max((n.label.length + 4) * 15, tipText.length * 12) + 24
                const x = Math.min(Math.max(n.x, tipW / 2 + 12), VB.w - tipW / 2 - 12)
                const above = n.y > 130
                return (
                  <g transform={`translate(${x},${above ? n.y - 68 : n.y + 44})`} pointerEvents="none">
                    <rect x={-tipW / 2} y={-26} width={tipW} height={50} rx={6} fill="#f3ede0" stroke="#0a0a12" strokeWidth={2.5} />
                    <text textAnchor="middle" y={-12} dominantBaseline="central" fontSize={13} fontWeight={900} fill="#0a0a12">{n.label} · {TYPE_STYLE[n.type].label}</text>
                    <text textAnchor="middle" y={9} dominantBaseline="central" fontSize={11.5} fontWeight={600} fill="#0a0a12" opacity={0.75}>{tipText}</text>
                  </g>
                )
              })()}
            </g>
          </svg>

          {/* 缩放控制 */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {[{ t: '+', f: () => zoomBy(1.3) }, { t: '−', f: () => zoomBy(1 / 1.3) }, { t: '⟲', f: () => setView({ k: 1, x: 0, y: 0 }) }].map((b, i) => (
              <button key={i} onClick={b.f} aria-label={i === 0 ? '放大' : i === 1 ? '缩小' : '重置视图'}
                className="w-9 h-9 grid place-items-center text-lg font-black border-2 border-[hsl(var(--ink))] bg-[hsl(var(--paper))] text-[hsl(var(--ink))] shadow-[2px_2px_0_hsl(var(--ink))] hover:brightness-95 active:translate-y-px">
                {b.t}
              </button>
            ))}
          </div>

          {/* 详情面板 */}
          <div className="border-t-[3px] border-[hsl(var(--ink))] bg-[hsl(var(--night))] px-5 py-4 flex items-start gap-3">
            <span className="shrink-0 mt-0.5 px-2 py-1 text-xs font-black border-2 border-[hsl(var(--ink))]"
              style={{ background: active.type === 'film' ? ZONE_META[active.zone].color : TYPE_STYLE[active.type].fill, color: active.type === 'film' ? (active.zone === 'bnd' ? '#0a0a12' : '#fff') : TYPE_STYLE[active.type].text }}>
              {TYPE_STYLE[active.type].label}
            </span>
            <span className="shrink-0 mt-0.5 px-2 py-1 text-xs font-black border-2 border-[hsl(var(--ink))] text-white"
              style={{ background: ZONE_META[active.zone].color }}>
              {ZONE_META[active.zone].label}
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
