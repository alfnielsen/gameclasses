import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"
import Vector2D from "../../geometric/Vector2D.js"
import Explosion from "./Explosion.js"
import TowerDefence1 from "./TowerDefence1.js"

export default class Monster extends Circle2D implements IGameElm {
  delete = false
  towardsPathPointIndex = 0

  static create(option: {
    game: TowerDefence1
    x: number
    y: number
    r: number
    health: number
    speed: number
    power: number
    money: number
    fullHealth?: number
  }) {
    return new Monster(
      option.game,
      option.x,
      option.y,
      option.r,
      option.health,
      option.speed,
      option.power,
      option.money,
      option.fullHealth
    )
  }

  constructor(
    public game: TowerDefence1,
    x: number,
    y: number,
    r: number,
    public health: number,
    public speed: number,
    public power: number,
    public money: number,
    public fullHealth = health
  ) {
    super(x, y, r)
  }

  render(c: Canvas, delta: number, time: number, listIndex: number) {
    if (this.delete) {
      return
    }

    this.game.elms.explosions.list.forEach((explosion) => {
      const dist = explosion.distTo(this)
      if (dist < explosion.r + this.r) {
        this.health -= explosion.power
        if (this.health <= 0) {
          this.game.money += this.money
          this.delete = true
          this.game.elms.monsters.deleteList.push(listIndex)
        }
      }
    })

    let towardsPathPoint = this.game.level.path[this.towardsPathPointIndex]
    this.moveToward(towardsPathPoint, this.speed)
    if (this.distTo(towardsPathPoint) < this.r) {
      if (this.towardsPathPointIndex === this.game.level.path.length - 1) {
        this.delete = true
        this.game.elms.monsters.deleteList.push(listIndex)
        this.game.life -= this.power
      } else {
        this.towardsPathPointIndex += 1
      }
    }

    let percent = this.health / this.fullHealth
    if (percent < 0) percent = 0
    c.save()
      .begin()
      .style(percent > 0.6 ? "#090" : percent > 0.3 ? "#990" : "#900")
      .fillRect(this.x - this.r, this.y - this.r - 3, this.r * 2 * percent, 2)
      .style("#f00")
      .fillCircle(this, this.r)
      .textAlign("center")
      .textBaseline("middle")
      .font("5px Arial")
      .style("#000")
      .fillText("M", this)
      .restore()
  }

  toString() {
    return `[Monster(${Math.floor(this.x)},${Math.floor(this.y)},h:${
      this.health
    })]`
  }
}
