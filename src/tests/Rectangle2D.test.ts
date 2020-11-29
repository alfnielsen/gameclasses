import Rectangle2D from "../geometric/Rectangle2D"
import Vector2D from "../geometric/Vector2D"
import { MathX } from "../util/MathX"

test("Constructor", () => {
  const r1 = new Rectangle2D(10, 15, 20, 50)
  expect(r1.x).toBe(10)
  expect(r1.y).toBe(15)
  expect(r1.dim.x).toBe(20)
  expect(r1.dim.y).toBe(50)
})

test("fromPoints", () => {
  const p1 = new Vector2D(10, 15)
  const p2 = new Vector2D(20, 50)
  const r1 = Rectangle2D.fromPoints(p1, p2)
  expect(r1.x).toBe(10)
  expect(r1.y).toBe(15)
  expect(r1.dim.x).toBe(10)
  expect(r1.dim.y).toBe(35)
})

test("fromPoint", () => {
  const p1 = new Vector2D(10, 15)
  const d1 = new Vector2D(20, 50)
  const r1 = Rectangle2D.fromPoint(p1, d1)
  expect(r1.x).toBe(10)
  expect(r1.y).toBe(15)
  expect(r1.dim.x).toBe(20)
  expect(r1.dim.y).toBe(50)
})

test("fromPointAndAngle", () => {
  const p1 = new Vector2D(10, 15)
  const r1 = Rectangle2D.fromPointAndAngle(p1, MathX.deg45, 50)
  expect(r1.x).toBe(10)
  expect(r1.y).toBe(15)
  expect(r1.dim.angle()).toBeCloseTo(MathX.deg45, 6)
  expect(r1.dim.length()).toBeCloseTo(50)
})

test("cloneAsRect", () => {
  const r1 = new Rectangle2D(10, 15, 20, 50)
  const r2 = r1.cloneAsRect()
  expect(r1 === r2).toBe(false)
  expect(r1.x).toBe(r2.x)
  expect(r1.y).toBe(r2.y)
  expect(r1.dim.x).toBe(r2.dim.x)
  expect(r1.dim.y).toBe(r2.dim.y)
})

test("resize", () => {
  const r1 = new Rectangle2D(10, 15, 20, 50)
  const newSize = new Vector2D(5, 5)
  r1.resize(newSize)
  expect(r1.x).toBe(10)
  expect(r1.y).toBe(15)
  expect(r1.dim.x).toBe(5)
  expect(r1.dim.y).toBe(5)
})

test("addSize", () => {
  const r1 = new Rectangle2D(10, 15, 20, 50)
  const newAddSize = new Vector2D(5, 5)
  r1.addSize(newAddSize)
  expect(r1.x).toBe(10)
  expect(r1.y).toBe(15)
  expect(r1.dim.x).toBe(25)
  expect(r1.dim.y).toBe(55)
})

test("toString", () => {
  const c1 = new Rectangle2D(10, 15, 20, 30)
  const ss = c1.toString()
  expect(ss).toBe(`[Rectangle2D(10,15,20,30)]`)
})
