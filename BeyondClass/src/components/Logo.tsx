import { useI18n } from "@/lib/i18n";

export function Logo({ size = 32 }: { size?: number }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="3" y="3" width="42" height="42" rx="10" className="fill-primary" />
        <path d="M14 30 L24 14 L34 30 Z" className="fill-primary-foreground" />
        <circle cx="24" cy="32" r="3" className="fill-primary-foreground" />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-foreground">{t("appName")}</span>
    </div>
  );
}
