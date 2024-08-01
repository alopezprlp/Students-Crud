import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Spinner } from '@/components/Loaders'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={`btn ${className}`}
        ref={ref}
        {...props}
        disabled={isLoading ? true : props.disabled}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
