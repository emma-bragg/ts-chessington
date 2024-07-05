import Square from "./square";
import GameSettings from "./gameSettings";
import Board from "./board";

export function moveInBounds(newMove: Square) {
    if (
        (newMove.col > GameSettings.BOARD_SIZE-1) ||
        (newMove.col < 0)||
        (newMove.row > GameSettings.BOARD_SIZE-1) ||
        (newMove.row < 0)
    ){
        return false;
    } 
    return true;
}

export function getDiagonalMoves(board:Board, currentPosition: Square){
    let moveList = []

    const directions = [
        [1, 1],
        [-1, -1],
        [-1, 1],
        [1, -1]
    ];

    moveList = getMovesFromDirections(board, currentPosition, directions);

    return moveList;
}

export function getLateralMoves(board: Board, currentPosition: Square) {
    let moveList = []

    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    moveList = getMovesFromDirections(board, currentPosition, directions);

    return moveList;
}

export function getMovesFromDirections(board: Board, currentPosition: Square, directions: number[][]) {
    const moveList = [];

    const currentRow = currentPosition.row;
    const currentCol = currentPosition.col;

    for (let i = 0; i < directions.length; i++) {
        let moveDirection = directions[i];
        let candidateMove = currentPosition;

        //Avoids copying array by reference
        let candidateVector = moveDirection.slice();

        do {
                candidateMove = Square.at(currentRow + candidateVector[0], currentCol + candidateVector[1]);
                if (moveInBounds(candidateMove) && !(board.isPieceAtSquare(candidateMove))) {
                    moveList.push(candidateMove);
                    //Going a step further in direction of moveDirection
                    candidateVector[0] += moveDirection[0];
                    candidateVector[1] += moveDirection[1];
                }
            } while(moveInBounds(candidateMove) && !board.isPieceAtSquare(candidateMove));
    }

    return moveList;
}


export function getMovesFromVectors(currentPosition: Square, diffMovelist: number[][]) {
    const moveList = [];

    for (let i = 0; i < diffMovelist.length; i++ ) {
        let newMove = Square.at(
            diffMovelist[i][0] + currentPosition.row,
            diffMovelist[i][1] + currentPosition.col
        );

        moveList.push(newMove);
    }
    return moveList; 
}