/// <reference types="astro/client" />

// Ambient globals for browser-side scripts.
interface Window {
  /**
   * Analytics event helper defined in BaseLayout. A no-op unless gtag is present,
   * so callers stay safe when GA is blocked or consent is denied.
   */
  awTrack?: (name: string, params?: Record<string, unknown>) => void;
  gtag?: (...args: unknown[]) => void;
}
