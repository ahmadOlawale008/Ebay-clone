import React from "react"
// Sign Up Auth

// Backend Validation Messages
export const VALIDATION_MESSAGES = {
    "NAME": {
        "DUPLICATE_ENTRY": "A user with this name already exists.",
        "EMPTY_VALUE": "Please enter a value for this field.",
    },
    "EMAIL": {
        "INVALID_EMAIL": "Invalid email address.",
        "DUPLICATE_ENTRY": 'Your email address is already registered with eazeSales. Need help with your password? <a class="font-bold text-sm underline underline-offset-2 !text-blue-700" target="_blank" title="Password Assistance. The link opens in a new window or tab." href="/login">Click here</a>.',
        "INVALID_DOMAIN": "Invalid email domain.",
        "BLOCKED_DOMAIN": "Email domain is not allowed.",
    },
    "PHONE_NUMBER": {
        "INVALID_PHONE_NUMBER": "Invalid phone number.",
        "DUPLICATE_ENTRY": "A user with this phone number already exists.",
    },
    "PASSWORD": {
        // code for password must include alphanumeric letters for security purposes.
        "ALPHANUMERIC_NEEDED": "ALPHANUMERIC_NEEDED",
        //   code for 'Password must have minimum length of 6.'
        "MAXLENGTH_OF_SIX": "MAXLENGTH_OF_SIX",
        // SPECIAL_CHARS_NEEDED Password must contain atleast one special characters { string.punctuation }
"SPECIAL_CHARS_NEEDED": "SPECIAL_CHARS_NEEDED",
    },
"INVALID": "Error signing up form. Please try again later.",
}




export type SignInFormType = {
    email: string
    password: string
}
export interface CustomFieldValidations {
    hasChars?: boolean;
    isValid?: boolean;
    doesNotAlreadyExists?: boolean;
    isAlphanumeric?: boolean;
    hasMaxLength?: boolean;
    hasSpecialCharacters?: boolean;
    doesNotHaveInvalidChars?: boolean;
}

export enum ValidationMessages {
    CHARS_NEEDED = 'This field must contain at least one character.',
    NOT_VALID_EMAIL = 'Please enter a valid email address.',
    ALREADY_EXISTS = 'Email address already exists.',
    ALPHANUMERIC_NEEDED = 'Password must include alphanumeric letters for security purposes.',
    MAXLENGTH_OF_SIX = 'Password must have a minimum length of 6.',
    SPECIAL_CHARS_NEEDED = 'Password must contain at least one special character !"//$%&\'()*+,-./:;<=>?@[\\]^_`{|}~.',
    INVALID_PASSWORD = 'Password is not valid.'
}
export interface ValidationResult<T> {
    validity: T;
    fetchedErrorMessage: string;
    valid: () => boolean;
}
export type FirstNameValidation = ValidationResult<Pick<CustomFieldValidations, 'hasChars'>>;
export type LastNameValidation = ValidationResult<Pick<CustomFieldValidations, 'hasChars'>>;
export type EmailValidation = ValidationResult<Pick<CustomFieldValidations, 'isValid' | 'doesNotAlreadyExists'>>;
export type PasswordValidation = ValidationResult<Pick<CustomFieldValidations, 'isAlphanumeric' | 'hasMaxLength' | 'hasSpecialCharacters' | 'doesNotHaveInvalidChars'>>;

export interface SignUpCustomValidation {
    first_name: FirstNameValidation;
    last_name: LastNameValidation;
    email: EmailValidation;
    password: PasswordValidation;
}
