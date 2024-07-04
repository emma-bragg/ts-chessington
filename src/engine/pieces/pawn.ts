import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        let moveList = [];
        if (this.player === Player.WHITE){
            const candidateMove1 = Square.at(currentPosition.row+1, currentPosition.col);
            if (this.isMoveValid(board, candidateMove1)){

                moveList.push(Square.at(currentPosition.row+1, currentPosition.col));
                
                if (currentPosition.row === 1) {
                    const candidateMove2 = Square.at(currentPosition.row+2, currentPosition.col);

                    if (this.isMoveValid(board, candidateMove2)){
                        moveList.push(Square.at(currentPosition.row+2, currentPosition.col));
                        
                    }
                }
            }
            
        } else{
            const candidateMove3 = Square.at(currentPosition.row-1, currentPosition.col);
            if (this.isMoveValid(board, candidateMove3)){

                moveList.push(Square.at(currentPosition.row-1, currentPosition.col));
                
                if (currentPosition.row === 6) {
                    const candidateMove4 = Square.at(currentPosition.row-2, currentPosition.col);

                    if (this.isMoveValid(board, candidateMove4)){
                        moveList.push(Square.at(currentPosition.row-2, currentPosition.col));
                        
                    }
                }
            }
        }
        return moveList;
    }

    private isMoveValid(board: Board, newMove: Square){
        let pieceAtMove : Piece | undefined;
        pieceAtMove = board.getPiece(newMove);
        if (pieceAtMove === undefined){
            return true;
        } 
        return false;

    }


}
