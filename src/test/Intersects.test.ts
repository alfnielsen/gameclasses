import Intersects from "../geometric/Intersects"
import Line2D from "../geometric/Line2D"
import Polygon2D from "../geometric/Polygon2D"
import Rectangle2D from "../geometric/Rectangle2D"
import Vector2D from "../geometric/Vector2D"

test("lines must accept 3 overloads", () => {
  const l1 = new Line2D(10, 50, 300, 50)
  const l2 = new Line2D(50, 10, 50, 100)
  const l3 = new Line2D(10, 10, 60, 45)
  const cross1_2 = Intersects.lines(l1, l1.end, l2, l2.end)
  const cross2_1 = Intersects.lines(l2, l2.end, l1, l1.end)
  const cross1_3 = Intersects.lines(l1, l1.end, l3, l3.end)
  const cross3_1 = Intersects.lines(l3, l3.end, l1, l1.end)
  const cross2_3 = Intersects.lines(l2, l2.end, l3, l3.end)
  const cross3_2 = Intersects.lines(l3, l3.end, l2, l2.end)
  expect(cross1_2).toBe(true)
  expect(cross2_1).toBe(true)
  expect(cross1_3).toBe(false)
  expect(cross3_1).toBe(false)
  expect(cross2_3).toBe(true)
  expect(cross3_2).toBe(true)
})

test("rectangles must must return correct result", () => {
  const rect1 = new Rectangle2D(100, 100, 100, 100)
  const rect2 = new Rectangle2D(70, 70, 40, 40)
  const rect3 = new Rectangle2D(50, 50, 25, 25)

  const cross1_2 = Intersects.rectangles(rect1, rect1.dim, rect2, rect2.dim)
  const cross2_1 = Intersects.rectangles(rect2, rect2.dim, rect1, rect1.dim)
  const cross1_3 = Intersects.rectangles(rect1, rect1.dim, rect3, rect3.dim)
  const cross3_1 = Intersects.rectangles(rect3, rect3.dim, rect1, rect1.dim)
  const cross2_3 = Intersects.rectangles(rect2, rect2.dim, rect3, rect3.dim)
  const cross3_2 = Intersects.rectangles(rect3, rect3.dim, rect2, rect2.dim)

  expect(cross1_2).toBe(true)
  expect(cross2_1).toBe(true)
  expect(cross1_3).toBe(false)
  expect(cross3_1).toBe(false)
  expect(cross2_3).toBe(true)
  expect(cross3_2).toBe(true)
})

test("polyline must must return correct result", () => {
  const pol1 = new Polygon2D([
    new Vector2D(10, 10),
    new Vector2D(50, 10),
    new Vector2D(50, 50),
    new Vector2D(100, 50),
    new Vector2D(100, 100),
    new Vector2D(10, 100),
  ])

  const pol2 = new Polygon2D([
    new Vector2D(10, 10),
    new Vector2D(100, 100),
    new Vector2D(0, 25),
  ])

  const pol3 = new Polygon2D([
    new Vector2D(30, 80),
    new Vector2D(20, 120),
    new Vector2D(20, 50),
  ])

  const cross1_2 = Intersects.polygons(pol1.points, pol2.points)
  const cross2_1 = Intersects.polygons(pol2.points, pol1.points)
  const cross1_3 = Intersects.polygons(pol1.points, pol3.points)
  const cross3_1 = Intersects.polygons(pol3.points, pol1.points)
  const cross2_3 = Intersects.polygons(pol2.points, pol3.points)
  const cross3_2 = Intersects.polygons(pol3.points, pol2.points)

  expect(cross1_2).toBe(true)
  expect(cross2_1).toBe(true)
  expect(cross1_3).toBe(true)
  expect(cross3_1).toBe(true)
  expect(cross2_3).toBe(false)
  expect(cross3_2).toBe(false)
})
