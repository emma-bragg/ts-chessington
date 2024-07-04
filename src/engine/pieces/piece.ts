import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public isValidMove(board: Board, nextSquare: Square) {
        let pieceOnBoard = board.getPiece(nextSquare)
        if (pieceOnBoard === undefined) {
            return {'isValid': true, 'break': false}
        } else {
            if (this.player != pieceOnBoard.player)
                return {'isValid': true, 'break': true}
            return {'isValid': false, 'break': false};
        }
    }
}
