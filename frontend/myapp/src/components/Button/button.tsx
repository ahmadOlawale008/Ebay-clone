import React, { ButtonHTMLAttributes, DeprecatedLifecycle, LazyExoticComponent, ReactElement, ReactNode } from 'react'
import { JsxElement } from 'typescript'
import IconType from '../../assets/icons/icons'
import isAnImageType from '../../utils/isAnImageType'
import SettingsIcon from '../../assets/icons/settingsIcon'
import { render } from '@testing-library/react'
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
    icon?: string | JSX.Element | LazyExoticComponent<React.FC<IconType>>
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
const Button: React.FC<ButtonProps> = ({ children, fullWidth, baseClassName, ringEffect = true, rounded = "md", className, icon, iconPosition = "start", color = "secondary", variant = "text", size = "medium", ...props }) => {
    const btnBaseClassNames = `active:scale-[0.98] disabled:scale-0 disabled:hover:bg-transparent disabled:active:bg-transparent ease-in-out font-semibold tracking-wider inline-flex text-center justify-center items-center m-0
        ${fullWidth ? "w-full" : "w-fit"}
        ${rounded == 'xl' ? 'rounded-xl' : rounded == "sm" ? " rounded-sm" : rounded == "lg" ? "rounded-lg" : "rounded-md"}
        ${size == "small" ? "px-3 text-sm py-1.5 active:shadow-md " : size == "large" ? "px-6  py-3 active:shadow-2xl text-lg" : "px-4 py-2 active:shadow-xl text-lg"}
        ${(variant === "text" && color === 'secondary') ? "hover:bg-theme-secondary/10" :
            (variant == "text" && color == "primary") ? "hover:bg-theme-primary/10" :
                (variant === "filled" && color === 'secondary') ? (ringEffect ? "bg-theme-secondary active:ring-2 active:ring-theme-secondary/25 active:bg-theme-secondary/90 " : "bg-theme-secondary  active:bg-theme-secondary/90 ") :
                    (variant == "filled" && color == "primary") ? (ringEffect ? "bg-theme-primary active:ring-2 active:ring-theme-primary/25 active:bg-theme-primary/80 " : "bg-theme-primary  active:bg-theme-primary/80 ") :
                        (variant == "outlined" && color == "primary") ? "ring-1 active:ring-2 hover:bg-theme-primary/10 ring-theme-primary" :
                            (variant == "outlined" && color == "secondary") ? "ring-1 active:ring-2 hover:bg-theme-secondary/10 ring-theme-secondary" :
                                ""
        }
        
        `
    const classNames = [
        btnBaseClassNames,
        baseClassName,
    ].join(" ")
    if (icon) console.log(icon, typeof icon, children)
    const renderIcon = () => {
        if (typeof icon === 'string' && isAnImageType(icon)) {
            return <img src={icon} alt="icon" />;
        } else if (React.isValidElement(icon)) {
            return icon;
        } else if (typeof icon === 'function') {
            const IconComponent = icon as React.LazyExoticComponent<React.FC<IconType>>;
            return <IconComponent />;
        }
        return null;
    };
    return (
        <button className={classNames}
            {...props}>
            {renderIcon()}
            {children}
            {renderIcon()}
        </button>
    )
}

export default Button
