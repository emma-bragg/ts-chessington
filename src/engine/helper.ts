import Piece from "./pieces/piece";
import Queen from "./pieces/queen";
import Knight from "./pieces/knight";
import Rook from "./pieces/rook";
import Bishop from "./pieces/bishop";
import { getOppositePlayer } from "./player";

export function getPieceByUserInput(pieceToMove: Piece) {
    let promotionPieceInput = window.prompt("You can promote your pawn!\nPlease enter what you would like to promote the pawn to: ", "Queen");
    let promotionPieceArray = (promotionPieceInput ?? "").split(" ");

    let validAnswer = false;
    while (!validAnswer) {
        validAnswer = true;

        let piecePlayer = promotionPieceArray[0] == "Opponent" ? getOppositePlayer(pieceToMove.player) : pieceToMove.player;
        switch (promotionPieceArray[promotionPieceArray.length - 1]) {
            case "Queen":
                return new Queen(piecePlayer);

            case "Knight":
                return new Knight(piecePlayer);

            case "Rook":
                return new Rook(piecePlayer);

            case "Bishop":
                return new Bishop(piecePlayer);

            default:
                validAnswer = false;
        }
        promotionPieceInput = window.prompt("That was not a valid piece.\nPlease enter what you would like to promote the pawn to: ", "Queen");
        promotionPieceArray = (promotionPieceInput ?? "").split(" ");
    }
}
