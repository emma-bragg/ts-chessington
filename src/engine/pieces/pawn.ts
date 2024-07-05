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
        
        this.pawnForward(oldRow, oldCol, currentPosition, availableMoves, board);
        availableMoves = availableMoves.filter(pos => !board.getPiece(pos));


        if (this.player == Player.WHITE) {        
            this.pawnCapture(oldRow+1, oldCol-1, availableMoves, board);
            this.pawnCapture(oldRow+1, oldCol+1, availableMoves, board);        
        }
        else {
            this.pawnCapture(oldRow-1, oldCol-1, availableMoves, board);
            this.pawnCapture(oldRow-1, oldCol+1, availableMoves, board);
        }

        return availableMoves;
    }

    public pawnForward(oldRow: number, oldCol: number, currentPosition: Square, availableMoves: Array<Square>, board: Board) {
        const step = this.player == Player.WHITE ? 1 : -1;
        const startingRow = this.player == Player.WHITE ? 1 : Piece.boardSize-2;
        this.addAvailableMoveAndCheckContinue(availableMoves, oldRow+1*step, oldCol, currentPosition, board);
        if (oldRow == startingRow && !board.getPiece(new Square(oldRow+1*step, oldCol))) {
            this.addAvailableMoveAndCheckContinue(availableMoves, oldRow+2*step, oldCol, currentPosition, board);
        }
    }

    public pawnCapture(newRow: number, newCol: number, availableMoves: Array<Square>, board: Board) {
        const diagonalPos = new Square(newRow, newCol);
        if (diagonalPos.inBoundsCheck()){ 
            let diagonalPiece = board.getPiece(diagonalPos);
            if(diagonalPiece && diagonalPiece.player != this.player && !diagonalPiece.isKing){
                availableMoves.push(diagonalPos)
            }
        }  
    }
}
