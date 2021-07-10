import { createRef, useEffect, useState } from "react"
import { DIRECTION } from "../../enums/Direction";
import "./BoardController"
import BoardController from "./BoardController";
import Keyboard from './Keyboard';


interface BoardProps {
    height: number,
    width: number,
    board: number[][]
}

export function Board(props: BoardProps) {
    const [board, setBoard] = useState<any>(Array.from({ length: props.height }, () => Array.from({ length: props.width }, () => 0)));
    const [boardController, ] = useState<any>(new BoardController(board));
    const handleChangeBoard = () => {
        let copy = [...board];
        let snakeBody = boardController.getSnake().getSnakeBody();
        console.log('snake body', snakeBody);
        let iterMeat = snakeBody?.getHead();
        let iterMeat2 = snakeBody?.getAfterTail(); 
        let head = iterMeat ? iterMeat.get_elem().position : { x: 3, y: 3 };
        let afterTail = iterMeat2? iterMeat2.get_elem().position : { x: 3, y: 3 };
        // highlight head
        board[afterTail.y][afterTail.x] = 0;
        board[head.y][head.x] = 1;
        setBoard(copy);
        console.log('ready change', boardController.getSnake().getHead()?.get_elem().position);
    }
    

    useEffect(() => {
        console.log('render', JSON.parse(JSON.stringify(board)))
    });
    
    useEffect(() => {
        boardController.initGame();
        handleChangeBoard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log('rendered & board changed', JSON.parse(JSON.stringify(board)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);

    const execute = () => {
        boardController.getSnake().move(DIRECTION.DOWN);
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