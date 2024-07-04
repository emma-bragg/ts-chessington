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
        for (let index = 0; index < 8; index++) {
            if (index != currentPosition.col){
                availableMoves.push(new Square(currentPosition.row, index));
            }
            if (index != currentPosition.row){
                availableMoves.push(new Square(index, currentPosition.col));
            }
        }
        
        return availableMoves;
    }
}
