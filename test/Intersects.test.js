import Canvas from "../dist/canvas/canvas.js"
import Intersects from "../dist/geometric/Intersects.js"
import Line2D from "../dist/geometric/Line2D.js"
import Polygon2D from "../dist/geometric/Polygon2D.js"
import Rectangle2D from "../dist/geometric/Rectangle2D.js"
import Vector2D from "../dist/geometric/Vector2D.js"

test("lines must accept 3 overloads", () => {
  const l1 = new Line2D(10, 50, 300, 50)
  const l2 = new Line2D(50, 10, 50, 100)
  const l3 = new Line2D(10, 10, 60, 45)
  const cross1_2 = Intersects.lines(l1, l2)
  const cross2_1 = Intersects.lines(l2, l1)
  const cross1_3 = Intersects.lines(l1, l3)
  const cross3_1 = Intersects.lines(l3, l1)
  const cross2_3 = Intersects.lines(l2, l3)
  const cross3_2 = Intersects.lines(l3, l2)
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

  const cross1_2 = Intersects.rectangles(rect1, rect2)
  const cross2_1 = Intersects.rectangles(rect2, rect1)
  const cross1_3 = Intersects.rectangles(rect1, rect3)
  const cross3_1 = Intersects.rectangles(rect3, rect1)
  const cross2_3 = Intersects.rectangles(rect2, rect3)
  const cross3_2 = Intersects.rectangles(rect3, rect2)

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

  const cross1_2 = Intersects.polygons(pol1, pol2)
  const cross2_1 = Intersects.polygons(pol2, pol1)

  const cross1_3 = Intersects.polygons(pol1, pol3)
  const cross3_1 = Intersects.polygons(pol3, pol1)

  const cross2_3 = Intersects.polygons(pol2, pol3)
  const cross3_2 = Intersects.polygons(pol3, pol2)

  expect(cross1_2).toBe(true)
  expect(cross2_1).toBe(true)
  expect(cross1_3).toBe(true)
  expect(cross3_1).toBe(true)
  expect(cross2_3).toBe(false)
  expect(cross3_2).toBe(false)
})
