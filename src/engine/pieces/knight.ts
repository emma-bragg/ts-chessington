import Piece, { PieceType} from './piece';
import Player from '../player';
import Board from '../board';
import { SquareState } from '../square';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.KNIGHT);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0);
        let currentSquare = board.findPiece(this);

        let directionChanges = [
            {row: 1, col: 2},
            {row: 2, col: 1},
            {row: -1, col: 2},
            {row: 2, col: -1},
            {row: 1, col: -2},
            {row: -2, col: 1},
            {row: -1, col: -2},
            {row: -2, col: -1},
        ];

        directionChanges.forEach(directionChange => {
            let nextSquare = currentSquare.moveBy(directionChange.row, directionChange.col);
            if (board.isOnBoard(nextSquare) && this.isValidMove(board, nextSquare) != SquareState.UNCAPTURABLE_PIECE_PRESENT)
                validMoves.push(nextSquare);
        });
        return validMoves;
    }
}
