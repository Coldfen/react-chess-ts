import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
    setPlayerWin: Dispatch<SetStateAction<string>>
}

const TimerComponent: FC<TimerProps> = ({currentPlayer, restart, setPlayerWin}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>> (null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    useEffect(() => {
        if(blackTime === 0) {
            setPlayerWin('Белые победили')
            setTimeout(handleRestart, 5000)
        }

        if(whiteTime === 0) {
            setPlayerWin('Черные победили')
            setTimeout(handleRestart, 5000)
        }
    }, [blackTime, whiteTime])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setPlayerWin('')
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart} >Restart game</button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default TimerComponent;