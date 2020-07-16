import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"
import Vector2D from "../../geometric/Vector2D.js"
import Monster from "./Monster.js"
import TowerDefence1 from "./TowerDefence1.js"

interface iParticle { red: number, green: number, x: number, y: number, r: number }

const ra = (n: number) => Math.random() * n
const rm = (n: number) => -n / 2 + Math.random() * n
const rma = (n: number, n2: number) => n + Math.random() * (n2 - n)


export default class Explosion extends Circle2D implements IGameElm {
   delete = false
   increase = 1.2

   particles: iParticle[] = [];

   constructor(
      public game: TowerDefence1,
      x: number,
      y: number,
      public power: number,
      r = 1,
   ) {
      super(x, y, r)

      for (let i = 0; i < 25; i++) {
         let green = rma(100, 255)
         let red = rma(100, 255)
         while (red < green) { red += 1 }
         if (red > 255) red = 255
         if (green > 255) green = 255
         if (red < green) red = green
         const p = this.add(rm(this.r), rm(this.r))
         const rr = ra(this.r / 5)
         this.particles.push({ x: p.x, y: p.y, red, green, r: rr } as iParticle)
      }

   }

   render(c: Canvas, delta: number, time: number, listIndex: number) {
      if (this.r > 50) {
         this.game.elms.explosions.deleteList.push(listIndex)
      }
      this.r += this.increase
      this.increase += 0.2


      c.save()
      this.particles.forEach(p => {
         const rr = ra(this.r / 5)

         c.begin()
            .style(`rgba(${p.red},${p.green},0,.1)`)
            .fillCircle(p.x, p.y, rr)
      })

      c.restore()




   }
}