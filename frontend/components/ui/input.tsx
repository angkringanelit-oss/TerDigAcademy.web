import * as React from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

/* ---------- Style Variants (opsional) ---------- */
const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground " +
  "selection:bg-primary selection:text-primary-foreground " +
  "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs " +
  "transition-[color,box-shadow] outline-none " +
  "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium " +
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
);

/* ---------- Props ---------- */
export interface InputProps
  extends React.ComponentPropsWithoutRef<"input">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean; // true → border merah otomatis
}

/* ---------- Component ---------- */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", leftIcon, rightIcon, error, ...props }, ref) => (
    <div className="relative w-full">
      {/* Left Icon */}
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {leftIcon}
        </span>
      )}

      <input
        ref={ref}
        type={type}
        data-slot="input"
        aria-invalid={error}
        className={cn(
          inputVariants(),
          leftIcon && "pl-10",
          rightIcon && "pr-10",
          className
        )}
        {...props}
      />

      {/* Right Icon */}
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {rightIcon}
        </span>
      )}
    </div>
  )
);
Input.displayName = "Input";

export { Input };