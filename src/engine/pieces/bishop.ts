import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;
        
        for (let step = 0; step < Piece.boardSize; step++) {
            let newRow = oldRow - step;
            let newCol = oldCol - step;
            if(this.addAvailableMove(availableMoves, newRow, newCol, currentPosition) && board.getPiece(new Square(newRow, newCol))){
                break;
            }
        }
        for (let step = 0; step < Piece.boardSize; step++) {
            let newRow = oldRow - step;
            let newCol = oldCol + step;
            if(this.addAvailableMove(availableMoves, newRow, newCol, currentPosition) && board.getPiece(new Square(newRow, newCol))){
                break;
            }
        }
        for (let step = 0; step < Piece.boardSize; step++) {
            let newRow = oldRow + step;
            let newCol = oldCol - step;
            if(this.addAvailableMove(availableMoves, newRow, newCol, currentPosition) && board.getPiece(new Square(newRow, newCol))){
                break;
            }
        }
        for (let step = 0; step < Piece.boardSize; step++) {
            let newRow = oldRow + step;
            let newCol = oldCol + step;
            if(this.addAvailableMove(availableMoves, newRow, newCol, currentPosition) && board.getPiece(new Square(newRow, newCol))){
                break;
            }
        }
        
        return availableMoves;
    }
}
