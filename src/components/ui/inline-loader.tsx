import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inlineLoaderVariants = cva(
  "relative inline-block",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const spinnerVariants = cva(
  "rounded-full box-border animate-spin motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "w-4 h-4 border-2",
        md: "w-6 h-6 border-2", 
        lg: "w-8 h-8 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface InlineLoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineLoaderVariants> {}

export const InlineLoader = React.forwardRef<
  HTMLDivElement,
  InlineLoaderProps
>(({ className, size, ...props }, ref) => {
  return (
    <div
      className={cn(
        inlineLoaderVariants({ size, className }),
        "transition-opacity duration-300 ease-out motion-reduce:transition-none"
      )}
      role="status"
      aria-label="Loading"
      ref={ref}
      {...props}
    >
      <div className={cn(
        spinnerVariants({ size }),
        "border-t-[#ad79e1] border-r-[#ad79e1] border-r-transparent",
        "transition-all duration-300 ease-out motion-reduce:transition-none"
      )}>
      </div>
      
      <div className={cn(
        "absolute left-0 top-0",
        spinnerVariants({ size }),
        "border-b-[#9ee8c5] border-l-[#9ee8c5] border-l-transparent",
        "transition-all duration-300 ease-out motion-reduce:transition-none"
      )}>
      </div>
      
      <span className="sr-only">Loading...</span>
    </div>
  )
})

InlineLoader.displayName = "InlineLoader"