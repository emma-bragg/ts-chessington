import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = [];
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;
        for (let newRow = 0; newRow < 8; newRow++) {
            for (let newCol = 0; newCol < 8; newCol++) {
               if ((newRow-newCol == oldRow-oldCol || newRow+newCol == oldRow+oldCol) && (newRow != oldRow || newCol != oldCol)) {
                availableMoves.push(new Square(newRow, newCol));
               }
            }
        }
        
        return availableMoves;
    }
}
