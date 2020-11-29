import Canvas from "../canvas/Canvas.js"
import Point2D from "../geometric/Point2D.js"
import Vector2D from "../geometric/Vector2D.js"
import AnimationFrame from "../util/AnimationFrame.js"
import IGameElm from "./IGameElm.js"

export default class Game {
  canvas: Canvas
  frame: AnimationFrame
  mousePos = new Point2D(0, 0)

  constructor() {
    this.canvas = new Canvas(500, 250)
    this.frame = new AnimationFrame(this.renderBase.bind(this))
    this.registerEvents()
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
      let t = `${time}`
      while (t.length < des) {
        t += "0"
      }
      return t
    }
    canvas
      .strokeRect(0, 0, canvas.width, canvas.height)
      .fillText(
        `Game time - delta: ${renderTime(deltaTime, 19)}, time: ${renderTime(
          time,
          9
        )}`,
        4,
        canvas.height - 4
      )
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

  registerEvents() {
    this.canvas.elm.addEventListener("mousedown", this.mousedown.bind(this))
    this.canvas.elm.addEventListener("mousemove", this.updateMouse.bind(this))
    this.canvas.elm.addEventListener("mouseup", this.mouseup.bind(this))
    document.addEventListener("keydown", this.keydown.bind(this))
  }

  mousedown(e: MouseEvent) {}
  mouseup(e: MouseEvent) {}
  mousemove(e: MouseEvent) {}
  updateMouse(e: MouseEvent) {
    this.mousePos.x = e.offsetX
    this.mousePos.y = e.offsetY
    this.mousemove(e)
  }
  keydown(e: KeyboardEvent) {}
}
