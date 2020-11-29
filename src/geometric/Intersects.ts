import Vector2D from "./Vector2D.js"

export default class Intersects {
  static rectangles(
    rect1P1: Vector2D,
    rect1P2: Vector2D,
    rect2P1: Vector2D,
    rect2P2: Vector2D
  ) {
    return (
      rect1P1.x + rect1P2.x > rect2P1.x &&
      rect1P1.x < rect2P1.x + rect2P2.x &&
      rect1P1.y + rect1P2.y > rect2P1.y &&
      rect1P1.y < rect2P1.y + rect2P2.y
    )
  }

  static polygons(poly1: Vector2D[], poly2: Vector2D[]) {
    for (let i = 1; i < poly1.length + 1; i++) {
      let p1 = new Vector2D(poly1[i - 1].x, poly1[i - 1].y)
      let p2: Vector2D
      if (i < poly1.length) {
        p2 = new Vector2D(poly1[i].x, poly1[i].y)
      } else {
        p2 = new Vector2D(poly1[0].x, poly1[0].y)
      }
      for (let q = 1; q < poly2.length + 1; q++) {
        let p3 = new Vector2D(poly2[q - 1].x, poly2[q - 1].y)
        let p4: Vector2D

        if (q < poly2.length) {
          p4 = new Vector2D(poly2[q].x, poly2[q].y)
        } else {
          p4 = new Vector2D(poly2[0].x, poly2[0].y)
        }
        const cross = Intersects.lines(p1, p2, p3, p4)
        if (cross) {
          return true
        }
      }
    }
    return false
  }

  static lines(
    p1: Vector2D,
    p2: Vector2D,
    p3: Vector2D,
    p4: Vector2D
  ): boolean {
    let det = (p2.x - p1.x) * (p4.y - p3.y) - (p4.x - p3.x) * (p2.y - p1.y)
    if (det === 0) {
      return false
    } else {
      let lambda =
        ((p4.y - p3.y) * (p4.x - p1.x) + (p3.x - p4.x) * (p4.y - p1.y)) / det
      let gamma =
        ((p1.y - p2.y) * (p4.x - p1.x) + (p2.x - p1.x) * (p4.y - p1.y)) / det
      return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1
    }
  }
}
