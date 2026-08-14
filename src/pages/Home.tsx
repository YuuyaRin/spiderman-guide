import { SiteNav, Hero, Footer } from '@/sections/Chrome'
import { Paths } from '@/sections/Paths'
import { Timeline } from '@/sections/Timeline'
import { Chain, Storyline } from '@/sections/Storyline'
import { MindMap } from '@/sections/MindMap'
import { Threads, Lore } from '@/sections/Threads'
import { Eras, Universes } from '@/sections/Eras'
import { BrandNewDay } from '@/sections/RecapBND'
import { Characters, Comics, Quiz, Faq } from '@/sections/Misc'

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <Chain />
        <Paths />
        <Timeline />
        <Storyline />
        <MindMap />
        <Threads />
        <Eras />
        <Universes />
        <BrandNewDay />
        <Characters />
        <Lore />
        <Comics />
        <Quiz />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
