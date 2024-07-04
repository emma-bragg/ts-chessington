import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

enum RookDirection {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0)

        let currentSquare = board.findPiece(this)
        for (let row = currentSquare.row + 1; row < GameSettings.BOARD_SIZE; row++) {
            let nextSquare = Square.at(row, currentSquare.col)
            let moveDiagnostics = this.isValidMove(board, nextSquare)
            if (moveDiagnostics['isValid'])
                validMoves.push(nextSquare)
            if (moveDiagnostics['break'])
                break
        }
        for (let row = currentSquare.row - 1; row >= 0; row--) {
            let nextSquare = Square.at(row, currentSquare.col)
            let moveDiagnostics = this.isValidMove(board, nextSquare)
            if (moveDiagnostics['isValid'])
                validMoves.push(nextSquare)
            if (moveDiagnostics['break'])
                break
        }
        for (let col = currentSquare.col + 1; col < GameSettings.BOARD_SIZE; col++) {
            let nextSquare = Square.at(currentSquare.row, col)
            let moveDiagnostics = this.isValidMove(board, nextSquare)
            if (moveDiagnostics['isValid'])
                validMoves.push(nextSquare)
            if (moveDiagnostics['break'])
                break
        }
        for (let col = currentSquare.col - 1; col >= 0; col--) {
            let nextSquare = Square.at(currentSquare.row, col)
            let moveDiagnostics = this.isValidMove(board, nextSquare)
            if (moveDiagnostics['isValid'])
                validMoves.push(nextSquare)
            if (moveDiagnostics['break'])
                break
        }

        return validMoves;
    }

    private isValidMove(board: Board, nextSquare: Square) {
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
