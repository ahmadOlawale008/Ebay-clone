import React, { ButtonHTMLAttributes, DeprecatedLifecycle, ReactNode } from 'react'
type VariantType = "filled" | "outlined" | "text"
type SizeType = "small" | "large" | "medium"
type IconPositionType = "end" | "start"
type ColorType = "secondary" | "primary"
type RoundedType = "sm" | "md" | "lg" | "xl"
type ChildrenType = ReactNode | string
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ChildrenType
    variant?: VariantType
    size?: SizeType
    icon?: string
    iconPosition?: IconPositionType
    color?: ColorType
    rounded?: RoundedType
    ringEffect?: boolean,
    baseClassName?: string
    fullWidth?: boolean
    /**
     * @deprecated The use of `className` is no longer required. Please use `baseClassName` instead, which also supports Tailwind CSS.
     */
    className?: string
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth, baseClassName, ringEffect = true, rounded = "md", className, icon, iconPosition, color = "secondary", variant = "text", size = "medium", ...props }) => {
    const btnBaseClassNames = ""
    const classNames = [
        btnBaseClassNames,
        baseClassName,

    ].join(" ")
    return (
        <button className=
        {`active:scale-[0.98] ease-in-out border-none tracking-wider inline-block m-0
        ${fullWidth ? "w-full" : "w-fit"}
        ${rounded == 'xl' ? 'rounded-xl' : rounded == "sm" ? " rounded-sm" : rounded == "lg" ? "rounded-lg" : "rounded-md"}
        ${size == "small" ? "px-3 text-sm py-1.5 focus:shadow-md " : size == "large" ? "px-6  py-3 active:shadow-2xl text-lg" : "px-4 py-2 active:shadow-xl text-lg"}
        ${(variant === "text" && color === 'secondary') ? (ringEffect ? "bg-transparent active:ring-2 active:ring-theme-secondary/25 active:bg-theme-secondary/5 " : "bg-transparent active:bg-theme-secondary/5") :
        (variant == "text" && color == "primary") ? (ringEffect ? "bg-transparent ring-2 ring-them-600 active:bg-theme-primary/5 " : "bg-transparent active:bg-theme-secondary/5") :
        (variant === "filled" && color === 'secondary') ? (ringEffect ? "bg-theme-secondary active:ring-2 active:ring-theme-secondary/25 active:bg-theme-secondary/90 " : "bg-transparent active:bg-theme-secondary/5") :
        (variant == "filled" && color == "primary") ? (ringEffect ? "bg-theme-primary active:ring-2 active:ring-theme-primary/25 active:bg-theme-primary/80 " : "bg-transparent active:bg-theme-secondary/5") :
        ""
        }
        
        `
            }
            {...props}>{children}</button>
    )
}

export default Button
