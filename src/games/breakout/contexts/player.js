import React, { createContext, useEffect, useState } from "react";
import data from "../../../data";
export const playerContext = createContext();
const PlayerProvider = ({children}) => {
    const [player, setPlayer] = useState(data.player);
    console.log("fffffffffffffffffffff")
    const updatePlayer = (player) => {
        console.log("player=", player);
        setPlayer(player);
    };
    const updatePlayerByKey = (key, val) => {
        console.log("key=", val)
        setPlayer((prev) => ({...prev, [key]: val}));
    }
    useEffect(() => {
        setPlayer(data.player);
    }, [])

    return(
        <playerContext.Provider value={{
            player,
            updatePlayer,
            updatePlayerByKey
        }}>
            {children}
        </playerContext.Provider>
    )
}
export default PlayerProvider;