export const metadata = {
  title: "Şartlar ve Koşullar",
};

export default function TermsPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Kullanım Koşulları</h1>

      <div className="mt-8 space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground">1. Giriş</h2>
          <p className="mt-2">Bu platform, eğitimde fırsat eşitliğini desteklemek amacıyla kurulmuş, tamamen gönüllülük esasına dayalı bir eğitim platformudur. Bu siteyi kullanarak, aşağıda belirtilen şartları kabul etmiş sayılırsınız.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">2. Platformun Amacı ve Hizmet Kapsamı</h2>
          <p className="mt-2">Platform, ilköğretim ve ortaöğretim öğrencileri ile mentörleri bir araya getiren bir sosyal sorumluluk projesidir. Sağlanan tüm içerikler ve mentörlük hizmetleri "olduğu gibi" sunulmaktadır. Platform, mentörler tarafından sağlanan bilgilerin doğruluğunu garanti etmez.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">3. Kullanıcı Davranış Kuralları</h2>
          <p className="mt-2">Tüm kullanıcılar (öğrenciler ve mentörler) platform içerisinde;</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Saygılı, etik ve güvenli bir iletişim dili kullanmakla yükümlüdür.</li>
            <li>Her türlü ayrımcı, taciz edici veya kötü niyetli içerik paylaşımı kesinlikle yasaktır.</li>
            <li>Bu kuralları ihlal eden kullanıcıların hesapları, platform yönetimi tarafından herhangi bir uyarı yapılmaksızın sonlandırılabilir.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">4. Fikri Mülkiyet</h2>
          <p className="mt-2">Platform üzerindeki tasarım, logo ve özgün eğitim içerikleri platforma aittir. Kullanıcılar, başkalarının fikri mülkiyet haklarına saygı göstermekle yükümlüdür.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">5. Sorumluluk Reddi</h2>
          <p className="mt-2">Platform, mentör-öğrenci arasındaki etkileşimlerden veya bu süreçte paylaşılan bilgilerden kaynaklanabilecek olası anlaşmazlıklardan sorumlu tutulamaz. Gönüllülük esaslı hizmetlerde, platform sadece bir eşleştirme aracıdır.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">6. Değişiklik Hakkı</h2>
          <p className="mt-2">Platform yönetimi, bu kullanım koşullarını önceden bildirmeksizin güncelleme hakkını saklı tutar. Değişiklikler sitede yayınlandığı andan itibaren geçerli olur.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">7. İletişim</h2>
          <p className="mt-2">Bu kurallar veya platformun işleyişi hakkında her türlü sorunuz için <strong>beyondthedream.information@gmail.com</strong> adresinden bize ulaşabilirsiniz.</p>
        </section>
      </div>
    </div>
  );
}