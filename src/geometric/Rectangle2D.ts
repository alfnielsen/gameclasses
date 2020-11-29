import Line2D from "./Line2D.js"
import Point2D from "./Point2D.js"
import Vector2D from "./Vector2D.js"

export default class Rectangle2D extends Point2D {
  public dim: Vector2D

  static fromPoints(p1: Vector2D, p2: Vector2D): Rectangle2D {
    return new Rectangle2D(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y)
  }

  static fromPoint(p1: Vector2D, dim: Vector2D): Rectangle2D {
    return new Rectangle2D(p1.x, p1.y, dim.x, dim.y)
  }

  static fromPointAndAngle(
    vec: Vector2D,
    angle: number,
    length: number
  ): Rectangle2D {
    let av = Vector2D.fromAngle(angle, length)
    return new Rectangle2D(vec.x, vec.y, av.x, av.y)
  }

  constructor(x: number, y: number, w: number, h: number) {
    super(x, y)
    this.dim = new Vector2D(w, h)
  }

  cloneAsRect(): Rectangle2D {
    return new Rectangle2D(this.x, this.y, this.dim.x, this.dim.y)
  }

  resize(d: Vector2D) {
    this.dim.x = d.x
    this.dim.y = d.y
    return this
  }

  addSize(d: Vector2D) {
    this.dim.x += d.x
    this.dim.y += d.y
    return this
  }

  toString() {
    return `[Rectangle2D(${this.x},${this.y},${this.dim.x},${this.dim.y})]`
  }
}
