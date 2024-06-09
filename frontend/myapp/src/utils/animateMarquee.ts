import React, { MutableRefObject } from "react"
interface AnimateMarqueeProps {
    element: MutableRefObject<HTMLDivElement | null>,
    elementId: React.MutableRefObject<number>,
    current: number,
    speed: number,
    direction: 1 | -1,
    pause: boolean
}
export const animateMarquee = ({ element, elementId, current = 0, speed = 0.08, direction = 1, pause = false }: AnimateMarqueeProps) => {
    if (!element.current) return
    const children = element.current.children as HTMLCollectionOf<HTMLDivElement>
    children[0].style.cssText = `position: absolute; top:0; left: ${-direction * 100}%`
    const ease = 0.05
    let lp = {
        target: current,
        current: current
    }
    const jump = (current: number, target: number) => {
        lp.current = current * (1 - ease) + target * ease
    }
    const start = () => {
        lp.target += speed
        if (lp.target > 100) {
            lp.current -= 100
            lp.target = 0
        }
    }
    const moveMarquee = () => {
        if (!pause) {
            start()
            jump(lp.current, lp.target)
            //@ts-ignore
            element.current.style.transform = `translateX(${lp.current * direction}%)`
            elementId.current = window.requestAnimationFrame(moveMarquee)
        }
    }
    const pauseMarquee = () => {
        if (pause) {
            cancelAnimationFrame(elementId.current)
        }
    }
    moveMarquee()
}