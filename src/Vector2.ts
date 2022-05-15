

export class Vector2{

    public x: number;
    public y: number;

    public constructor(x: number,y: number){
        this.x = x;
        this.y = y
    }

    public length(){
        return Math.sqrt(this.x * this.x + this.y * this.y)
    
    }
}

