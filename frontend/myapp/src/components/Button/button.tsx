import React, { ButtonHTMLAttributes, DeprecatedLifecycle, LazyExoticComponent, ReactElement, ReactNode } from 'react'
import { JsxElement } from 'typescript'
import IconType from '../../assets/icons/icons'
import isAnImageType from '../../utils/isAnImageType'
import SettingsIcon from '../../assets/icons/settingsIcon'
import { getByLabelText, render } from '@testing-library/react'
type VariantType = "filled" | "outlined" | "text"
type SizeType = "small" | "large" | "medium"
type IconPositionType = "end" | "start"
type ColorType = "secondary" | "primary"
type RoundedType = "sm" | "md" | "lg" | "xl" | "full" | "none"
type ChildrenType = ReactNode | string
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ChildrenType
    /**
     * @default text
     */
    variant?: VariantType
    /**
     * @default medium
     */
    size?: SizeType
    icon?: string | JSX.Element | LazyExoticComponent<React.FC<IconType>> | ReactElement
    /**
     * @default start
     */
    iconPosition?: IconPositionType
    color?: ColorType
    /**
     * @default md
     */
    rounded?: RoundedType
    ringEffect?: boolean,
    /**
     * Use Tailwind or custom css to set your desired icon style
     */
    iconClassName?: string,
    baseClassName?: string
    /**
     * @default false
     */
    fullWidth?: boolean
    /**
     * @deprecated The use of `className` is no longer required. Please use `baseClassName` instead, which also supports Tailwind CSS.
     */
    className?: string
}
const Button: React.FC<ButtonProps> = ({ children, iconClassName, fullWidth, baseClassName, ringEffect = true, rounded = "md", icon, iconPosition = "start", color = "secondary", variant = "text", size = "medium", ...props }) => {
    const defaultProps = "active:scale-[0.98] gap-x-2 disabled:scale-0 disabled:hover:bg-transparent disabled:active:bg-transparent ease-in-out font-normal tracking-wider inline-flex text-center justify-center items-center m-0"
    const defaultRoundedState = 'rounded-md'
    const btnState: Record<RoundedType, RoundedType> = {
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
        full: "full",
        none: "none"
    }
    const sizeState = {
        small: "px-3 text-sm py-1.5 active:shadow-md",
        large: "px-6  py-3 active:shadow-2xl text-lg",
        medium: "px-4 py-2 active:shadow-xl text-lg"
    }
    const btnVariantState: Record<VariantType, Record<ColorType, string>> = {
        text: {
            secondary: "hover:bg-secondary/10",
            primary: "hover:bg-primary/10"
        },
        filled: {
            secondary: ringEffect ? "bg-secondary-dark active:ring-2 active:ring-secondary-dark active:bg-secondary" : "bg-secondary  active:bg-secondary/90",
            primary: ringEffect ? "bg-primary-dark active:ring-2 active:ring-primary-dark active:bg-primary" : "bg-primary  active:bg-primary/8 "
        },
        outlined: {
            secondary: "ring-1 active:ring-2 hover:bg-secondary/10 ring-secondary",
            primary: "ring-1 active:ring-2 hover:bg-primary/10 ring-primary"
        }
    }
    // const btnVariants = `${(variant === "text" && color === 'secondary') ? "hover:bg-secondary/10" :
    //     (variant == "text" && color == "primary") ? "hover:bg-primary/10" :
    //         (variant === "filled" && color === 'secondary') ? (ringEffect ? "bg-secondary-dark active:ring-2 active:ring-secondary-dark active:bg-secondary " : "bg-secondary  active:bg-secondary/90 ") :
    //             (variant === "filled" && color == "primary") ? (ringEffect ? "bg-primary-dark active:ring-2 active:ring-primary-dark active:bg-primary " : "bg-primary  active:bg-primary/80 ") :
    //                 (variant === "outlined" && color == "primary") ? "ring-1 active:ring-2 hover:bg-primary/10 ring-primary" :
    //                     (variant === "outlined" && color === "secondary") ? "ring-1 active:ring-2 hover:bg-secondary/10 ring-secondary" :
    //                         ""
    //     }`
    const btnRounded = rounded ? `rounded-${btnState[rounded]} ` : defaultRoundedState
    const btnSize = size ? sizeState[size] : sizeState["medium"]
    const btnVariants = btnVariantState[variant][color]
    const btnWidth = `${fullWidth ? "w-full" : "w-fit"}`

    const btnBaseClassNames = [defaultProps, btnRounded, btnSize, btnVariants, btnWidth].join(" ")
    const classNames = [
        btnBaseClassNames,
        baseClassName,
    ].join(" ")
    const renderIcon = () => {
        if (typeof icon === 'string' && isAnImageType(icon)) {
            return <img src={icon} className={"size-4 " + iconClassName} alt="icon" />;
        } else if (React.isValidElement(icon)) {
            return React.cloneElement(icon as React.ReactElement<any>, {
                className: "size-5 " + iconClassName
            })
        } else if (icon as React.LazyExoticComponent<React.FC<IconType>>) {
            const IconComponent = icon as React.LazyExoticComponent<React.FC<IconType>>;
            return <IconComponent className={iconClassName} />;
        }
        return null;
    };
    return (
        <button className={classNames}
            {...props}>
            {iconPosition == "start" && renderIcon()}
            {children}
            {iconPosition == "end" && renderIcon()}
        </button>
    )
}
export default Button
