import React from 'react';
import PropTypes from 'prop-types';
const Button = ({
    lottieItem,
    onClick
}) => {
    return(
        <>
            <button className='lottieBtn' onClick={() => {onClick()}}>
                {lottieItem}
            </button>
        </>
    )
}

Button.prototype = {
    lottieItem: PropTypes.element,
    onClick: PropTypes.func.isRequired
}
export default Button;