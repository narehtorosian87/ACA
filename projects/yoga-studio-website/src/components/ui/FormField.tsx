import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClasses =
  "w-full rounded-[10px] border border-sand-300 bg-sand-100 px-3.5 py-3 font-body text-sm text-sand-900 " +
  "focus:border-primary-500 focus:bg-white focus:outline-none";

function FieldWrapper({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-sand-900">
        {label}
      </label>
      {children}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export function TextField({ id, label, className = "", ...rest }: TextFieldProps) {
  return (
    <FieldWrapper id={id} label={label}>
      <input id={id} name={id} className={`${fieldClasses} ${className}`} {...rest} />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  children: ReactNode;
}

export function SelectField({ id, label, className = "", children, ...rest }: SelectFieldProps) {
  return (
    <FieldWrapper id={id} label={label}>
      <select id={id} name={id} className={`${fieldClasses} ${className}`} {...rest}>
        {children}
      </select>
    </FieldWrapper>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

export function TextareaField({ id, label, className = "", ...rest }: TextareaFieldProps) {
  return (
    <FieldWrapper id={id} label={label}>
      <textarea id={id} name={id} rows={4} className={`${fieldClasses} resize-y ${className}`} {...rest} />
    </FieldWrapper>
  );
}
