import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;

        let shortSteps = [-1, 1]
        let longSteps = [-2, 2]
        for (let index1 = 0; index1 < shortSteps.length; index1++) {
            for (let index2 = 0; index2 < longSteps.length; index2++) {
                this.addAvailableMoveAndContinue(availableMoves, oldRow+shortSteps[index1], oldCol+longSteps[index2], currentPosition, board);
                this.addAvailableMoveAndContinue(availableMoves, oldRow+longSteps[index2], oldCol+shortSteps[index1], currentPosition, board);
            }
        }

        return availableMoves;
    }
}
