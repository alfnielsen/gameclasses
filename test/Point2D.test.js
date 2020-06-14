import Canvas from "../dist/canvas/canvas.js"
import Vector2D from "../dist/geometric/Vector2D.js"
import Point2D from "../dist/geometric/Point2D.js"

test("Constructor must accept 2 overloads", () => {
  const v1 = new Vector2D(45, 67)
  const p1 = new Point2D(v1)
  expect(p1.x).toBe(45)
  expect(p1.y).toBe(67)
  const p2 = new Point2D(35, 56)
  expect(p2.x).toBe(35)
  expect(p2.y).toBe(56)
})

test("clonePoint should return new point", () => {
  const p1 = new Point2D(20, 20)
  const p2 = p1.clonePoint()
  p1.movePointBy(10, 10)
  expect(p1.x).toBe(30)
  expect(p1.y).toBe(30)
  expect(p2.x).toBe(20)
  expect(p2.y).toBe(20)
})

test("movePointTo should accept 2 overload and return same moved point.", () => {
  const p1 = new Point2D(20, 20)
  const v1 = new Vector2D(10, 10)
  const p1_ref1 = p1.movePointTo(v1)
  const p1_ref2 = p1_ref1.clonePoint()
  expect(p1_ref1 === p1).toBe(true)
  expect(p1_ref2 === p1).toBe(false)
  expect(p1.x).toBe(10)
  expect(p1.y).toBe(10)
  const p2 = new Point2D(20, 20)
  p2.movePointTo(15, 15)
  expect(p2.x).toBe(15)
  expect(p2.y).toBe(15)
})

test("movePointBy should accept 2 overload and return same moved point.", () => {
  const p1 = new Point2D(20, 20)
  const v1 = new Vector2D(10, 10)
  const p1_ref1 = p1.movePointBy(v1)
  const p1_ref2 = p1_ref1.clonePoint()
  expect(p1_ref1 === p1).toBe(true)
  expect(p1_ref2 === p1).toBe(false)
  expect(p1.x).toBe(30)
  expect(p1.y).toBe(30)
  const p2 = new Point2D(20, 20)
  p2.movePointBy(15, 15)
  expect(p2.x).toBe(35)
  expect(p2.y).toBe(35)
})

test("movePointBy should accept 2 overload and return same moved point.", () => {
  const p1 = new Point2D(20, 20)
  const v1 = new Vector2D(10, 10)
  const p1_ref1 = p1.movePointBy(v1)
  const p1_ref2 = p1_ref1.clonePoint()
  expect(p1_ref1 === p1).toBe(true)
  expect(p1_ref2 === p1).toBe(false)
  expect(p1.x).toBe(30)
  expect(p1.y).toBe(30)
  const p2 = new Point2D(20, 20)
  p2.movePointBy(15, 15)
  expect(p2.x).toBe(35)
  expect(p2.y).toBe(35)
  const p3 = new Point2D(20, 20)
  p3.movePointBy(24)
  expect(p3.x).toBe(44)
  expect(p3.y).toBe(44)
})

test("toString should return correct string", () => {
  const p1 = new Point2D(25, 35)
  const ss = p1.toString()
  expect(ss).toBe(`[Point2D(25,35)]`)
})

test("log should write to console.log", () => {
  const spy = jest.spyOn(console, "log").mockImplementation()
  const p1 = new Point2D(100, 0)
  p1.log()
  p1.log("Test")
  expect(spy.mock.calls).toEqual([[p1], ["Test", p1]])
  spy.mockRestore()
})
