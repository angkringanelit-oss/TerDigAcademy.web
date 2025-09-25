import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/* ---------- CVA ---------- */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
  "transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 " +
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 " +
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive " +
  "cursor-pointer active:scale-95 transform",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md active:bg-blue-800",
        gradient:
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm hover:from-blue-700 hover:to-purple-700 hover:shadow-md active:from-blue-800 active:to-purple-800",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:shadow-md focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md dark:bg-transparent dark:border-input dark:hover:bg-accent/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:shadow-sm dark:hover:bg-accent/50",
        "ghost-destructive":
          "text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline focus:underline",
        success: "bg-green-600 text-white shadow-sm hover:bg-green-700 hover:shadow-md active:bg-green-800",
        warning: "bg-yellow-600 text-white shadow-sm hover:bg-yellow-700 hover:shadow-md active:bg-yellow-800",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-7 px-2 py-1 text-xs has-[>svg]:px-2",
        sm: "h-8 px-3 py-1.5 text-sm has-[>svg]:px-2.5",
        lg: "h-11 px-6 py-3 text-base has-[>svg]:px-4",
        xl: "h-12 px-8 py-3.5 text-lg has-[>svg]:px-6",
        icon: "size-9 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/* ---------- Props ---------- */
export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/* ---------- Component ---------- */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false, 
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" />}
        {!loading && leftIcon && leftIcon}
        {loading && loadingText ? loadingText : children}
        {!loading && rightIcon && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };