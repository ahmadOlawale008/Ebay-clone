export const animateMarquee = (
    element: React.MutableRefObject<HTMLDivElement | null>,
    elementId: React.MutableRefObject<number>,
    current = 0,
    speed = 0.5,
    direction: -1 | 1 = 1
) => {
    if (!element.current) return
    (element.current.children[1] as HTMLDivElement).style.cssText = `position: absolute; top:0; left: ${-direction * 100}%`

    // (element.current.children[1] as HTMLDivElement).style.cssText = `position: absolute; top:0; left: ${-direction * 100}%`


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
        start()
        jump(lp.current, lp.target)
        //@ts-ignore
        element.current.style.transform = `translateX(${lp.current * direction}%)`
        elementId.current = window.requestAnimationFrame(moveMarquee);
    }
    window.requestAnimationFrame(moveMarquee)
    // const pauseMarquee = ()=>{
    //     window.cancelAnimationFrame(elementId.current)
    // }
    // return pauseMarquee
}