import React, { useEffect, useRef } from "react"
import { ButtonProps, roundedStyleState } from "../Button/button"
import isAnImageType from "../../utils/isAnImageType";
import { twMerge } from "tailwind-merge";
import IconType from "../../assets/icons/icons";

interface TextInputProps extends Omit<ButtonProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "size">, "children"> {
    helperText?: string,
    helperTextClassName?: string,
    label?: string,
}
const TextInput: React.FC<TextInputProps> = ({ fullWidth, baseClassName, iconClassName, helperText, ringEffect = true, rounded = "md", color = "primary", icon, iconPosition = "start", variant = "text", size = "medium", ...props }) => {
    const inputVariant = variant === "outlined" ? " bg-neutral-200/70 ring-1 ring-neutral-500 outline-none focus:ring-neutral-800 focus:ring-2" :
        variant === "filled" ? "bg-neutral-200 outline-none border-b border-b-stone-800 focus:border-b-stone-300" : "ring-0 border-b border-b-stone-700 active:outline-none ease-in-out transition focus:border-b-secondary-light outline-none"
    const inputSizeState = size == "small" ? "p-1 text-sm" : size === "large" ? "p-4  text-[1.9rem]" : "p-2.5"
    const inputHasIconState = icon && iconPosition === "start" ? "ps-10" : icon && iconPosition === "end" ? "pe-10" : ""
    const defaultRoundedState = 'rounded-md'
    const inputRoundedState = rounded ? `rounded-${roundedStyleState[rounded]} ` : defaultRoundedState
    // Icon
    const defaultIconState = "size-4 text-gray-500 dark:text-gray-400"
    const inputFieldClassName = twMerge(baseClassName, inputVariant, inputSizeState, inputRoundedState, inputHasIconState, "w-full block")
    const iconClassNameMerged = twMerge(defaultIconState, iconClassName)
    const renderIcon = () => {
        if (typeof icon === 'string' && isAnImageType(icon)) {
            return <img src={icon} className={twMerge("size-5", iconClassName)} alt="icon" />;
        } else if (React.isValidElement(icon)) {
            return React.cloneElement(icon as React.ReactElement<any>, {
                className: iconClassNameMerged
            })
        } else if (icon as React.LazyExoticComponent<React.FC<IconType>>) {
            const IconComponent = icon as React.LazyExoticComponent<React.FC<IconType>>;
            return <div className="absolute  inset-y-0 end-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <IconComponent className={iconClassNameMerged} />
            </div>;
        }
        return null;
    };
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div className="">
            <label htmlFor={inputRef.current?.id} className='text-sm font-light text-neutral-800'>First Name</label>
            <div className="relative">
                {iconPosition === "start" && <div className="absolute  inset-y-0 start-0 top-0 flex items-center  pointer-events-none">
                    {renderIcon()}
                </div>}
                <input ref={inputRef} {...props} className={inputFieldClassName} placeholder="12345 or 12345-6789" />
                {iconPosition === "end" && <div className="absolute  inset-y-0 end-0 top-0 flex items-center ps-3.5 pointer-events-none">
                </div>}
            </div>
            {helperText && <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
        </div>
    )
}

export default TextInput
