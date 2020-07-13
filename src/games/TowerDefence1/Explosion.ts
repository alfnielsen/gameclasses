import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"

export default class Explosion extends Circle2D implements IGameElm {
   delete = false

   constructor(
      x: number,
      y: number,
      public power: number,
      r = 1,
      public increase = 1.2
   ) {
      super(x, y, r)
   }

   render(c: Canvas, delta: number, time: number) {
      this.r += this.increase
      this.increase += 0.2
      c
         .save()
         .begin()
         .style(`rgba(${this.r * 5},${this.r * 5},0,.8)`)
         .fillCircle(this)
         .restore()
   }
}