import React, { useState, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const tooltipVariants = cva(
  "absolute z-50 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium shadow-md transition-all duration-200 pointer-events-none",
  {
    variants: {
      variant: {
        dark: "bg-gray-900 text-white dark:bg-slate-800",
        light: "bg-white text-gray-900 border border-gray-200 shadow-lg",
        primary: "bg-indigo-600 text-white",
        glass: "bg-slate-900/85 text-white backdrop-blur-md border border-white/10 shadow-xl",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "dark",
      position: "top",
    },
  }
);

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  variant?: "dark" | "light" | "primary" | "glass";
  arrow?: boolean;
  delay?: number;
  trigger?: "hover" | "click";
  disabled?: boolean;
  children: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      position = "top",
      variant = "dark",
      arrow = true,
      delay = 150,
      trigger = "hover",
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
      if (disabled || !content) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (delay > 0 && trigger === "hover") {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
    };

    const hideTooltip = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsVisible(false);
    };

    const toggleTooltip = () => {
      if (disabled || !content) return;
      setIsVisible((prev) => !prev);
    };

    const arrowColorClass = () => {
      if (variant === "light") {
        if (position === "top") return "border-t-white";
        if (position === "bottom") return "border-b-white";
        if (position === "left") return "border-l-white";
        if (position === "right") return "border-r-white";
      }
      if (variant === "primary") {
        if (position === "top") return "border-t-indigo-600";
        if (position === "bottom") return "border-b-indigo-600";
        if (position === "left") return "border-l-indigo-600";
        if (position === "right") return "border-r-indigo-600";
      }
      if (variant === "glass") {
        if (position === "top") return "border-t-slate-900/85";
        if (position === "bottom") return "border-b-slate-900/85";
        if (position === "left") return "border-l-slate-900/85";
        if (position === "right") return "border-r-slate-900/85";
      }
      // dark (default)
      if (position === "top") return "border-t-gray-900 dark:border-t-slate-800";
      if (position === "bottom") return "border-b-gray-900 dark:border-b-slate-800";
      if (position === "left") return "border-l-gray-900 dark:border-l-slate-800";
      if (position === "right") return "border-r-gray-900 dark:border-r-slate-800";
      return "";
    };

    const hoverProps =
      trigger === "hover"
        ? {
            onMouseEnter: showTooltip,
            onMouseLeave: hideTooltip,
            onFocus: showTooltip,
            onBlur: hideTooltip,
          }
        : {
            onClick: toggleTooltip,
          };

    return (
      <div
        ref={ref}
        className="relative inline-flex items-center justify-center"
        {...hoverProps}
        {...props}
      >
        {children}

        {isVisible && content && (
          <div
            role="tooltip"
            className={cn(
              tooltipVariants({ variant, position }),
              "animate-fadeIn opacity-100 scale-100",
              className
            )}
          >
            {content}
            {arrow && (
              <span
                className={cn(
                  "absolute w-0 h-0 border-4 border-transparent",
                  position === "top" && "top-full left-1/2 -translate-x-1/2",
                  position === "bottom" && "bottom-full left-1/2 -translate-x-1/2",
                  position === "left" && "left-full top-1/2 -translate-y-1/2",
                  position === "right" && "right-full top-1/2 -translate-y-1/2",
                  arrowColorClass()
                )}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
