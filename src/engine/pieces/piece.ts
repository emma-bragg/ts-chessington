import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;
    public isKing: boolean = false

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
            return {'isValid': (this.player != pieceOnBoard.player) && !(pieceOnBoard.isKing), 'break': true};
        }
    }
}
