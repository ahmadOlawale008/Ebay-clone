import { MutableRefObject } from 'react';
import { MotionValue } from 'framer-motion';
type MoveMarqueeType = {
    ease: number,
    current: number
    target: number
}
type marqueeFunctionType = {
    cmd?: "start" | "end" | "pause",
    timeStamp?: 1
}
export const animateMarquee = (
    element: MutableRefObject<HTMLDivElement | null>,
    marqueeId: MutableRefObject<number>,
    current: number,
    speed: number,
    x: MotionValue<number>,
    direction: 'forward' | 'backward'
) => {
    if (!element || !element.current) return;

    const ease = 0.005;
    const elementWidth = element.current.offsetWidth; 
    const containerWidth = element.current.parentElement?.offsetWidth || 0;
    const totalWidth = elementWidth * element.current.childElementCount;

    const lp = {
        target: current,
        current: current,
    };

    const forward = () => {
        lp.target += speed;
        if (lp.target > containerWidth) {
            lp.current -= totalWidth;
            lp.target -= totalWidth;
        }
    };

    const backward = () => {
        lp.target -= speed;
        if (lp.target < -totalWidth) {
            lp.current += totalWidth;
            lp.target += totalWidth;
        }
    };

    const jump = () => {
        lp.current = lp.current * (1 - ease) + lp.target * ease;
        x.set(lp.current);
    };

    const startMarquee = () => {
        { direction === 'forward'  ? forward() : backward()}
        jump();
        marqueeId.current = window.requestAnimationFrame(startMarquee);
    };

    const pauseMarquee = () => {
        window.cancelAnimationFrame(marqueeId.current);
    };

    window.requestAnimationFrame(startMarquee);
    return pauseMarquee;
};
