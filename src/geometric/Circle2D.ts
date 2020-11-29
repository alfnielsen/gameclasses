import Point2D from "./Point2D.js"
import Vector2D from "./Vector2D.js"

export default class Circle2D extends Point2D {
  public r: number

  static fromPoint(vec: Vector2D, r: number): Circle2D {
    return new Circle2D(vec.x, vec.y, r)
  }

  constructor(x: number, y: number, r: number) {
    super(x, y)
    this.r = r
  }

  cloneAsCircle(): Circle2D {
    return new Circle2D(this.x, this.y, this.r)
  }

  toString() {
    return `[Circle2D(${this.x},${this.y},r:${this.r})]`
  }
}
