import Point2D from "../geometric/Point2D"
import Vector2D from "../geometric/Vector2D"
import { MathX } from "../util/MathX"

test("Constructor", () => {
  const v1 = new Vector2D(45, 67)
  const p1 = Point2D.fromVector(v1)
  expect(p1.x).toBe(45)
  expect(p1.y).toBe(67)
  const p2 = new Point2D(35, 56)
  expect(p2.x).toBe(35)
  expect(p2.y).toBe(56)
})

test("cloneAsPoint", () => {
  const p1 = new Point2D(20, 20)
  const p2 = p1.cloneAsPoint()
  p1.moveBy(new Vector2D(10, 10))
  expect(p1.x).toBe(30)
  expect(p1.y).toBe(30)
  expect(p2.x).toBe(20)
  expect(p2.y).toBe(20)
})

test("moveTo", () => {
  const p1 = new Point2D(20, 20)
  const v1 = new Vector2D(10, 10)
  const p1_ref1 = p1.moveTo(v1)
  const p1_ref2 = p1_ref1.cloneAsPoint()
  expect(p1_ref1 === p1).toBe(true)
  expect(p1_ref2 === p1).toBe(false)
  expect(p1.x).toBe(10)
  expect(p1.y).toBe(10)
  const p2 = new Point2D(20, 20)
  p2.moveTo(new Vector2D(15, 15))
  expect(p2.x).toBe(15)
  expect(p2.y).toBe(15)
})
test("moveToXY", () => {
  const p1 = new Point2D(20, 20).moveToXY(25, 17)
  expect(p1.x).toBe(25)
  expect(p1.y).toBe(17)
})
test("moveByXY", () => {
  const p1 = new Point2D(20, 20).moveByXY(25, 17)
  expect(p1.x).toBe(45)
  expect(p1.y).toBe(37)
})

test("moveBy", () => {
  const p1 = new Point2D(20, 20)
  const v1 = new Vector2D(10, 10)
  const p1_ref1 = p1.moveBy(v1)
  const p1_ref2 = p1_ref1.cloneAsPoint()
  expect(p1_ref1 === p1).toBe(true)
  expect(p1_ref2 === p1).toBe(false)
  expect(p1.x).toBe(30)
  expect(p1.y).toBe(30)
  const p2 = new Point2D(20, 20)
  p2.moveBy(new Vector2D(15, 15))
  expect(p2.x).toBe(35)
  expect(p2.y).toBe(35)
  const p3 = new Point2D(20, 20)
  p3.moveBy(new Vector2D(24, 24))
  expect(p3.x).toBe(44)
  expect(p3.y).toBe(44)
})

test("toString", () => {
  const p1 = new Point2D(25, 35)
  const ss = p1.toString()
  expect(ss).toBe(`[Point2D(25,35)]`)
})

test("log", () => {
  const spy = jest.spyOn(console, "log").mockImplementation()
  const p1 = new Point2D(100, 0)
  p1.log()
  p1.log("Test")
  expect(spy.mock.calls).toEqual([[p1], ["Test", p1]])
  spy.mockRestore()
})
