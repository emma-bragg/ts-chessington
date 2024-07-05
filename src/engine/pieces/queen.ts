import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        const currentPosition = board.findPiece(this);
        const steps = Piece.straightSteps.concat(Piece.diagonalSteps);

        for (let index = 0; index < steps.length; index++) {
            this.pathCheck(steps[index][0], steps[index][1], availableMoves, currentPosition, board);
        }

        return availableMoves;
    }
}
