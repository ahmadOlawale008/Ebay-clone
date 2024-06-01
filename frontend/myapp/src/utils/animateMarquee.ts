import { MotionValue } from "framer-motion"

export const animateMarquee = (element: React.MutableRefObject<HTMLDivElement | null>, marqueeId: React.MutableRefObject<number>, current: number, speed: number, x: MotionValue<number>)=>{
    if(!element || !element.current) return
    const target = Math.floor(element.current.clientWidth / 4)
    const ease = 0.2
    const lp = {
        target,
        current
    }
    const jump = ()=>{
        lp.current = lp.current * (1-ease) + target * ease
        x.set(lp.current)
    }
    const startMarquee = ()=>{
        lp.target += speed
        jump()
        marqueeId.current = window.requestAnimationFrame(startMarquee)
    }
    const pauseMarquee = ()=>{
        window.cancelAnimationFrame(marqueeId.current)
    }

    window.requestAnimationFrame(startMarquee)
    return pauseMarquee
}
