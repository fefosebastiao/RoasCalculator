import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const messageVariants = cva(
  "text-sm font-medium",
  {
    variants: {
      variant: {
        default: "text-gray-500",
        error: "text-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CustomFormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof messageVariants> {}

const CustomFormMessage = React.forwardRef<
  HTMLParagraphElement,
  CustomFormMessageProps
>(({ className, variant, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(messageVariants({ variant }), className)}
      {...props}
    />
  )
})
CustomFormMessage.displayName = "CustomFormMessage"

export { CustomFormMessage }