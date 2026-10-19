import type { Metadata } from "next";
import { CertificateVerify } from "@/components/certificate-verify";
import { getSection } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Certificate Verification — Verify an IC Robotics Certificate",
  description: "Verify the authenticity of an IC Robotics certificate by its unique ID. View student name, course, issue date and share verified achievements.",
};

export const revalidate = 300;

export default async function Page() {
  const v = await getSection("verify");
  return <CertificateVerify eyebrow={v.eyebrow} title={v.title} sampleId={v.sampleId} />;
}
