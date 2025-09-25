import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ---------- Root ---------- */
const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    data-slot="tabs"
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
Tabs.displayName = "Tabs";

/* ---------- List ---------- */
const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg bg-muted text-muted-foreground p-[3px]",
  {
    variants: {
      orientation: { horizontal: "flex-row h-9 w-fit", vertical: "flex-col w-9 h-fit" },
      size: { sm: "gap-1", md: "gap-1.5", lg: "gap-2" },
    },
    defaultVariants: { orientation: "horizontal", size: "md" },
  }
);

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, orientation, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(tabsListVariants({ orientation, size }), className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

/* ---------- Trigger ---------- */
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md border border-transparent " +
  "px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] " +
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm " +
  "dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30",
  {
    variants: {
      size: { sm: "text-xs px-2 py-0.5", md: "text-sm px-2 py-1", lg: "text-base px-3 py-1.5" },
      stretch: { true: "flex-1", false: "" },
    },
    defaultVariants: { size: "md", stretch: false },
  }
);

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, size, stretch, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(tabsTriggerVariants({ size, stretch }), className)}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

/* ---------- Content ---------- */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("flex-1 outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };