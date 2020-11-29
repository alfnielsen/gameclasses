import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"
import Point2D from "../../geometric/Point2D.js"
import Vector2D from "../../geometric/Vector2D.js"
import Explosion from "./Explosion.js"
import Monster from "./Monster.js"
import TowerDefence1 from "./TowerDefence1.js"

export default class Bullet extends Circle2D implements IGameElm {
  delete = false
  livingTime = 0

  constructor(
    public game: TowerDefence1,
    x: number,
    y: number,
    public power: number,
    public aimAt: Monster,
    public speed: number,
    r = 2
  ) {
    super(x, y, r)
  }

  explode(listIndex: number) {
    const explosion = new Explosion(this.game, this.x, this.y, this.power)
    this.game.elms.explosions.list.push(explosion)
    this.game.elms.bullets.deleteList.push(listIndex)
  }

  shouldExplode() {
    const dist = this.distTo(this.aimAt)
    return dist < this.r + this.aimAt.r || this.livingTime > 4000
  }

  render(c: Canvas, delta: number, time: number, listIndex: number) {
    this.livingTime += delta
    const currentPos = Vector2D.fromVector(this)
    const dirVector = this.cloneAsVector().delta(this.aimAt).scaleTo(this.speed)
    const nextPos = this.cloneAsVector().add(dirVector)
    if (this.shouldExplode()) {
      this.explode(listIndex)
    }
    this.moveTo(nextPos)
    c.save()
      .begin()
      .style(`#900`)
      .arrow(currentPos, nextPos)
      .style(`#000`)
      .fillCircle(this, this.r)
      .restore()
  }
}
