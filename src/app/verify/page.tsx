import type { Metadata } from "next";
import { CertificateVerify } from "@/components/certificate-verify";

export const metadata: Metadata = {
  title: "Certificate Verification — Verify an IC Robotics Certificate",
  description: "Verify the authenticity of an IC Robotics certificate by its unique ID. View student name, course, issue date and share verified achievements.",
};

export default function Page() {
  return <CertificateVerify />;
}
