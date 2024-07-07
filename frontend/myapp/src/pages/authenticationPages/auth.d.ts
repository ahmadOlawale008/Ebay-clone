import React from "react"

export type FormType = {
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string,
}
declare function SignUpType(e: React.FormEvent<HTMLFormElement>)