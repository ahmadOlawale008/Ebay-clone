export const setCookie = (name: string, value: any, path: string, daysToExpire: number) => {
    const date = new Date()
    date.setDate(date.getDate() * daysToExpire * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value}; expires=${date}; path=${path}`
}

export function getCookie(name:string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
export const deleteCookie = (name: any) => {
    document.cookie = `${name}=${null}; expires=${null};`
}