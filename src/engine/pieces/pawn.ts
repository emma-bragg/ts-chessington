import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = [];
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;
        if (this.player == 0) {
            availableMoves.push(new Square(oldRow+1, oldCol));
            if (oldRow == 1) {
                availableMoves.push(new Square(oldRow+2, oldCol));
            }
        }
        
        else {
            availableMoves.push(new Square(oldRow-1, oldCol));
            if (oldRow == 6) {
                availableMoves.push(new Square(oldRow-2, oldCol));
            }
        }
        return availableMoves;
    }
}
