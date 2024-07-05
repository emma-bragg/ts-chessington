import Piece, { MoveDiagnostic, PieceType } from './piece';
import Player from '../player';
import Board from '../board';

export enum PawnMove {
    ADVANCE_1,
    ADVANCE_2,
    TAKE_DIAGONALLY,
    EN_PASSANT
}

export default class Pawn extends Piece {
    public lastMove : PawnMove | null = null;

    public constructor(player: Player) {
        super(player, PieceType.PAWN);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0);
        let currentSquare = board.findPiece(this)

        let rowDirection = (this.player == Player.WHITE) ? 1 : -1;

        let nextSquareForward1 = currentSquare.moveBy(rowDirection, 0);
        let nextSquareForward2 = currentSquare.moveBy(rowDirection * 2, 0)
        let nextSquareDiags = [currentSquare.moveBy(rowDirection, 1), currentSquare.moveBy(rowDirection, -1)]
        let enPassantSquares = [currentSquare.moveBy(0,1), currentSquare.moveBy(0,-1)]

        if (board.isOnBoard(nextSquareForward1) && this.isValidMove(board, nextSquareForward1) == MoveDiagnostic.EMPTY_SQUARE)
        {
            validMoves.push(nextSquareForward1)
            let pawnStartingRow = (this.player == Player.WHITE) ? 1 : 6

            if (
                currentSquare.row == pawnStartingRow && 
                board.isOnBoard(nextSquareForward2) && 
                this.isValidMove(board, nextSquareForward2) == MoveDiagnostic.EMPTY_SQUARE
            ) {
                validMoves.push(nextSquareForward2)
            }
        }

        for (let diagMove of nextSquareDiags) {
            if (board.isOnBoard(diagMove)) {
                let pieceOnBoard = board.getPiece(diagMove)
                if (pieceOnBoard !== undefined && pieceOnBoard.player != this.player && pieceOnBoard.pieceType != PieceType.KING) 
                    validMoves.push(diagMove)
            }
        } 
        for (let enPassantMove of enPassantSquares) {
            if (board.isOnBoard(enPassantMove)) {
                let pieceOnBoard = board.getPiece(enPassantMove)
                if (
                    pieceOnBoard !== undefined && 
                    pieceOnBoard.pieceType == PieceType.PAWN && 
                    pieceOnBoard.player != this.player &&
                    (pieceOnBoard as Pawn).lastMove == PawnMove.ADVANCE_2 && 
                    board.lastMovedPiece == pieceOnBoard
                ) {
                    console.log(currentSquare)
                    console.log(enPassantMove)
                    validMoves.push(enPassantMove.moveBy(rowDirection, 0))
                }
            }
        } 

        return validMoves;
    }
}
