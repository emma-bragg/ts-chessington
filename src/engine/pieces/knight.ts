import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves = [];
        let finalAvailableMoves = [];
        let currentPosition = board.findPiece(this);
        let oldRow = currentPosition.row;
        let oldCol = currentPosition.col;

        let ones = [-1, 1]
        let twos = [-2, 2]
        for (let index1 = 0; index1 < ones.length; index1++) {
            for (let index2 = 0; index2 < twos.length; index2++) {
                availableMoves.push(new Square(oldRow+ones[index1], oldCol+twos[index2]));
                availableMoves.push(new Square(oldRow+twos[index2], oldCol+ones[index1]));
            }
        }

        for (let index = 0; index < availableMoves.length; index++) {
            let pos = availableMoves[index]
            if (pos.inBoundsCheck()){
                finalAvailableMoves.push(availableMoves[index]);
            }
        }

        return finalAvailableMoves;
    }
}
