import React, { ButtonHTMLAttributes, forwardRef, useEffect, useRef } from "react"
import { ButtonProps, roundedStyleState } from "../Button/button"
import isAnImageType from "../../utils/isAnImageType";
import { twMerge } from "tailwind-merge";
import IconType from "../../assets/icons/icons";
import DOMPurify from "dompurify"

type InputPropsWithoutSize = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;
interface TextInputProps extends Omit<ButtonProps, keyof ButtonHTMLAttributes<HTMLButtonElement>>, InputPropsWithoutSize {
    helperText?: string,
    error?: boolean,
    helperTextClassName?: string,
    label?: string,
    labelClassName?: string
}

const sanitizeLabel = (label: string | Node)=>{
    const sanitizerConfig = {
        "ALLOWED_TAGS": ["a"],
        "ALLOWED_ATTR": ["target", "title", "class", "href"],
        "ALLOWED_URI_REGEXP": /^\/login$/,
        "KEEP_CONTENT": true
    }  
    const sanitizer = DOMPurify.sanitize(label, sanitizerConfig)
    return sanitizer
}


const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ fullWidth, error, id, helperTextClassName, baseClassName, label, labelClassName, iconClassName, helperText, ringEffect = true, rounded = "md", icon, iconPosition = "start", variant = "text", size = "medium", ...props }, ref) => {
    // Defaults
    const inputVariant = variant === "outlined" ?
        "bg-neutral-200/70 ring-1 ring-neutral-500 outline-none focus:ring-neutral-800 focus:ring-2" :
        variant === "filled" ? "bg-neutral-200 outline-none border-b border-b-stone-800 focus:border-b-stone-300" : "ring-0 border-b border-b-stone-700 active:outline-none ease-in-out transition focus:border-b-secondary-light outline-none"
    const inputSizeState = size == "small" ? "p-[0.45rem] text-sm" : size === "large" ? "p-4  text-[1.9rem]" : "p-2.5"
    const inputHasIconState = icon && iconPosition === "start" ? "ps-10" : icon && iconPosition === "end" ? "pe-10" : ""
    const defaultRoundedState = 'rounded-md'
    const inputRoundedState = rounded ? `rounded-${roundedStyleState[rounded]} ` : defaultRoundedState
    const defaultIconState = "size-4  text-gray-500 dark:text-gray-400 " + (iconPosition == "end" ? "mr-3" : "ml-3");
    const baseHelperTextClassName: Record<string, string> = {
        true: "mt-2 text-xs text-red-700",
        false: "mt-2 text-xs text-gray-400 "
    }

    // Merged Css
    const iconClassNameMerged = twMerge(defaultIconState, iconClassName)
    const inputFieldClassName = twMerge(baseClassName, inputVariant, inputSizeState, inputRoundedState, inputHasIconState, error ? "ring-red-500 focus:ring-red-800": "", "w-full block")
    const defaultLabelClassName = twMerge(labelClassName, error ? "text-red-500" : "", "text-xs font-medium text-neutral-800 ")
    const defaultHelperTextClassName = twMerge(helperTextClassName, baseHelperTextClassName[String(error)])

    // Display Icon
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
    return (
        <div className="">
            {label && <div className="mb-1"><label htmlFor={id} className={defaultLabelClassName}>{label}</label></div>}
            <div className="relative">
                {iconPosition === "start" && <div className="absolute  inset-y-0 start-0 top-0 flex items-center  pointer-events-none">
                    {renderIcon()}
                </div>}
                <input ref={ref}  {...props} className={inputFieldClassName} />
                {iconPosition === "end" && <div className="absolute inset-y-0 end-0 top-0 flex items-center pointer-events-none">
                    {renderIcon()}
                </div>}
            </div>
            {helperText && <p dangerouslySetInnerHTML={{ __html: sanitizeLabel(helperText) }} id="helper-text-explanation" className={defaultHelperTextClassName}></p>}
        </div>
    )
})

export default TextInput
