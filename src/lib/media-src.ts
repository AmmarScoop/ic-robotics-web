/** Encodes spaces etc. in local /public paths; leaves full URLs untouched. */
export function mediaSrc(src: string) {
  if (!src) return "";
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  return src.split("/").map((seg) => (seg ? encodeURIComponent(decodeURIComponent(seg)) : seg)).join("/");
}
