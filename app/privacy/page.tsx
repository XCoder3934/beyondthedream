export const metadata = {
  title: "Gizlilik Politikası",
};

export default function PrivacyPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Gizlilik Politikası</h1>
      <p className="mt-6 text-muted-foreground leading-relaxed">
        Platformumuzda kullanıcı deneyimini iyileştirmek ve platformun işleyişini analiz etmek amacıyla anonimleştirilmiş verilerle PostHog analitik aracı kullanılmaktadır. Bu veriler kişisel kimliğinizi doğrudan içermez ve üçüncü taraflarla paylaşılmaz.
      </p>
    </div>
  );
}
