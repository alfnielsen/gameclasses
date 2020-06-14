import Point2D from "./Point2D.js"
import Vector2D from "./Vector2D.js"

export default class Line2D extends Point2D {
   public p: Point2D

   constructor(x1: number, y1: number, x2: number, y2: number)
   constructor(p1: Vector2D, p2: Vector2D)
   constructor(p1: Vector2D, angle: number, length: number, degrees?: true)
   constructor(x1: number, y1: number, angle: number, length: number, angleVector: true, degrees?: true)
   constructor(line: Line2D)
   constructor(...arg: any[]) {
      if (arg[0] instanceof Line2D) {
         super(arg[0].cloneVector())
         this.p = arg[0].p.clonePoint()
      } else if (arg[0] instanceof Vector2D && arg[1] instanceof Vector2D) {
         super(arg[0])
         this.p = new Point2D(arg[1])
      } else if (arg[0] instanceof Vector2D) {
         super(arg[0])
         this.p = new Point2D(this.add(new Vector2D(arg[1], arg[2], true, arg[3])))
      } else if (arg[4] === true) {
         super(arg[0], arg[1])
         this.p = new Point2D(this.add(new Vector2D(arg[2], arg[3], true, arg[5])))
      } else {
         super(arg[0], arg[1])
         this.p = new Point2D(arg[2], arg[3])
      }
   }

   cloneLine(): Line2D {
      return new Line2D(this as Vector2D, this.p.clonePoint())
   }

   length(): number {
      return this.deltaVector().length()
   }

   angle(degrees?: true): number {
      return this.deltaVector().angle(degrees)
   }

   reverse() {
      this.moveLineTo(this.p.clonePoint(), super.clonePoint())
      return this
   }

   deltaVector() {
      return this.delta(this.p)
   }

   deltaVectorBack() {
      return this.p.delta(this)
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
      const newPoint = this.deltaVector().scale(k).add(this)
      this.p.movePointTo(newPoint)
      return this
   }

   scaleLineTo(k: number) {
      const newPoint = this.deltaVector().scaleTo(k).add(this)
      this.p.movePointTo(newPoint)
      return this
   }

   moveLineToByP1(x: number, y: number): Line2D
   moveLineToByP1(p: Vector2D): Line2D
   moveLineToByP1(...arg: any[]) {
      const vec = arg[0] instanceof Vector2D ? arg[0] : new Vector2D(arg[0], arg[1])
      const delta = this.deltaVector().add(vec)
      super.movePointTo(vec)
      this.p.movePointTo(delta)
      return this
   }

   moveLineToByP2(x: number, y: number): Line2D
   moveLineToByP2(p: Vector2D): Line2D
   moveLineToByP2(...arg: any[]) {
      const vec = arg[0] instanceof Vector2D ? arg[0] : new Vector2D(arg[0], arg[1])
      const delta = this.deltaVectorBack().add(vec)
      this.p.movePointTo(vec)
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
         this.p.movePointTo(arg[2], arg[3])
      }
      return this
   }


   moveLineBy(x1: number, y1?: number, x2?: number, y2?: number): Line2D
   moveLineBy(p1: Vector2D, p2?: Vector2D): Line2D
   moveLineBy(...arg: any[]) {
      if (arg[0] instanceof Vector2D && arg[1] instanceof Vector2D) {
         super.movePointBy(arg[0])
         this.p.movePointBy(arg[1] ?? arg[0])
      } else {
         super.movePointBy(arg[0], arg[1])
         this.p.movePointBy(arg[2] ?? arg[0], arg[3] ?? arg[1] ?? arg[0])
      }
      return this
   };

   toString() {
      return `[Line2D(${this.x},${this.y},${this.p.x},${this.p.y})]`
   }

}


