const isAnImageType = (text: string) => {
    const pattern = /\.(jpg|png|jpeg|svg)$/
    return pattern.test(text)
}

export default isAnImageType