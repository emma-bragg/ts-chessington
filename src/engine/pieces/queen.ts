import Piece, {PieceType} from './piece';
import Player from '../player';
import Board from '../board';
import Bishop from './bishop';
import Rook from './rook';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.QUEEN);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0)
        let currentSquare = board.findPiece(this)

        let fakeBishop = new Bishop(this.player)
        board.setPiece(currentSquare, fakeBishop)
        validMoves = [...validMoves, ...fakeBishop.getAvailableMoves(board)]

        let fakeRook = new Rook(this.player)
        board.setPiece(currentSquare, fakeRook)
        validMoves = [...validMoves, ...fakeRook.getAvailableMoves(board)]

        board.setPiece(currentSquare, this)
        return validMoves
    }
}
