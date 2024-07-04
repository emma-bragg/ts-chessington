import Piece from './piece';
import Player from '../player';
import Board from '../board';
import { getLateralMoves } from '../helper';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        
        const moveList = getLateralMoves(currentPosition);

        return moveList;
    }
}
