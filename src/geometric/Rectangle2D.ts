import Line2D from "./Line2D.js"
import Point2D from "./Point2D.js"
import Vector2D from "./Vector2D.js"

export default class Rectangle2D extends Point2D {

   public dim: Vector2D

   constructor(l: Line2D)
   constructor(p: Vector2D, dim: Vector2D)
   constructor(p: Vector2D, w: number, h: number)
   constructor(x: number, y: number, dim: Vector2D)
   constructor(x: number, y: number, w: number, h: number)
   constructor(...arg: any[]) {
      if (arg[0] instanceof Vector2D && arg[1] instanceof Vector2D) {
         super(arg[0].x, arg[0].y)
         this.dim = new Vector2D(arg[1])
      } else if (arg[0] instanceof Line2D) {
         super(arg[0].x, arg[0].y)
         this.dim = new Vector2D(arg[0].deltaVector())
      } else if (arg[0] instanceof Vector2D && typeof arg[1] === 'number') {
         super(arg[0].x, arg[0].y)
         this.dim = new Vector2D(arg[1], arg[2])
      } else if (typeof arg[0] === 'number' && arg[2] instanceof Vector2D) {
         super(arg[0], arg[1])
         this.dim = new Vector2D(arg[2])
      } else {
         super(arg[0], arg[1])
         this.dim = new Vector2D(arg[2], arg[3])
      }
   }

   cloneRect(): Rectangle2D {
      return new Rectangle2D(this, this.dim.cloneVector())
   }

   resize(d: Vector2D) {
      this.dim = d.cloneVector()
      return this
   };

   toString() {
      return `[Rectangle2D(${this.x},${this.y},${this.dim.x},${this.dim.y})]`
   }

}


