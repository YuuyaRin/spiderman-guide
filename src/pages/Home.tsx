import { SiteNav, Hero, Footer } from '@/sections/Chrome'
import { Paths } from '@/sections/Paths'
import { Timeline } from '@/sections/Timeline'
import { Eras, Universes } from '@/sections/Eras'
import { Recap, BrandNewDay } from '@/sections/RecapBND'
import { Characters, Comics, Quiz, Faq } from '@/sections/Misc'

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <Paths />
        <Timeline />
        <Eras />
        <Universes />
        <Recap />
        <BrandNewDay />
        <Characters />
        <Comics />
        <Quiz />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
