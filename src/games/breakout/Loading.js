import React from 'react';
import Lottie from 'react-lottie';
import LoadingTurtleData from '../lottie/LoadingTurtle.json';
const Loading = () => {
    const loadingOption = {
        loop: true,
        autoPlay: true,
        animationData: LoadingTurtleData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    return(
        <>
            <Lottie options={loadingOption} width={600} />
        </>
    )
}
export default Loading;