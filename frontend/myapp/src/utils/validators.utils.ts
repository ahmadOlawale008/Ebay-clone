import { FirstNameValidation, LastNameValidation } from "../pages/authenticationPages/auth";

const customNameValidator = (name: string, _val: FirstNameValidation | LastNameValidation): FirstNameValidation | LastNameValidation => {
    const trimmedName = name.trim();
    const hasChars = trimmedName.length > 0;
    const fetchedErrorMessage = _val.fetchedErrorMessage || '';
    return {
        validity: { hasChars },
        valid: () => hasChars && !fetchedErrorMessage,
        fetchedErrorMessage,
    };
};