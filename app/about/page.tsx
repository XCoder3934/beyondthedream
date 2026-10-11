export const metadata = {
  title: "Hakkında",
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="tech-grid relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface/60 px-6 py-10 backdrop-blur-xl sm:px-10 sm:py-14">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-violet/10 blur-3xl" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-accent">Hakkında <span className="mx-2 text-muted-foreground/50">/</span> Birlikte daha ileri</p>
        <h1 className="relative mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          Her büyük yolculuk, <span className="text-gradient">bir rehberle</span> başlar.
        </h1>
        <p className="relative mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          Beyond the Dream, öğrencilerin keşfetmek istedikleri yollardan geçmiş kişilerden rehberlik almalarına yardımcı olmak için kurulmuş bir gönüllü mentörlük platformudur.
        </p>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="glass-panel rounded-[2rem] p-6 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Neye inanıyoruz</p>
          <div className="mt-5 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>Mentörler uzmanlık alanlarında zamanlarını gönüllü olarak ayırırlar. Öğrenciler profillere göz atabilir, doğrudan başvurabilir veya ortak ilgi alanlarına dayalı olarak en uygun kişiyi bulmak için eşleştirme aracımızı kullanabilirler.</p>
        <p>Mentörlüğün erişilebilir, insani ve engelsiz olması gerektiğine inanıyoruz. Onay kuyrukları yok, ödeme duvarları yok — sadece anlamlı bağlantılar var.</p>
          </div>
        </article>

        <aside id="exploration" className="relative scroll-mt-24 overflow-hidden rounded-[2rem] border border-border/80 bg-surface/80 p-6 text-foreground shadow-xl backdrop-blur-xl sm:p-9">
          <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-accent">Keşif alanları</p>
          <div className="relative mt-5 grid grid-cols-2 gap-3">
            {["Matematik", "İngilizce", "", ""].map((area, index) => (
              <div key={index} className="rounded-2xl border border-border/70 bg-muted/60 p-4">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">0{index + 1}</span>
                <p className="mt-3 text-sm font-medium">{area || "\u00a0"}</p>
              </div>
            ))}
          </div>
          <p className="relative mt-6 text-sm leading-6 text-muted-foreground">Merakını paylaşabileceğin, hedeflerini konuşabileceğin bir topluluk.</p>
        </aside>
      </section>
    </div>
  );
}
