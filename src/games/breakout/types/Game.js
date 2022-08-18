import PropTypes from 'prop-types'

export const GameStatus = {
    Init: 'Init',
    Start: 'Start',
    Continue: 'Continue',
    Stop: 'Stop',
    Lost: 'Lost',
    Win: 'Win',
    Complete: 'Complete'
}
export const Player = {
    address: PropTypes.string,
    lives: PropTypes.number,
    score: PropTypes.score,
    level: PropTypes.number
}