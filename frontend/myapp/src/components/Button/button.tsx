import React, { ButtonHTMLAttributes } from 'react'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    content: string
    variant?: "filled" | "outlined" | "text"
    size?: "small" | "large" | "medium"
    icon?: string
    iconPosition?: "end" | "start"
    color?: "secondary" | "primary" | string
}

const Button: React.FC<ButtonProps> = ({content,variant="text", size="medium", ...props}) => {
  return (
    <button></button>
  )
}

export default Button
