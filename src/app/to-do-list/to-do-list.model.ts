export class ToDo{
    public position: number;
    public content: string;
    public isDone: boolean;
    constructor(p: number, c: string, isD: boolean){
        this.position = p;
        this.content = c;
        this.isDone = isD;
    }
}