import Player from '../player';
import Board from '../board';
import Square from '../square';
import Direction from '../directions';

export enum PieceType {
    KING,
    QUEEN,
    ROOK,
    BISHOP,
    KNIGHT,
    PAWN
}

export enum MoveDiagnostic {
    EMPTY_SQUARE,
    CAPTURABLE_PIECE_PRESENT,
    UNCAPTURABLE_PIECE_PRESENT
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
            return MoveDiagnostic.EMPTY_SQUARE;

        if ((this.player != pieceOnBoard.player) && (pieceOnBoard.pieceType != PieceType.KING))
            return MoveDiagnostic.CAPTURABLE_PIECE_PRESENT;

        return MoveDiagnostic.UNCAPTURABLE_PIECE_PRESENT;
    }

    private getDirectionalMoves(board : Board, directions : Array<Direction>)
    {
        let validMoves = new Array(0);
        let currentSquare = board.findPiece(this);

        for (let direction of directions) {
            let nextSquare = currentSquare.moveBy(direction.rowChange, direction.colChange);
            let keepTesting = true;
            while (board.isOnBoard(nextSquare) && keepTesting) {
                switch (this.isValidMove(board, nextSquare)) {
                    case MoveDiagnostic.EMPTY_SQUARE:
                        validMoves.push(nextSquare);
                        break;
                    case MoveDiagnostic.CAPTURABLE_PIECE_PRESENT:
                        validMoves.push(nextSquare);
                        keepTesting = false;
                        break;
                    case MoveDiagnostic.UNCAPTURABLE_PIECE_PRESENT:
                        keepTesting = false;
                        break;
                }
                nextSquare = nextSquare.moveBy(direction.rowChange, direction.colChange);
            }
        }
        return validMoves;
    }

    public getDiagonalMoves(board: Board) : Array<Square>{

        let directions = [{"rowChange": 1,"colChange": 1}, 
            {"rowChange": 1,"colChange": -1}, 
            {"rowChange": -1,"colChange": 1}, 
            {"rowChange": -1,"colChange": -1}];
        return this.getDirectionalMoves(board, directions);
    }

    public getLateralMoves(board: Board) : Array<Square>{

        let directions = [{"rowChange": 1,"colChange": 0}, 
            {"rowChange": -1,"colChange": 0}, 
            {"rowChange": 0,"colChange": 1}, 
            {"rowChange": 0,"colChange": -1}];
        return this.getDirectionalMoves(board, directions);
    }
}
