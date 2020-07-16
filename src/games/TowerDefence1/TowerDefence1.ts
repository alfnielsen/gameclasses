import Canvas from "../../canvas/Canvas.js"
import Game from "../../game/Game.js"
import IGameElm from "../../game/IGameElm.js"
import Bullet from "./Bullet.js"
import CircleTower from "./CircleTower.js"
import Explosion from "./Explosion.js"
import Monster from "./Monster.js"

interface TowerMap {
   key: string,
   preview: CircleTower
}
interface ElmListMap {
   list: IGameElm[],
   deleteList: number[]
}

export default class TowerDefence1 extends Game {
   elms = {
      towers: {
         list: [] as CircleTower[],
         deleteList: [] as number[]
      },
      monsters: {
         list: [] as Monster[],
         deleteList: [] as number[]
      },
      bullets: {
         list: [] as Bullet[],
         deleteList: [] as number[]
      },
      explosions: {
         list: [] as Explosion[],
         deleteList: [] as number[]
      }
   }
   elmsList: ElmListMap[] = [this.elms.towers, this.elms.monsters, this.elms.bullets, this.elms.explosions]

   towerTypes: TowerMap[]
   placing?: TowerMap

   life = 100
   money = 2000
   spawn = 3
   spawnTime = 2000
   spawnCounter = 1000

   constructor() {
      super()
      this.resize(1000, 250)
      this.towerTypes = [
         {
            key: '1',
            preview: new CircleTower(this, 'Small Tower', 1, -1000, 0, 5, 2, 40, 1, 300, 1000)
         },
         {
            key: '2',
            preview: new CircleTower(this, 'Fast Tower', 2, -1000, 0, 5, 1, 45, 1, 500, 200)
         },
         {
            key: '3',
            preview: new CircleTower(this, 'Fast Tower', 2, -1000, 0, 5, 1, 45, 1, 500, 200)
         },
         {
            key: '4',
            preview: new CircleTower(this, 'Super Tower', 4, -1000, 0, 10, 25, 55, 1, 5000, 300)
         },
      ]

   }


   addRandomMonster() {
      const size = 2 + Math.random() * 10
      const monster = new Monster(this, Math.random() * -500, 10 + Math.random() * 200, size, size / 2, size * 20, 5, 20)
      this.elms.monsters.list.push(monster)
   }

   mousedown(e: MouseEvent) {
      super.mousedown(e)
      if (this.placing) {
         if (this.placing.preview.canBuy()) {
            this.money -= this.placing.preview.cost
            this.elms.towers.list.push(this.placing.preview.clone())
            this.placing = undefined
         }
      }
   }

   keydown(e: KeyboardEvent) {
      if (e.keyCode ===/*ecs*/ 27) {
         this.placing = undefined
         return
      }
      const char = String.fromCharCode(e.keyCode)
      const towerType = this.towerTypes.find(t => t.key === char)
      if (!towerType) return
      if (this.placing === towerType) {
         this.placing = undefined
         return
      }
      this.placing = towerType
   }


   renderMenu(canvas: Canvas) {
      if (this.placing) {
         this.renderTowerInfo(canvas, this.placing.preview)
      } else {
         this.renderTowerMenu(canvas)
      }
   }

   renderTowerMenu(canvas: Canvas) {
      canvas.fillText(`1: Small Tower (300$) - 2: Fast Tower (500$) - 3: Large Tower (2000$) - 4: Super Tower (5000$) `, 10, 10)
   }

   renderTowerInfo(canvas: Canvas, tower: CircleTower) {
      canvas.fillText(`${tower.index}: ${tower.name} - Price: ${tower.cost}$ - Power: ${tower.power}`, 10, 10)
   }

   render(canvas: Canvas, deltaTime: number, time: number) {

      this.placing?.preview.movePointTo(this.mousePos.x, this.mousePos.y)

      this.renderMenu(canvas)
      this.spawnCounter -= deltaTime
      if (this.spawnCounter <= 0) {
         this.spawnTime -= 1
         this.spawnCounter = this.spawnTime
         for (let i = 0; i < this.spawn; i++) {
            this.addRandomMonster()
         }
      }

      // render
      super.render(canvas, deltaTime, time)
      canvas.fillText(`monsters: ${this.elms.monsters.list.length} - spawntime: ${this.spawnTime} - life: ${this.life} - money: ${this.money}`, 10, 30)
      canvas.fillText(`towers: ${this.elms.towers.list.length}`, 10, 45)
      canvas.fillText(`bullets: ${this.elms.bullets.list.length}`, 10, 60)
      canvas.fillText(`explosions: ${this.elms.explosions.list.length}`, 10, 75)
      //
      if (this.placing) {
         this.placing.preview.renderPreview(canvas, deltaTime, time, -1)
      }
      // render elms
      this.elmsList.forEach(elmMap => {
         elmMap.list.forEach((x, index) => x.render(canvas, deltaTime, time, index))
      })
      // delete elms
      this.elmsList.forEach(elmMap => {
         elmMap.deleteList.forEach((x, index) => elmMap.list.splice(index, 1))
         elmMap.deleteList = []
      })

   }

}
