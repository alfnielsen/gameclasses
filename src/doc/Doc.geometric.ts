import Vector2D from "../geometric/Vector2D.js"
import Doc from "./DocElm.js"

export default class Doc_geometric extends Doc {

   Vector2D() {
      this.addDoc().setInfo("Vector2D", "A 2D vector with x,y - all it's method a immutable").render(c => {
         const v = new Vector2D(50, 50)
         //c.drawArrow(v.Origin, v)
      })
   }
}

