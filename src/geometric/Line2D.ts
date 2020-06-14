import Point2D from "./Point2D.js"
import Vector2D from "./Vector2D.js"

export default class Line2D extends Point2D {
   public p: Point2D

   constructor(x1: number, y1: number, x2: number, y2: number)
   constructor(p1: Vector2D, p2: Vector2D)
   constructor(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         super(arg[0])
         this.p = new Point2D(arg[1])
      } else {
         super(arg[0], arg[1])
         this.p = new Point2D(arg[2], arg[3])
      }
   }

   cloneLine(): Line2D {
      return new Line2D(this as Vector2D, this.p.clonePoint())
   }

   reverse() {
      this.moveLineTo(this.p.clonePoint(), super.clonePoint())
      return this
   }

   deltaVector() {
      return this.p.delta(this)
   }

   deltaVectorBack() {
      return this.delta(this.p)
   }

   rotateFromP1(angle: number, degrees?: true) {
      let newPoint = this.deltaVector().rotate(angle, degrees).add(this)
      this.p.movePointTo(newPoint)
      return this
   }

   rotateFromP2(angle: number, degrees?: true) {
      let newPoint = this.deltaVectorBack().rotate(angle, degrees).add(this.p)
      this.movePointTo(newPoint)
      return this
   }

   scaleLine(k: number) {
      const newPoint = this.deltaVectorBack().scale(k).add(this)
      this.p.movePointTo(newPoint)
      return this
   }

   scaleLineTo(k: number) {
      const newPoint = this.deltaVectorBack().scaleTo(k).add(this)
      this.p.movePointTo(newPoint)
      return this
   }

   moveLineByP1(x: number, y: number): Line2D
   moveLineByP1(p: Vector2D): Line2D
   moveLineByP1(...arg: any[]) {
      const vec = arg[0] instanceof Vector2D ? arg[0] : new Vector2D(arg[0], arg[1])
      super.movePointTo(vec)
      const delta = this.deltaVector().add(vec)
      this.p.movePointTo(delta)
      return this
   }

   moveLineByP2(x: number, y: number): Line2D
   moveLineByP2(p: Vector2D): Line2D
   moveLineByP2(...arg: any[]) {
      const vec = arg[0] instanceof Vector2D ? arg[0] : new Vector2D(arg[0], arg[1])
      this.p.movePointTo(vec)
      const delta = this.deltaVectorBack().add(vec)
      super.movePointTo(delta)
      return this
   }

   moveLineTo(x1: number, y1: number, x2: number, y2: number): Line2D
   moveLineTo(p1: Vector2D, p2: Vector2D): Line2D
   moveLineTo(...arg: any[]) {
      if (arg[0] instanceof Vector2D && arg[1] instanceof Vector2D) {
         super.movePointTo(arg[0])
         this.p.movePointTo(arg[1])
      } else {
         super.movePointTo(arg[0], arg[1])
         this.p.movePointTo(arg[2], arg[1])
      }
      return this
   }


   moveLineBy(x1: number, y1: number, x2?: number, y2?: number): Line2D
   moveLineBy(p1: Vector2D, p2?: Vector2D): Line2D
   moveLineBy(...arg: any[]) {
      if (arg[0] instanceof Vector2D && arg[1] instanceof Vector2D) {
         super.movePointBy(arg[0])
         this.p.movePointBy(arg[1] ?? arg[0])
      } else {
         super.movePointBy(arg[0], arg[1])
         this.p.movePointBy(arg[2] ?? arg[0], arg[3] ?? arg[1])
      }
      return this
   };

   toString() {
      return `[Line2D(${this.x},${this.y},${this.p.x},${this.p.y})]`
   }

}


