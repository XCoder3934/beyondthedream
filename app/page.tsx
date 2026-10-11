import { Button } from "@/components/ui/Button";

const pathways = [
  { index: "01", title: "Keşfet", body: "Farklı alanlarda gönüllü olan mentörleri ve onların uzmanlıklarını tanı." },
  { index: "02", title: "Eşleş", body: "İlgi alanların ve hedeflerin doğrultusunda sana uygun bir yol bul." },
  { index: "03", title: "İlerle", body: "Deneyimini paylaşan bir mentörle bir sonraki adımını netleştir." },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section id="home" className="tech-grid home-hero-grid scroll-mt-24 relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:py-24">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_var(--cyan)]" />
              Geleceğine açılan yeni bir kapı
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-[4.6rem]">
              Hayalinin
              <br />
              <span className="text-gradient">ötesine</span> birlikte.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Merak ettiğin alanlarda sana yol gösterecek gönüllü mentörlerle tanış. Fikirlerini keşfet, hedeflerini şekillendir ve kendi yolunu çiz.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/mentors" size="lg" className="group gap-3 rounded-xl px-6 shadow-[0_12px_34px_-16px_var(--accent)]">
                Mentörleri keşfet
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Button>
              <Button href="/match" variant="secondary" size="lg" className="rounded-xl border-border/80 bg-surface/70 px-6 backdrop-blur">
                Sana uygun eşleşmeyi bul
              </Button>
            </div>
            <div className="mt-12 max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_var(--cyan)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">MERAKINI TAKİP ET</span>
                <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
                <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground/70">01 — 02</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/65 p-4 text-foreground shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-5">
                  <div aria-hidden="true" className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-cyan/10 blur-2xl transition-colors group-hover:bg-cyan/20" />
                  <div className="relative flex items-start justify-between">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent">01 / ALAN</span>
                    <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <span className="bg-gradient-to-br from-cyan to-accent bg-clip-text font-serif text-2xl leading-none text-transparent">∑</span>
                    </span>
                  </div>
                  <p className="relative mt-5 text-base font-semibold tracking-tight sm:text-lg">Matematik</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/65 p-4 text-foreground shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-5">
                  <div aria-hidden="true" className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-violet/10 blur-2xl transition-colors group-hover:bg-violet/20" />
                  <div className="relative flex items-start justify-between">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent">02 / ALAN</span>
                    <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center text-xl leading-none">🇬🇧</span>
                  </div>
                  <p className="relative mt-5 text-base font-semibold tracking-tight sm:text-lg">İngilizce</p>
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[34rem]">
            <div className="absolute inset-[7%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_68%)] blur-2xl" />
            <div className="absolute inset-[9%] rounded-full border border-accent/15" />
            <div className="absolute inset-[20%] rounded-full border border-dashed border-cyan/25" />
            <div className="absolute inset-[31%] rounded-full border border-violet/20" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 500" fill="none">
              <path d="M93 157C143 75 277 57 370 127M102 333C163 420 314 430 398 326M137 118C214 170 310 179 386 142M119 348C207 282 303 294 383 357" stroke="url(#path-gradient)" strokeOpacity=".55" strokeWidth="1.2" />
              <circle cx="250" cy="250" r="179" stroke="url(#ring-gradient)" strokeOpacity=".6" />
              <circle cx="250" cy="250" r="126" stroke="url(#ring-gradient)" strokeDasharray="3 9" strokeOpacity=".55" />
              <defs>
                <linearGradient id="path-gradient" x1="90" y1="110" x2="410" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="var(--cyan)" /><stop offset="1" stopColor="var(--accent)" /></linearGradient>
                <linearGradient id="ring-gradient" x1="70" y1="80" x2="430" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="var(--cyan)" /><stop offset="1" stopColor="var(--accent)" /></linearGradient>
              </defs>
            </svg>
            <div className="discovery-core absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-border/80 bg-surface/90 text-foreground shadow-xl backdrop-blur-xl sm:h-40 sm:w-40">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 text-sm font-bold tracking-widest text-accent">BTD</div>
              <span className="text-[9px] font-medium tracking-[0.22em] text-muted-foreground">GELECEĞİNE</span>
              <span className="mt-0.5 text-[11px] font-semibold tracking-[0.16em] text-accent">YÖN VER</span>
            </div>
            <div className="discovery-card-one absolute left-[3%] top-[28%] rounded-2xl border border-border/80 bg-surface/90 px-4 py-3 text-foreground shadow-xl backdrop-blur-xl">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-accent">01 / MERAK</span>
              <span className="mt-1 block text-sm font-medium">Yeni fikirler</span>
            </div>
            <div className="discovery-card-two absolute right-[1%] top-[37%] rounded-2xl border border-border/80 bg-surface/90 px-4 py-3 text-foreground shadow-xl backdrop-blur-xl">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-accent">02 / REHBERLİK</span>
              <span className="mt-1 block text-sm font-medium">Gönüllü mentörler</span>
            </div>
            <div className="discovery-card-three absolute bottom-[12%] left-[19%] rounded-2xl border border-border/80 bg-surface/90 px-4 py-3 text-foreground shadow-xl backdrop-blur-xl">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-accent">03 / GELİŞİM</span>
              <span className="mt-1 block text-sm font-medium">Senin geleceğin</span>
            </div>
            <span className="absolute left-[26%] top-[12%] h-2 w-2 rounded-full bg-cyan shadow-[0_0_18px_var(--cyan)]" />
            <span className="absolute bottom-[23%] right-[13%] h-2.5 w-2.5 rounded-full bg-violet shadow-[0_0_18px_var(--violet)]" />
            <span className="absolute right-[19%] top-[17%] h-1.5 w-1.5 rounded-full bg-foreground/80" />
          </div>
        </div>
      </section>

      <section id="journey" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Yolculuğun nasıl başlar?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Bir merak, yeni bir yön.</h2>
          </div>
          <p className="max-w-md border-l border-accent/40 pl-4 font-serif text-base italic leading-7 text-muted-foreground sm:pl-5 sm:text-lg">
            Doğru mentörlükle potansiyelini keşfet, hedeflerini belirle ve geleceğine yön ver.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pathways.map((item) => (
            <article key={item.index} className="glass-panel group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-sm font-semibold text-accent">{item.index}</span>
                <span className="text-2xl text-muted-foreground/50 transition-colors group-hover:text-cyan" aria-hidden="true">↗</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="mentor-application" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface/80 px-6 py-10 text-foreground shadow-2xl backdrop-blur-xl sm:px-10 sm:py-12 lg:px-14">
          <div className="absolute -right-20 -top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-[-11rem] right-[28%] h-80 w-80 rounded-full bg-cyan/10 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">BİLGİNİ PAYLAŞ, İZ BIRAK</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Bir mentör olarak ilham ver.</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Deneyimini ve merakını paylaşarak öğrencilerin kendi yollarını bulmasına destek ol.</p>
            </div>
            <Button href="https://docs.google.com/forms/d/e/1FAIpQLSfjZfc04AxlYy97Igedx7VhgZhMXZkh3J7LoZaBDqdNH1QiYA/viewform?usp=sharing&ouid=113150891458441532903" target="_blank" rel="noopener noreferrer" variant="secondary" className="shrink-0 rounded-xl border-accent/20 bg-accent/5 text-accent hover:bg-accent/10">
              Mentör başvurusu <span className="ml-2" aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
