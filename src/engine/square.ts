import Direction from "./directions";

export default class Square {
    public row: number;
    public col: number;

    public constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    public static at(row: number, col: number) {
        return new Square(row, col);
    }

    public equals(otherSquare: Square) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    public toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }

    public moveBy(rowChange : number, colChange : number) {
        return new Square(this.row + rowChange, this.col + colChange)
    }

    public moveByDirection(direction: Direction) {
        return new Square(this.row + direction.rowChange, this.col + direction.colChange)
    }
}
