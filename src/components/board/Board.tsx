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
        createAGameInterval();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const createAGameInterval = () => {
        let gameInterval = setInterval((): void => {
            boardController.moveHandler();
            boardController.updateDraw();
            handleChangeBoard();
        }, 1000);
        // return gameInterval;
    }
    // Update
    const handleChangeBoard = () => {
        let copy = [...board];
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
        switch (event.key){
            case 'ArrowDown': 
                boardController.setDirection(DIRECTION.DOWN);
                break;
            case 'ArrowUp':
                boardController.setDirection(DIRECTION.UP);
                break;
            case 'ArrowLeft':
                boardController.setDirection(DIRECTION.LEFT);
                break;
            case 'ArrowRight':
                boardController.setDirection(DIRECTION.RIGHT);
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

    const getInfo = () => {
        let snake = boardController.getSnake();
        let headPosition = snake && snake.getHead().get_elem().position;
        return {
            headPosition,
        }
    }

    return <div onKeyUp={handleKeyPress} tabIndex={0}>
        <div className='board-wrapper'>
            <ul>
                {renderBoard()}
            </ul>
        </div>
        <Keyboard></Keyboard>
        <button onClick={execute}>Execute</button>
        <div>
            {boardController.getDirection()}
            <span>
                x: {getInfo().headPosition?.x}
            </span>
            <span>
                y: {getInfo().headPosition?.y}
            </span>
        </div>
    </div>
}