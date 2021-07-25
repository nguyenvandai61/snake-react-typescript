import { createRef, useEffect, useState } from "react"
import { DIRECTION } from "../../enums/Direction";
import { ITEM_STATE } from "../../enums/ItemState";
import "./BoardController"
import BoardController from "./BoardController";
import Keyboard from './Keyboard';
import AppleModel from '../../models/AppleModel';


interface BoardProps {
    height: number,
    width: number,
    board: number[][]
}

export function Board(props: BoardProps) {
    const [board, setBoard] = useState<any>(Array.from({ length: props.height }, () => Array.from({ length: props.width }, () => 0)));
    const [boardController, ] = useState<any>(new BoardController(board));
    // Init
    useEffect(() => {
        boardController.initGame();
        boardController.drawApple();
        handleChangeBoard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    // Update
    const handleChangeBoard = () => {
        let copy = [...board];
        boardController.drawSnakeMove();
        setBoard(copy);
    }
    

    useEffect(() => {
        // console.log('render', JSON.parse(JSON.stringify(board)))
    });
    

    useEffect(() => {
        // console.log('rendered & board changed', JSON.parse(JSON.stringify(board)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);

    // Button onClick handler
    const execute = () => {
        let nextCell = boardController.getSnake().getNextCell(DIRECTION.DOWN);
        let {x, y} = nextCell.position;
        if (board[y][x] === ITEM_STATE.BLANK) {
            boardController.getSnake().move(DIRECTION.DOWN);
        } else if (board[y][x] === ITEM_STATE.APPLE) {
            let apple = new AppleModel(x, y);
            boardController.getSnake().eat(apple);
        }
        handleChangeBoard();
    }


    const renderBoard = () => {
        let newBoard = Object.assign([], board);
        return newBoard.map((row: number[], index: number) => {
            return <li className='row' key={index}>
                <ul>
                    {
                        row.map((cell: number, innerIndex: number) => {
                            // return <li key={innerIndex}>
                            // {cell}
                            return cell
                            // </li>
                        }
                        )
                    }
                </ul>
            </li>
        })
    }
    return <div>
        <div className='board-wrapper'>
            <ul>
                {renderBoard()}
            </ul>
        </div>
        <Keyboard></Keyboard>
        <button onClick={execute}>Execute</button>
    </div>
}