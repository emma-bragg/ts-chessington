import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        const currentPosition = board.findPiece(this);
        const oldRow = currentPosition.row;
        const oldCol = currentPosition.col;

        if (this.player == Player.WHITE) {
            this.addAvailableMoveAndContinue(availableMoves, oldRow+1, oldCol, currentPosition, board);
            if (oldRow == 1 && !board.getPiece(new Square(oldRow+1, oldCol))) {
                this.addAvailableMoveAndContinue(availableMoves, oldRow+2, oldCol, currentPosition, board);
            }
            availableMoves = availableMoves.filter(pos => !board.getPiece(pos));
        
            this.pawnCapture(oldRow+1, oldCol-1, availableMoves, board);
            this.pawnCapture(oldRow+1, oldCol+1, availableMoves, board);        
        }
        
        else {
            this.addAvailableMoveAndContinue(availableMoves, oldRow-1, oldCol, currentPosition, board);
            if (oldRow == Piece.boardSize-2 && !board.getPiece(new Square(oldRow-1, oldCol))) {
                this.addAvailableMoveAndContinue(availableMoves, oldRow-2, oldCol, currentPosition, board);
            }
            availableMoves = availableMoves.filter(pos => !board.getPiece(pos));

            this.pawnCapture(oldRow-1, oldCol-1, availableMoves, board);
            this.pawnCapture(oldRow-1, oldCol+1, availableMoves, board);
        }

        return availableMoves;
    }

    public pawnCapture(newRow:number, newCol:number, availableMoves:Array<Square>, board:Board) {
        const diagonalPos = new Square(newRow, newCol);
        if (diagonalPos.inBoundsCheck()){ 
            let diagonalPiece = board.getPiece(diagonalPos);
            if(diagonalPiece && diagonalPiece.player != this.player && !diagonalPiece.isKing){
                availableMoves.push(diagonalPos)
            }
        }  
    }
}
