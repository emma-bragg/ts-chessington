import Piece, {MoveDiagnostic, PieceType} from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.KING);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0);

        let changes = [1, -1, 0];
        let currentSquare = board.findPiece(this);

        for (let rowChange of changes) {
            for (let colChange of changes) {
                if (rowChange == 0 && colChange == 0) {
                    continue;
                }
                let nextSquare = currentSquare.moveBy(rowChange, colChange);
                if (board.isOnBoard(nextSquare) && this.isValidMove(board, nextSquare) != MoveDiagnostic.UNCAPTURABLE_PIECE_PRESENT)
                    validMoves.push(nextSquare);
            }
        }
        if (!this.active)
            validMoves = [...validMoves, ...this.getCastlingMoves(board)]
        
        return validMoves;
    }

    private getCastlingMoves(board: Board) {
        let castlingMoves = new Array(0);
        let currentSquare = board.findPiece(this);

        let rookCols = [0, GameSettings.BOARD_SIZE-1]

        for (let rookCol of rookCols) {

            let pieceOnBoard = board.getPiece(Square.at(currentSquare.row, rookCol));
            if (pieceOnBoard !== undefined && pieceOnBoard.pieceType == PieceType.ROOK && !pieceOnBoard.active) {

                let pieceInBetween = false;
                let col = Math.min(currentSquare.col, rookCol) + 1; 
                while (col < Math.max(currentSquare.col, rookCol) && !pieceInBetween) {
                    
                    if (board.getPiece(Square.at(currentSquare.row, col)) !== undefined)
                        pieceInBetween = true;
                    col++;
                }
                if (pieceInBetween == false) {
                    let colChange = 2 * Math.sign(rookCol - currentSquare.col);
                    castlingMoves.push(Square.at(currentSquare.row, currentSquare.col + colChange));
                }
            }
        }

        return castlingMoves;
    }

    public moveTo(board: Board, newSquare: Square): void {
        let currentSquare = board.findPiece(this);
        let changeInCol = currentSquare.col - newSquare.col

        if (Math.abs(changeInCol) == 2) {
            let rookFromSquare = Square.at(currentSquare.row, (changeInCol < 0) ? GameSettings.BOARD_SIZE - 1 : 0);
            let rookToSquare = currentSquare.moveBy(0, (changeInCol < 0) ? 1 : -1);
            
            let castlingRook = board.getPiece(rookFromSquare)
            if (castlingRook === undefined)
                throw new Error("Castling error - rook does not exist")

            board.setPiece(rookToSquare, castlingRook);
            board.setPiece(rookFromSquare, undefined);
            castlingRook.active = true;
        }
        super.moveTo(board, newSquare);
    }
}
