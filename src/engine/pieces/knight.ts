import Piece, {MoveDiagnostic, PieceType} from './piece';
import Player from '../player';
import Board from '../board';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.KNIGHT);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0);
        let currentSquare = board.findPiece(this);

        let directions = [
            {"rowChange": 1, "colChange": 2},
            {"rowChange": 2, "colChange": 1},
            {"rowChange": -1, "colChange": 2},
            {"rowChange": 2, "colChange": -1},
            {"rowChange": 1, "colChange": -2},
            {"rowChange": -2, "colChange": 1},
            {"rowChange": -1, "colChange": -2},
            {"rowChange": -2, "colChange": -1},
        ];

        for (let direction of directions){
            let nextSquare = currentSquare.moveBy(direction.rowChange, direction.colChange);
            if (board.isOnBoard(nextSquare) && this.isValidMove(board, nextSquare) != MoveDiagnostic.UNCAPTURABLE_PIECE_PRESENT)
                validMoves.push(nextSquare);
        }
        return validMoves;
    }
}
