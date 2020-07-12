import Canvas from "../../canvas/Canvas.js"
import Circle2D from "../../geometric/Circle2D.js"
import IGameElm from "../../game/IGameElm.js"

export default class CircleTower extends Circle2D implements IGameElm {

   constructor(
      x: number,
      y: number,
      r: number,
      public power: number,
      public rate: number,
      public numberOfTargets: number,
   ) {
      super(x, y, r)
   }

   render(c: Canvas, delta: number, time: number) {
      c.begin().circleFill(this)
   }
}