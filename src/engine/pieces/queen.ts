import Piece from './piece';
import Player from '../player';
import Board from '../board';
import { getDiagonalMoves, getLateralMoves } from '../helper';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        const lateralMoves = getLateralMoves(currentPosition);
        const diagonalMoves = getDiagonalMoves(currentPosition);
        return lateralMoves.concat(diagonalMoves);
    }
}
