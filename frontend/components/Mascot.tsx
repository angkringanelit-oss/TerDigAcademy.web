import { cn } from "@/lib/utils";

interface MascotProps {
  src: string;
  alt: string;
  className?: string;
  animation?: "float" | "breathing" | "bounce" | "pulse" | "none";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Mascot({ 
  src, 
  alt, 
  className, 
  animation = "float", 
  size = "md" 
}: MascotProps) {
  const sizeClasses = {
    xs: "w-16 h-16 sm:w-20 sm:h-20",
    sm: "w-24 h-24 sm:w-32 sm:h-32",
    md: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48",
    lg: "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64",
    xl: "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80",
    "2xl": "w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
  };

  const animationClasses = {
    float: "animate-float",
    breathing: "animate-breathing",
    bounce: "animate-bounce",
    pulse: "animate-pulse",
    none: ""
  };

  return (
    <div className={cn(
      "relative transition-all duration-300",
      sizeClasses[size],
      animationClasses[animation],
      className
    )}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-contain drop-shadow-lg sm:drop-shadow-xl md:drop-shadow-2xl transition-all duration-300"
        loading="lazy"
      />
    </div>
  );
}
