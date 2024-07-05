import Player from '../player';
import Board from '../board';
import Square, { SquareState } from '../square';
import PositionChange from '../positionChange';

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
    public active: boolean = false;

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
        this.active = true;
    }

    public isValidMove(board: Board, nextSquare: Square) {

        let pieceOnBoard = board.getPiece(nextSquare)
        if (pieceOnBoard === undefined)
            return SquareState.EMPTY_SQUARE;

        if ((this.player != pieceOnBoard.player) && (pieceOnBoard.pieceType != PieceType.KING))
            return SquareState.CAPTURABLE_PIECE_PRESENT;

        return SquareState.UNCAPTURABLE_PIECE_PRESENT;
    }

    private getDirectionalMoves(board: Board, directionChanges: Array<PositionChange>)
    {
        let validMoves = new Array(0);
        let currentSquare = board.findPiece(this);

        directionChanges.forEach(directionChange => {
            let nextSquare = currentSquare.moveBy(directionChange.row, directionChange.col);
            let keepTesting = true;
            while (board.isOnBoard(nextSquare) && keepTesting) {
                switch (this.isValidMove(board, nextSquare)) {
                    case SquareState.EMPTY_SQUARE:
                        validMoves.push(nextSquare);
                        break;
                    case SquareState.CAPTURABLE_PIECE_PRESENT:
                        validMoves.push(nextSquare);
                        keepTesting = false;
                        break;
                    case SquareState.UNCAPTURABLE_PIECE_PRESENT:
                        keepTesting = false;
                        break;
                }
                nextSquare = nextSquare.moveBy(directionChange.row, directionChange.col);
            }
        })
        return validMoves;
    }

    public getDiagonalMoves(board: Board): Array<Square>{
        const directionChanges = [
            {row: 1, col: 1}, 
            {row: 1, col: -1}, 
            {row: -1, col: 1}, 
            {row: -1, col: -1}
        ];
        return this.getDirectionalMoves(board, directionChanges);
    }

    public getLateralMoves(board: Board): Array<Square>{
        const directionChanges = [
            {row: 1, col: 0}, 
            {row: -1, col: 0}, 
            {row: 0, col: 1}, 
            {row: 0, col: -1}
        ];
        return this.getDirectionalMoves(board, directionChanges);
    }
}
