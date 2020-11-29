import Vector2D from "./Vector2D.js"

export default class Point2D extends Vector2D {
  static fromVector(vec: Vector2D): Point2D {
    return new Point2D(vec.x, vec.y)
  }

  constructor(x: number, y: number) {
    super(x, y)
  }

  toString() {
    return `[Point2D(${this.x},${this.y})]`
  }

  cloneAsPoint(): Point2D {
    return new Point2D(this.x, this.y)
  }

  moveToXY(x: number, y: number): Point2D {
    this.x = x
    this.y = y
    return this
  }

  moveTo(p: Vector2D): Point2D {
    this.x = p.x
    this.y = p.y
    return this
  }

  moveByXY(x: number, y: number): Point2D {
    this.x += x
    this.y += y
    return this
  }

  moveBy(vec: Vector2D): Point2D {
    this.x += vec.x
    this.y += vec.y
    return this
  }
}
