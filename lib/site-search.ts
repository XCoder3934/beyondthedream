import type { Mentor } from "@/types/mentor";

export interface PublicPageSearchResult {
  href: string;
  title: string;
  section: string;
  summary: string;
}

interface SearchablePage extends PublicPageSearchResult {
  content: string;
  keywords?: string;
}

const searchablePages: SearchablePage[] = [
  {
    href: "/#home",
    title: "Ana Sayfa",
    section: "Platforma genel bakış",
    summary: "Öğrenciler için gönüllü mentörlük, keşif alanları ve gelişim yolculuğu.",
    content: "Hayalinin ötesine birlikte geleceğine açılan yeni bir kapı. Merak ettiğin alanlarda sana yol gösterecek gönüllü mentörlerle tanış. Fikirlerini keşfet, hedeflerini şekillendir ve kendi yolunu çiz. Mentörleri keşfet. Sana uygun eşleşmeyi bul. MERAKINI TAKİP ET Matematik İngilizce. Doğru mentörlükle potansiyelini keşfet, hedeflerini belirle ve geleceğine yön ver.",
    keywords: "öğrenci rehber destek kariyer eğitim gönüllü",
  },
  {
    href: "/#journey",
    title: "Keşfet, eşleş ve ilerle",
    section: "Ana Sayfa · Yolculuğun nasıl başlar?",
    summary: "Mentörleri keşfet, ilgi alanlarına göre eşleş ve bir sonraki adımını belirle.",
    content: "Farklı alanlarda gönüllü olan mentörleri ve onların uzmanlıklarını tanı. İlgi alanların ve hedeflerin doğrultusunda sana uygun bir yol bul. Deneyimini paylaşan bir mentörle bir sonraki adımını netleştir.",
    keywords: "mentör profilleri eşleşme gelişim hedefler",
  },
  {
    href: "/#mentor-application",
    title: "Mentör başvurusu",
    section: "Ana Sayfa · Bilgini paylaş, iz bırak",
    summary: "Deneyimini ve merakını paylaşarak öğrencilere ilham ver.",
    content: "Bir mentör olarak ilham ver. Deneyimini ve merakını paylaşarak öğrencilerin kendi yollarını bulmasına destek ol. Mentör başvurusu gönüllü uzman",
    keywords: "başvuru gönüllü mentör ol",
  },
  {
    href: "/mentors",
    title: "Mentörler",
    section: "Mentör ağı",
    summary: "STEM, sanat, diller ve sosyal bilimlerdeki gönüllü mentörleri keşfet.",
    content: "Mentörlerimizle tanışın. STEM, Sanat, Diller ve Sosyal Bilimler alanlarında öğrencilere rehberlik etmeye hazır gönüllü uzmanlar. Mentör profili biyografi kategori beceriler yetenekler. Profili görüntüle. Mentör olun.",
    keywords: "mentörler mentor uzmanlık alanları profiller",
  },
  {
    href: "/match",
    title: "Mentör eşleşmesi",
    section: "Kişisel yol haritan",
    summary: "İlgi alanlarını ve hedeflerini paylaş; sana uygun mentörleri bul.",
    content: "Mentör eşleşmenizi bulun. Bize kendinizden bahsedin, mentörleri sizin ilgi alanlarınıza ve onların uzmanlıklarına göre sıralayalım. Eşleşme profili yaşınız ilgi alanları hedefler. İlgi alanlarını virgülle ayırın. Python, Biyoloji, Yaratıcı Yazarlık. Mentörünüzle birlikte neler başarmayı umuyorsunuz? Eşleşmeleri bul. Eşleşmeleriniz. Henüz güçlü bir eşleşme yok. İlgi alanlarınızı genişletmeyi deneyin veya tüm mentörlere göz atın.",
    keywords: "kişisel yol haritası öneri rehberlik yaş 10 25",
  },
  {
    href: "/about",
    title: "Hakkında",
    section: "Birlikte daha ileri",
    summary: "Beyond the Dream’in gönüllü mentörlük yaklaşımı ve keşif alanları.",
    content: "Her büyük yolculuk, bir rehberle başlar. Beyond the Dream, öğrencilerin keşfetmek istedikleri yollardan geçmiş kişilerden rehberlik almalarına yardımcı olmak için kurulmuş bir gönüllü mentörlük platformudur. Mentörler uzmanlık alanlarında zamanlarını gönüllü olarak ayırırlar. Öğrenciler profillere göz atabilir, doğrudan başvurabilir veya ortak ilgi alanlarına dayalı olarak en uygun kişiyi bulmak için eşleştirme aracımızı kullanabilirler. Mentörlüğün erişilebilir, insani ve engelsiz olması gerektiğine inanıyoruz. Onay kuyrukları yok, ödeme duvarları yok — sadece anlamlı bağlantılar. Keşif alanları Matematik İngilizce Merakını paylaşabileceğin, hedeflerini konuşabileceğin bir topluluk.",
    keywords: "hakkımızda inanç misyon topluluk rehberlik sanat bilim",
  },
  {
    href: "/about#exploration",
    title: "Keşif alanları",
    section: "Hakkında · Keşif alanları",
    summary: "Matematik ve İngilizce alanlarında merakını paylaşabileceğin bir topluluk.",
    content: "Matematik İngilizce ilgi alanları merak hedefler topluluk",
  },
  {
    href: "/privacy",
    title: "Gizlilik Politikası",
    section: "Kişisel verilerin kullanımı",
    summary: "Başvuru, iletişim, hesap bilgileri, erişim ve veri güvenliği hakkında bilgi.",
    content: "Kişisel verilerin kullanımı. Beyond the Dream programına yaptığınız başvuru veya gönderdiğiniz iletişim formu kapsamında paylaştığınız kişisel veriler; başvurunuzu değerlendirmek, sizinle iletişim kurmak ve mentörlük başvurunuz varsa uygun mentör eşleştirmesini yapmak amacıyla işlenir. Hesap bilgileriniz hesabınızı oluşturmak, oturumunuzu yönetmek ve hizmetin güvenliğini sağlamak için kullanılır. Erişim ve paylaşım. Başvuru ve iletişim bilgileriniz yalnızca bu amaçlar için yetkilendirilmiş Beyond the Dream ekibi tarafından görüntülenebilir. Veriler altyapı ve hizmet sağlayıcılarımız, veritabanı ve kimlik doğrulama hizmeti, Google ile giriş seçildiğinde Google, analitik etkinlikleri etkinleştirilmişse PostHog ve e-posta bildirimi yapılandırılmışsa e-posta hizmeti tarafından işlenebilir. Yasal yükümlülük hâlinde yetkili kurumlara bilgi verilebilir. Mentör olarak başvuran kişilerin adı, tanıtım yazısı, ilgi alanı veya kategorisi, becerileri ve profil görseli mentör dizininde herkese açık gösterilebilir. E-posta ve telefon numarası herkese açık mentör profilinde gösterilmez. Saklama ve güvenlik. Veriler amaçlar için gerekli süre boyunca ve yasal saklama yükümlülükleriyle sınırlı tutulur. Yetkisiz erişim, değiştirme veya ifşayı önlemek için teknik ve idari tedbirler uygulanır. Analitik ve geçici veriler. PostHog analitiği yapılandırılmış ve etkinleştirilmişse, platform kullanımına ilişkin bazı teknik ve etkileşim verileri analitik amacıyla işlenebilir. Bu bilgiler yapılandırılmış analitik hizmetine, varsayılan olarak PostHog Cloud, iletilebilir. Tarayıcı tanımlayıcıları, çerezler veya yerel depolama analitik etkinlikleriyle ilişkilendirilebilir. Formlarda girilen e-posta ve şifre analitik etkinliklerine eklenmez. Google ile giriş sırasında eşleşme isteğinin tamamlanması için gerekli bazı bilgiler sekme açık kaldığı sürece tarayıcı oturum depolamasında geçici olarak tutulabilir. KVKK kapsamındaki talepler için İletişim bölümünden bize ulaşabilirsiniz.",
    keywords: "veri kişisel bilgiler güvenlik paylaşım saklama analitik çerez",
  },
  {
    href: "/terms",
    title: "Kullanım Koşulları",
    section: "Platform kuralları ve hizmet kapsamı",
    summary: "Platformun gönüllülük esasları, kullanıcı davranışları ve kullanım şartları.",
    content: "Bu platform eğitimde fırsat eşitliğini desteklemek amacıyla kurulmuş, tamamen gönüllülük esasına dayalı bir eğitim platformudur. Bu siteyi kullanarak şartları kabul etmiş sayılırsınız. Platform, ilköğretim ve ortaöğretim öğrencileri ile mentörleri bir araya getiren bir sosyal sorumluluk projesidir. Sağlanan tüm içerikler ve mentörlük hizmetleri olduğu gibi sunulmaktadır. Platform, mentörler tarafından sağlanan bilgilerin doğruluğunu garanti etmez. Kullanıcılar saygılı, etik ve güvenli bir iletişim dili kullanır. Ayrımcı, taciz edici veya kötü niyetli içerik paylaşımı yasaktır. Fikri mülkiyet. Platform üzerindeki tasarım, logo ve özgün eğitim içerikleri platforma aittir. Sorumluluk reddi. Platform mentör ve öğrenci arasındaki etkileşimlerden veya bu süreçte paylaşılan bilgilerden kaynaklanabilecek olası anlaşmazlıklardan sorumlu tutulamaz. Gönüllülük esaslı hizmetlerde platform sadece eşleştirme aracıdır. Değişiklik hakkı. Kullanım koşulları güncellenebilir. İletişim beyondthedream.information@gmail.com",
    keywords: "şartlar koşullar kurallar güvenlik sorumluluk haklar",
  },
  {
    href: "/#contact",
    title: "İletişim",
    section: "Sayfa altı · İletişim",
    summary: "Mentörlük veya gönüllülük hakkında mesaj gönder; bize ulaş.",
    content: "Mentörlük veya gönüllülük hakkında sorularınız mı var? Bize bir mesaj gönderin. İletişim isim e-posta telefon mesaj gönder beyondthedream.information@gmail.com Instagram",
    keywords: "bize ulaş soru destek mesaj Instagram",
  },
];

export function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function getSearchTerms(query: string) {
  return normalizeSearchText(query).split(/\s+/).filter(Boolean);
}

export function searchPublicPages(query: string): PublicPageSearchResult[] {
  const terms = getSearchTerms(query);
  if (!terms.length) return [];

  return searchablePages
    .map((page) => {
      const title = normalizeSearchText(page.title);
      const searchableText = normalizeSearchText(`${page.section} ${page.summary} ${page.content} ${page.keywords ?? ""}`);
      const matches = terms.every((term) => searchableText.includes(term));
      const score = terms.reduce((total, term) => total + (title.includes(term) ? 3 : 0), 0);
      return { page, matches, score };
    })
    .filter((result) => result.matches)
    .sort((a, b) => b.score - a.score)
    .map(({ page }) => ({
      href: page.href,
      title: page.title,
      section: page.section,
      summary: page.summary,
    }));
}

const mentorCategoryTerms: Record<Mentor["category"], string> = {
  STEM: "fen bilimleri matematik teknoloji mühendislik science technology engineering math",
  Arts: "sanat güzel sanatlar art arts",
  Languages: "diller dil ingilizce yabancı dil language languages english",
  "Social Sciences": "sosyal bilimler social sciences",
};

export function matchesMentorSearch(mentor: Mentor, query: string) {
  const terms = getSearchTerms(query);
  if (!terms.length) return false;

  const searchableText = normalizeSearchText([
    mentor.name,
    mentor.bio,
    mentor.category,
    mentorCategoryTerms[mentor.category],
    ...mentor.skills,
  ].join(" "));

  return terms.every((term) => searchableText.includes(term));
}
