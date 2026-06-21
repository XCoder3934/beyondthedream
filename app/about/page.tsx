export const metadata = {
  title: "Hakkında",
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Hakkında</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Beyond the Dream, öğrencilerin keşfetmek istedikleri yollardan geçmiş kişilerden rehberlik almalarına yardımcı olmak için kurulmuş bir gönüllü mentörlük platformudur.
        </p>
        <p>
          Mentörler STEM, Sanat, Diller ve Sosyal Bilimler alanlarında zamanlarını gönüllü olarak ayırırlar. Öğrenciler profillere göz atabilir, doğrudan başvurabilir veya ortak ilgi alanlarına dayalı olarak en uygun kişiyi bulmak için eşleştirme aracımızı kullanabilirler.
        </p>
        <p>
          Mentörlüğün erişilebilir, insani ve engelsiz olması gerektiğine inanıyoruz. Onay kuyrukları yok, ödeme duvarları yok — sadece anlamlı bağlantılar.
        </p>
      </div>
    </div>
  );
}
