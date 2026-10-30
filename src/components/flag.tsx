/** Country flag from /public/flags (3:2 SVGs, MIT-licensed country-flag-icons). */
export function Flag({ code, name, className = "h-6 w-9" }: { code: string; name?: string; className?: string }) {
  const c = (code || "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(c)) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/flags/${c}.svg`} alt={name ? `${name} flag` : `${c} flag`} className={`${className} shrink-0 rounded-[3px] object-cover shadow-sm ring-1 ring-black/5`} loading="lazy" />
  );
}
