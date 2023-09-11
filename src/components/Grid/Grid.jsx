import { useState , useCallback} from "react";
import Card from "../Card/Card";
import { ToastContainer, toast } from 'react-toastify';
import isWinner from "../../helpers/checkWinner";

import './Grid.css'
import 'react-toastify/dist/ReactToastify.css';

function Grid({numberOfCards}){
     let [turn , setTurn] = useState(true) // false -> 'X' , true -> 'O'
     let [board , setBoard] = useState(Array(numberOfCards).fill("")); 
     let [winner , setWinner] = useState(null);

     const play = useCallback(function playCallback(index){
        console.log('move played!' , index);

        if(turn == true){
            board[index] = "O";
        }
        else{
            board[index] = "X";
        }
        const win = isWinner(board , (turn) ? 'O' : 'X');

        if(win){
            setWinner(win);
            toast.success(`Congratulations, ${win} wins the game`);
        }
        setBoard([...board]);
        setTurn(!turn);
     },[turn])

     function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setTurn(true);
        setWinner(null);
     }
    return (
        <div className="grid-wrapper">

        {winner && (
            <>
        <h1 className="turn-highlight">Winner is : {winner}</h1>
        <button className="reset-btn" onClick={reset}>Reset game</button>
        <ToastContainer position="top-center"/>
        </>
        )}

        <h1 className="turn-highlight">Current turn : {(turn) ? 'O' : 'X'} </h1>
       
       <div className="grid">
       {board.map((value , idx) => {return <Card 
       onPlay={play} gameEnd={winner ? true : false} player={value}  key={idx} index={idx}/> })}
       </div>

       </div>
    );
    
}

export default Grid;