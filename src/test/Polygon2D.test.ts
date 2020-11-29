import Line2D from "../geometric/Line2D"
import Point2D from "../geometric/Point2D"
import Polygon2D from "../geometric/Polygon2D"
import Vector2D from "../geometric/Vector2D"
import { MathX } from "../util/MathX"

test("constructor", () => {
  const po1 = new Polygon2D([
    new Vector2D(2, 2),
    new Vector2D(3, 5),
    new Vector2D(1, 4),
  ])
  expect(po1.points.length).toBe(3)
  expect(po1.points[0].x).toBe(2)
  expect(po1.points[0].y).toBe(2)
  expect(po1.points[1].x).toBe(3)
  expect(po1.points[1].y).toBe(5)
  expect(po1.points[2].x).toBe(1)
  expect(po1.points[2].y).toBe(4)
})

test("cloneAsPolygon", () => {
  const po1 = new Polygon2D([
    new Vector2D(2, 2),
    new Vector2D(3, 5),
    new Vector2D(1, 4),
  ])
  const po2 = po1.cloneAsPolygon()
  expect(po1.points.length).toBe(3)
  expect(po2.points.length).toBe(3)
  expect(po1.points[0].x).toBe(2)
  expect(po1.points[0].y).toBe(2)
  expect(po2.points[0].x).toBe(2)
  expect(po2.points[0].y).toBe(2)
  expect(po1.points[0] === po1.points[1]).toBe(false)
})

test("toString", () => {
  const po1 = new Polygon2D([
    new Vector2D(2, 2),
    new Vector2D(3, 5),
    new Vector2D(1, 4),
    new Vector2D(2, 2),
    new Vector2D(3, 5),
    new Vector2D(1, 4),
  ])
  const ss = po1.toString()
  expect(ss).toBe(`[Polygon2D(points:6)]`)
})
