export default class Vector2D {
  static get zero(): Vector2D {
    return new Vector2D(0, 0)
  }
  static Origin: Vector2D = Vector2D.zero
  static get one(): Vector2D {
    return new Vector2D(1, 1)
  }
  static get norm(): Vector2D {
    return new Vector2D(1, 0)
  }

  static fromAngle(angle: number, length: number): Vector2D {
    return new Vector2D(Math.cos(angle) * length, Math.sin(angle) * length)
  }

  static fromArray(arr: number[]): Vector2D {
    return new Vector2D(arr[0], arr[1])
  }
  static fromVector({ x, y }: { x: number; y: number }): Vector2D {
    return new Vector2D(x, y)
  }

  constructor(public x: number, public y: number) {}

  Origin: Vector2D = Vector2D.Origin

  toString(): string {
    return `[Vector2D(${this.x},${this.y})]`
  }

  cloneAsVector(): Vector2D {
    return new Vector2D(this.x, this.y)
  }

  isEqualTo(vec: Vector2D): boolean {
    return this.x === vec.x && this.y === vec.y
  }

  isZero(): boolean {
    return this.x === 0 && this.y === 0
  }

  invert(): Vector2D {
    this.x = -this.x
    this.y = -this.y
    return this
  }

  invertX(): Vector2D {
    this.x = -this.x
    return this
  }

  invertY(): Vector2D {
    this.y = -this.y
    return this
  }

  rotate(angle: number): Vector2D {
    const length = this.length()
    const resultingAngle = this.angle() + angle
    this.x = Math.cos(resultingAngle) * length
    this.y = Math.sin(resultingAngle) * length
    return this
  }

  rotateAntiClockwise(angle: number): Vector2D {
    const length = this.length()
    const resultingAngle = this.angle() - angle
    this.x = Math.cos(resultingAngle) * length
    this.y = Math.sin(resultingAngle) * length
    return this
  }

  rotateTo(angle: number): Vector2D {
    const length = this.length()
    this.x = Math.cos(angle) * length
    this.y = Math.sin(angle) * length
    return this
  }

  rotateAround(center: Vector2D, angle: number): Vector2D {
    let deltaX = this.x - center.x
    let deltaY = this.y - center.y
    const deltaLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const deltaAngle = Math.atan2(deltaY, deltaX)
    const resultingAngle = deltaAngle + angle
    this.x = center.x + Math.cos(resultingAngle) * deltaLength
    this.y = center.y + Math.sin(resultingAngle) * deltaLength
    return this
  }

  /*Number:radian*/
  angleTo(vec: Vector2D): number {
    return Math.atan2(vec.y - this.y, vec.x - this.x)
  }

  /*Number:radian*/
  angleBetween(vec: Vector2D): number {
    return Math.abs(this.angle() - vec.angle())
  }

  angleVector(angle: number, length: number) {
    return this.add(Vector2D.fromAngle(angle, length))
  }

  /*Number:radian*/
  angle() {
    return Math.atan2(this.y, this.x)
  }

  /*Number:length*/
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  lengthSqrt() {
    return this.x * this.x + this.y * this.y
  }

  distTo(vec: Vector2D): number {
    let x = vec.x - this.x
    let y = vec.y - this.y
    return Math.sqrt(x * x + y * y)
  }

  distToSqrt(vec: Vector2D): number {
    let x = vec.x - this.x
    let y = vec.y - this.y
    return x * x + y * y
  }

  /*Vector*/
  add(vec: Vector2D): Vector2D {
    this.x += vec.x
    this.y += vec.y
    return this
  }

  addScalar(k: number, k2 = k): Vector2D {
    this.x += k
    this.y += k2
    return this
  }

  /*Vector*/
  sub(vec: Vector2D): Vector2D {
    this.x -= vec.x
    this.y -= vec.y
    return this
  }

  vectorTo(vec: Vector2D): Vector2D {
    return this.delta(vec)
  }

  delta(vec: Vector2D): Vector2D {
    this.x = vec.x - this.x
    this.y = vec.y - this.y
    return this
  }

  /*Vector*/
  multi(vec: Vector2D): Vector2D {
    this.x *= vec.x
    this.y *= vec.y
    return this
  }

  /*Vector*/
  divide(vec: Vector2D): Vector2D {
    if (vec.x === 0) {
      this.x = 0
    } else {
      this.x /= vec.x
    }
    if (vec.y === 0) {
      this.y = 0
    } else {
      this.y /= vec.y
    }
    return this
  }

  ratio() {
    if (this.y === 0) {
      return 0
    }
    return this.x / this.y
  }

  /*Vector*/
  scale(k: number) {
    this.x *= k
    this.y *= k
    return this
  }

  scaleTo(length: number) {
    const oLength = this.length()
    if (oLength === 0) {
      this.x = 0
      this.y = 0
      return
    }
    const ratio = length / oLength
    this.x *= ratio
    this.y *= ratio
    return this
  }

  /*Number:scalar product - dot product */
  scalar(vec: Vector2D): number {
    return this.x * vec.x + this.y * vec.y
  }

  /*Number:cross product*/
  cross(vec: Vector2D): number {
    return this.x * vec.y - this.y * vec.x
  }

  /*Vector:projection on oVector (Return new vector) */
  projection(vec: Vector2D): Vector2D {
    var ratio = this.scalar(vec) / vec.scalar(vec)
    this.x = vec.x * ratio
    this.y = vec.y * ratio
    return this
  }

  /*Number:distance*/
  distToProjection(vec: Vector2D): number {
    var ratio = this.scalar(vec) / vec.scalar(vec)
    const x = vec.x * ratio - this.x
    const y = vec.y * ratio - this.y
    return Math.sqrt(x * x + y * y)
  }

  /*Vector*/
  vectorToProjection(vec: Vector2D): Vector2D {
    var ratio = this.scalar(vec) / vec.scalar(vec)
    this.x = vec.x * ratio - this.x
    this.y = vec.y * ratio - this.y
    return this
  }

  normalize() {
    var length = this.length()
    if (length === 0) {
      return Vector2D.norm
    }
    this.x /= length
    this.y /= length
    return this
  }

  round() {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    return this
  }

  floor() {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    return this
  }

  log(msg?: string) {
    if (msg) {
      console.log(msg, this)
    } else {
      console.log(this)
    }
    return this
  }
}
