import Canvas from "../canvas/Canvas.js"
import Game from "./Game.js"

export default interface IGameElm {
   delete: boolean

   game: Game
   render: (canvas: Canvas, deltaTime: number, time: number, listIndex: number) => void
}
