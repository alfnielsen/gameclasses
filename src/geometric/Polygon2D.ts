import Point2D from "./Point2D.js"
import Vector2D from "./Vector2D.js"

export default class Polygon2D {
   public points: Point2D[]

   constructor(points: Vector2D[]) {
      this.points = points.map(vec => new Point2D(vec))
   }

   clonePolygon(): Polygon2D {
      return new Polygon2D(this.points)
   };

   toString() {
      return `[Polygon2D(points:${this.points.length})]`
   };

}
