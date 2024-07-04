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
        if (this.player == 0) {
            availableMoves.push(new Square(currentPosition.row+1, currentPosition.col));
        }
        
        else {
            availableMoves.push(new Square(currentPosition.row-1, currentPosition.col));
        }
        return availableMoves;
    }
}
