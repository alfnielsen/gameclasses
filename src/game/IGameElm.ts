import Canvas from "../canvas/Canvas.js"


export default interface IGameElm {
   delete?: boolean
   render: (canvas: Canvas, deltaTime: number, time: number) => void
}
