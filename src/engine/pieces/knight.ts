import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        const moveList = [];
        let currentPosition = board.findPiece(this);
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

        for (let i = 0; i < diffMovelist.length; i++ ) {
            let newMove = Square.at(
                diffMovelist[i][0] + currentPosition.row,
                diffMovelist[i][1] + currentPosition.col
            );
            
            moveList.push(newMove);
        }
        return moveList; 

    }


}
