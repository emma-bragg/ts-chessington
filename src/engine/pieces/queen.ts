import Piece, {PieceType} from './piece';
import Player from '../player';
import Board from '../board';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.QUEEN);
    }

    public getAvailableMoves(board: Board) {
        return [...this.getDiagonalMoves(board), ...this.getLateralMoves(board)]
    }
}
