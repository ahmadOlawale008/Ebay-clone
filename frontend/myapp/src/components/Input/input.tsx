import React from "react"
import { ButtonProps, roundedStyleState } from "../Button/button"
import isAnImageType from "../../utils/isAnImageType";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends Omit<ButtonProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">, "children"> {
    helperText?: string,
    helperTextClassName?: string,
    label?: string,
    
}
const TextInput: React.FC<TextInputProps> = ({ fullWidth, baseClassName, iconClassName, ringEffect = true, rounded = "md", color="primary", icon, iconPosition = "start",  variant = "text", size = "medium", ...props }) => {
    const inputVariant = variant == "filled" ? " bg-neutral-200/70 ring-1 ring-neutral-500 outline-none focus:ring-neutral-800 focus:ring-2" : variant == "outlined" ? "ring-1 " : "ring-0 border-b-[1px] border-b-stone-700 active:outline-none ease-in-out transition focus:border-b-secondary-light outline-none"
    // const inputText = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const inputSizeState = size == "small"? "px-3 text-sm" : size == "large"? "" : "p-2.5"
    const inputHasIconState = icon ? "ps-10" : ""
    const defaultRoundedState = 'rounded-md'
    const inputRoundedState = rounded ? `rounded-${roundedStyleState[rounded]} ` : defaultRoundedState
    
    // Icon
    const defaultIconState = "w-4 h-4 text-gray-500 dark:text-gray-700"
    const inputFieldClassName = twMerge(baseClassName, inputVariant, inputSizeState, inputRoundedState, inputHasIconState, "w-full")
    const iconClassNameMerged = twMerge(defaultIconState, iconClassName)
    return (
        <div className=" transition ">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <svg className={iconClassNameMerged} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                </div>
                <input {...props}  className={inputFieldClassName} placeholder="12345 or 12345-6789" />
            </div>
            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please select a 5 digit number from 0 to 9.</p>
        </div>
    )
}

export default TextInput
