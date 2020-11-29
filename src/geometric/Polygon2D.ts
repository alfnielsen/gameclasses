import Vector2D from "./Vector2D.js"

export default class Polygon2D {
  constructor(public points: Vector2D[]) {}

  cloneAsPolygon(): Polygon2D {
    return new Polygon2D(this.points.map((point) => point))
  }

  toString() {
    return `[Polygon2D(points:${this.points.length})]`
  }
}
