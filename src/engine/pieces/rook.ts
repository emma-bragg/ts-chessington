import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        
        const moveList = this.lateralMoves(currentPosition);

        return moveList;
    }

    public lateralMoves(currentPosition: Square){
        const moveList = [];
        for (let i = 0; i < GameSettings.BOARD_SIZE; i++){

            if (i!=currentPosition.col){
                moveList.push(Square.at(currentPosition.row, i));
            }
            
            if (i!=currentPosition.row){
                moveList.push(Square.at(i, currentPosition.col));
            }
        }
        
        return moveList;
        
    }
}
