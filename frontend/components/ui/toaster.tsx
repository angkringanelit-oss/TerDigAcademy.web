// frontend/src/components/ui/toaster.tsx
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastAction,
} from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export interface ToasterProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number;
  richDescription?: boolean;
}

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
} as const;

export function Toaster({
  position = "bottom-right",
  duration = 5000,
  richDescription = true,
}: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, icon, loading, onDismiss, ...toastProps }) => (
        <Toast
          key={id}
          duration={duration}
          {...toastProps}
          onOpenChange={(open) => {
            if (!open) onDismiss?.();
          }}
        >
          {(icon || loading) && (
            <span className="shrink-0">
              {loading ? (
                <span className="animate-spin size-5 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                icon
              )}
            </span>
          )}

          <div className="grid gap-1 flex-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && (
              <ToastDescription
                asChild={richDescription}
                className="text-sm opacity-90 max-w-xs md:max-w-sm"
              >
                {richDescription ? <div>{description}</div> : description}
              </ToastDescription>
            )}
          </div>

          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport className={cn(positionClasses[position])} />
    </ToastProvider>
  );
}