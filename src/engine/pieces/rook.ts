import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = [];
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;
        for (let index = 0; index < 8; index++) {
            if (index != oldCol){
                availableMoves.push(new Square(oldRow, index));
            }
            if (index != oldRow){
                availableMoves.push(new Square(index, oldCol));
            }
        }
        
        return availableMoves;
    }
}
