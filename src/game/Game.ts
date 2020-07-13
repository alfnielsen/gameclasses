import Canvas from "../canvas/Canvas.js"
import AnimationFrame from "../util/AnimationFrame.js"
import GameLayer from "./GameLayer.js"
import IGameElm from "./IGameElm.js"

export default class Game {
   canvas: Canvas
   frame: AnimationFrame
   bgLayer = new GameLayer("bg", 1)
   mainLayer = new GameLayer("main", 100)
   gameLayers: GameLayer[] = [
      this.bgLayer,
      this.mainLayer
   ]

   constructor(
   ) {
      this.canvas = new Canvas(500, 250)
      this.frame = new AnimationFrame(this.renderBase.bind(this))
   }

   addLayer(layer: GameLayer) {
      this.gameLayers.push(layer)
      this.sortGameLayer()
   }

   sortGameLayer() {
      this.gameLayers.sort((gl1, gl2) => gl1.zIndex > gl2.zIndex ? -1 : 1)
   }

   addBgElm(elm: IGameElm) {
      this.bgLayer.elms.push(elm)
   }

   addElm(elm: IGameElm) {
      this.mainLayer.elms.push(elm)
   }

   addElms(elms: IGameElm[]) {
      elms.forEach(elm => this.addElm(elm))
   }

   resize(w: number, h: number) {
      this.canvas.resize(w, h)
   }

   renderBase(deltaTime: number, time: number) {
      this.canvas.clear()
      //this.gameLayers.forEach(layer => layer.render(this.canvas, deltaTime, time))
      this.render(this.canvas, deltaTime, time)
   }

   render(canvas: Canvas, deltaTime: number, time: number) {
      const renderTime = (time: number, des = 15) => {
         let t = `${time}`; while (t.length < des) { t += '0' }; return t
      }
      canvas
         .strokeRect(0, 0, canvas.width, canvas.height)
         .fillText(`Game time - delta: ${renderTime(deltaTime, 19)}, time: ${renderTime(time, 9)}`, 4, canvas.height - 4)
   }

   start() {
      this.frame.start()
   }

   stop() {
      this.frame.stop()
   }


   getCanvasElm() {
      return this.canvas.elm
   }


}
