import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Piece {
    public player: Player;
    public static boardSize: number = GameSettings.BOARD_SIZE;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public addAvailableMove(availableMoves: Array<Square>, newRow : number, newCol : number, currentPosition : Square){
        let newPos = new Square(newRow, newCol);
        if(!currentPosition.equals(newPos) && newPos.inBoundsCheck()){
            availableMoves.push(newPos);
            return true;
        }
        return false;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public quadrantCheck(rowStep : number, colStep : number, availableMoves : Array<Square>, currentPosition : Square, board : Board){
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;
        for (let step = 0; step < Piece.boardSize; step++) {
            let newRow = oldRow + step * rowStep;
            let newCol = oldCol + step * colStep;
            if(this.addAvailableMove(availableMoves, newRow, newCol, currentPosition) && board.getPiece(new Square(newRow, newCol))){
                break;
            }
        }

    }
}
