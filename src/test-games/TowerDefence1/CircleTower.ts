import Canvas from "../../canvas/Canvas.js"
import IGameElm from "../../game/IGameElm.js"
import Circle2D from "../../geometric/Circle2D.js"
import Intersects from "../../geometric/Intersects.js"
import Line2D from "../../geometric/Line2D.js"
import Vector2D from "../../geometric/Vector2D.js"
import { MathX } from "../../util/MathX.js"
import Bullet from "./Bullet.js"
import Explosion from "./Explosion.js"
import Monster from "./Monster.js"
import TowerDefence1 from "./TowerDefence1.js"

export default class CircleTower extends Circle2D implements IGameElm {
  delete = false

  ready = false
  reloadTimeCounter = 0
  aimAt?: Monster | undefined

  static create(option: {
    game: TowerDefence1
    name: string
    index: number
    x: number
    y: number
    r: number
    power: number
    range: number
    viewRange: number
    cost?: number
    reloadTime?: number
  }): CircleTower {
    return new CircleTower(
      option.game,
      option.name,
      option.index,
      option.x,
      option.y,
      option.r,
      option.power,
      option.range,
      option.viewRange,
      option.cost,
      option.reloadTime
    )
  }

  constructor(
    public game: TowerDefence1,
    public name: string,
    public index: number,
    x: number,
    y: number,
    r: number,
    public power: number,
    public range: number,
    public viewRange: number,
    public cost = 1000,
    public reloadTime = 1000,
    public aim = new Vector2D(x, y - range),
    public aimSpeed = 5
  ) {
    super(x, y, r)
  }

  clone() {
    return CircleTower.create({
      game: this.game,
      name: this.name,
      index: this.index,
      x: this.x,
      y: this.y,
      r: this.r,
      power: this.power,
      range: this.range,
      viewRange: this.viewRange,
      cost: this.cost,
      reloadTime: this.reloadTime,
    })
  }

  fireAt(monster: Monster) {
    if (this.ready) {
      const bullet = new Bullet(
        this.game,
        this.x,
        this.y,
        this.power,
        monster,
        5
      )
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
    return (
      this.game.elms.towers.list.some(
        (t) => t.distTo(this) < t.range + this.range
      ) ||
      this.game.level.path.some((p, i) => {
        if (i > this.game.level.path.length - 2) {
          return false
        }
        const p2 = this.game.level.path[i + 1]
        let vecToLine = this._vectorToLine(p, p2).scaleTo(20 + this.r)

        return Intersects.lines(p, p2, this, this._add(vecToLine))
      })
    )
  }

  canAfford() {
    return this.game.money >= this.cost
  }

  canBuy() {
    return !this.inRangeOfOther() && this.canAfford()
  }

  renderPreview(c: Canvas, delta: number, time: number, listIndex: number) {
    c.begin()
      .fillStyle(this.canBuy() ? "rgba(0,0,0,.2)" : "rgba(250,0,0,.2)")
      .fillCircle(this, this.range)
      .style("#000")
      .fillCircle(this, this.r)

    //  this.game.level.path.some((p, i) => {
    //    if (i > this.game.level.path.length - 2) {
    //      return false
    //    }
    //    const p2 = this.game.level.path[i + 1]
    //    let vecToLine = this._vectorToLine(p, p2).scaleTo(22)

    //    c.begin().style("#900").line(p, p2)
    //    c.begin().line(this, this._add(vecToLine))

    //    //return Intersects.lines(p, p2, this, this._add(vecToLine))
    //  })
  }

  render(c: Canvas, delta: number, time: number, listIndex: number) {
    this.charges(delta)
    const distToAimAt = !this.aimAt ? -1 : this.distTo(this.aimAt)
    if (!this.aimAt || this.aimAt.delete || distToAimAt > this.viewRange) {
      this.aimAt = undefined
    }

    if (distToAimAt < 0 || distToAimAt > this.range) {
      for (let i = 0; i < this.game.elms.monsters.list.length; i++) {
        const monster = this.game.elms.monsters.list[i]
        if (monster.delete) {
          continue
        }
        const dist = this.distTo(monster)
        if (dist < this.range + monster.r) {
          this.aimAt = monster
          break
        }
        if (dist < this.viewRange + monster.r) {
          this.aimAt = monster
        }
      }
    }

    let aimAt = this.aimAt
    if (aimAt) {
      this.aim.moveToward(aimAt, this.aimSpeed)
      let ditsToAim = this.distTo(this.aim)
      if (ditsToAim > this.range) {
        this.aim.moveToward(this, this.aimSpeed)
      } else if (ditsToAim < this.r * 2) {
        this.aim.moveToward(this, -this.aimSpeed)
      }
    }

    if (this.ready && this.aimAt && this.aim.distTo(this.aimAt) < 5) {
      console.log(this.aimAt)
      this.fireAt(this.aimAt)
    }

    // --------- draw -------
    c.save()

    const percent = this.reloadTimeCounter / this.reloadTime

    // ready bar
    c.begin()
      .style(percent > 0.99 ? "#090" : percent > 0.5 ? "#990" : "#900")
      .fillRect(
        this.x + this.r * 3,
        this.y + this.r - this.r * 2 * percent,
        2,
        this.r * 2 * percent
      )
    // view range
    c.begin().fillStyle("rgba(0,0,0,.1)").fillCircle(this, this.viewRange)
    // range
    c.begin().fillStyle("rgba(0,0,0,.2)").fillCircle(this, this.range)

    // aim
    let aimLineP1 = this.aim._moveToward(this, 4)
    let aimLineP2 = this.aim._moveToward(this, -4)
    let aimLine2P1 = aimLineP1._rotateAround(this.aim, MathX.deg90)
    let aimLine2P2 = aimLineP2._rotateAround(this.aim, MathX.deg90)

    c.begin()
      .lineWidth(3)
      .style("rgba(0,0,0,.4)")
      .strokeCircle(this.aim, 8)
      .line(aimLineP1, aimLineP2)
      .line(aimLine2P1, aimLine2P2)
      .lineWidth(1)
      .style("rgba(255,255,255,.4)")
      .strokeCircle(this.aim, 8)
      .line(aimLineP1, aimLineP2)
      .line(aimLine2P1, aimLine2P2)

    //tower
    c.begin()
      .style("rgba(0,0,120,.2)")
      .fillCircle(this, this.r * 3)
    let aimLine = this._moveToward(this.aim, this.r + 2)
    c.begin().style("#000").fillCircle(this, this.r)
    c.begin()
      .style("#000")
      .lineWidth(this.r / 0.8)
      .line(this, aimLine)
    c.restore()
  }
}
