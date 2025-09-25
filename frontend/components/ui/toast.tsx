import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X, CheckCircle2, AlertTriangle, Info, Loader2 } from "lucide-react";

/* ---------- Provider & Viewport ---------- */
export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number;
}

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
} as const;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  ToastViewportProps
>(({ position = "bottom-right", duration, className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]",
      positionClasses[position],
      className
    )}
    duration={duration}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/* ---------- Variants ---------- */
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success:
          "border-green-600 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100",
        warning:
          "border-orange-600 bg-orange-50 text-orange-900 dark:bg-orange-900/20 dark:text-orange-100",
        info: "border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100",
        loading: "border bg-background text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

/* ---------- Icon Map ---------- */
const iconMap = {
  default: null,
  destructive: <AlertTriangle className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-orange-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
  loading: <Loader2 className="h-5 w-5 animate-spin" />,
};

/* ---------- Toast Root ---------- */
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => {
  const Icon = iconMap[variant!];
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      {Icon && <span className="shrink-0">{Icon}</span>}
      <div className="flex-1">{children}</div>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

/* ---------- Action ---------- */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/* ---------- Close ---------- */
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/* ---------- Title & Description ---------- */
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90 max-w-xs md:max-w-sm", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

/* ---------- Exports ---------- */
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};