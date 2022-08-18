import React, { useEffect, useRef } from "react";
import { BallMovement } from "./BallMovement";
import data from "../../data";
import WallCollision from "./util/WallCollision";
import Paddle from "./Paddle";
import Brick from "./Brick";
import BrickCollision from "./util/BrickCollision";
import PaddleHit from "./util/PaddleHit";
import PlayerStats from "./PlayerStats";
import AllBroken from "./util/AllBroke";
import ResetBall from "./util/ResetBall";
import { useState } from "react";
import GameModal from "./GameModal";
import PaddleMovement from "./Paddle";
import Loading from "./Loading";
import useCanvas from "./hooks/useCanvas";
import { GameStatus } from "./types/Game";

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
let bricks = [];
export default function Board() {
  const canvasRef = useRef(null);
  const [activeLoading, setActiveLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [player, setPlayer] = useState(null);
  
  const startGame = () => {
    setStatus(prev => GameStatus.Start);
  }
  const restartGame = () => {
    setStatus(prev => GameStatus.Init);
    let canvas = canvasRef.current;
    setPlayer({...player, lives: 3, level: 1, score: 0})
    // data.player.lives = 3;
    // data.player.level = 1;
    // data.player.score = 0;
    ResetBall(data.ballObj, canvas, data.paddleProps);
    bricks.length = 0;
  }
  
  

  useEffect(() => {
    // Handle Ball Movement
    let animationFrameId;
    if (status === GameStatus.Start) {
      const renderCanvas = () => {
        console.log("ffff=", player)
        let canvas = canvasRef.current;
        let ctx = canvas.getContext("2d");
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        console.log("ctx=", ctx)
        data.paddleProps.y = canvas.height - 30;
        // Assign Bricks
        let newBrickSet = Brick(player.level, bricks, canvas, data.brickObj);
        if (newBrickSet && newBrickSet.length > 0) {
          bricks = newBrickSet;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Display Bricks
        bricks.map((brick) => {
          return brick.draw(ctx);
        });

        // Assign Paddle
        PaddleMovement(ctx, ctx, data.paddleProps);
        // Ball movement
        BallMovement(ctx, data.ballObj);
        // Check all broken
        AllBroken(bricks, player, canvas, data.ballObj);

        if (player.lives === 0) {
          setStatus(prev => GameStatus.Lost)
          return
          
        }
        // Ball and Wall Collision
        WallCollision(data.ballObj, canvas, player, data.paddleProps);

        // Brick Collision
        let brickCollision;
        for (let i = 0; i < bricks.length; i++) {
          brickCollision = BrickCollision(data.ballObj, bricks[i]);
          if (brickCollision.hit && !bricks[i].broke) {
            if (brickCollision.axis === "X") {
              data.ballObj.dx *= -1;
              bricks[i].broke = true;
            } else if (brickCollision.axis === "Y") {
              data.ballObj.dy *= -1;
              bricks[i].broke = true;
            }
            setPlayer(prev => ({
              ...prev,
              score: prev.score + 10
            }));
          }
        }
        Paddle(ctx, canvas, data.paddleProps);

        // Paddle + Ball Collision
        PaddleHit(data.ballObj, data.paddleProps);
        animationFrameId = requestAnimationFrame(renderCanvas);
      };
      renderCanvas();
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
    }
  }, [status])

  useEffect(() => {
    setTimeout(() => {
      setStatus(prev => GameStatus.Init);
      setPlayer(data.player);
      setActiveLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      <span style={{position: 'absolute', top: '100px', left: '100px', color: 'red'}}>status: {String(status)}</span>
      {activeLoading &&
        <Loading />
      }
      {!activeLoading &&
        <div className="board">
          <h1 className="gameHeader">2D Breakout Game</h1>
          <div className="gameBoard">
            <PlayerStats player={player} />
            <canvas
              id="canvas"
              ref={canvasRef}
              onMouseMove={(event) => (data.paddleProps.x = event.clientX - (window.innerWidth < 900 ? 10 : (window.innerWidth * 20) / 200) - data.paddleProps.width / 2 - 10)}
              height={window.innerHeight - 300}
              width={
                window.innerWidth < 900
                  ? window.innerWidth - 20
                  : window.innerWidth - (window.innerWidth * 20) / 100
              }
            />
          </div>
          
        </div>
      }
      

      {(status === GameStatus.Init || status === GameStatus.Stop || status === GameStatus.Lost || status === GameStatus.Win || status === GameStatus.Complete) &&  
      <GameModal 
        onRestart={restartGame}
        onStart={startGame} 
        type={status} 
      />
      }
    </>
  );
}
