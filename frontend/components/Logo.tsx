import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logoImage from "../assets/logo terdig desain.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textColor?: "default" | "white";
}

export function Logo({ className, size = "md", showText = true, textColor = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <Link to="/" className={cn("flex items-center gap-4 flex-shrink-0", className)}>
      <div className={cn("flex items-center justify-center animate-pulse", sizeClasses[size])}>
        <img 
          src={logoImage}
          alt="TerDig Academy Logo"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className="leading-none">
          <h1 className={cn(
            "font-bold", 
            textColor === "white" ? "text-white" : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
            textSizeClasses[size]
          )}>
            TerDig Academy
          </h1>
          <p className={cn("text-xs -mt-0.5", textColor === "white" ? "text-gray-400" : "text-gray-600")}>
            Bimbel & Sanggar Seni Digital
          </p>
        </div>
      )}
    </Link>
  );
}