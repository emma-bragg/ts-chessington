import Piece from './piece';
import Player from '../player';
import Board from '../board';
import { getDiagonalMoves } from '../helper';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        const moveList = getDiagonalMoves(currentPosition);
        return moveList;
    }
}
