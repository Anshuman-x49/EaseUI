import React, { createContext, useContext, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { Menu, X } from "lucide-react";

// --- Layout Context ---
interface LayoutContextType {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  layoutType: "dashboard" | "main";
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a <Layout /> component");
  }
  return context;
};

// --- CVA Variants ---
const layoutVariants = cva(
  "min-h-screen w-full flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100",
        light: "bg-white text-gray-900 border-gray-200",
        dark: "bg-slate-950 text-slate-100 border-slate-800",
        indigo: "bg-indigo-950 text-indigo-100 border-indigo-900",
        glass: "bg-slate-900/90 text-white backdrop-blur-md border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  layoutType?: "dashboard" | "main";
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      layoutType = "main",
      header,
      sidebar,
      footer,
      variant,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    const contextValue: LayoutContextType = {
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      layoutType,
    };

    return (
      <LayoutContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(layoutVariants({ variant }), className)}
          {...props}
        >
          {/* Preset 1: Dashboard Layout (Sidebar + Top Header + Content + Footer) */}
          {layoutType === "dashboard" && !children && (
            <div className="flex flex-1 min-h-screen relative">
              {sidebar && (
                <aside
                  className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
                    sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                  )}
                >
                  {sidebar}
                </aside>
              )}

              {sidebarOpen && (
                <div
                  className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-xs"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              <div className="flex-1 flex flex-col min-w-0">
                {header && (
                  <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
                    <button
                      type="button"
                      aria-label="Toggle navigation menu"
                      onClick={toggleSidebar}
                      className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200"
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                    <div className="w-full">{header}</div>
                  </header>
                )}

                <main className="flex-1 p-6 overflow-auto">{children}</main>

                {footer && (
                  <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-4 text-sm text-gray-500">
                    {footer}
                  </footer>
                )}
              </div>
            </div>
          )}

          {/* Preset 2: Main Web Layout (Header + Centered Content + Footer) */}
          {layoutType === "main" && !children && (
            <div className="flex flex-col min-h-screen">
              {header && (
                <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 px-6 py-4">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {header}
                  </div>
                </header>
              )}

              <main className="flex-1 max-w-7xl w-full mx-auto p-6">
                {children}
              </main>

              {footer && (
                <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 p-6 mt-auto">
                  <div className="max-w-7xl mx-auto">{footer}</div>
                </footer>
              )}
            </div>
          )}

          {/* Custom Compound Children layout */}
          {children}
        </div>
      </LayoutContext.Provider>
    );
  }
);
Layout.displayName = "Layout";

// --- Subcomponent: LayoutHeader ---
export interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
}

export const LayoutHeader = React.forwardRef<HTMLElement, LayoutHeaderProps>(
  ({ sticky = true, className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 z-30 flex items-center justify-between shadow-xs",
          sticky && "sticky top-0",
          className
        )}
        {...props}
      >
        {children}
      </header>
    );
  }
);
LayoutHeader.displayName = "LayoutHeader";

// --- Subcomponent: LayoutSidebar ---
export interface LayoutSidebarProps extends React.HTMLAttributes<HTMLElement> {
  width?: "sm" | "md" | "lg";
}

export const LayoutSidebar = React.forwardRef<HTMLElement, LayoutSidebarProps>(
  ({ width = "md", className, children, ...props }, ref) => {
    const { sidebarOpen, setSidebarOpen } = useLayout();

    const widthClasses =
      width === "sm" ? "w-48" : width === "lg" ? "w-72" : "w-64";

    return (
      <>
        <aside
          ref={ref}
          className={cn(
            "fixed inset-y-0 left-0 z-40 bg-slate-900 text-slate-100 border-r border-slate-800 p-5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
            widthClasses,
            sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          )}
          {...props}
        >
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </>
    );
  }
);
LayoutSidebar.displayName = "LayoutSidebar";

// --- Subcomponent: LayoutContent ---
export interface LayoutContentProps extends React.HTMLAttributes<HTMLElement> {
  container?: "sm" | "md" | "lg" | "xl" | "full";
}

export const LayoutContent = React.forwardRef<HTMLElement, LayoutContentProps>(
  ({ container = "xl", className, children, ...props }, ref) => {
    const containerClasses = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    }[container];

    return (
      <main
        ref={ref}
        className={cn(
          "flex-1 w-full mx-auto p-6 overflow-auto",
          containerClasses,
          className
        )}
        {...props}
      >
        {children}
      </main>
    );
  }
);
LayoutContent.displayName = "LayoutContent";

// --- Subcomponent: LayoutFooter ---
export interface LayoutFooterProps extends React.HTMLAttributes<HTMLElement> {}

export const LayoutFooter = React.forwardRef<HTMLElement, LayoutFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "w-full bg-slate-900 text-slate-400 border-t border-slate-800 p-6 mt-auto text-sm",
          className
        )}
        {...props}
      >
        {children}
      </footer>
    );
  }
);
LayoutFooter.displayName = "LayoutFooter";

// --- Subcomponent: LayoutSidebarToggle ---
export interface LayoutSidebarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const LayoutSidebarToggle = React.forwardRef<
  HTMLButtonElement,
  LayoutSidebarToggleProps
>(({ className, children, ...props }, ref) => {
  const { toggleSidebar } = useLayout();

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Toggle sidebar"
      onClick={toggleSidebar}
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-white transition-colors",
        className
      )}
      {...props}
    >
      {children || <Menu className="w-5 h-5" />}
    </button>
  );
});
LayoutSidebarToggle.displayName = "LayoutSidebarToggle";
