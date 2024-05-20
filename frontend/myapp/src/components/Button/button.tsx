import React, { ButtonHTMLAttributes, DeprecatedLifecycle } from 'react'
type VariantType = "filled" | "outlined" | "text"
type SizeType = "small" | "large" | "medium"
type IconPositionType = "end" | "start"
type ColorType = "secondary" | "primary"
type RoundedType = "sm" | "md" | "lg" | "xl"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    content: string
    variant?: VariantType
    size?: SizeType
    icon?: string
    iconPosition?: IconPositionType
    color?: ColorType
    rounded?: RoundedType
    ringEffect?: boolean,
    baseClassName?: string
    /**
     * @deprecated The use of `className` is no longer required. Please use `baseClassName` instead, which also supports Tailwind CSS.
     */
    className?: string
}

const Button: React.FC<ButtonProps> = ({ content, baseClassName, ringEffect = true, rounded = "md", className, icon, iconPosition, color = "secondary", variant = "text", size = "medium", ...props }) => {
    const btnBaseClassNames = ""
    const classNames = [
        btnBaseClassNames,
        baseClassName,

    ].join(" ")
    return (
        <button className=
        {`active:scale-[0.98] active:ease-in-out border-none
        ${rounded == 'xl' ? 'rounded-xl' : rounded == "sm" ? " rounded-sm" : rounded == "lg" ? "rounded-lg" : "rounded-md"}
        ${size == "small" ? "px-2 text-base py-1.5 active:shadow-md " : size == "large" ? " px-10 py-3 active:shadow-2xl text-2xl" : "px-6 py-3 active:shadow-xl text-lg"}
        w-fit tracking-wider inline-block m-0
        ${(variant === "text" && color === 'secondary') ? (ringEffect ? "bg-transparent ring-1 ring-orange-500 active:bg-theme-secondary/5 " : "") : ""}
        
        `
            }
            {...props}>{content}</button>
    )
}

export default Button
