import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useId,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// --- CVA Variants ---
const carouselVariants = cva(
  "relative w-full overflow-hidden select-none transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        card: "bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-800",
        glass:
          "bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-700/30 shadow-xl",
        outline: "border-2 border-dashed border-gray-300 dark:border-slate-700",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "w-full",
      },
      aspectRatio: {
        auto: "",
        video: "aspect-video",
        square: "aspect-square",
        wide: "aspect-[21/9]",
        portrait: "aspect-[3/4]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "full",
      aspectRatio: "auto",
    },
  }
);

// --- Carousel Context ---
interface CarouselContextType {
  currentIndex: number;
  setCurrentIndex: (index: number | ((prev: number) => number)) => void;
  next: () => void;
  prev: () => void;
  slideCount: number;
  setSlideCount: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAutoplay: () => void;
  orientation: "horizontal" | "vertical";
  effect: "slide" | "fade" | "zoom" | "slide-over";
  itemsPerView: number;
  gap: number;
  loop: boolean;
  carouselId: string;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel /> component");
  }
  return context;
};

// --- Prop Types ---
export interface CarouselItemData {
  id?: string | number;
  image?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  badge?: string;
}

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "size">,
    VariantProps<typeof carouselVariants> {
  items?: CarouselItemData[];
  renderItem?: (item: CarouselItemData, index: number) => React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  orientation?: "horizontal" | "vertical";
  effect?: "slide" | "fade" | "zoom" | "slide-over";
  itemsPerView?: number;
  gap?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showCounter?: boolean;
  controlsPosition?: "inside" | "outside" | "bottom";
  indicatorVariant?: "dots" | "bars" | "numbers";
  onSlideChange?: (index: number) => void;
  children?: React.ReactNode;
}

// --- Main Carousel Component ---
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      renderItem,
      autoPlay = false,
      autoPlayInterval = 4000,
      pauseOnHover = true,
      loop = true,
      orientation = "horizontal",
      effect = "slide",
      itemsPerView = 1,
      gap = 16,
      showControls = true,
      showIndicators = true,
      showCounter = false,
      controlsPosition = "inside",
      indicatorVariant = "dots",
      onSlideChange,
      variant,
      size,
      aspectRatio,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const carouselId = props.id || `carousel-${generatedId}`;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideCount, setSlideCount] = useState(items ? items.length : 0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);

    // Touch & Drag state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const maxIndex = Math.max(0, slideCount - itemsPerView);

    const next = useCallback(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return loop ? 0 : prev;
        }
        return prev + 1;
      });
    }, [maxIndex, loop]);

    const prev = useCallback(() => {
      setCurrentIndex((prev) => {
        if (prev <= 0) {
          return loop ? maxIndex : 0;
        }
        return prev - 1;
      });
    }, [maxIndex, loop]);

    const toggleAutoplay = useCallback(() => {
      setIsPlaying((prev) => !prev);
    }, []);

    // Effect callback on slide change
    useEffect(() => {
      onSlideChange?.(currentIndex);
    }, [currentIndex, onSlideChange]);

    // Auto-play timer effect
    useEffect(() => {
      if (!isPlaying || (pauseOnHover && isHovered) || slideCount <= 1) return;

      const timer = setInterval(() => {
        next();
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }, [isPlaying, isHovered, autoPlayInterval, slideCount, next, pauseOnHover]);

    // Keyboard Navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (orientation === "horizontal") {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      } else {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          prev();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          next();
        }
      }
      if (e.key === "Home") {
        e.preventDefault();
        setCurrentIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setCurrentIndex(maxIndex);
      }
    };

    // Touch & Swipe handlers
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
      const pos =
        orientation === "horizontal"
          ? "clientX" in e
            ? e.clientX
            : e.touches[0].clientX
          : "clientY" in e
          ? e.clientY
          : e.touches[0].clientY;
      setTouchEnd(null);
      setTouchStart(pos);
    };

    const onTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
      const pos =
        orientation === "horizontal"
          ? "clientX" in e
            ? e.clientX
            : e.touches[0].clientX
          : "clientY" in e
          ? e.clientY
          : e.touches[0].clientY;
      setTouchEnd(pos);
    };

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftOrUpSwipe = distance > minSwipeDistance;
      const isRightOrDownSwipe = distance < -minSwipeDistance;

      if (isLeftOrUpSwipe) {
        next();
      } else if (isRightOrDownSwipe) {
        prev();
      }
    };

    const contextValue: CarouselContextType = {
      currentIndex,
      setCurrentIndex,
      next,
      prev,
      slideCount,
      setSlideCount,
      isPlaying,
      setIsPlaying,
      toggleAutoplay,
      orientation,
      effect,
      itemsPerView,
      gap,
      loop,
      carouselId,
    };

    // Default item renderer if items prop is provided
    const defaultRenderItem = (item: CarouselItemData, idx: number) => {
      if (renderItem) return renderItem(item, idx);
      return (
        <div className="relative w-full h-full min-h-[300px] bg-slate-800 text-white rounded-lg overflow-hidden flex flex-col justify-end p-6">
          {item.image && (
            <img
              src={item.image}
              alt={item.title || `Slide ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-2">
            {item.badge && (
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-indigo-600 text-white rounded-full">
                {item.badge}
              </span>
            )}
            {item.title && (
              <h3 className="text-2xl font-bold text-white drop-shadow-md">
                {item.title}
              </h3>
            )}
            {item.description && (
              <p className="text-sm text-gray-200 line-clamp-2 max-w-xl">
                {item.description}
              </p>
            )}
            {item.content}
          </div>
        </div>
      );
    };

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={ref}
          id={carouselId}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={props["aria-label"] || "Image Carousel"}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onTouchStart}
          onMouseMove={onTouchMove}
          onMouseUp={onTouchEnd}
          className={cn(
            carouselVariants({ variant, size, aspectRatio }),
            controlsPosition === "outside" && "pb-12",
            className
          )}
          {...props}
        >
          {items ? (
            <>
              <CarouselContent>
                {items.map((item, idx) => (
                  <CarouselItem key={item.id || idx}>
                    {defaultRenderItem(item, idx)}
                  </CarouselItem>
                ))}
              </CarouselContent>

              {showControls && (
                <>
                  <CarouselPrevious
                    className={
                      controlsPosition === "outside"
                        ? "-left-12 top-1/2 -translate-y-1/2"
                        : controlsPosition === "bottom"
                        ? "bottom-2 left-4 top-auto"
                        : "left-4 top-1/2 -translate-y-1/2"
                    }
                  />
                  <CarouselNext
                    className={
                      controlsPosition === "outside"
                        ? "-right-12 top-1/2 -translate-y-1/2"
                        : controlsPosition === "bottom"
                        ? "bottom-2 left-16 top-auto"
                        : "right-4 top-1/2 -translate-y-1/2"
                    }
                  />
                </>
              )}

              {showIndicators && (
                <CarouselIndicators variant={indicatorVariant} />
              )}

              {showCounter && <CarouselCounter />}
            </>
          ) : (
            children
          )}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

// --- Carousel Track / Content Wrapper ---
export interface CarouselContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  CarouselContentProps
>(({ className, children, ...props }, ref) => {
  const {
    currentIndex,
    setSlideCount,
    orientation,
    effect,
    itemsPerView,
    gap,
  } = useCarousel();

  // Register slide count
  const childrenArray = React.Children.toArray(children);
  useEffect(() => {
    setSlideCount(childrenArray.length);
  }, [childrenArray.length, setSlideCount]);

  if (effect === "fade") {
    return (
      <div
        ref={ref}
        className={cn("relative w-full h-full min-h-[300px]", className)}
        {...props}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
              idx === currentIndex
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            )}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  if (effect === "zoom") {
    return (
      <div
        ref={ref}
        className={cn("relative w-full h-full min-h-[300px]", className)}
        {...props}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-700 ease-in-out",
              idx === currentIndex
                ? "opacity-100 scale-100 z-10 pointer-events-auto"
                : "opacity-0 scale-95 z-0 pointer-events-none"
            )}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  // Slide Effect (Horizontal & Vertical)
  const isHoriz = orientation === "horizontal";
  const itemWidthPercentage = 100 / itemsPerView;

  const translateOffset = -(currentIndex * itemWidthPercentage);

  return (
    <div className="overflow-hidden w-full h-full">
      <div
        ref={ref}
        className={cn(
          "flex transition-transform duration-500 ease-out h-full",
          isHoriz ? "flex-row" : "flex-col",
          className
        )}
        style={{
          transform: isHoriz
            ? `translate3d(${translateOffset}%, 0, 0)`
            : `translate3d(0, ${translateOffset}%, 0)`,
          gap: `${gap}px`,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// --- Carousel Item / Slide Wrapper ---
export interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  CarouselItemProps
>(({ className, children, ...props }, ref) => {
  const { itemsPerView, gap } = useCarousel();

  // Calculate width per item considering gap
  const flexBasis = `calc(${100 / itemsPerView}% - ${
    (gap * (itemsPerView - 1)) / itemsPerView
  }px)`;

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 h-full transition-all duration-300",
        className
      )}
      style={{ flexBasis }}
      {...props}
    >
      {children}
    </div>
  );
});
CarouselItem.displayName = "CarouselItem";

// --- Navigation Buttons (Previous / Next) ---
export interface CarouselButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselButtonProps
>(({ className, icon, onClick, ...props }, ref) => {
  const { prev, currentIndex, loop } = useCarousel();
  const isDisabled = !loop && currentIndex === 0;

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Previous slide"
      disabled={isDisabled}
      onClick={(e) => {
        prev();
        onClick?.(e);
      }}
      className={cn(
        "absolute z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 text-gray-800 dark:text-white shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none dark:hover:bg-slate-700",
        className
      )}
      {...props}
    >
      {icon || <ChevronLeft className="w-6 h-6" />}
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  CarouselButtonProps
>(({ className, icon, onClick, ...props }, ref) => {
  const { next, currentIndex, slideCount, itemsPerView, loop } = useCarousel();
  const maxIndex = Math.max(0, slideCount - itemsPerView);
  const isDisabled = !loop && currentIndex >= maxIndex;

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Next slide"
      disabled={isDisabled}
      onClick={(e) => {
        next();
        onClick?.(e);
      }}
      className={cn(
        "absolute z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 text-gray-800 dark:text-white shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none dark:hover:bg-slate-700",
        className
      )}
      {...props}
    >
      {icon || <ChevronRight className="w-6 h-6" />}
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

// --- Carousel Indicators (Dots / Bars / Numbers) ---
export interface CarouselIndicatorsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dots" | "bars" | "numbers";
}

export const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  CarouselIndicatorsProps
>(({ className, variant = "dots", ...props }, ref) => {
  const { currentIndex, setCurrentIndex, slideCount, itemsPerView } =
    useCarousel();

  const totalIndicators = Math.max(1, slideCount - itemsPerView + 1);

  if (slideCount <= 1) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md",
        className
      )}
      {...props}
    >
      {Array.from({ length: totalIndicators }).map((_, idx) => {
        const isActive = idx === currentIndex;
        if (variant === "numbers") {
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded transition-all",
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {idx + 1}
            </button>
          );
        }

        if (variant === "bars") {
          return (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                isActive
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              )}
            />
          );
        }

        // Default: Dots
        return (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              isActive
                ? "bg-white scale-125 shadow-sm"
                : "bg-white/40 hover:bg-white/70 hover:scale-110"
            )}
          />
        );
      })}
    </div>
  );
});
CarouselIndicators.displayName = "CarouselIndicators";

// --- Carousel Counter (e.g. 1 / 5) ---
export interface CarouselCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CarouselCounter = React.forwardRef<
  HTMLDivElement,
  CarouselCounterProps
>(({ className, ...props }, ref) => {
  const { currentIndex, slideCount } = useCarousel();

  if (slideCount <= 0) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/40 text-white text-xs font-medium backdrop-blur-md shadow-sm select-none",
        className
      )}
      {...props}
    >
      {currentIndex + 1} / {slideCount}
    </div>
  );
});
CarouselCounter.displayName = "CarouselCounter";

// --- Carousel Autoplay Toggle Button ---
export interface CarouselAutoplayToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CarouselAutoplayToggle = React.forwardRef<
  HTMLButtonElement,
  CarouselAutoplayToggleProps
>(({ className, ...props }, ref) => {
  const { isPlaying, toggleAutoplay } = useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
      onClick={toggleAutoplay}
      className={cn(
        "absolute top-4 left-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
    </button>
  );
});
CarouselAutoplayToggle.displayName = "CarouselAutoplayToggle";
