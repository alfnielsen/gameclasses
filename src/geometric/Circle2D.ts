import Point2D from "./Point2D.js"
import Vector2D from "./Vector2D.js"

export default class Circle2D extends Point2D {
   public r: number

   constructor(x: number, y: number, r: number)
   constructor(p: Vector2D, r: number)
   constructor(
      ...arg: any[]
   ) {
      if (arg[0] instanceof Vector2D) {
         super(arg[0].x, arg[0].y)
         this.r = arg[1]
      } else {
         super(arg[0], arg[1])
         this.r = arg[2]
      }

   }

   cloneCircle(): Circle2D {
      return new Circle2D(this, this.r)
   };

   toString() {
      return `[Circle2D(${this.x},${this.y},r:${this.r})}`
   };

}
