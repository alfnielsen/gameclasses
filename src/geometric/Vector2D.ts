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

  _invert(): Vector2D {
    return new Vector2D(-this.x, -this.y)
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

  _rotate(angle: number): Vector2D {
    return this.cloneAsVector().rotate(angle)
  }

  rotateAntiClockwise(angle: number): Vector2D {
    const length = this.length()
    const resultingAngle = this.angle() - angle
    this.x = Math.cos(resultingAngle) * length
    this.y = Math.sin(resultingAngle) * length
    return this
  }

  _rotateAntiClockwise(angle: number): Vector2D {
    return this.cloneAsVector().rotateAntiClockwise(angle)
  }

  rotateTo(angle: number): Vector2D {
    const length = this.length()
    this.x = Math.cos(angle) * length
    this.y = Math.sin(angle) * length
    return this
  }

  _rotateTo(angle: number): Vector2D {
    return this.cloneAsVector().rotateTo(angle)
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
  _rotateAround(center: Vector2D, angle: number): Vector2D {
    return this.cloneAsVector().rotateAround(center, angle)
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

  _angleVector(angle: number, length: number) {
    return Vector2D.fromAngle(angle, length).add(this)
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

  moveToXY(x: number, y: number): Vector2D {
    this.x = x
    this.y = y
    return this
  }

  moveTo(p: Vector2D): Vector2D {
    this.x = p.x
    this.y = p.y
    return this
  }

  moveToward(p: Vector2D, length: number): Vector2D {
    this.add(this._vectorTo(p).scaleTo(length))
    return this
  }

  _moveToward(p: Vector2D, length: number): Vector2D {
    return this.cloneAsVector().add(this._vectorTo(p).scaleTo(length))
  }

  /*Vector*/
  add(vec: Vector2D): Vector2D {
    this.x += vec.x
    this.y += vec.y
    return this
  }

  _add(vec: Vector2D): Vector2D {
    return new Vector2D(this.x + vec.x, this.y + vec.y)
  }

  addScalar(k: number, k2 = k): Vector2D {
    this.x += k
    this.y += k2
    return this
  }

  _addScalar(k: number, k2 = k): Vector2D {
    return new Vector2D(this.x + k, this.y + k2)
  }

  /*Vector*/
  sub(vec: Vector2D): Vector2D {
    this.x -= vec.x
    this.y -= vec.y
    return this
  }

  _sub(vec: Vector2D): Vector2D {
    return new Vector2D(this.x - vec.x, this.y - vec.y)
  }

  vectorTo(vec: Vector2D): Vector2D {
    return this.delta(vec)
  }

  _vectorTo(vec: Vector2D): Vector2D {
    return this._delta(vec)
  }

  delta(vec: Vector2D): Vector2D {
    this.x = vec.x - this.x
    this.y = vec.y - this.y
    return this
  }

  _delta(vec: Vector2D): Vector2D {
    return new Vector2D(vec.x - this.x, vec.y - this.y)
  }

  /*Vector*/
  multi(vec: Vector2D): Vector2D {
    this.x *= vec.x
    this.y *= vec.y
    return this
  }

  _multi(vec: Vector2D): Vector2D {
    return new Vector2D(this.y * vec.x, this.y * vec.y)
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

  /*Vector*/
  _divide(vec: Vector2D): Vector2D {
    return this.cloneAsVector().divide(vec)
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
  _scale(k: number) {
    return new Vector2D(this.x * k, this.y * k)
  }

  scaleTo(length: number) {
    const oLength = this.length()
    if (oLength === 0) {
      this.x = 0
      this.y = 0
      return this
    }
    const ratio = length / oLength
    this.x *= ratio
    this.y *= ratio
    return this
  }

  _scaleTo(length: number) {
    return this.cloneAsVector().scaleTo(length)
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

  _projection(vec: Vector2D): Vector2D {
    var ratio = this.scalar(vec) / vec.scalar(vec)
    return new Vector2D(vec.x * ratio, vec.y * ratio)
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

  _vectorToProjection(vec: Vector2D): Vector2D {
    var ratio = this.scalar(vec) / vec.scalar(vec)
    return new Vector2D(vec.x * ratio - this.x, vec.y * ratio - this.y)
  }

  /*Vector*/
  _vectorToLine(p1: Vector2D, p2: Vector2D): Vector2D {
    return p1._vectorTo(this).vectorToProjection(p1._vectorTo(p2))
  }

  vectorToLine(p1: Vector2D, p2: Vector2D): Vector2D {
    return this.moveTo(this._vectorToLine(p1, p2))
  }

  distToLine(p1: Vector2D, p2: Vector2D): number {
    return this._vectorToLine(p1, p2).length()
  }

  normalize() {
    var length = this.length()
    if (length === 0) {
      this.x = 1
      this.y = 0
      return this
    }
    this.x /= length
    this.y /= length
    return this
  }

  _normalize() {
    return this.cloneAsVector().normalize()
  }

  round() {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    return this
  }

  _round() {
    return new Vector2D(Math.round(this.x), Math.round(this.y))
  }

  floor() {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    return this
  }

  _floor() {
    return new Vector2D(Math.floor(this.x), Math.floor(this.y))
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
