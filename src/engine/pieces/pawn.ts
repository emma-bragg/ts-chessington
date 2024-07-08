import Piece, { PieceType } from './piece';
import Player from '../player';
import Board from '../board';
import Square, { SquareState } from '../square';
import { getPieceByUserInput } from '../helper';
import GameSettings from '../gameSettings';

export enum PawnMove {
    ADVANCE_1,
    ADVANCE_2,
    TAKE_DIAGONALLY,
    EN_PASSANT
}

export default class Pawn extends Piece {
    public lastMove: PawnMove | null = null;

    public constructor(player: Player) {
        super(player, PieceType.PAWN);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0);
        let currentSquare = board.findPiece(this)

        let rowDirection = (this.player == Player.WHITE) ? 1: -1;

        let nextSquareForward1 = currentSquare.moveBy(rowDirection, 0);
        let nextSquareForward2 = currentSquare.moveBy(rowDirection * 2, 0)
        let nextSquareDiags = [currentSquare.moveBy(rowDirection, 1), currentSquare.moveBy(rowDirection, -1)]
        let enPassantSquares = [currentSquare.moveBy(0,1), currentSquare.moveBy(0,-1)]

        if (board.isOnBoard(nextSquareForward1) && this.isValidMove(board, nextSquareForward1) == SquareState.EMPTY_SQUARE)
        {
            validMoves.push(nextSquareForward1)
            let pawnStartingRow = (this.player == Player.WHITE) ? 1: 6

            if (
                currentSquare.row == pawnStartingRow && 
                board.isOnBoard(nextSquareForward2) && 
                this.isValidMove(board, nextSquareForward2) == SquareState.EMPTY_SQUARE
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
                    validMoves.push(enPassantMove.moveBy(rowDirection, 0))
                }
            }
        }
        return validMoves;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        let relativeChangeInPosition = {"rowChange": Math.abs(currentSquare.row - newSquare.row), "colChange": Math.abs(currentSquare.col - newSquare.col)};
        
        if (relativeChangeInPosition.colChange == 0) {
            this.lastMove = relativeChangeInPosition.rowChange == 1 ? PawnMove.ADVANCE_1: PawnMove.ADVANCE_2;
        }
        else {
            if (board.getPiece(newSquare) === undefined) {
                this.lastMove = PawnMove.EN_PASSANT;
                board.setPiece(Square.at(currentSquare.row, newSquare.col), undefined);
            } else {
                this.lastMove = PawnMove.TAKE_DIAGONALLY;
            }
        }
        super.moveTo(board, newSquare);
        if (newSquare.row == 0 || newSquare.row == GameSettings.BOARD_SIZE - 1) {
            let newPiece = getPieceByUserInput(this);
            board.setPiece(newSquare, newPiece);
        }
    }
}
