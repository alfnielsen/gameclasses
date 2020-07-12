import Canvas from "../../canvas/Canvas.js"
import Game from "../../game/Game.js"
import CircleTower from "./CircleTower.js"

export default class TowerDefence1 extends Game {

   constructor() {
      super()
      Array(1000).fill(1).forEach(_ => {
         this.addElm(new CircleTower(Math.random() * 500, Math.random() * 200, 1, 100, 5, 1))
      })
   }

   render(canvas: Canvas, deltaTime: number, time: number) {
      super.render(canvas, deltaTime, time)


   }
}
