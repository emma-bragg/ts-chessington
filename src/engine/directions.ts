export default class Direction {
    public rowChange : number;
    public colChange : number;

    public constructor(rowChange: number, colChange: number)
    {
        this.rowChange = rowChange;
        this.colChange = colChange;
    }
}