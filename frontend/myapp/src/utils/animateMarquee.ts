export const animateMarquee = (
    element: React.MutableRefObject<HTMLDivElement | null>,
    elementId: React.MutableRefObject<number>,
    current = 0,
    speed = 0.5,
    direction: -1 | 1 = 1,
    // continueFrom: string
) => {
    if (!element.current) return
    const children = element.current.children as HTMLCollectionOf<HTMLDivElement>
    children[0].style.cssText = `position: absolute; top:0; left: ${-direction * 100}%`
    // children[2].style.cssText = `position: absolute; top:0; left: ${-direction * 200}%`

    const ease = 0.1

    let lp = {
        target: current,
        current: current
    }
    const jump = (current: number, target: number) => {
        lp.current = current * (1 - ease) + target * ease
    }
    const start = () => {
        lp.target += speed
        if (lp.target > 200) {
            lp.current -= 200
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

}