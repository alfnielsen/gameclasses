import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"
import Explosion from "./Explosion.js"
import TowerDefence1 from "./TowerDefence1.js"

export default class Monster extends Circle2D implements IGameElm {
   delete = false

   constructor(
      public game: TowerDefence1,
      x: number,
      y: number,
      r: number,
      public health: number,
      public speed: number,
      public power: number,
      public money: number,
      public fullHealth = health,
   ) {
      super(x, y, r)
   }

   render(c: Canvas, delta: number, time: number, listIndex: number) {
      if (this.x > this.game.canvas.width) {
         this.game.elms.monsters.deleteList.push(listIndex)
         this.game.life -= this.power
      }

      if (this.health <= 0) {
         this.game.money += this.money
         this.game.elms.monsters.deleteList.push(listIndex)
      }

      this.game.elms.explosions.list.forEach(explosion => {
         const dist = explosion.distTo(this)
         if (dist < explosion.r + this.r) {
            this.health -= explosion.power
         }
      })

      this.x += 2
      let percent = (this.health / this.fullHealth)
      if (percent < 0) percent = 0
      c
         .save()
         .begin()
         .style(percent > 0.6 ? '#090' : percent > 0.3 ? '#990' : '#900')
         .fillRect(this.x - this.r, this.y - this.r - 3, (this.r * 2) * percent, 2)
         .style('#f00')
         .fillCircle(this)
         .textAlign("center")
         .textBaseline("middle")
         .font("5px Arial")
         .style('#000')
         .fillText("M", this)
         .restore()

   }

   toString() {
      return `[Monster(${Math.floor(this.x)},${Math.floor(this.y)},h:${this.health})]`
   }
}