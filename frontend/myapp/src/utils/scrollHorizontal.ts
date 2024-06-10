import React, { MouseEventHandler } from "react"
export type AvailableCardController = "left" | "right" | "both"
export type ScrollType = "right" | "left" | "default"

export const handleContainerScroll = (e: React.UIEvent, setCardContainerScrollDirection: React.Dispatch<React.SetStateAction<AvailableCardController>>) => {
    const element = e.currentTarget as HTMLDivElement
    const clientWidth = element.clientWidth
    const scrollLeft = element.scrollLeft
    const scrollWidth = element.scrollWidth
    const distance = scrollLeft + clientWidth
    if (distance === scrollWidth) {
        setCardContainerScrollDirection("left")
    } else if (distance > clientWidth) {
        setCardContainerScrollDirection("both")
    } else {
        setCardContainerScrollDirection("right")
    }
}
export const handleScrollCardPosition = (e: React.MouseEvent<HTMLSpanElement>, ref: React.RefObject<HTMLDivElement>, direction: AvailableCardController) => {
    const moveTo = e.currentTarget.getAttribute("data-direction")
    if (ref.current) {
        const element = ref.current
        const clientWidth = element.clientWidth
        const scrollLeft = element.scrollLeft
        let scrollTo = scrollLeft + (moveTo === "left" ? -(clientWidth - 100) : (clientWidth - 100))
        if (moveTo == "left" && direction != "right") {
            element.scrollTo({ "left": scrollTo, "behavior": "smooth" })
        }
        if (moveTo == "right" && direction != "left") {
            element.scrollTo({ "left": scrollTo, "behavior": "smooth" })
        }
    }
}