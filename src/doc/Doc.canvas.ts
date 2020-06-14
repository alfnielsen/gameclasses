import Circle2D from "../geometric/Circle2D.js"
import Line2D from "../geometric/Line2D.js"
import Point2D from "../geometric/Point2D.js"
import Vector2D from "../geometric/Vector2D.js"
import Doc from "./DocElm.js"

export default class Doc_canvas extends Doc {

   constructor() {
      console.log("Con!")

      super()
      this.lineTo()
      this.arc()

   }

   lineTo() {
      this.addDoc().setInfo("lineTo", "Draw a Line").render(canvas => {
         canvas.begin()
            .moveTo(0, 0)
            .lineTo(50, 50)
            .stroke()
      })
   }
   arc() {
      this.addDoc().setInfo("arc", "Draw a Arc").render(canvas => {
         canvas.begin()
            .arc(50, 50, 15)
            .stroke()
         const p = new Point2D(100, 50)
         canvas.begin()
            .arc(p, 15, Math.PI, 0)
            .stroke()
         // 0 to 45 degrees
         const p2 = new Point2D(150, 50)
         canvas.begin()
            .arc(p2, 15, 0, Math.PI / 180 * 45)
            .stroke()
         const c = new Circle2D(100, 100, 15)
         canvas.begin()
            .arc(c, Math.PI, Math.PI / 180 * 270, true)
            .stroke()
         //         canvas.begin().moveTo(c).lineTo(c.add(0, 50)).stroke()
         canvas.strokeStyle("#900")
         canvas.arrow(c.sub(25, 0), c.add(-25, 20))

         // const line = new Line2D(c, c.add(0, 40))
         // line.moveLineBy(-30, 0)
         // canvas.strokeStyle("#900")
         // canvas.line(line)
         // canvas.strokeStyle("#090")
         // const l1 = line.cloneLine().rotateP1(Math.PI / 2).scaleTo(100)
         // const l2 = line.cloneLine().rotateP1(Vector2D.toRadians(-15)).scaleTo(100)
         // //this.begin().moveTo(arg[0]).lineTo(arg[1]).stroke()
         // canvas
         //    .line(l1)
         //    .line(l2)
      })
   }
}

