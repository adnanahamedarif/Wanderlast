import type { LucideIcon } from "lucide-react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const authCardClassName =
  "w-full max-w-[22.5rem] gap-0 overflow-visible rounded-[4px] border border-[#e3e7eb] bg-white py-0 shadow-[0_2px_8px_rgba(15,23,42,0.08)] ring-0";

export const authInputClassName =
  "h-9 rounded-[4px] border-[#e2e6ea] bg-[#f8f9fa] pl-9 text-[13px] text-neutral-800 shadow-none placeholder:text-neutral-400 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/15 md:text-[13px]";

export const authSubmitButtonClassName =
  "h-9 w-full rounded-[4px] bg-brand text-[13px] font-medium tracking-wide text-white hover:bg-brand-dark focus-visible:ring-brand/30";

export const authGoogleButtonClassName =
  "h-9 w-full gap-2 rounded-[4px] border-[#e2e6ea] bg-white text-[13px] font-medium text-neutral-800 shadow-none hover:bg-neutral-50";

type AuthFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  required?: boolean;
};

export function AuthField({
  id,
  label,
  placeholder,
  icon: Icon,
  type = "text",
  autoComplete,
  required = true,
}: AuthFieldProps) {
  return (
    <Field className="gap-1.5">
      <FieldLabel
        htmlFor={id}
        className="text-[13px] font-semibold text-neutral-800"
      >
        {label}
      </FieldLabel>
      <div className="relative">
        <Icon
          aria-hidden="true"
          strokeWidth={1.7}
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400"
        />
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={authInputClassName}
        />
      </div>
    </Field>
  );
}
