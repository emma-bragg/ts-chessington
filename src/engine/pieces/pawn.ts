import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';


export default class Pawn extends Piece {
    public movedTwoInitially : boolean = false

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0);
        let currentSquare = board.findPiece(this)

        let nextSquare1 : Square;
        let nextSquare2 : Square | null = null
        let nextSquareDiags : Array<Square>

        switch (this.player) {
            case Player.WHITE:
                nextSquare1 = currentSquare.moveBy(1, 0)
                if (currentSquare.row == 1)
                    nextSquare2 = currentSquare.moveBy(2, 0)
                nextSquareDiags = [currentSquare.moveBy(1, -1), currentSquare.moveBy(1, 1)]
                break
            case Player.BLACK:
                nextSquare1 = currentSquare.moveBy(-1, 0)
                if (currentSquare.row == 6)
                    nextSquare2 = currentSquare.moveBy(-2, 0)
                nextSquareDiags = [currentSquare.moveBy(-1, 1), currentSquare.moveBy(-1, -1)]
                break
        }
        if (board.isOnBoard(nextSquare1) && board.getPiece(nextSquare1) === undefined)
        {
            validMoves.push(nextSquare1)
            if (nextSquare2 != null && board.isOnBoard(nextSquare2) && board.getPiece(nextSquare2) === undefined) {
                validMoves.push(nextSquare2)
            }
        }

        for (let diagMove of nextSquareDiags) {
            if (board.isOnBoard(diagMove)) {
                let pieceOnBoard = board.getPiece(diagMove)
                if (pieceOnBoard !== undefined && pieceOnBoard.player != this.player && !pieceOnBoard.isKing) 
                    validMoves.push(diagMove)
            }
        } 
        return validMoves;
    }
}
