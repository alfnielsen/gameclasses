import Canvas from "../dist/canvas/canvas.js"
import Vector2D from "../dist/geometric/Vector2D.js"

test("Constructor must accept 4 overloads", () => {
  const v1 = new Vector2D()
  expect(v1.x).toBe(0)
  expect(v1.y).toBe(0)
  const v2 = new Vector2D(25, 75)
  expect(v2.x).toBe(25)
  expect(v2.y).toBe(75)
  const v3_1 = new Vector2D(66, 77)
  const v3 = new Vector2D(v3_1)
  expect(v3.x).toBe(66)
  expect(v3.y).toBe(77)
  const v4 = new Vector2D(Canvas.radian(90), 2, true)
  expect(v4.x).toBeCloseTo(0, 6)
  expect(v4.y).toBeCloseTo(2, 6)
})

test("toString should return correct string", () => {
  const v1 = new Vector2D(25, 35)
  const ss = v1.toString()
  expect(ss).toBe(`[Vector2D(25,35)]`)
})

test("cloneVector should return correct new vector", () => {
  const v1 = new Vector2D(25, 35)
  const v2 = v1.cloneVector()
  v1.x = 99
  v1.y = 99
  expect(v2.x).toBe(25)
  expect(v2.y).toBe(35)
})

test("delta should return correct new vector", () => {
  const v1 = new Vector2D(25, 25)
  const v2 = new Vector2D(100, 50)
  const delta = v1.delta(v2)
  expect(delta.x).toBe(75)
  expect(delta.y).toBe(25)
  const delta2 = v2.delta(v1)
  expect(delta2.x).toBe(-75)
  expect(delta2.y).toBe(-25)
  const delta3 = v1.delta(100, 50)
  expect(delta3.x).toBe(75)
  expect(delta3.y).toBe(25)
})

test("distTo should return correct number", () => {
  const v1 = new Vector2D(25, 25)
  const v1_2 = new Vector2D(25, 100)
  const distTo1 = v1.distTo(v1_2)
  expect(distTo1).toBe(75)
  const v2 = new Vector2D(25, 25)
  const distTo2 = v2.distTo(75, 50)
  expect(distTo2).toBeCloseTo(55.9)
})

test("rotate should return new rotated vector", () => {
  const v1 = new Vector2D(100, 0)
  const v1_2 = v1.rotate(90, true)
  expect(v1_2.length()).toBeCloseTo(100, 6)
  expect(v1_2.x).toBeCloseTo(0, 6)
  expect(v1_2.y).toBe(100)
  const v1_3 = v1.rotate(Math.PI / 4)
  expect(v1_3.length()).toBeCloseTo(100, 6)
  expect(v1_3.x).toBeCloseTo(70.71)
  expect(v1_3.y).toBeCloseTo(70.71)
  const v2 = new Vector2D(45, 1, true, true)
  const v2_2 = v2.rotate(10, true)
  expect(v2_2.angle(true)).toBeCloseTo(55)
})

test("rotateTo should return new rotated vector", () => {
  const v1 = new Vector2D(100, 0)
  const v1_2 = v1.rotateTo(90, true)
  expect(v1_2.length()).toBeCloseTo(100, 6)
  expect(v1_2.x).toBeCloseTo(0, 6)
  expect(v1_2.y).toBe(100)
  const v1_3 = v1.rotateTo(Math.PI / 2)
  expect(v1_3.length()).toBeCloseTo(100, 6)
  expect(v1_3.x).toBeCloseTo(0)
  expect(v1_3.y).toBeCloseTo(100)
})

test("angleTo should return correct new vector", () => {
  const v1 = new Vector2D(100, 100)
  const v2 = new Vector2D(125, 75)
  const angle = v1.angleTo(v2, true)
  expect(angle).toBeCloseTo(-45)
  const angle2 = v1.angleTo(150, 150, true)
  expect(angle2).toBeCloseTo(45)
})

test("angleBetween should return correct angle", () => {
  const v1 = new Vector2D(100, 100)
  const v2 = new Vector2D(0, 100)
  const angle = v1.angleBetween(v2, true)
  expect(angle).toBeCloseTo(45)
  const angle2 = v1.angleBetween(150, 150, true)
  expect(angle2).toBeCloseTo(0)
})

test("angleVector should return correct vector", () => {
  const v1 = new Vector2D(100, 0)
  const v1_2 = v1.angleVector(90, 100, true)
  expect(v1_2.x).toBeCloseTo(100)
  expect(v1_2.y).toBeCloseTo(100)
})

test("angle should return correct number", () => {
  const v1 = new Vector2D(100, 0)
  expect(v1.angle()).toBeCloseTo(0)
  const v2 = new Vector2D(100, 100)
  expect(v2.angle(true)).toBeCloseTo(45)
})

test("length should return correct number", () => {
  const v1 = new Vector2D(100, 0)
  expect(v1.length()).toBeCloseTo(100)
  const v2 = new Vector2D(100, 100)
  expect(v2.length()).toBeCloseTo(141.42)
})

test("sub should return correct vector", () => {
  const v1 = new Vector2D(100, 40)
  const v1_2 = new Vector2D(25, 25)
  const v1_3 = v1.add(v1_2)
  expect(v1_3.x).toBe(125)
  expect(v1_3.y).toBe(65)
  const v2 = v1.add(10, 10)
  expect(v2.x).toBe(110)
  expect(v2.y).toBe(50)
})

test("sub should return correct vector", () => {
  const v1 = new Vector2D(100, 40)
  const v1_2 = new Vector2D(25, 25)
  const v1_3 = v1.sub(v1_2)
  expect(v1_3.x).toBe(75)
  expect(v1_3.y).toBe(15)
  const v2 = v1.sub(10, 10)
  expect(v2.x).toBe(90)
  expect(v2.y).toBe(30)
})

test("multi should return correct vector", () => {
  const v1 = new Vector2D(10, 20)
  const v1_2 = new Vector2D(2, 5)
  const v1_3 = v1.multi(v1_2)
  expect(v1_3.x).toBe(20)
  expect(v1_3.y).toBe(100)
  const v2 = v1.multi(10, 10)
  expect(v2.x).toBe(100)
  expect(v2.y).toBe(200)
})

test("divide should return correct vector", () => {
  const v1 = new Vector2D(10, 20)
  const v1_2 = new Vector2D(2, 5)
  const v1_3 = v1.divide(v1_2)
  expect(v1_3.x).toBe(5)
  expect(v1_3.y).toBe(4)
  const v2 = v1.divide(10, 10)
  expect(v2.x).toBe(1)
  expect(v2.y).toBe(2)
})

test("scale should return correct vector", () => {
  const v1 = new Vector2D(10, 20)
  const v1_2 = v1.scale(3)
  expect(v1_2.x).toBe(30)
  expect(v1_2.y).toBe(60)
})

test("scaleTo should return correct vector", () => {
  const v1 = new Vector2D(45, 20, true, true)
  const v1_2 = v1.scaleTo(5)
  expect(v1_2.angle(true)).toBe(45)
  expect(v1_2.length()).toBe(5)
})

test("scalar should return correct number", () => {
  const v1 = new Vector2D(10, 20)
  const v2 = new Vector2D(20, 30)
  const scalar = v1.scalar(v2)
  expect(scalar).toBe(800)
  const scalar2 = v1.scalar(20, 30)
  expect(scalar2).toBe(800)
})

test("cross should return correct number", () => {
  const v1 = new Vector2D(10, 20)
  const v2 = new Vector2D(20, 30)
  const cross = v1.cross(v2)
  expect(cross).toBe(-100)
  const cross2 = v1.cross(20, 30)
  expect(cross2).toBe(-100)
})

test("projection should return correct vector", () => {
  const v1 = new Vector2D(100, 0)
  const v2 = v1.add(0, 50)
  expect(v2.x).toBe(100)
  expect(v2.y).toBe(50)
  const v3 = new Vector2D(150, 0)
  const proj = v2.projection(v3)
  expect(proj.x).toBe(100)
  expect(proj.y).toBe(0)
  const proj2 = v3.projection(100, 50)
  expect(proj2.x).toBe(120)
  expect(proj2.y).toBe(60)
})

test("distToProjection should return correct number", () => {
  const v1 = new Vector2D(100, 0)
  const v2 = v1.add(0, 50)
  const dist = v2.distToProjection(v1)
  expect(dist).toBe(50)
  const dist2 = v1.distToProjection(100, 50)
  expect(dist2).toBeCloseTo(44.72)
})

test("vectorToProjection should return correct vector", () => {
  const v1 = new Vector2D(100, 0)
  const v2 = v1.vectorToProjection(100, 50)
  expect(v2.x).toBe(-20)
  expect(v2.y).toBe(40)
  const v3_1 = new Vector2D(100, 50)
  const v3 = v1.vectorToProjection(v3_1)
  expect(v3.x).toBe(-20)
  expect(v3.y).toBe(40)
})

test("log should write to console.log", () => {
  const spy = jest.spyOn(console, "log").mockImplementation()
  const v1 = new Vector2D(100, 0)
  v1.log()
  v1.log("Test")
  expect(spy.mock.calls).toEqual([[v1], ["Test", v1]])
  spy.mockRestore()
})
