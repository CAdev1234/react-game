import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Player } from './types/Game';
import { playerContext } from './contexts/player';

// export default function PlayerStats(ctx, player, canvas) {
//   // Name
//   // ctx.font = "20px Arial";
//   // ctx.fillStyle = "white";
//   // ctx.fillText(`Name: ${player.name}`, 20, 30);

//   // Lives
//   ctx.font = "20px Arial";
//   ctx.fillStyle = "red";
//   let gap = 0;
//   for (let i = 0; i < player.lives; i++) {
//     ctx.fillText("❤️", canvas.width / 2 + gap, 30);
//     gap += 30;
//   }

//   // Score
//   // ctx.font = "20px Arial";
//   // ctx.fillStyle = "white";
//   // ctx.fillText(`Score: ${player.score}`, canvas.width - 140, 30);
// }

const PlayerStats = () => {
  const {player} = useContext(playerContext);
  return(
    <>
      <span style={{position: 'absolute', top: '10px', left: '100px', color: 'red'}}>player: {JSON.stringify(player)}</span>
      <div className='gameBoardHeader' style={{display:'flex', alignItems: 'center'}}>
        <h3>Address: {player.address}</h3>
        <div className='playerLives'>
          {Array(player.lives).fill("❤️").map((live, idx) => {
            return (
              <div key={idx}>{live}</div>
            )
          })}
        </div>
        <h3>Level: {player.level}</h3>
        <h3 className='playerScore'>Score: {player.score}</h3>
      </div>
    </>
  )
}
// PlayerStats.prototype = {
//   player: PropTypes.shape(Player),
// }
export default PlayerStats