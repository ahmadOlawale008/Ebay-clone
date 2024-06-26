export const setCookie = (name: string, value: any, path: string, daysToExpire: number) => {
    const date = new Date()
    date.setDate(date.getDate() * daysToExpire * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value}; expires=${date}; path=${path}`
}

export const getCookie = (name: any) => {
    const decoded = decodeURIComponent(name)
    const decodedArray = decoded.split("; ")
    let result: string | undefined;
    decodedArray.forEach((value) => {
        if (value.indexOf(value) === 0) {
            result = value.substring(name.length + 1)
        }
    })
    return result
}

export const deleteCookie = (name: any) => {
    document.cookie = `${name}=${null}; expires=${null};`
}