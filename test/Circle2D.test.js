import Canvas from "../dist/canvas/canvas.js"
import Vector2D from "../dist/geometric/Vector2D.js"
import Circle2D from "../dist/geometric/Circle2D.js"

test("Constructor must accept 2 overloads", () => {
  const c1 = new Circle2D(10, 15, 20)
  expect(c1.x).toBe(10)
  expect(c1.y).toBe(15)
  expect(c1.r).toBe(20)
})

test("cloneCircle should return correct new vector", () => {
  const c1 = new Circle2D(10, 15, 20)
  const c2 = c1.cloneCircle()
  c1.x = 99
  expect(c1 === c2).toBe(false)
  expect(c2.x).toBe(10)
  expect(c2.y).toBe(15)
  expect(c2.r).toBe(20)
})

test("toString should return correct string", () => {
  const c1 = new Circle2D(10, 15, 20)
  const ss = c1.toString()
  expect(ss).toBe(`[Circle2D(10,15,r:20)]`)
})
