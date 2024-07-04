import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;

        if (this.player == 0) {
            this.addAvailableMove(availableMoves, oldRow+1, oldCol, currentPosition);
            if (oldRow == 1) {
                this.addAvailableMove(availableMoves, oldRow+2, oldCol, currentPosition);
            }
        }
        
        else {
            this.addAvailableMove(availableMoves, oldRow-1, oldCol, currentPosition);
            if (oldRow == 6) {
                this.addAvailableMove(availableMoves, oldRow-2, oldCol, currentPosition);
            }
        }
        return availableMoves;
    }
}
