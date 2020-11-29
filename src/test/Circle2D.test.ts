import Circle2D from "../geometric/Circle2D"
import Vector2D from "../geometric/Vector2D"

test("Constructor", () => {
  const c1 = new Circle2D(10, 15, 20)
  expect(c1.x).toBe(10)
  expect(c1.y).toBe(15)
  expect(c1.r).toBe(20)
})

test("fromPoints", () => {
  const p1 = new Vector2D(10, 15)
  const c1 = Circle2D.fromPoint(p1, 20)
  expect(c1.x).toBe(10)
  expect(c1.y).toBe(15)
  expect(c1.r).toBe(20)
})

test("cloneAsCircle", () => {
  const c1 = new Circle2D(10, 15, 20)
  const c2 = c1.cloneAsCircle()
  c1.x = 99
  expect(c1 === c2).toBe(false)
  expect(c2.x).toBe(10)
  expect(c2.y).toBe(15)
  expect(c2.r).toBe(20)
})

test("toString", () => {
  const c1 = new Circle2D(10, 15, 20)
  const ss = c1.toString()
  expect(ss).toBe(`[Circle2D(10,15,r:20)]`)
})
