import Canvas from "../canvas/Canvas.js"
import Circle2D from "../geometric/Circle2D.js"
import Line2D from "../geometric/Line2D.js"
import Point2D from "../geometric/Point2D.js"
import Vector2D from "../geometric/Vector2D.js"
import Doc from "./DocElm.js"
import AnimationFrame from "../util/AnimationFrame.js"

export default class Doc_canvas extends Doc {
  constructor() {
    console.log("Con!")

    super()
    // this.lineTo()
    // this.arc()
  }
  ani(delta: (deltaTime: number, time: number) => void) {
    return new AnimationFrame(delta).start()
  }

  // lineTo() {
  //    let animate = this.ani
  //    this.addDoc().setInfo("lineTo", "Draw a Line")
  //       .renderInfo(canvas => {
  //          canvas
  //             .style('#999')
  //             .fillText('Point ( 50, 50 )', 70, 40)
  //             .arrow(65, 40, 55, 45)
  //             .fillText('Point ( 150, 150 )', 160, 120)
  //             .arrow(165, 125, 157, 140)
  //             .style('#000')
  //       })
  //       .render(canvas => {
  //          let y = 0, d = 1
  //          animate((delta: number) => {
  //             y += 2 * d
  //             if (y < 0 || y > 200) { d *= -1 }
  //             canvas.clear().begin()
  //                .moveTo(50, 50)
  //                .lineTo(150, y)
  //                .stroke()
  //          })
  //       })
  // }

  // arc() {
  //    this.addDoc().setInfo("arc", "Draw a Arc")
  //       .renderInfo(canvas => {
  //          canvas
  //             .style('#999')
  //             .fillText('( 50, 50 )', 30, 20)
  //             .fillText('Point ( 150, 50 )', 115, 20)
  //             .fillText('Circle ( 250, 50 )', 215, 20)
  //             .dot(50, 50, 1)
  //             .dot(150, 50, 1)
  //             .dot(250, 50, 1)
  //             .begin().arcArrow(50, 50, 15, (Math.PI / 4) * 1.5, Math.PI * 1.9).stroke()
  //             .begin().arcArrow(150, 50, 15, 0, Math.PI * 0.9).stroke()
  //             .begin().arcArrow(250, 50, 15, Math.PI * 1.1, (Math.PI / 2) * 0.8).stroke()
  //             .style('#000')

  //          canvas
  //             .style('#999')
  //             .fillText('( 50, 50 )', 30, 120)
  //             .fillText('Point ( 150, 50 )', 115, 120)
  //             .fillText('Circle ( 250, 50 )', 215, 120)
  //             .dot(50, 150, 1)
  //             .dot(150, 150, 1)
  //             .dot(250, 150, 1)
  //             .begin().arcArrow(50, 150, 15, (Math.PI / 4) * 0.85, Math.PI * 0.05, true).stroke()
  //             .begin().arcArrow(150, 150, 15, (Math.PI / 2) * 3 * 0.1, Math.PI * 1.05, true).stroke()
  //             .begin().arcArrow(250, 150, 15, Math.PI * 0.9, (Math.PI / 2) * 1.1, true).stroke()
  //             .style('#000')

  //       })
  //       .render(canvas => {
  //          canvas.begin()
  //             .arc(50, 50, 15, 0, Math.PI / 4)
  //             .stroke()
  //          // point
  //          const p = new Point2D(150, 50)
  //          canvas.begin()
  //             .arc(p, 15, Math.PI, Math.PI * 3 / 2)
  //             .stroke()
  //          // circle
  //          const c = new Circle2D(250, 50, 15)
  //          canvas.begin()
  //             .arc(c, Math.PI / 2, Math.PI)
  //             .stroke()
  //          // anticlockwise
  //          canvas.begin()
  //             .arc(50, 150, 15, 0, Math.PI / 4, true)
  //             .stroke()
  //          // point
  //          const p2 = new Point2D(150, 150)
  //          canvas.begin()
  //             .arc(p2, 15, Math.PI, Math.PI * 3 / 2, true)
  //             .stroke()
  //          // circle
  //          const c2 = new Circle2D(250, 150, 15)
  //          canvas.begin()
  //             .arc(c2, Math.PI / 2, Math.PI, true)
  //             .stroke()
  //       })
  // }
}
