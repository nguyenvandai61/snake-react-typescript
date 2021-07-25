import { createRef, useEffect, useState } from "react"
import { DIRECTION } from "../../enums/Direction";
import { ITEM_STATE } from '../../enums/ItemState';

import Keyboard from './Keyboard';
import AppleModel from '../../models/AppleModel';
import BoardController from '../../models/BoardModel';
import BoardModel from '../../models/BoardModel';
import SnakeModel from '../../models/SnakeModel';
import { KeyboardEventHandler } from "react";


interface BoardProps {
    height: number,
    width: number,
    board: number[][]
}

export function Board(props: BoardProps) {
    const [board, setBoard] = useState<any>(Array.from({ length: props.height }, () => Array.from({ length: props.width }, () => 0)));
    const [boardController, ] = useState<any>(new BoardModel(board, props.width, props.height));
    // Init
    useEffect(() => {
        boardController.initGame();
        boardController.addSnake(new SnakeModel(3, 3));
        boardController.addApple(new AppleModel(3, 5))
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
        boardController.moveHandler(DIRECTION.DOWN);
        handleChangeBoard();
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log('press key');
        switch (event.key){
            case 'ArrowDown': 
                boardController.moveHandler(DIRECTION.DOWN);
                break;
            case 'ArrowUp':
                boardController.moveHandler(DIRECTION.UP);
                break;
            case 'ArrowLeft':
                boardController.moveHandler(DIRECTION.LEFT);
                break;
            case 'ArrowRight':
                boardController.moveHandler(DIRECTION.RIGHT);
                break;
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
    return <div onKeyUp={handleKeyPress} tabIndex={0}>
        <div className='board-wrapper'>
            <ul>
                {renderBoard()}
            </ul>
        </div>
        <Keyboard></Keyboard>
        <button onClick={execute}>Execute</button>
    </div>
}