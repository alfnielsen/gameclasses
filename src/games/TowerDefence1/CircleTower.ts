import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"
import Vector2D from "../../geometric/Vector2D.js"
import Explosion from "./Explosion.js"
import TowerDefence1 from "./TowerDefence1.js"

export default class CircleTower extends Circle2D implements IGameElm {
   delete = false

   ready = false
   reloadTimeCounter = 0

   constructor(
      public game: TowerDefence1,
      x: number,
      y: number,
      r: number,
      public power: number,
      public range: number,
      public rate: number,
      public numberOfTargets: number,
      public reloadTime = 1000
   ) {
      super(x, y, r)
   }


   fireAt(vec: Vector2D) {
      if (this.ready) {
         const size = 2 + Math.random() * 10
         const explosion = new Explosion(vec.x, vec.y, this.power)
         this.game.explosions.push(explosion)
         this.reloadTimeCounter = 0
         this.ready = false
      }
   }

   render(c: Canvas, delta: number, time: number) {
      if (!this.ready) {
         this.reloadTimeCounter += delta
         if (this.reloadTimeCounter >= this.reloadTime) {
            this.ready = true
            this.reloadTimeCounter = this.reloadTime
         }
      }

      const procent = (this.reloadTimeCounter / this.reloadTime)
      c.begin()
         .style(procent > 0.6 ? '#090' : procent > 0.3 ? '#990' : '#900')
         .fillRect(this.x - this.r, this.y - this.r - 3, (this.r * 2) * procent, 2)
         .style('#000')

         .strokeCircle(this.x, this.y, this.range)
         .fillCircle(this)
   }

}