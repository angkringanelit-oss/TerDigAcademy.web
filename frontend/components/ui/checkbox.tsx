import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Props ---------- */
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  indeterminate?: boolean;
}

/* ---------- Component ---------- */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, indeterminate = false, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    data-indeterminate={indeterminate}
    className={cn(
      "peer border-input dark:bg-input/30 size-4 shrink-0 rounded-[4px] border shadow-xs " +
      "transition-shadow outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
      "disabled:cursor-not-allowed disabled:opacity-50 " +
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground " +
      "data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary " +
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current transition-none"
    >
      {indeterminate ? (
        <MinusIcon className="size-3.5" />
      ) : (
        <CheckIcon className="size-3.5" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };