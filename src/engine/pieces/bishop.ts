import Piece from './piece';
import Player from '../player';
import Board from '../board';
import { diagonalMoves } from '../helper';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        const moveList = diagonalMoves(board, currentPosition);
        return moveList;
    }
}
