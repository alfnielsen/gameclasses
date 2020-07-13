import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"

export default class Monster extends Circle2D implements IGameElm {
   delete = false

   constructor(
      x: number,
      y: number,
      r: number,
      public health: number,
      public speed: number,
      public power: number,
      public fullHealth = health,
   ) {
      super(x, y, r)
   }

   render(c: Canvas, delta: number, time: number) {
      this.x += 2
      const procent = (this.health / this.fullHealth)
      c
         .save()
         .begin()
         .style(procent > 0.6 ? '#090' : procent > 0.3 ? '#990' : '#900')
         .fillRect(this.x - this.r, this.y - this.r - 3, (this.r * 2) * procent, 2)
         .style('#f00')
         .fillCircle(this)
         .textAlign("center")
         .textBaseline("middle")
         .font("5px Arial")
         .style('#000')
         .fillText("M", this)
         .restore()

   }
}