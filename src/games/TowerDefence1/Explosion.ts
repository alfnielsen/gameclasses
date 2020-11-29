import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"
import Point2D from "../../geometric/Point2D.js"
import Vector2D from "../../geometric/Vector2D.js"
import Monster from "./Monster.js"
import TowerDefence1 from "./TowerDefence1.js"

class Particle extends Point2D {
  constructor(
    x: number,
    y: number,
    public red: number,
    public green: number,
    public r: number
  ) {
    super(x, y)
  }
}

const ra = (n: number) => Math.random() * n
const rm = (n: number) => -n / 2 + Math.random() * n
const rma = (n: number, n2: number) => n + Math.random() * (n2 - n)

export default class Explosion extends Circle2D implements IGameElm {
  delete = false
  increase = 1.2

  particles: Particle[] = []

  constructor(
    public game: TowerDefence1,
    x: number,
    y: number,
    public power: number,
    public lifeSpan = 1000,
    public size = 20
  ) {
    super(x, y, 1)

    for (let i = 0; i < 25; i++) {
      let green = rma(100, 255)
      let red = rma(100, 255)
      while (red < green) {
        red += 1
      }
      if (red > 255) red = 255
      if (green > 255) green = 255
      if (red < green) red = green
      const rmv = new Vector2D(rm(this.r), rm(this.r))
      const p = this.add(rmv)
      const rr = ra(this.r / 5)
      this.particles.push(new Particle(p.x, p.y, red, green, rr))
    }
  }

  render(c: Canvas, delta: number, time: number, listIndex: number) {
    this.lifeSpan -= delta
    if (this.r >= this.size) {
      this.increase *= -1
    }
    this.r += this.increase
    this.increase += 0.2
    if (this.r < 0 || this.lifeSpan < 0) {
      this.r = 0
      this.game.elms.explosions.deleteList.push(listIndex)
    }

    c.save()
    this.particles.forEach((p) => {
      const rr = ra(this.r / 5)

      c.begin()
        .style(`rgba(${p.red},${p.green},0,.1)`)
        .fillCircle(p, rr)
        .style("000")
        .strokeCircle(this, this.r)
    })

    c.restore()
  }
}
