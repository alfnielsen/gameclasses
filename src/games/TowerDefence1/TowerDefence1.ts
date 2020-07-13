import Canvas from "../../canvas/Canvas.js"
import Game from "../../game/Game.js"
import CircleTower from "./CircleTower.js"
import Explosion from "./Explosion.js"
import Monster from "./Monster.js"

export default class TowerDefence1 extends Game {
   towers: CircleTower[] = []
   monsters: Monster[] = []
   explosions: Explosion[] = []

   life = 100;
   spawn = 3;
   spawnTime = 2000
   spawnCounter = 1000

   constructor() {
      super()
      this.addElms(this.towers)
      // this.addElms(this.monsters)
      this.registerMouse()
   }

   addRandomMonster() {
      const size = 2 + Math.random() * 10
      const monster = new Monster(Math.random() * -500, 10 + Math.random() * 200, size, size / 2, size * 20, 5)
      this.monsters.push(monster)
      //this.addElm(monster)
   }

   addTower(x: number, y: number) {
      const size = 2 + Math.random() * 3
      const tower = new CircleTower(this, x, y, size, size * 2, size * 5, 5, 1)
      this.towers.push(tower)
      //  this.addElm(tower)
   }

   mousedown(e: MouseEvent) {
      this.addTower(e.offsetX, e.offsetY)
      console.log(
         "x", e.x, e.y,
         "clientX", e.clientX, e.clientY,
         "movementX", e.movementX, e.movementY,
         "offsetX", e.offsetX, e.offsetY,
         "pageX", e.pageX, e.pageY,
         "pageX", e.pageX, e.pageY,
      )

   }

   mouseup(e: MouseEvent) {

   }

   registerMouse() {
      this.canvas.elm.addEventListener("mousedown", this.mousedown.bind(this))
      this.canvas.elm.addEventListener("mouseup", this.mouseup.bind(this))
   }

   render(canvas: Canvas, deltaTime: number, time: number) {
      this.spawnCounter -= deltaTime
      if (this.spawnCounter <= 0) {
         this.spawnTime -= 1
         this.spawnCounter = this.spawnTime
         for (let i = 0; i < this.spawn; i++) {
            this.addRandomMonster()
         }
      }

      let deleteMonsterList: number[] = []
      this.monsters.forEach((monster, index) => {
         if (monster.x > 500) {
            deleteMonsterList.push(index)
            this.life -= monster.power
         }
         this.explosions.forEach(explosion => {
            const dist = explosion.distTo(monster)
            if (dist < explosion.r + 5 + monster.r) {
               monster.health -= explosion.power / 10
            }
         })
         this.towers.forEach(tower => {
            const dist = tower.distTo(monster)
            if (dist < tower.range + monster.r) {
               tower.fireAt(monster)
            }
         })
         if (monster.health <= 0) {
            deleteMonsterList.push(index)
         }
      })

      let deleteExplosionList: number[] = []

      this.explosions.forEach((explosion, index) => {
         if (explosion.r > 50) {
            deleteExplosionList.push(index)
         }
      })

      // clean up
      deleteExplosionList.forEach(index => {
         this.explosions.splice(index, 1)
      })

      deleteMonsterList.forEach(index => {
         this.monsters.splice(index, 1)
      })


      // render
      super.render(canvas, deltaTime, time)
      canvas.fillText(`monsters: ${this.monsters.length} - spawntime: ${this.spawnTime} - life: ${this.life}`, 10, 10)
      this.towers.forEach(t => t.render(canvas, deltaTime, time))
      this.monsters.forEach(t => t.render(canvas, deltaTime, time))
      this.explosions.forEach(t => t.render(canvas, deltaTime, time))

   }

}
