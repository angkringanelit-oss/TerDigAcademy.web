import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/* ---------- Style Variants ---------- */
const textareaVariants = cva(
  "border-input placeholder:text-muted-foreground flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30"
);

/* ---------- Props ---------- */
export interface TextareaProps
  extends React.ComponentPropsWithoutRef<"textarea">,
    VariantProps<typeof textareaVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  autoGrow?: boolean;
  maxRows?: number;        // 👈 1. batasi tinggi maks
}

/* ---------- Component ---------- */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, leftIcon, rightIcon, error, autoGrow = false, maxRows, ...props }, ref) => {
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoGrow) {
        const target = e.currentTarget;
        target.style.height = "auto";
        const lineHeight = 24; // px
        const maxH = maxRows ? maxRows * lineHeight : 9999;
        target.style.height = `${Math.min(target.scrollHeight, maxH)}px`;
      }
      props.onInput?.(e);
    };

    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="absolute left-3 top-3 text-muted-foreground pointer-events-none">
            {leftIcon}
          </span>
        )}

        <textarea
          ref={ref}
          data-slot="textarea"
          aria-invalid={error}
          onInput={handleInput}
          className={cn(
            textareaVariants(),
            "resize-none",              // 👈 2. hilangkan handle manual
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          autoComplete="off"            // 👈 3. default attributes
          spellCheck="false"
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 top-3 text-muted-foreground pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };