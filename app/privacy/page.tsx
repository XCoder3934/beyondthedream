export const metadata = {
  title: "Gizlilik Politikası",
};

export default function PrivacyPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Gizlilik Politikası</h1>
      <div className="mt-6 space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-medium text-foreground">Kişisel verilerin kullanımı</h2>
          <p className="mt-2">
            Beyond the Dream programına yaptığınız başvuru veya gönderdiğiniz iletişim formu kapsamında paylaştığınız kişisel veriler; başvurunuzu değerlendirmek, sizinle iletişim kurmak ve mentörlük başvurunuz varsa uygun mentör eşleştirmesini yapmak amacıyla işlenir. Hesap bilgileriniz hesabınızı oluşturmak, oturumunuzu yönetmek ve hizmetin güvenliğini sağlamak için kullanılır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-foreground">Erişim ve paylaşım</h2>
          <p className="mt-2">
            Başvuru ve iletişim bilgileriniz yalnızca bu amaçlar için yetkilendirilmiş Beyond the Dream ekibi tarafından görüntülenebilir. Hizmetin çalışması için veriler, ilgili işleve göre altyapı ve hizmet sağlayıcılarımız (ör. veritabanı ve kimlik doğrulama hizmeti, Google ile giriş seçildiğinde Google, analitik etkinlikleri etkinleştirilmişse PostHog ve e-posta bildirimi yapılandırılmışsa e-posta hizmeti) tarafından işlenebilir. Bu sağlayıcılarla yalnızca hizmetin gerektirdiği veriler paylaşılır. Yasal bir yükümlülük bulunması hâlinde yetkili kurumlara bilgi verilebilir.
          </p>
          <p className="mt-2">
            Mentör olarak başvuran kişilerin adı, tanıtım yazısı, ilgi alanı/kategorisi, becerileri ve profil görseli mentör dizininde herkese açık gösterilebilir. E-posta ve telefon numarası herkese açık mentör profilinde gösterilmez.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-foreground">Saklama ve güvenlik</h2>
          <p className="mt-2">
            Veriler, belirtilen amaçlar için gerekli olduğu süre boyunca ve uygulanabilir yasal saklama yükümlülükleriyle sınırlı olarak tutulur. Yetkisiz erişim, değiştirme veya ifşayı önlemek için uygun teknik ve idari tedbirler uygulanır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-foreground">Analitik ve geçici veriler</h2>
          <p className="mt-2">
            PostHog analitiği yapılandırılmış ve etkinleştirilmişse, platform kullanımına ilişkin bazı teknik ve etkileşim verileri analitik amacıyla işlenebilir. Bu bilgiler yapılandırılmış analitik hizmetine (varsayılan olarak PostHog Cloud) iletilebilir. Hizmetin çalışma biçimine bağlı olarak, tarayıcıda saklanan tanımlayıcılar, çerezler veya yerel depolama analitik etkinlikleriyle ilişkilendirilebilir. Formlarda girilen e-posta ve şifre analitik etkinliklerine eklenmez. Google ile giriş sırasında eşleşme isteğinin tamamlanması için gerekli bazı bilgiler, sekme açık kaldığı sürece tarayıcı oturum depolamasında geçici olarak tutulabilir.
          </p>
        </section>

        <p>
          Kişisel verilerinizle ilgili KVKK kapsamındaki talepleriniz için İletişim bölümünden bize ulaşabilirsiniz.
        </p>
      </div>
    </div>
  );
}
