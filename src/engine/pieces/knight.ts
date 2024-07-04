import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import { getMovesFromVectors } from '../helper';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        const diffMovelist = [
            [2,1],
            [2,-1],
            [1,2],
            [1,-2],
            [-2,1],
            [-2,-1],
            [-1,2],
            [-1,-2]
        ];
        const moveList = getMovesFromVectors(currentPosition, diffMovelist);

        return moveList; 
    }


}
