import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;
        for (let newRow = oldRow-1; newRow >= 0; newRow--) {
            this.addAvailableMove(availableMoves, newRow, oldCol, currentPosition);
            if(board.getPiece(new Square(newRow, oldCol))) {
                break;
            }
        }
        for (let newRow = oldRow+1; newRow < Piece.boardSize; newRow++) {
            this.addAvailableMove(availableMoves, newRow, oldCol, currentPosition);
            if(board.getPiece(new Square(newRow, oldCol))) {
                break;
            }
        }
        for (let newCol = oldCol-1; newCol >= 0; newCol--) {
            this.addAvailableMove(availableMoves, oldRow, newCol, currentPosition);
            if(board.getPiece(new Square(oldRow, newCol))) {
                break;
            }
        }
        for (let newCol = oldCol+1; newCol < Piece.boardSize; newCol++) {
            this.addAvailableMove(availableMoves, oldRow, newCol, currentPosition);
            if(board.getPiece(new Square(oldRow, newCol))) {
                break;
            }
        }
        
        return availableMoves;
    }
}
