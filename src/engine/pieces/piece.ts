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
        }
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}
