import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent"></p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Potansiyelinize inanan bir mentör bulun
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Beyond the Dream, öğrencileri STEM, Sanat, Diller ve Sosyal Bilimler alanlarındaki gönüllü mentörlerle buluşturur. Mentörleri keşfedin, başvurun veya eşleşin — hepsi tek bir yerde.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/mentors" size="lg">
              Mentörlere göz atın
            </Button>
            <Button href="/match" variant="secondary" size="lg">
              Eşleşmenizi bulun
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "Keşfet",
              body: "Gönüllü mentörlere kategoriye ve yeteneklere göre göz atın. Tek tıklamayla tam profilleri görüntüleyin.",
            },
            {
              title: "Başvur",
              body: "İlgi alanlarınız ve hedeflerinizle uyumlu mentörlerle bağlantı kurun.",
            },
            {
              title: "Eşleş",
              body: "Birkaç soruyu yanıtlayın ve anında sıralanmış mentör önerileri alın.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Uzmanlığınızı paylaşın
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Gönüllüler bu platformu mümkün kılıyor. Mentör olmak için başvurun ve gelecek neslin kendi yolunu keşfetmesine yardımcı olun.
          </p>
          <Button href="/mentors" variant="secondary" className="mt-6">
            Mentör Olun
          </Button>
        </div>
      </section>
    </div>
  );
}
