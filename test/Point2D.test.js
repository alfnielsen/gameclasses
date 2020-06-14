import Canvas from "../dist/canvas/canvas.js"
import Vector2D from "../dist/geometric/Vector2D.js"
import Point2D from "../dist/geometric/Point2D.js"

test("Constructor must accept 2 overloads", () => {
  const v1 = new Vector2D(45, 67)
  const p1 = new Point2D(v1)
  expect(p1.x).toBe(45)
  expect(p1.y).toBe(67)
  const p2 = new Point2D(35, 56)
  expect(p2.x).toBe(35)
  expect(p2.y).toBe(56)
})

//    constructor(x: number, y: number)
//    constructor(p: Vector2D)
//    constructor(...arg: any[]) {
//       if (arg[0] instanceof Vector2D) {
//          super(arg[0].x, arg[0].y)
//       } else {
//          super(arg[0], arg[1])
//       }
//    }

//    clonePoint(): Point2D {
//       return new Point2D(this.x, this.y)
//    };

//    toVector() {
//       return new Vector2D(this.x, this.y)
//    };

//    movePointTo(x: number, y: number): Point2D
//    movePointTo(p: Vector2D): Point2D
//    movePointTo(...arg: any[]) {
//       if (arg[0] instanceof Vector2D) {
//          this.x = arg[0].x
//          this.y = arg[0].y
//       } else {
//          this.x = arg[0]
//          this.y = arg[1]
//       }
//       return this
//    };

//    movePointBy(x: number, y?: number): Point2D
//    movePointBy(p: Vector2D): Point2D
//    movePointBy(...arg: any[]) {
//       if (arg[0] instanceof Vector2D) {
//          this.x += arg[0].x
//          this.y += arg[0].y
//       } else {
//          this.x += arg[0]
//          this.y += arg[1] ?? arg[0]
//       }
//       return this
//    };

//    toString() {
//       return `[Point2D(${this.x},${this.y})]`
//    };

// }
