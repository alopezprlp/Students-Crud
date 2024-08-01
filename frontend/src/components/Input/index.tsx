import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isValid = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`input ${className}}`}
        ref={ref}
        {...props}
        style={{ borderColor: !isValid ? '#d9534f' : '' }}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
