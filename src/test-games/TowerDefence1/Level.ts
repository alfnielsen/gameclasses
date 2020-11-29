import Canvas from "../../canvas/Canvas.js"
import Game from "../../game/Game.js"
import Vector2D from "../../geometric/Vector2D.js"
import Monster from "./Monster.js"
import TowerDefence1 from "./TowerDefence1.js"

export class Level {
  path: Vector2D[] = []
  monster: Monster[]
  constructor(public game: TowerDefence1) {
    const h2 = game.canvas.height / 2
    this.path.push(new Vector2D(-50, h2))
    this.path.push(new Vector2D(150, h2))
    this.path.push(new Vector2D(150, h2 + 80))
    this.path.push(new Vector2D(450, h2 + 80))
    this.path.push(new Vector2D(500, h2 - 80))
    this.path.push(new Vector2D(game.canvas.width, h2 - 80))
  }

  addRandomMonster() {
    const size = 2 + Math.random() * 10
    const monster = Monster.create({
      game: this.game,
      x: Math.random() * -500,
      y: 10 + Math.random() * 200,
      r: size,
      health: size / 2,
      speed: 2,
      power: 5,
      money: 20,
    })
    this.game.elms.monsters.list.push(monster)
  }

  moveMonsters() {}

  render(c: Canvas, deltaTime: number, time: number) {
    c.save()
    c.begin().style("rgba(0,0,0,.8)").lineWidth(30).moveTo(this.path[0])
    for (let i = 1; i < this.path.length; i++) {
      c.lineTo(this.path[i])
    }
    c.stroke()
    c.restore()
  }
}
