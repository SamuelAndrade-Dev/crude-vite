import { useId, type InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export function TextField({
  id,
  label,
  helperText,
  error,
  fullWidth = false,
  className = "",
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? `textfield-${generatedId}`;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const describedBy = [
    ariaDescribedBy,
    helperText && descriptionId,
    error && errorId,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={fullWidth ? "w-full" : "w-auto"}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy || undefined}
        className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
            : "border-slate-300 focus:border-slate-500 focus:ring-slate-200"
        } ${className}`}
        {...props}
      />

      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={descriptionId} className="mt-1.5 text-sm text-slate-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
