import React from "react"
// Sign Up Auth
export type FormType = {
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string,
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
    SPECIAL_CHARS_NEEDED = 'Password must contain at least one special character !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~.',
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
