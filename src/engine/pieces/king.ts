import Piece from './piece';
import Player from '../player';
import Board from '../board';
import { getMovesFromVectors } from '../helper';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        const diffMovelist = [
            [0,1],
            [0,-1],
            [1,1],
            [1,-1],
            [-1,1],
            [-1,-1],
            [-1,0],
            [1,0]
        ];
        const moveList = getMovesFromVectors(currentPosition, diffMovelist);
        return moveList; 
    }
}
