type LogLevel = "debug" | "info" | "warn" | "error" | "success";

const isDev = import.meta.env.MODE === "development";

export const logger = {
  debug: (...args: any[]) => {
    if (isDev) console.debug("[DEBUG]", ...args);
  },
  info: (...args: any[]) => {
    if (isDev) console.info("[INFO]", ...args);
  },
  warn: (...args: any[]) => console.warn("⚠️ [WARN]", ...args),
  error: (...args: any[]) => console.error("❌ [ERROR]", ...args),
  success: (...args: any[]) =>
    console.log("%c✅ [SUCCESS]", "color: green; font-weight: bold;", ...args),
};