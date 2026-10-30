/** wa.me link for a phone number (Egyptian local 01xxxxxxxxx numbers are converted to +20). */
export function whatsappLink(phone: string, text?: string) {
  const digits = (phone || "").replace(/[^\d]/g, "");
  const intl = digits.startsWith("0") && digits.length === 11 ? `2${digits}` : digits.startsWith("00") ? digits.slice(2) : digits;
  return `https://wa.me/${intl}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** The ready-made message sent when a school requests a contracting system. */
export function contractingMessage(title: string, arabic?: string, custom?: string) {
  if (custom && custom.trim()) return custom.replace(/\{system\}/g, title);
  return [
    "Hello I.C Robotics School Department,",
    `We are interested in the "${title}"${arabic ? ` (${arabic})` : ""} contracting system for our school.`,
    "",
    "School name:",
    "Contact person:",
    "City:",
    "",
    "Please contact us with the details. Thank you!",
  ].join("\n");
}
