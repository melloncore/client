import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
}

function FieldLabel({ label, htmlFor, error, required }: FieldWrapperProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-ink"
    >
      {label}
      {required && <span className="text-coral-500"> *</span>}
      {error && (
        <span className="ml-2 text-xs font-normal text-coral-600">
          {error}
        </span>
      )}
    </label>
  );
}

const fieldBase =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-brand-500";

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FieldWrapperProps {}

export function Input({
  label,
  htmlFor,
  error,
  required,
  className,
  ...rest
}: InputFieldProps) {
  return (
    <div>
      <FieldLabel
        label={label}
        htmlFor={htmlFor}
        error={error}
        required={required}
      />
      <input
        id={htmlFor}
        className={cn(fieldBase, className)}
        required={required}
        {...rest}
      />
    </div>
  );
}

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldWrapperProps {}

export function TextArea({
  label,
  htmlFor,
  error,
  required,
  className,
  rows = 5,
  ...rest
}: TextAreaFieldProps) {
  return (
    <div>
      <FieldLabel
        label={label}
        htmlFor={htmlFor}
        error={error}
        required={required}
      />
      <textarea
        id={htmlFor}
        rows={rows}
        className={cn(fieldBase, "resize-none", className)}
        required={required}
        {...rest}
      />
    </div>
  );
}
