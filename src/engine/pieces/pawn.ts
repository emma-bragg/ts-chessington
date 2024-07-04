import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        let moveList = [];
        if (this.player === Player.WHITE){
            moveList.push(Square.at(currentPosition.row+1, currentPosition.col));
        } else{
            moveList.push(Square.at(currentPosition.row-1, currentPosition.col));
        }
        return moveList;
    }
}
