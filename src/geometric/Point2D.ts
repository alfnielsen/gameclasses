import Vector2D from "./Vector2D.js"

export default class Point2D extends Vector2D {

   constructor(x: number, y: number)
   constructor(p: Vector2D)
   constructor(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         super(arg[0].x, arg[0].y)
      } else {
         super(arg[0], arg[1])
      }
   }

   clonePoint(): Point2D {
      return new Point2D(this.x, this.y)
   };


   movePointTo(x: number, y: number): Point2D
   movePointTo(p: Vector2D): Point2D
   movePointTo(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         this.x = arg[0].x
         this.y = arg[0].y
      } else {
         this.x = arg[0]
         this.y = arg[1]
      }
      return this
   };

   movePointBy(x: number, y?: number): Point2D
   movePointBy(p: Vector2D): Point2D
   movePointBy(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         this.x += arg[0].x
         this.y += arg[0].y
      } else {
         this.x += arg[0]
         this.y += arg[1] ?? arg[0]
      }
      return this
   };

   toString() {
      return `[Point2D(${this.x},${this.y})]`
   };

}