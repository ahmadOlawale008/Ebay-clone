import React, { ButtonHTMLAttributes, DeprecatedLifecycle, ReactNode } from 'react'
type VariantType = "filled" | "outlined" | "text"
type SizeType = "small" | "large" | "medium"
type IconPositionType = "end" | "start"
type ColorType = "secondary" | "primary"
type RoundedType = "sm" | "md" | "lg" | "xl" | "full"
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
    const btnBaseClassNames = `active:scale-[0.985] disabled:active:scale-[1]  cursor-pointer disabled:cursor-default shadow-md ease-in-out border-none tracking-wider inline-flex items-center justify-center m-0 font-semibold
        ${fullWidth ? "w-full" : "w-fit"}
        ${rounded == 'xl' ? 'rounded-xl' : rounded == "sm" ? " rounded-sm" : rounded == "lg" ? "rounded-lg" : rounded == "full" ? "rounded-full" : "rounded-md"}
        ${size == "small" ? "px-3 text-sm py-1.5 active:shadow-md " : size == "large" ? "px-8  py-3 active:shadow-2xl text-lg" : "px-6 py-2 active:shadow-xl text-lg"}
        ${(variant === "text" && color === 'secondary') ? (ringEffect ? "bg-transparent active:ring-2 disabled:bg-[#84848440] disabled:text-[#848484ad] disabled:ring-0 active:ring-theme-secondary/25 active:bg-theme-secondary/5 " : "bg-transparent disabled:bg-[#84848440] disabled:text-[#848484ad] disabled:ring-0 active:bg-theme-secondary/5") :
        (variant == "text" && color == "primary") ? (ringEffect ? "bg-transparent active:ring-2 active:ring-theme-primary disabled:bg-[#84848440] disabled:text-[#848484ad] disabled:ring-0 active:bg-theme-primary/5 " : "bg-transparent disabled:bg-[#84848440] disabled:text-[#848484ad] disabled:ring-0 active:bg-theme-primary/5") :
            (variant === "filled" && color === 'secondary') ? (ringEffect ? "hover:bg-theme-secondary/80 bg-theme-secondary disabled:bg-[#84848440] disabled:text-[#848484ad] disabled:ring-0   active:ring-2 active:ring-theme-secondary/75 active:bg-theme-secondary/95 " : "bg-theme-secondary disabled:ring-0 disabled:bg-[#84848440] disabled:text-[#848484ad] active:bg-theme-secondary/95") :
                (variant == "filled" && color == "primary") ? (ringEffect ? "bg-theme-primary hover:bg-theme-primary/80 bg-theme-primary disabled:bg-[#84848440] disabled:text-[#848484ad] disabled:ring-0 active:ring-2 active:ring-theme-primary/25 active:bg-theme-primary/95 " : "bg-theme-primary disabled:ring-0 disabled:bg-[#84848440] disabled:text-[#848484ad] active:bg-theme-primary/95") :
        (variant == "outlined" && color == "primary") ? "bg-transparent disabled:bg-transparent disabled:outline-[#84848440] disabled:ring-0 disabled:text-[#848484ad] outline outline-1 outline-theme-primary hover:bg-theme-primary/10 active:bg-theme-primary/30" :
        (variant == "outlined" && color == "secondary") ? "bg-transparent disabled:bg-transparent disabled:outline-[#84848440] disabled:ring-0 disabled:text-[#848484ad] outline outline-1 outline-theme-secondary hover:bg-theme-secondary/10 active:bg-theme-secondary/30" :
        ""
        }`
    const classNames = [
        btnBaseClassNames,
        baseClassName,

    ].join(" ")
    return (
        <button className={classNames} {...props}>{children}</button>
    )
}

export default Button
