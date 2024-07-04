import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = new Array<Square>();
        // let finalAvailableMoves = [];
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;

        let ones = [-1, 1]
        let twos = [-2, 2]
        for (let index1 = 0; index1 < ones.length; index1++) {
            for (let index2 = 0; index2 < twos.length; index2++) {
                this.addAvailableMove(availableMoves, oldRow+ones[index1], oldCol+twos[index2], currentPosition);
                this.addAvailableMove(availableMoves, oldRow+twos[index2], oldCol+ones[index1], currentPosition);
            }
        }

        return availableMoves;
    }
}
