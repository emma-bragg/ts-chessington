import Player from '../player';
import Board from '../board';
import Square from '../square';

export enum PieceType {
    KING,
    QUEEN,
    ROOK,
    BISHOP,
    KNIGHT,
    PAWN
}

export default class Piece {
    public player: Player;
    public pieceType: PieceType;

    public constructor(player: Player, pieceType: PieceType) {
        this.player = player;
        this.pieceType = pieceType;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public isValidMove(board: Board, nextSquare: Square) {

        let pieceOnBoard = board.getPiece(nextSquare)
        if (pieceOnBoard === undefined) {
            return {'isValid': true, 'break': false}
        } else {
            return {'isValid': (this.player != pieceOnBoard.player) && (pieceOnBoard.pieceType != PieceType.KING), 'break': true};
        }
    }
}
