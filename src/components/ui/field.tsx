"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";

export function Field({
  label, htmlFor, error, required, children,
}: {
  label: string; htmlFor: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>
        {label} {required && <span className="text-flag-500">*</span>}
      </Label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
