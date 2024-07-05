import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import King from './king';

export default class Piece {
    public player: Player;
    public static boardSize: number = GameSettings.BOARD_SIZE;
    public isKing: Boolean = false;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public addAvailableMoveAndContinue(availableMoves: Array<Square>, newRow : number, newCol : number, currentPosition : Square, board : Board){
        let newPos = new Square(newRow, newCol);
        let newPosInBound = newPos.inBoundsCheck();
        if(!currentPosition.equals(newPos) && newPosInBound){
            let pieceAtNewPos = board.getPiece(newPos);
            if(pieceAtNewPos == undefined || (pieceAtNewPos.player != this.player && !pieceAtNewPos.isKing)){
                availableMoves.push(newPos);
            }
            return pieceAtNewPos == undefined;
        }
        return newPosInBound;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public pathCheck(rowStep : number, colStep : number, availableMoves : Array<Square>, currentPosition : Square, board : Board){
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;
        for (let step = 0; step < Piece.boardSize; step++) {
            let newRow = oldRow + step * rowStep;
            let newCol = oldCol + step * colStep;

            if(!this.addAvailableMoveAndContinue(availableMoves, newRow, newCol, currentPosition, board)){
                break;
            }
        }

    }
}
