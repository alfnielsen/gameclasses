import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"
import Vector2D from "../../geometric/Vector2D.js"
import Bullet from "./Bullet.js"
import Explosion from "./Explosion.js"
import Monster from "./Monster.js"
import TowerDefence1 from "./TowerDefence1.js"

export default class CircleTower extends Circle2D implements IGameElm {
   delete = false

   ready = false
   reloadTimeCounter = 0

   constructor(
      public game: TowerDefence1,
      public name: string,
      public index: number,
      x: number,
      y: number,
      r: number,
      public power: number,
      public range: number,
      public numberOfTargets: number,
      public cost = 1000,
      public reloadTime = 1000
   ) {
      super(x, y, r)
   }

   clone() {
      return new CircleTower(
         this.game,
         this.name,
         this.index,
         this.x,
         this.y,
         this.r,
         this.power,
         this.range,
         this.numberOfTargets,
         this.reloadTime
      )
   }


   fireAt(monster: Monster) {
      if (this.ready) {
         const bullet = new Bullet(this.game, this.x, this.y, this.power, monster, 5)
         this.game.elms.bullets.list.push(bullet)
         this.reloadTimeCounter = 0
         this.ready = false
      }
   }

   charges(delta: number) {
      if (!this.ready) {
         this.reloadTimeCounter += delta
         if (this.reloadTimeCounter >= this.reloadTime) {
            this.ready = true
            this.reloadTimeCounter = this.reloadTime
         }
      }
   }

   inRangeOfOther() {
      return this.game.elms.towers.list.some(t => t.distTo(this) < t.range + this.range)
   }

   canAfford() {
      return this.game.money >= this.cost
   }

   canBuy() {
      return !this.inRangeOfOther() && this.canAfford()
   }

   renderPreview(c: Canvas, delta: number, time: number, listIndex: number) {

      c.begin()
         .fillStyle(this.canBuy() ? 'rgba(0,0,0,.2)' : 'rgba(250,0,0,.2)')
         .fillCircle(this.x, this.y, this.range)
         .style('#000')
         .fillCircle(this)

   }

   render(c: Canvas, delta: number, time: number, listIndex: number) {
      this.charges(delta)
      if (this.ready) {
         this.game.elms.monsters.list.forEach((monster, index) => {
            const dist = this.distTo(monster)
            if (dist < this.range + monster.r) {
               this.fireAt(monster)
            }
         })
      }

      const percent = (this.reloadTimeCounter / this.reloadTime)
      var gradient = c.createRadialGradient(this.x, this.y, this.r, this.x, this.y, this.range)
      gradient.addColorStop(0, 'rgba(0,0,0,.2)')
      gradient.addColorStop(percent, 'rgba(0,0,0,.1)')
      gradient.addColorStop(1, 'rgba(0,0,0,.2)')

      c.begin()
         .style(percent > 0.99 ? '#090' : percent > 0.5 ? '#990' : '#900')
         .fillRect(this.x + this.r + 3, this.y + this.r - (this.r * 2) * percent, 2, (this.r * 2) * percent)
         .fillStyle(gradient)
         .fillCircle(this.x, this.y, this.range)
         .style('#000')
         .fillCircle(this)
   }

}