import { MathX } from "../util/MathX"

test("degXXX", () => {
  expect(MathX.rad1).toBeCloseTo(57.2957795, 7)
  expect(MathX.deg1).toBeCloseTo(0.0174532925, 9)
  expect(MathX.deg5).toBeCloseTo(0.0872664626, 9)
  expect(MathX.deg45).toBeCloseTo(0.785398163, 9)
})

test("toRadians", () => {
  expect(MathX.toRadians(1)).toBeCloseTo(MathX.deg1, 6)
  expect(MathX.toRadians(5)).toBeCloseTo(MathX.deg5, 6)
  expect(MathX.toRadians(45)).toBeCloseTo(MathX.deg45, 6)
})
test("toDegrees", () => {
  expect(MathX.toDegrees(1)).toBeCloseTo(MathX.rad1, 6)
  expect(MathX.toDegrees(0.261799388)).toBeCloseTo(15, 6)
})
test("Degrees to radius and back should give same result", () => {
  const rad = MathX.toRadians(45)
  const deg = MathX.toDegrees(rad)
  expect(deg).toBeCloseTo(45, 6)
})
test("randomInt", () => {
  for (let i = 0; i < 100; i++) {
    const ran = MathX.randomInt(5, 8)
    expect(ran).toBeGreaterThanOrEqual(5)
    expect(ran).toBeLessThanOrEqual(8)
  }
})
