import { useState, useEffect } from 'react';

export const useSetTime = () => {
    const [currTime, setCtime] = useState(() => {
        let date = new Date();
        let hrs = date.getHours()
        let mins = date.getMinutes()
        return {
            hours: hrs < 10 && hrs >= 0 ? "0" + hrs : hrs,
            minutes: mins < 10 && mins >= 0 ? "0" + mins : mins
        }
    })
    useEffect(() => {
        let d = new Date()
        let i = setInterval(
            () => {
                let hrs = d.getHours()
                let mins = d.getMinutes()
                setCtime({
                    hours: hrs < 10 && hrs >= 0 ? "0" + hrs : hrs,
                    minutes: mins < 10 && mins >= 0 ? "0" + mins : mins
                })
            }, 1000
        )
        return () => {
            clearInterval(i)
        }
    }, [currTime])
    return currTime;
}

