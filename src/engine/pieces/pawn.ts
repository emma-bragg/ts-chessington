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
        let finalAvailableMoves = [];
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;

        if (this.player == 0) {
            this.addAvailableMoveAndContinue(availableMoves, oldRow+1, oldCol, currentPosition, board);
            if (oldRow == 1 && !board.getPiece(new Square(oldRow+1, oldCol))) {
                this.addAvailableMoveAndContinue(availableMoves, oldRow+2, oldCol, currentPosition, board);
            }
        }
        
        else {
            this.addAvailableMoveAndContinue(availableMoves, oldRow-1, oldCol, currentPosition, board);
            if (oldRow == Piece.boardSize-2 && !board.getPiece(new Square(oldRow-1, oldCol))) {
                this.addAvailableMoveAndContinue(availableMoves, oldRow-2, oldCol, currentPosition, board);
            }
        }

        for (let index = 0; index < availableMoves.length; index++) {
            let availablePos = availableMoves[index];
            if(!board.getPiece(availablePos)) {
                finalAvailableMoves.push(availablePos);
            }
            
        }

        return finalAvailableMoves;
    }
}
