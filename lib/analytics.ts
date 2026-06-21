import posthog from "posthog-js";

type AnalyticsEvent =
  | "user_signup"
  | "mentor_view"
  | "mentor_apply_click"
  | "match_submit";

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    capture_pageview: false,
    persistence: "localStorage+cookie",
  });

  initialized = true;
}

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, unknown>,
) {
  try {
    if (!initialized) initAnalytics();
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    posthog.capture(event, properties);
  } catch {
    // Analytics must not affect core functionality
  }
}
