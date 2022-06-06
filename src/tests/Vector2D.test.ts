import Vector2D from "../geometric/Vector2D"
import { MathX } from "../util/MathX"

test("Constructor must accept 4 overloads", () => {
  const v1 = Vector2D.zero
  expect(v1.x).toBe(0)
  expect(v1.y).toBe(0)
  const v2 = new Vector2D(25, 75)
  expect(v2.x).toBe(25)
  expect(v2.y).toBe(75)
  const v3_1 = new Vector2D(66, 77)
  const v3 = v3_1.cloneAsVector()
  expect(v3.x).toBe(66)
  expect(v3.y).toBe(77)
  const v4 = Vector2D.fromAngle(MathX.toRadians(90), 2)
  expect(v4.x).toBeCloseTo(0, 6)
  expect(v4.y).toBeCloseTo(2, 6)
  
})

test("static factories: zero, one and norm: should return correct vectors", () => {
  const z1 = Vector2D.zero
  const z2 = Vector2D.zero
  expect(z1 === z2).toBeFalsy()
  expect(z1.x).toBe(0)
  expect(z2.y).toBe(0)
  const o1 = Vector2D.one
  const o2 = Vector2D.one
  expect(o1 === o2).toBeFalsy()
  expect(o1.x).toBe(1)
  expect(o2.y).toBe(1)
  const n1 = Vector2D.norm
  const n2 = Vector2D.norm
  expect(n1 === n2).toBeFalsy()
  expect(n1.x).toBe(1)
  expect(n2.y).toBe(0)
})
test("static factories: from array and from vector: should return correct vectors", () => {
  const v1 = Vector2D.fromArray([45, 15])
  expect(v1.x).toBe(45)
  expect(v1.y).toBe(15)
  const v2 = Vector2D.fromVector(v1)
  expect(v1 === v2).toBeFalsy()
  expect(v2.x).toBe(45)
  expect(v2.y).toBe(15)
})

test("isEqualTo and isZero", () => {
  const v1 = new Vector2D(15, 15)
  const v2 = new Vector2D(15, 15)
  expect(v1 === v2).toBeFalsy()
  expect(v1.isEqualTo(v2)).toBeTruthy()
  const vz1 = new Vector2D(15, 15)
  expect(vz1.isZero()).toBeFalsy()
  const vz2 = new Vector2D(0, 0)
  expect(vz2.isZero()).toBeTruthy()
})

test("cloneVector should return correct new vector", () => {
  const v1 = new Vector2D(25, 35)
  const v2 = v1.cloneAsVector()
  v1.x = 99
  v1.y = 99
  expect(v2.x).toBe(25)
  expect(v2.y).toBe(35)
})

test("delta should return correct new vector", () => {
  const v1 = new Vector2D(25, 25)
  const v2 = new Vector2D(100, 50)
  const delta = new Vector2D(25, 25).delta(v2)
  expect(delta.x).toBe(75)
  expect(delta.y).toBe(25)
  const delta2 = new Vector2D(100, 50).delta(v1)
  expect(delta2.x).toBe(-75)
  expect(delta2.y).toBe(-25)
  const delta3 = new Vector2D(25, 25).delta(new Vector2D(100, 50))
  expect(delta3.x).toBe(75)
  expect(delta3.y).toBe(25)
})

test("distTo should return correct number", () => {
  const v1 = new Vector2D(25, 25)
  const v1_2 = new Vector2D(25, 100)
  const distTo1 = v1.distTo(v1_2)
  expect(distTo1).toBe(75)
  const v2 = new Vector2D(25, 25)
  const distTo2 = v2.distTo(new Vector2D(75, 50))
  expect(distTo2).toBeCloseTo(55.9)
})

test("rotate", () => {
  const v1_2 = new Vector2D(100, 0).rotate(MathX.deg90)
  expect(v1_2.length()).toBeCloseTo(100, 6)
  expect(v1_2.x).toBeCloseTo(0, 6)
  expect(v1_2.y).toBe(100)
  const v1_3 = new Vector2D(100, 0).rotate(Math.PI / 4)
  expect(v1_3.length()).toBeCloseTo(100, 6)
  expect(v1_3.x).toBeCloseTo(70.71)
  expect(v1_3.y).toBeCloseTo(70.71)
  const v2 = Vector2D.fromAngle(MathX.deg45, 1)
  const v2_2 = v2.rotate(MathX.toRadians(10))
  expect(v2_2.angle()).toBeCloseTo(MathX.toRadians(55))
  const v3 = Vector2D.fromAngle(MathX.deg45, 1)
  const v2_2_1 = v3.rotateAntiClockwise(MathX.toRadians(10))
  expect(v2_2_1.angle()).toBeCloseTo(MathX.toRadians(35))
})

test("rotateTo", () => {
  const v1 = new Vector2D(100, 0)
  const v1_2 = v1.rotateTo(MathX.toRadians(90))
  expect(v1_2.length()).toBeCloseTo(100, 6)
  expect(v1_2.x).toBeCloseTo(0, 6)
  expect(v1_2.y).toBe(100)
  const v1_3 = v1.rotateTo(Math.PI / 2)
  expect(v1_3.length()).toBeCloseTo(100, 6)
  expect(v1_3.x).toBeCloseTo(0)
  expect(v1_3.y).toBeCloseTo(100)
})

test("rotateAround", () => {
  const c = new Vector2D(100, 100)
  const p = new Vector2D(50, 100)

  const tp1 = c.cloneAsVector().vectorTo(p)
  expect(tp1.x).toBe(-50)
  expect(tp1.y).toBe(0)
  tp1.rotate(MathX.deg90)
  expect(tp1.x).toBeCloseTo(0)
  expect(tp1.y).toBe(-50)

  p.rotateAround(c, MathX.deg90)
  expect(p.x).toBeCloseTo(100)
  expect(p.y).toBe(50)
  p.rotateAround(c, MathX.deg90)
  expect(p.x).toBe(150)
  expect(p.y).toBeCloseTo(100)
})

test("angleTo should return correct new vector", () => {
  const v1 = new Vector2D(100, 100)
  const v2 = new Vector2D(125, 75)
  const angle = v1.angleTo(v2)
  expect(angle).toBeCloseTo(-MathX.toRadians(45))
  const angle2 = v1.angleTo(new Vector2D(150, 150))
  expect(angle2).toBeCloseTo(MathX.deg45)
})

test("angleBetween should return correct angle", () => {
  const v1 = new Vector2D(100, 100)
  const v2 = new Vector2D(0, 100)
  const angle = v1.angleBetween(v2)
  expect(angle).toBeCloseTo(MathX.toRadians(45))
  const angle2 = v1.angleBetween(new Vector2D(150, 150))
  expect(angle2).toBeCloseTo(0)
})

test("angleVector should return correct vector", () => {
  const v1 = new Vector2D(100, 0)
  const v1_2 = v1.angleVector(MathX.toRadians(90), 100)
  expect(v1_2.x).toBeCloseTo(100)
  expect(v1_2.y).toBeCloseTo(100)
})

test("angle should return correct number", () => {
  const v1 = new Vector2D(100, 0)
  expect(v1.angle()).toBeCloseTo(0)
  const v2 = new Vector2D(100, 100)
  expect(v2.angle()).toBeCloseTo(MathX.toRadians(45))
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
  v1.add(v1_2)
  expect(v1.x).toBe(125)
  expect(v1.y).toBe(65)
  const v2_1 = new Vector2D(100, 40)
  const v2 = v2_1.add(new Vector2D(10, 10))
  expect(v2.x).toBe(110)
  expect(v2.y).toBe(50)
})

test("sub should return correct vector", () => {
  const v1 = new Vector2D(100, 40)
  const v1_2 = new Vector2D(25, 25)
  v1.sub(v1_2)
  expect(v1.x).toBe(75)
  expect(v1.y).toBe(15)
  const v2_1 = new Vector2D(100, 40)
  const v2 = v2_1.sub(new Vector2D(10, 10))
  expect(v2.x).toBe(90)
  expect(v2.y).toBe(30)
})

test("multi should return correct vector", () => {
  const v1 = new Vector2D(10, 20)
  const v1_2 = new Vector2D(2, 5)
  v1.multi(v1_2)
  expect(v1.x).toBe(20)
  expect(v1.y).toBe(100)
  const v2 = new Vector2D(10, 20)
  v2.multi(new Vector2D(10, 10))
  expect(v2.x).toBe(100)
  expect(v2.y).toBe(200)
})

test("divide", () => {
  const v1 = new Vector2D(10, 20)
  const v1_2 = new Vector2D(2, 5)
  v1.divide(v1_2)
  expect(v1.x).toBe(5)
  expect(v1.y).toBe(4)
  const v2 = new Vector2D(10, 20)
  v2.divide(new Vector2D(10, 10))
  expect(v2.x).toBe(1)
  expect(v2.y).toBe(2)
  const v3 = new Vector2D(10, 20)
  v3.divide(new Vector2D(10, 0))
  expect(v3.x).toBe(1)
  expect(v3.y).toBe(0)
  const v4 = new Vector2D(10, 20)
  v4.divide(new Vector2D(0, 10))
  expect(v4.x).toBe(0)
  expect(v4.y).toBe(2)
  const v5 = new Vector2D(10, 20)
  v5.divide(new Vector2D(0, 0))
  expect(v5.x).toBe(0)
  expect(v5.y).toBe(0)
})

test("scale", () => {
  const v1 = new Vector2D(10, 20)
  const v1_2 = v1.scale(3)
  expect(v1_2.x).toBe(30)
  expect(v1_2.y).toBe(60)
})

test("ratio", () => {
  const v1 = new Vector2D(1, 4)
  expect(v1.ratio()).toBe(0.25)
  const v2 = new Vector2D(20, 4)
  expect(v2.ratio()).toBe(5)
  const v3 = new Vector2D(20, 0)
  expect(v3.ratio()).toBe(0)
  const v4 = new Vector2D(0, 4)
  expect(v4.ratio()).toBe(0)
})

test("scaleTo should return correct vector", () => {
  const v1 = Vector2D.fromAngle(MathX.deg45, 20)
  v1.scaleTo(5)
  expect(v1.angle()).toBe(MathX.deg45)
  expect(v1.length()).toBe(5)
  const v2 = Vector2D.fromAngle(MathX.deg45, 20)
  v2.scaleTo(0)
  expect(v2.x).toBe(0)
  expect(v2.y).toBe(0)
  const v3 = Vector2D.zero
  v3.scaleTo(25)
  expect(v3.x).toBe(0)
  expect(v3.y).toBe(0)
})

test("scalar should return correct number", () => {
  const v1 = new Vector2D(10, 20)
  const v2 = new Vector2D(20, 30)
  const scalar = v1.scalar(v2)
  expect(scalar).toBe(800)
  const scalar2 = v1.scalar(new Vector2D(20, 30))
  expect(scalar2).toBe(800)
})

test("cross should return correct number", () => {
  const v1 = new Vector2D(10, 20)
  const v2 = new Vector2D(20, 30)
  const cross = v1.cross(v2)
  expect(cross).toBe(-100)
  const cross2 = v1.cross(new Vector2D(20, 30))
  expect(cross2).toBe(-100)
})

test("projection should return correct vector", () => {
  const v1 = new Vector2D(100, 0)
  const v2 = v1.add(new Vector2D(0, 50))
  expect(v2.x).toBe(100)
  expect(v2.y).toBe(50)
  const v3 = new Vector2D(150, 0)
  const proj = v2.projection(v3)
  expect(proj.x).toBe(100)
  expect(proj.y).toBe(0)
  const proj2 = v3.projection(new Vector2D(100, 50))
  expect(proj2.x).toBe(120)
  expect(proj2.y).toBe(60)
})

test("distToProjection should return correct number", () => {
  const v1 = new Vector2D(100, 0)
  const v2 = new Vector2D(100, 0).add(new Vector2D(0, 50))
  const dist = v2.distToProjection(v1)
  expect(dist).toBe(50)
  const dist2 = v1.distToProjection(new Vector2D(100, 50))
  expect(dist2).toBeCloseTo(44.72)
})

test("vectorToProjection should return correct vector", () => {
  const v1 = new Vector2D(100, 0)
  const v2 = v1.vectorToProjection(new Vector2D(100, 50))
  expect(v2.x).toBe(-20)
  expect(v2.y).toBe(40)
  const v3_1 = new Vector2D(100, 50)
  const v3 = new Vector2D(100, 0)
  v3.vectorToProjection(v3_1)
  expect(v3.x).toBe(-20)
  expect(v3.y).toBe(40)
})

test("toString", () => {
  const v1 = new Vector2D(25, 35)
  const ss = v1.toString()
  expect(ss).toBe(`[Vector2D(25,35)]`)
})

test("vectorTo", () => {
  const v1 = new Vector2D(5, 5)
  const v2 = new Vector2D(25, 35)
  const sub = v1.vectorTo(v2)
  expect(sub.x).toBe(20)
  expect(sub.y).toBe(30)
})
test("invert", () => {
  const v1 = new Vector2D(5, 7)
  const sub = v1.invert()
  expect(sub.x).toBe(-5)
  expect(sub.y).toBe(-7)
})
test("invertX", () => {
  const v1 = new Vector2D(5, 7)
  const sub = v1.invertX()
  expect(sub.x).toBe(-5)
  expect(sub.y).toBe(7)
})
test("invertY", () => {
  const v1 = new Vector2D(5, 7)
  const sub = v1.invertY()
  expect(sub.x).toBe(5)
  expect(sub.y).toBe(-7)
})

test("normalize", () => {
  const spy = jest.spyOn(console, "log").mockImplementation()
  const v1 = new Vector2D(0, 0)
  const n1 = v1.normalize()
  expect(n1.isEqualTo(Vector2D.norm)).toBeTruthy()

  const v2 = new Vector2D(100, 100)
  const n2 = v2.normalize()
  expect(n2.length()).toBeCloseTo(1, 6)
})
test("round", () => {
  const v1 = new Vector2D(15.43, 15.64).round()
  expect(v1.x).toEqual(15)
  expect(v1.y).toEqual(16)
})
test("floor", () => {
  const v1 = new Vector2D(15.43, 15.64).floor()
  expect(v1.x).toEqual(15)
  expect(v1.y).toEqual(15)
})
test("lengthSqrt", () => {
  const v1 = new Vector2D(5, 2)
  const s = v1.lengthSqrt()
  expect(s).toEqual(25 + 4)
})
test("distToSqrt", () => {
  const v1 = new Vector2D(5, 2)
  const v2 = new Vector2D(10, 4)
  const s = v1.distToSqrt(v2)
  expect(s).toEqual(25 + 4)
})
test("addScalar", () => {
  const v1 = new Vector2D(15, 15).addScalar(3)
  expect(v1.x).toEqual(18)
  expect(v1.y).toEqual(18)
  const v2 = new Vector2D(16, 17).addScalar(5, 6)
  expect(v2.x).toEqual(21)
  expect(v2.y).toEqual(23)
})
test("log should write to console.log", () => {
  const spy = jest.spyOn(console, "log").mockImplementation()
  const v1 = new Vector2D(100, 0)
  v1.log()
  v1.log("Test")
  expect(spy.mock.calls).toEqual([[v1], ["Test", v1]])
  spy.mockRestore()
})
