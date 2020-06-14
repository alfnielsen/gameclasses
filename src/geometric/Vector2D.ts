
export default class Vector2D {
   public x: number
   public y: number

   constructor(p: Vector2D)
   constructor(x: number, y: number)
   constructor(angle: number, length: number, angleVector: true)
   constructor(angle: number, length: number, angleVector: true, degrees: true)
   constructor()
   constructor(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         this.x = arg[0].x
         this.y = arg[0].y
      } else if (arg[2] && !arg[3]) {
         this.x = Math.cos(arg[0]) * arg[1]
         this.y = Math.sin(arg[0]) * arg[1]
      } else if (arg[3]) {
         this.x = Math.cos(Vector2D.toRadians(arg[0])) * arg[1]
         this.y = Math.sin(Vector2D.toRadians(arg[0])) * arg[1]
      } else {
         this.x = arg[0] ?? 0
         this.y = arg[1] ?? 0
      }
   }

   static toRadians = (des: number) => (Math.PI / 180) * des
   static toDegrees = (rad: number) => (rad / Math.PI) * 180
   static Origin = new Vector2D();

   Origin = Vector2D.Origin

   toString() {
      return `[Vector2D(${this.x},${this.y})]`
   }

   cloneVector() {
      return new Vector2D(this.x, this.y)
   };

   delta(x: number, y: number): Vector2D
   delta(vec: Vector2D): Vector2D
   delta(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return new Vector2D(arg[0].x - this.x, arg[0].y - this.y)
      }
      return new Vector2D(arg[0] - this.x, arg[1] - this.y)
   };

   distTo(x: number, y: number): number
   distTo(vec: Vector2D): number
   distTo(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return this.delta(arg[0]).length()
      }
      return this.delta(arg[0], arg[1]).length()
   };

   rotate(angle: number, degrees?: true) {
      const length = this.length()
      const currentAngle = this.angle(degrees)
      return new Vector2D(currentAngle + angle, length, true, degrees)
   }

   rotateTo(angle: number, degrees?: true) {
      if (degrees) {
         angle = Vector2D.toRadians(angle)
      }
      const length = this.length()
      return new Vector2D(angle, length, true)
   }

   /*Number:radian*/
   angleTo(x: number, y: number, degrees?: true): number
   angleTo(vec: Vector2D, degrees?: true): number
   angleTo(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return this.delta(arg[0]).angle(arg[1])
      }
      return this.delta(arg[0], arg[1]).angle(arg[2])
   };

   /*Number:radian*/
   angleBetween(x: number, y: number, degrees?: true): number
   angleBetween(vec: Vector2D, degrees?: true): number
   angleBetween(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return Math.abs(this.angle(arg[1]) - arg[0].angle(arg[1]))
      }
      return Math.abs(this.angle(arg[2]) - new Vector2D(arg[0], arg[1]).angle(arg[2]))
   };

   angleVector(angle: number, length: number, degrees?: true) {
      return this.add(new Vector2D(angle, length, true, degrees))
   };

   /*Number:radian*/
   angle(degrees?: true) {
      const angleRadians = Math.atan2(this.y, this.x)
      if (degrees) {
         return Vector2D.toDegrees(angleRadians)
      }
      return angleRadians
   };

   /*Number:length*/
   length() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
   };

   /*Vector*/
   add(x: number, y: number): Vector2D
   add(vec: Vector2D): Vector2D
   add(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return new Vector2D(this.x + arg[0].x, this.y + arg[0].y)
      }
      return new Vector2D(this.x + arg[0], this.y + arg[1])
   };

   /*Vector*/
   sub(x: number, y: number): Vector2D
   sub(vec: Vector2D): Vector2D
   sub(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return new Vector2D(this.x - arg[0].x, this.y - arg[0].y)
      }
      return new Vector2D(this.x - arg[0], this.y - arg[1])
   };

   /*Vector*/
   multi(x: number, y: number): Vector2D
   multi(vec: Vector2D): Vector2D
   multi(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return new Vector2D(this.x * arg[0].x, this.y * arg[0].y)
      }
      return new Vector2D(this.x * arg[0], this.y * arg[1])
   };

   /*Vector*/
   divide(x: number, y: number): Vector2D
   divide(vec: Vector2D): Vector2D
   divide(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return new Vector2D(this.x / arg[0].x, this.y / arg[0].y)
      }
      return new Vector2D(this.x / arg[0], this.y / arg[1])
   };

   /*Vector*/
   scale(k: number) {
      return new Vector2D(this.x * k, this.y * k)
   };

   scaleTo(length: number) {
      return new Vector2D(this.angle(), length, true)
   };

   /*Number:scalar product*/
   scalar(x: number, y: number): number
   scalar(vec: Vector2D): number
   scalar(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return this.x * arg[0].x + this.y * arg[0].y
      }
      return this.x * arg[0] + this.y * arg[1]
   };

   /*Number:cross product*/
   cross(x: number, y: number): number
   cross(vec: Vector2D): number
   cross(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return this.x * arg[0].y - this.y * arg[0].x
      }
      return this.x * arg[0] - this.y * arg[1]
   };

   /*Vector:projection on oVector */
   projection(x: number, y: number): Vector2D
   projection(vec: Vector2D): Vector2D
   projection(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return arg[0].scale(this.scalar(arg[0]) / arg[0].scalar(arg[0]))
      }
      const v = new Vector2D(arg[0], arg[1])
      return v.scale(this.scalar(v) / v.scalar(v))
   };

   /*Number:distance*/
   distToProjection(x: number, y: number): number
   distToProjection(vec: Vector2D): number
   distToProjection(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return this.distTo(this.projection(arg[0]))
      }
      return this.distTo(this.projection(arg[0], arg[1]))
   };

   /*Vector*/
   vectorToProjection(x: number, y: number): Vector2D
   vectorToProjection(vec: Vector2D): Vector2D
   vectorToProjection(...arg: any[]) {
      if (arg[0] instanceof Vector2D) {
         return this.delta(this.projection(arg[0]))
      }
      return this.delta(this.projection(arg[0], arg[1]))
   };

   log(msg: string) {
      if (msg) {
         console.log(msg, this)
      } else {
         console.log(this)
      }
      return this
   };


}