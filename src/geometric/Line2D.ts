import Point2D from "./Point2D.js"
import Vector2D from "./Vector2D.js"

export default class Line2D extends Point2D {
  public end: Point2D

  static fromPoints(p1: Vector2D, p2: Vector2D): Line2D {
    return new Line2D(p1.x, p1.y, p2.x, p2.y)
  }

  static fromPointAndAngle(
    vec: Vector2D,
    angle: number,
    length: number
  ): Line2D {
    let av = Vector2D.fromAngle(angle, length)
    return new Line2D(vec.x, vec.y, vec.x + av.x, vec.y + av.y)
  }

  constructor(x1: number, y1: number, x2: number, y2: number) {
    super(x1, y1)
    this.end = new Point2D(x2, y2)
  }

  cloneAsLine(): Line2D {
    return new Line2D(this.x, this.y, this.end.x, this.end.y)
  }

  length(): number {
    return this.deltaVector().length()
  }

  angle(): number {
    return this.deltaVector().angle()
  }

  reverse() {
    const x = this.x
    this.x = this.end.x
    this.end.x = x
    const y = this.y
    this.y = this.end.y
    this.end.y = y
    return this
  }

  deltaVector() {
    return new Vector2D(this.end.x - this.x, this.end.y - this.y)
  }

  deltaVectorBack() {
    return new Vector2D(this.x - this.end.x, this.y - this.end.y)
  }

  rotateFromP1(angle: number) {
    let newPoint = this.deltaVector().rotate(angle).add(this)
    this.end.moveTo(newPoint)
    return this
  }

  rotateFromP2(angle: number) {
    let newPoint = this.deltaVectorBack().rotate(angle).add(this.end)
    this.moveTo(newPoint)
    return this
  }

  scaleLineFromP1(k: number) {
    const newPoint = this.deltaVector().scale(k).add(this)
    this.end.moveTo(newPoint)
    return this
  }

  scaleLineTo(k: number) {
    const newPoint = this.deltaVector().scaleTo(k).add(this)
    this.end.moveTo(newPoint)
    return this
  }

  scaleLineToByP2(k: number) {
    const newPoint = this.deltaVectorBack().scaleTo(k).add(this.end)
    this.moveTo(newPoint)
    return this
  }

  moveLineToByP1(vec: Vector2D): Line2D {
    const delta = this.deltaVector().add(vec)
    this.moveTo(vec)
    this.end.moveTo(delta)
    return this
  }

  moveLineToByP2(vec: Vector2D): Line2D {
    const delta = this.deltaVectorBack().add(vec)
    this.end.moveTo(vec)
    this.moveTo(delta)
    return this
  }

  moveLineTo(vec1: Vector2D, vec2: Vector2D): Line2D {
    this.moveTo(vec1)
    this.end.moveTo(vec2)
    return this
  }

  moveLineBy(vec1: Vector2D, vec2: Vector2D = vec1): Line2D {
    this.moveBy(vec1)
    this.end.moveBy(vec2)
    return this
  }

  toString() {
    return `[Line2D(${this.x},${this.y},${this.end.x},${this.end.y})]`
  }
}
