import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        let currentPosition = board.findPiece(this);
        
        this.quadrantCheck(-1,-1,availableMoves,currentPosition,board);
        this.quadrantCheck(-1,1,availableMoves,currentPosition,board);
        this.quadrantCheck(1,-1,availableMoves,currentPosition,board);
        this.quadrantCheck(1,1,availableMoves,currentPosition,board);
        
        return availableMoves;
    }

    
}
