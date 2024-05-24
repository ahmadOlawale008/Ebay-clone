const isAnImageType = (text: string) => {
    const pattern = /\.(jpg|png|jpeg)$/
    return pattern.test(text)
}

export default isAnImageType