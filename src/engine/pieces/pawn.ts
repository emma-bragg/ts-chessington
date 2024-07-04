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
        let nextSquare : Square;
        switch (this.player) {
            case Player.WHITE:
                nextSquare = Square.at(currentSquare.row + 1, currentSquare.col)
                break
            case Player.BLACK:
                nextSquare = Square.at(currentSquare.row - 1, currentSquare.col)
                break
        }
        if (nextSquare.row < GameSettings.BOARD_SIZE && nextSquare.row >= 0 && board.getPiece(nextSquare) === undefined)
            validMoves.push(nextSquare)


        return validMoves;
    }
}
