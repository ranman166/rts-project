// import {Vector2} from "./Vector2";

interface IVector2 {
    x: number;
    y: number;
}

interface Unit {
    position: IVector2;
    id: string;
    speed: number;
    color: string
}

interface GameState {
    units: Unit[];
}

let target: IVector2 | undefined = undefined;
let state: GameState = {
    units: []
};

function render(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {

    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, canvas.width, canvas.height);


    for (const unit of state.units) {
        context.fillStyle = unit.color
        context.fillRect(unit.position.x, unit.position.y, 10, 10)
    }



}

function subtract(a: IVector2, b: IVector2): IVector2 {
    return { x: a.x - b.x, y: a.y - b.y }
}

function add(a: IVector2, b: IVector2): IVector2 {
    return { x: a.x + b.x, y: a.y + b.y }
}
function len(a: IVector2): number {
    return Math.sqrt(a.x * a.x + a.y * a.y)
}

function scale(s: number, b: IVector2) {

    return { x: b.x * s, y: b.y * s }
}

function normalize(a: IVector2) {

    // a scaled by length so a as length 1
    return scale(1 / len(a), a)
}

function tick(): void {
    if (target === undefined) {
        return
    }

    for (const unit of state.units) {
        const difference = subtract(target, unit.position)
        const normalized_difference = normalize(difference)
        const move_action = scale(unit.speed, normalized_difference)
        unit.position = add(unit.position, move_action)
    }
}

function createWorld(): void {

    for (let x: number = 0; x < 1000; x++) {
        state.units.push({
            position: {
                x: Math.random() * 500,
                y: Math.random() * 500
            },
            id: "potato",
            speed: Math.random() * 10,
            color: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`

        })
    }
}

function main(): void {

    createWorld();

    document.addEventListener("mousedown", (e) => {
        target = { x: e.clientX, y: e.clientY }
    })

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;

    document.body.appendChild(canvas);

    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

    setInterval(() => {
        tick()
        render(canvas, context)
    }, 17)


}

main();