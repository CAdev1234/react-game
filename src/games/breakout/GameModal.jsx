import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import MoneyFitnessData from '../lottie/MoneyFitness.json';
import RestartData from '../lottie/Restart.json';
import PlayData from '../lottie/Player.json';
import NewGamingData from '../lottie/NewGaming.json'
import Button from './Button';
import { GameStatus } from './types/Game';
const GameModal = ({
    type,
    onStart,
    onRestart,
}) => {
    const moneyFitnessOption = {
        loop: true,
        autoPlay: true,
        animationData: MoneyFitnessData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const restartOption = {
        loop: true,
        autoPlay: true,
        animationData: RestartData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const playOption = {
        loop: true,
        autoPlay: true,
        animationData: PlayData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const newGamingOption = {
        loop: true,
        autoPlay: true,
        animationData: NewGamingData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const startGame = () => {
        onStart()
    }
    const restartGame = () => {
        onRestart()
    }
    

    return(
        <div className="gameModal">
            {type === GameStatus.Lost &&
            <>
                <div className=''>
                    <h1>Game Over</h1>
                </div>
                <Lottie options={moneyFitnessOption} height={300} width={300} />
                <Button 
                    lottieItem={<Lottie options={restartOption} height={50} width={50} />}
                    onClick={restartGame}
                />
            </>
            }

            {type === GameStatus.Init &&
            <>
                <div className=''>
                    <h1>Start New Game</h1>
                </div>
                <Lottie options={newGamingOption} />
                <Button 
                    lottieItem={<Lottie options={playOption} height={90} width={90} />}
                    onClick={startGame}
                />
            </>
            }

            {type === GameStatus.Win &&
            <>
                <div className=''>
                    <h1>Congratulation!</h1>
                </div>
                <Lottie options={newGamingOption} />
                <Button 
                    lottieItem={<Lottie options={playOption} height={90} width={90} />}
                    onClick={restartGame}
                />
            </>
            }
        </div>
    )
}
GameModal.prototype = {
    type: PropTypes.oneOf(Object.keys(GameStatus)).isRequired,
    onStart: PropTypes.func.isRequired,
    onRestart: PropTypes.func.isRequired
}
export default GameModal