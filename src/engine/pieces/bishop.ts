import Piece, { PieceType } from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.BISHOP);
    }

    public getAvailableMoves(board: Board) {
        let validMoves = new Array(0)
        let currentSquare = board.findPiece(this)
        let row = currentSquare.row
        let col = currentSquare.col
        
        for (let i = 1; (row + i < GameSettings.BOARD_SIZE && col + i < GameSettings.BOARD_SIZE); i++) {
            let nextSquare = Square.at(row + i, col + i)
            let moveDiagnostics = this.isValidMove(board, nextSquare)
            if (moveDiagnostics['isValid'])
                validMoves.push(nextSquare)
            if (moveDiagnostics['break'])
                break
        }

        for (let i = 1; (row + i < GameSettings.BOARD_SIZE && col - i >= 0); i++) {
            let nextSquare = Square.at(row + i, col - i)
            let moveDiagnostics = this.isValidMove(board, nextSquare)
            if (moveDiagnostics['isValid'])
                validMoves.push(nextSquare)
            if (moveDiagnostics['break'])
                break
        }

        for (let i = 1; (row - i >= 0 && col + i < GameSettings.BOARD_SIZE); i++) {
            let nextSquare = Square.at(row - i, col + i)
            let moveDiagnostics = this.isValidMove(board, nextSquare)
            if (moveDiagnostics['isValid'])
                validMoves.push(nextSquare)
            if (moveDiagnostics['break'])
                break
        }

        for (let i = 1; (row - i >= 0 && col - i >= 0); i++) {
            let nextSquare = Square.at(row - i, col - i)
            let moveDiagnostics = this.isValidMove(board, nextSquare)
            if (moveDiagnostics['isValid'])
                validMoves.push(nextSquare)
            if (moveDiagnostics['break'])
                break
        }

        return validMoves
    }
}
