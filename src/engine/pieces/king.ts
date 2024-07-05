import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
        this.isKing = true;
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;

        for (let index1 = -1; index1 < 2; index1++){
            for (let index2 = -1; index2 < 2; index2++){
                this.addAvailableMoveAndContinue(availableMoves, oldRow+index1, oldCol+index2, currentPosition, board);
            }
        }

        return availableMoves;
    }
}
