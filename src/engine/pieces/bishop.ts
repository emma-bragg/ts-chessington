import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        const moveList = this.diagonalMoves(board, currentPosition);
        return moveList;
    }

    public diagonalMoves(board: Board, currentPosition: Square){
        const moveList = [];
        let differenceColumnpPosition = 0;
        for (let column = 0; column < GameSettings.BOARD_SIZE; column++) {
            differenceColumnpPosition = Math.abs(column - currentPosition.col);
            
            if (differenceColumnpPosition > 0) {
                let position1 = Square.at(currentPosition.row + differenceColumnpPosition, column)
                let position2 = Square.at(currentPosition.row - differenceColumnpPosition, column)

                if (this.moveInBounds(position1)){
                    moveList.push(position1);
                }
                if (this.moveInBounds(position2)){
                    moveList.push(position2);
                }
            }
        }
        return moveList
    }
}
