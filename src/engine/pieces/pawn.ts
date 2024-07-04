import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';


export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0);
        let currentSquare = board.findPiece(this)
        let nextSquare1 : Square;
        let nextSquare2 : Square | null = null
        switch (this.player) {
            case Player.WHITE:
                nextSquare1 = currentSquare.moveBy(1, 0)
                if (currentSquare.row == 1)
                    nextSquare2 = currentSquare.moveBy(2, 0)
                break
            case Player.BLACK:
                nextSquare1 = currentSquare.moveBy(-1, 0)
                if (currentSquare.row == 6)
                    nextSquare2 = currentSquare.moveBy(-2, 0)
                break
        }
        if (board.isOnBoard(nextSquare1) && board.getPiece(nextSquare1) === undefined)
        {
            validMoves.push(nextSquare1)
            if (nextSquare2 != null && board.isOnBoard(nextSquare2) && board.getPiece(nextSquare2) === undefined) {
                validMoves.push(nextSquare2)
            }
        }
        return validMoves;
    }
}
