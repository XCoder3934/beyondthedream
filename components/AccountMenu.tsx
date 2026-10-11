"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { createPortal } from "react-dom";
import type { User } from "@supabase/supabase-js";
import { Camera, ChevronDown, LogOut, LockKeyhole, Mail, Sparkles, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AccountMenuProps {
  user: User;
  onSignOut: () => Promise<void>;
}

function getDisplayName(user: User) {
  const fullName = user.user_metadata.full_name;
  const name = user.user_metadata.name;
  return (typeof fullName === "string" && fullName.trim()) ||
    (typeof name === "string" && name.trim()) ||
    user.email ||
    "Hesabım";
}

function getExternalAvatarUrl(user: User) {
  const avatarUrl = user.user_metadata.avatar_url ?? user.user_metadata.picture;
  return typeof avatarUrl === "string" ? avatarUrl : null;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase("tr-TR"))
    .join("") || "?";
}

export function AccountMenu({ user, onSignOut }: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState(() => getDisplayName(user));
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() =>
    typeof user.user_metadata.avatar_path === "string" ? null : getExternalAvatarUrl(user),
  );
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [dialog, setDialog] = useState<"password" | "email" | null>(null);
  const [dialogFeedback, setDialogFeedback] = useState<string | null>(null);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const avatarPath = user.user_metadata.avatar_path;
  const externalAvatarUrl = getExternalAvatarUrl(user);
  const initials = getInitials(getDisplayName(user));

  useEffect(() => {
    let active = true;

    async function loadAvatar() {
      await Promise.resolve();
      if (typeof avatarPath !== "string") {
        if (active) {
          setAvatarUrl(externalAvatarUrl);
          setAvatarFailed(false);
        }
        return;
      }

      const { data, error: signedUrlError } = await createClient()
        .storage
        .from("avatars")
        .createSignedUrl(avatarPath, 3600);
      if (active) {
        setAvatarUrl(signedUrlError ? null : data.signedUrl);
        setAvatarFailed(false);
      }
    }

    void loadAvatar().catch(() => {
      if (active) setAvatarUrl(null);
    });
    return () => {
      active = false;
    };
  }, [avatarPath, externalAvatarUrl, open, user.id]);

  useEffect(() => {
    let active = true;
    async function loadMotionPreference() {
      await Promise.resolve();
      let enabled = false;
      try {
        enabled = window.localStorage.getItem("btd-reduced-motion") === "true";
      } catch {
        // Continue with the system motion preference if browser storage is unavailable.
      }
      if (!active) return;
      document.documentElement.toggleAttribute("data-reduced-motion", enabled);
      setReducedMotion(enabled);
    }
    void loadMotionPreference();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target) &&
        !dialogRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (dialog) setDialog(null);
        else setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialog, open]);

  async function saveDisplayName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = displayName.trim();
    if (!nextName || nextName.length > 80) {
      setError("Ad 1 ile 80 karakter arasında olmalı.");
      setFeedback(null);
      return;
    }

    setSavingProfile(true);
    setError(null);
    setFeedback(null);
    try {
      const { error: updateError } = await createClient().auth.updateUser({
        data: { ...user.user_metadata, full_name: nextName },
      });
      if (updateError) throw updateError;
      setFeedback("Profil adı kaydedildi.");
    } catch {
      setError("Profil adı kaydedilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    const extensions: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
    if (!extensions[file.type]) {
      setError("JPG, PNG veya WebP formatında bir fotoğraf seçin.");
      setFeedback(null);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Fotoğraf en fazla 2 MB olabilir.");
      setFeedback(null);
      return;
    }

    setUploadingPhoto(true);
    setError(null);
    setFeedback(null);
    const supabase = createClient();
    const path = `${user.id}/${crypto.randomUUID()}.${extensions[file.type]}`;

    try {
      const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });
      if (uploadError) throw uploadError;

      const oldPath = user.user_metadata.avatar_path;
      const userMetadata = { ...user.user_metadata, avatar_path: path };
      const { error: updateError } = await supabase.auth.updateUser({
        data: userMetadata,
      });
      if (updateError) {
        await supabase.storage.from("avatars").remove([path]);
        throw updateError;
      }

      if (typeof oldPath === "string" && oldPath.startsWith(`${user.id}/`) && oldPath !== path) {
        void supabase.storage.from("avatars").remove([oldPath]).catch(() => undefined);
      }
      const { data: signedPhoto, error: signedUrlError } = await supabase.storage
        .from("avatars")
        .createSignedUrl(path, 3600);
      setAvatarUrl(signedUrlError ? null : signedPhoto.signedUrl);
      setAvatarFailed(false);
      setFeedback("Profil fotoğrafı güncellendi.");
    } catch {
      setError("Fotoğraf yüklenemedi. Lütfen tekrar deneyin.");
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword.length < 8) {
      setDialogError("Şifre en az 8 karakter olmalı.");
      setDialogFeedback(null);
      return;
    }

    setSavingPassword(true);
    setDialogError(null);
    setDialogFeedback(null);
    try {
      const { error: updateError } = await createClient().auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;
      setNewPassword("");
      setDialogFeedback("Şifreniz güncellendi.");
    } catch {
      setDialogError("Şifre güncellenemedi. Lütfen tekrar deneyin.");
    } finally {
      setSavingPassword(false);
    }
  }

  async function changeEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextEmail = newEmail.trim();
    if (!nextEmail || nextEmail.toLocaleLowerCase("tr-TR") === user.email?.toLocaleLowerCase("tr-TR")) {
      setDialogError("Farklı bir e-posta adresi girin.");
      setDialogFeedback(null);
      return;
    }
    setSavingEmail(true);
    setDialogError(null);
    setDialogFeedback(null);
    try {
      const { error: updateError } = await createClient().auth.updateUser({ email: nextEmail });
      if (updateError) throw updateError;
      setDialogFeedback("E-posta değişikliği için doğrulama adımlarını gelen kutunuzdan tamamlayın.");
    } catch {
      setDialogError("E-posta adresi güncellenemedi. Lütfen tekrar deneyin.");
    } finally {
      setSavingEmail(false);
    }
  }

  function toggleReducedMotion() {
    const enabled = !reducedMotion;
    setReducedMotion(enabled);
    document.documentElement.toggleAttribute("data-reduced-motion", enabled);
    try {
      window.localStorage.setItem("btd-reduced-motion", String(enabled));
    } catch {
      // The preference still applies for this page load if storage is unavailable.
    }
  }

  function openDialog(nextDialog: "password" | "email") {
    setDialog(nextDialog);
    setDialogError(null);
    setDialogFeedback(null);
    setNewPassword("");
    setNewEmail("");
  }

  async function handleSignOut() {
    setSigningOut(true);
    setError(null);
    setFeedback(null);
    try {
      await onSignOut();
      setOpen(false);
    } catch {
      setError("Çıkış yapılamadı. Lütfen tekrar deneyin.");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Hesap ve profil ayarları"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setOpen((value) => !value);
          setError(null);
          setFeedback(null);
        }}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-border/70 bg-surface/70 p-1 pr-2 text-foreground transition-colors hover:border-accent/50 hover:bg-accent/5"
      >
        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-accent/15 text-xs font-semibold text-accent">
          {avatarUrl && !avatarFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} />
          ) : (
            initials
          )}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      </button>

      {open && (
        <section
          role="dialog"
          aria-label="Hesap ayarları"
          className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100vh-6rem)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-2xl animate-fade-in"
        >
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <label className="group relative flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-accent/15 text-sm font-semibold text-accent ring-1 ring-border focus-within:ring-2 focus-within:ring-accent" title="Profil fotoğrafını değiştir">
              {avatarUrl && !avatarFailed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="" className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} />
              ) : (
                initials
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden="true">
                <Camera className="h-5 w-5" />
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                aria-label="Profil fotoğrafı seç"
                disabled={uploadingPhoto}
                onChange={uploadAvatar}
              />
            </label>
            <div className="flex min-w-0 flex-col justify-center self-center">
              <p className="truncate text-sm font-semibold">{getDisplayName(user)}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              {uploadingPhoto && <p className="text-[11px] text-muted-foreground">Fotoğraf yükleniyor…</p>}
            </div>
          </div>

          <form onSubmit={saveDisplayName} className="space-y-2 border-b border-border py-4">
            <label htmlFor="account-display-name" className="text-xs font-medium text-muted-foreground">
              Görünen ad
            </label>
            <div className="flex gap-2">
              <input
                id="account-display-name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                maxLength={80}
                required
                className="field-input min-w-0 flex-1"
              />
              <button
                type="submit"
                disabled={savingProfile}
                className="rounded-lg bg-accent px-3 text-xs font-semibold text-accent-foreground disabled:opacity-60"
              >
                {savingProfile ? "Kaydediliyor…" : "Kaydet"}
              </button>
            </div>
          </form>

          <div className="space-y-3 border-b border-border py-4">
            <p className="text-xs font-medium text-muted-foreground">Hesap ve kişiselleştirme</p>
            <button type="button" onClick={() => openDialog("email")} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted">
              <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="flex-1">E-posta adresini değiştir</span>
              <span className="text-xs text-muted-foreground">›</span>
            </button>
            <button type="button" onClick={() => openDialog("password")} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted">
              <LockKeyhole className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="flex-1">Şifreyi değiştir</span>
              <span className="text-xs text-muted-foreground">›</span>
            </button>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted">
              <Sparkles className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="flex-1">Animasyonları azalt</span>
              <input type="checkbox" checked={reducedMotion} onChange={toggleReducedMotion} className="h-4 w-4 accent-[var(--accent)]" />
            </label>
            <p className="px-2 text-[11px] text-muted-foreground">Tercih bu tarayıcıda saklanır.</p>
          </div>

          {(feedback || error) && (
            <p role={error ? "alert" : "status"} className={`py-3 text-xs ${error ? "text-red-600" : "text-emerald-600"}`}>
              {error || feedback}
            </p>
          )}

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-3 inline-flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {signingOut ? "Çıkış yapılıyor…" : "Çıkış yap"}
          </button>
        </section>
      )}

      {open && dialog && typeof document !== "undefined" && createPortal(
        <div ref={dialogRef} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="account-dialog-title" className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-2xl animate-fade-in">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 id="account-dialog-title" className="text-lg font-semibold">{dialog === "password" ? "Şifreyi değiştir" : "E-posta adresini değiştir"}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{dialog === "password" ? "Hesabınız için yeni bir şifre belirleyin." : "Yeni adresinizi doğruladıktan sonra hesabınızda kullanabilirsiniz."}</p>
              </div>
              <button type="button" aria-label="Pencereyi kapat" onClick={() => setDialog(null)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            {dialog === "password" ? (
              <form onSubmit={changePassword} className="space-y-4">
                <label htmlFor="account-new-password" className="block space-y-2 text-sm font-medium">
                  <span>Yeni şifre</span>
                  <input id="account-new-password" type="password" autoComplete="new-password" autoFocus value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={8} placeholder="En az 8 karakter" required className="field-input w-full" />
                </label>
                {dialogError && <p role="alert" className="text-sm text-red-600">{dialogError}</p>}
                {dialogFeedback && <p role="status" className="text-sm text-emerald-600">{dialogFeedback}</p>}
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setDialog(null)} className="rounded-lg border border-border px-4 py-2 text-sm">Kapat</button>
                  <button type="submit" disabled={savingPassword} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-60">{savingPassword ? "Güncelleniyor…" : "Şifreyi kaydet"}</button>
                </div>
              </form>
            ) : (
              <form onSubmit={changeEmail} className="space-y-4">
                <label htmlFor="account-new-email" className="block space-y-2 text-sm font-medium">
                  <span>Yeni e-posta</span>
                  <input id="account-new-email" type="email" autoComplete="email" autoFocus value={newEmail} onChange={(event) => setNewEmail(event.target.value)} placeholder="ornek@eposta.com" required className="field-input w-full" />
                </label>
                {dialogError && <p role="alert" className="text-sm text-red-600">{dialogError}</p>}
                {dialogFeedback && <p role="status" className="text-sm text-emerald-600">{dialogFeedback}</p>}
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setDialog(null)} className="rounded-lg border border-border px-4 py-2 text-sm">Kapat</button>
                  <button type="submit" disabled={savingEmail} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-60">{savingEmail ? "Gönderiliyor…" : "Doğrulama gönder"}</button>
                </div>
              </form>
            )}
          </section>
        </div>,
        document.body,
      )}
    </div>
  );
}
