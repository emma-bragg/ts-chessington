import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0)

        let changes = [1, -1, 0]
        let currentSquare = board.findPiece(this)

        for (let rowChange of changes) {
            for (let colChange of changes) {
                if (rowChange == 0 && colChange == 0) {
                    continue;
                }
                let nextSquare = currentSquare.moveBy(rowChange, colChange)
                if (board.isOnBoard(nextSquare) && this.isValidMove(board, nextSquare)['isValid'])
                    validMoves.push(nextSquare)
            }
        }

        return validMoves
    }
}
