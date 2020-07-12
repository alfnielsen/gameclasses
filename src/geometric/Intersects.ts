import Line2D from "./Line2D.js"
import Polygon2D from "./Polygon2D.js"
import Rectangle2D from "./Rectangle2D.js"
import Vector2D from "./Vector2D.js"

export default class Intersects {


   static rectangles(rect1: Rectangle2D, rect2: Rectangle2D) {
      return rect1.x + rect1.dim.x > rect2.x
         && rect1.x < rect2.x + rect2.dim.x
         && rect1.y + rect1.dim.y > rect2.y
         && rect1.y < rect2.y + rect2.dim.y
   }

   static polygons(poly1: Polygon2D, poly2: Polygon2D) {
      for (let i = 1; i < poly1.points.length + 1; i++) {
         let l1: Line2D
         if (i < poly1.points.length) {
            l1 = new Line2D(poly1.points[i - 1].x, poly1.points[i - 1].y, poly1.points[i].x, poly1.points[i].y)
         }
         else {
            l1 = new Line2D(poly1.points[i - 1].x, poly1.points[i - 1].y, poly1.points[0].x, poly1.points[0].y)
         }
         for (let q = 1; q < poly2.points.length + 1; q++) {
            let l2: Line2D
            if (q < poly2.points.length) {
               l2 = new Line2D(poly2.points[q - 1].x, poly2.points[q - 1].y, poly2.points[q].x, poly2.points[q].y)

            } else {
               l2 = new Line2D(poly2.points[q - 1].x, poly2.points[q - 1].y, poly2.points[0].x, poly2.points[0].y)

            }
            const cross = Intersects.lines(l1, l2)
            if (cross) {
               return true
            }
         }
      }
      return false
   }

   static lines(l1x1: number, l1y1: number, l1x2: number, l1y2: number, l2x1: number, l2y1: number, l2x2: number, l2y2: number): boolean
   static lines(l1p1: Vector2D, l1p2: Vector2D, l2p1: Vector2D, l2p2: Vector2D): boolean
   static lines(line1: Line2D, line2: Line2D): boolean
   static lines(...arg: any[]) {
      let a: number, b: number, c: number, d: number, p: number, q: number, r: number, s: number
      if (arg[0] instanceof Line2D && arg[1] instanceof Line2D) {
         a = arg[0].x
         b = arg[0].y
         c = arg[0].p.x
         d = arg[0].p.y
         p = arg[1].x
         q = arg[1].y
         r = arg[1].p.x
         s = arg[1].p.y
      } else if (arg[0] instanceof Vector2D) {
         a = arg[0].x
         b = arg[0].y
         c = arg[1].x
         d = arg[1].y
         p = arg[2].x
         q = arg[2].y
         r = arg[3].x
         s = arg[3].y
      } else {
         a = arg[0]
         b = arg[1]
         c = arg[2]
         d = arg[3]
         p = arg[4]
         q = arg[5]
         r = arg[6]
         s = arg[7]
      }
      let det: number, gamma: number, lambda: number
      det = (c - a) * (s - q) - (r - p) * (d - b)
      if (det === 0) {
         return false
      } else {
         lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det
         gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det
         return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)
      }
   };
}
