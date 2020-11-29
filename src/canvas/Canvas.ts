import Circle2D from "../geometric/Circle2D.js"
import Line2D from "../geometric/Line2D.js"
import Point2D from "../geometric/Point2D.js"
import Rectangle2D from "../geometric/Rectangle2D.js"
import Vector2D from "../geometric/Vector2D.js"
import { MathX } from "../util/MathX.js"

export default class Canvas {
  private _ctx: CanvasRenderingContext2D

  public get ctx() {
    return this._ctx
  }
  public get width() {
    return this._width
  }
  public get height() {
    return this._height
  }
  public get elm() {
    return this._elm
  }

  constructor(
    private _width: number = 400,
    private _height: number = 400,
    private _elm: HTMLCanvasElement = document.createElement("canvas")
  ) {
    this._ctx = _elm.getContext("2d")
    this.resize(this.width, this.height)
  }

  setElm(elm: HTMLCanvasElement) {
    this._elm = elm
    this._ctx = elm.getContext("2d")
    return this
  }

  resize(w: number, h: number) {
    this._width = w
    this._height = h
    this._elm.width = w
    this._elm.height = h
    this._elm.style.width = w + "px"
    this._elm.style.height = h + "px"
  }

  direction(dir: CanvasDirection) {
    this.ctx.direction = dir
    return this
  }

  filter(filter: string) {
    this.ctx.filter = filter
    return this
  }

  font(font: string) {
    this.ctx.font = font
    return this
  }

  globalAlpha(globalAlpha: number) {
    this.ctx.globalAlpha = globalAlpha
    return this
  }

  globalCompositeOperation(globalCompositeOperation: string) {
    this.ctx.globalCompositeOperation = globalCompositeOperation
    return this
  }

  imageSmoothingEnabled(imageSmoothingEnabled: boolean) {
    this.ctx.imageSmoothingEnabled = imageSmoothingEnabled
    return this
  }

  imageSmoothingQuality(imageSmoothingQuality: ImageSmoothingQuality) {
    this.ctx.imageSmoothingQuality = imageSmoothingQuality
    return this
  }

  lineCap(cap: CanvasLineCap) {
    this.ctx.lineCap = cap
    return this
  }

  lineDashOffset(lineDashOffset: number) {
    this.ctx.lineDashOffset = lineDashOffset
    return this
  }

  lineJoin(lineJoin: CanvasLineJoin) {
    this.ctx.lineJoin = lineJoin
    return this
  }

  lineWidth(lineWidth: number) {
    this.ctx.lineWidth = lineWidth
    return this
  }

  miterLimit(miterLimit: number) {
    this.ctx.miterLimit = miterLimit
    return this
  }

  shadowBlur(shadowBlur: number) {
    this.ctx.shadowBlur = shadowBlur
    return this
  }

  shadowColor(shadowColor: string) {
    this.ctx.shadowColor = shadowColor
    return this
  }

  shadowOffset(shadowOffsetX: number, shadowOffsetY?: number): Canvas
  shadowOffset(shadowOffset: Vector2D): Canvas
  shadowOffset(...arg: any[]) {
    if (arg[0] instanceof Vector2D) {
      this.ctx.shadowOffsetX = arg[0].x
      this.ctx.shadowOffsetY = arg[0].y
    } else {
      this.ctx.shadowOffsetX = arg[0]
      this.ctx.shadowOffsetY = arg[1] ?? arg[0]
    }
    return this
  }

  textAlign(textAlign: CanvasTextAlign) {
    this.ctx.textAlign = textAlign
    return this
  }

  textBaseline(textBaseline: CanvasTextBaseline) {
    this.ctx.textBaseline = textBaseline
    return this
  }

  style(
    strokeStyle: string | CanvasGradient | CanvasPattern,
    fillStyle = strokeStyle
  ) {
    this.ctx.strokeStyle = strokeStyle
    this.ctx.fillStyle = fillStyle
    return this
  }

  strokeStyle(strokeStyle: string | CanvasGradient | CanvasPattern) {
    this.ctx.strokeStyle = strokeStyle
    return this
  }

  fillStyle(fillStyle: string | CanvasGradient | CanvasPattern) {
    this.ctx.fillStyle = fillStyle
    return this
  }

  // context:
  arc(
    x: number,
    y: number,
    radius: number,
    startAngle?: number,
    endAngle?: number,
    anticlockwise?: boolean
  ): Canvas
  arc(
    c: Circle2D,
    startAngle?: number,
    endAngle?: number,
    anticlockwise?: boolean
  ): Canvas
  arc(
    p: Vector2D,
    radius: number,
    startAngle?: number,
    endAngle?: number,
    anticlockwise?: boolean
  ): Canvas
  arc(...arg: any) {
    if (arg[0] instanceof Circle2D) {
      this.ctx.arc(
        arg[0].x,
        arg[0].y,
        arg[0].r,
        arg[1] ?? 0,
        arg[2] ?? MathX.PI2,
        arg[3]
      )
    } else if (arg[0] instanceof Vector2D) {
      this.ctx.arc(
        arg[0].x,
        arg[0].y,
        arg[1],
        arg[2] ?? 0,
        arg[3] ?? MathX.PI2,
        arg[4]
      )
    } else {
      this.ctx.arc(
        arg[0],
        arg[1],
        arg[2],
        arg[3] ?? 0,
        arg[4] ?? MathX.PI2,
        arg[5]
      )
    }
    return this
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, r: number): Canvas
  arcTo(p1: Vector2D, p2: Vector2D, r: number): Canvas
  arcTo(...arg: any) {
    if (arg[0] instanceof Vector2D) {
      this.ctx.arcTo(arg[0].x, arg[0].y, arg[1].x, arg[1].y, arg[2])
    } else {
      this.ctx.arcTo(arg[0], arg[1], arg[2], arg[3], arg[4])
    }
    return this
  }
  /** Alias for beginPath */
  begin() {
    return this.beginPath()
  }

  beginPath() {
    this.ctx.beginPath()
    return this
  }

  bezierCurveTo(controlP1: Vector2D, controlP2: Vector2D, p: Vector2D): Canvas
  bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    cx: number,
    cy: number
  ): Canvas
  bezierCurveTo(...arg: any[]) {
    if (arg[0] instanceof Vector2D) {
      this.ctx.bezierCurveTo(
        arg[0].x,
        arg[0].y,
        arg[1].x,
        arg[1].y,
        arg[2].x,
        arg[2].y
      )
    } else {
      this.ctx.bezierCurveTo(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5])
    }
    return this
  }

  clearRect(x: number, y: number, w: number, h: number): Canvas
  clearRect(p: Vector2D, d: Vector2D): Canvas
  clearRect(...arg: any[]) {
    if (arg[0] instanceof Vector2D) {
      this.ctx.clearRect(arg[0].x, arg[0].y, arg[1].x, arg[1].y)
    } else {
      this.ctx.clearRect(arg[0], arg[1], arg[2], arg[3])
    }
    return this
  }

  clip(fillRule?: CanvasFillRule): Canvas
  clip(path: Path2D, fillRule?: CanvasFillRule): Canvas
  clip(pathOrFillRule: Path2D | CanvasFillRule, fillRule?: CanvasFillRule) {
    if (pathOrFillRule instanceof Path2D) {
      this.ctx.clip(pathOrFillRule, fillRule)
    } else {
      this.ctx.clip(pathOrFillRule)
    }
    return this
  }

  closePath() {
    this.ctx.closePath()
    return this
  }

  createImageData(w: number, h: number): ImageData
  createImageData(dim: Vector2D): ImageData
  createImageData(imageData: ImageData): ImageData
  createImageData(
    hOrDimOrImageData: number | Vector2D | ImageData,
    h?: number
  ) {
    if (hOrDimOrImageData instanceof Vector2D) {
      return this.ctx.createImageData(hOrDimOrImageData.x, hOrDimOrImageData.y)
    }
    if (typeof hOrDimOrImageData === "number") {
      return this.ctx.createImageData(hOrDimOrImageData, h)
    }
    return this.ctx.createImageData(hOrDimOrImageData)
  }

  createLinearGradient(x0: number, y0: number, x1: number, y1: number): Canvas
  createLinearGradient(p0: Vector2D, p1: Vector2D): Canvas
  createLinearGradient(...arg: any[]) {
    if (arg[0] instanceof Vector2D) {
      this.ctx.createLinearGradient(arg[0].x, arg[0].y, arg[1].x, arg[1].y)
    } else {
      this.ctx.createLinearGradient(arg[0], arg[1], arg[2], arg[3])
    }
    return this
  }

  createPattern(image: CanvasImageSource, repetition: string): CanvasPattern {
    this.ctx.createPattern(image, repetition)
    return this
  }

  createRadialGradient(
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ): CanvasGradient
  createRadialGradient(
    p0: Vector2D,
    r0: number,
    p1: Vector2D,
    r1: number
  ): CanvasGradient
  createRadialGradient(...arg: any[]): CanvasGradient {
    if (arg[0] instanceof Vector2D) {
      return this.ctx.createRadialGradient(
        arg[0].x,
        arg[0].y,
        arg[1],
        arg[2].x,
        arg[2].y,
        arg[3]
      )
    }
    return this.ctx.createRadialGradient(
      arg[0],
      arg[1],
      arg[2],
      arg[3],
      arg[4],
      arg[5]
    )
  }

  drawFocusIfNeeded(element: Element) {
    this.ctx.drawFocusIfNeeded(element)
    return this
  }

  drawImage(image: CanvasImageSource, dx: number, dy: number): Canvas
  drawImage(
    image: CanvasImageSource,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): Canvas
  drawImage(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): Canvas
  drawImage(image: CanvasImageSource, destVec: Vector2D): Canvas
  drawImage(image: CanvasImageSource, destRect: Rectangle2D): Canvas
  drawImage(
    image: CanvasImageSource,
    subRect: Rectangle2D,
    destRect: Rectangle2D
  ): Canvas
  drawImage(...arg: any[]) {
    if (typeof arg[1] === "number") {
      if (arg.length === 9) {
        this.ctx.drawImage(
          arg[0],
          arg[1],
          arg[2],
          arg[3],
          arg[4],
          arg[5],
          arg[6],
          arg[7],
          arg[8]
        )
      } else if (arg.length === 5) {
        this.ctx.drawImage(arg[0], arg[1], arg[2], arg[3], arg[4])
      } else {
        this.ctx.drawImage(arg[0], arg[1], arg[2])
      }
    } else if (arg[1] instanceof Vector2D) {
      this.ctx.drawImage(arg[0], arg[1].x, arg[1].y)
    } else if (arg[1] instanceof Rectangle2D && !arg[2]) {
      this.ctx.drawImage(arg[0], arg[1].x, arg[1].y, arg[1].dim.x, arg[1].dim.y)
    } else if (arg[1] instanceof Rectangle2D && arg[2] instanceof Rectangle2D) {
      this.ctx.drawImage(
        arg[0],
        arg[1].x,
        arg[1].y,
        arg[1].dim.x,
        arg[1].dim.y,
        arg[2].x,
        arg[2].y,
        arg[2].dim.x,
        arg[2].dim.y
      )
    }
    return this
  }

  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    start?: number,
    end?: number,
    anticlockwise?: boolean
  ): Canvas
  ellipse(
    p: Vector2D,
    radiusVector: Vector2D,
    rotation: number,
    start?: number,
    end?: number,
    anticlockwise?: boolean
  ): Canvas
  ellipse(...arg: any[]) {
    if (arg[0] instanceof Vector2D) {
      this.ctx.ellipse(
        arg[0].x,
        arg[0].y,
        arg[1].x,
        arg[1].y,
        arg[2],
        arg[2] ?? 0,
        arg[3] ?? MathX.PI2,
        arg[4]
      )
    } else {
      this.ctx.ellipse(
        arg[0],
        arg[1],
        arg[2],
        arg[3],
        arg[4],
        arg[5] ?? 0,
        arg[6] ?? MathX.PI2,
        arg[7]
      )
    }
    return this
  }

  fill() {
    this.ctx.fill()
    return this
  }

  fillRect(x: number, y: number, w: number, h: number): Canvas
  fillRect(p1: Vector2D, p2: Vector2D): Canvas
  fillRect(rect: Rectangle2D): Canvas
  fillRect(...arg: any[]) {
    if (arg[0] instanceof Rectangle2D) {
      this.ctx.fillRect(arg[0].x, arg[0].y, arg[0].dim.x, arg[0].dim.y)
    } else if (arg[0] instanceof Vector2D && arg[1] instanceof Vector2D) {
      this.ctx.fillRect(arg[0].x, arg[0].y, arg[1].x, arg[1].y)
    } else {
      this.ctx.fillRect(arg[0], arg[1], arg[2], arg[3])
    }
    return this
  }

  fillText(text: string, p: Vector2D, maxWidth?: number): Canvas
  fillText(text: string, x: number, y: number, maxWidth?: number): Canvas
  fillText(...arg: any[]) {
    if (arg[1] instanceof Vector2D) {
      this.ctx.fillText(arg[0], arg[1].x, arg[1].y, arg[2])
    } else {
      this.ctx.fillText(arg[0], arg[1], arg[2], arg[3])
    }
    return this
  }

  getImageData(rect: Rectangle2D): ImageData
  getImageData(p1: Vector2D, p2: Vector2D): ImageData
  getImageData(sx: number, sy: number, sw: number, sh: number): ImageData
  getImageData(...arg: any[0]): ImageData {
    if (arg[0] instanceof Rectangle2D) {
      return this.ctx.getImageData(
        arg[0].x,
        arg[0].y,
        arg[0].dim.x,
        arg[0].dim.y
      )
    }
    if (arg[0] instanceof Vector2D && arg[1] instanceof Vector2D) {
      return this.ctx.getImageData(arg[0].x, arg[0].y, arg[1].x, arg[2].y)
    }
    return this.ctx.getImageData(arg[0], arg[1], arg[2], arg[3])
  }

  getLineDash(): number[] {
    return this.ctx.getLineDash()
  }

  getTransform(): DOMMatrix {
    return this.ctx.getTransform()
  }

  isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean
  isPointInPath(p: Vector2D, fillRule?: CanvasFillRule): boolean
  isPointInPath(...arg: any[]): boolean {
    if (arg[0] instanceof Vector2D) {
      return this.ctx.isPointInPath(arg[0].x, arg[0].y, arg[1])
    }
    return this.ctx.isPointInPath(arg[0], arg[1], arg[2])
  }

  isPointInStroke(x: number, y: number): boolean
  isPointInStroke(path: Path2D, x: number, y: number): boolean
  isPointInStroke(p: Vector2D): boolean
  isPointInStroke(path: Path2D, p: Vector2D): boolean
  isPointInStroke(...arg: any[]) {
    if (arg[0] instanceof Vector2D) {
      return this.ctx.isPointInStroke(arg[0].x, arg[0].y)
    }
    if (arg[1] instanceof Vector2D) {
      return this.ctx.isPointInStroke(arg[0], arg[1].x, arg[1].y)
    }
    if (typeof arg[0] === "number") {
      return this.ctx.isPointInStroke(arg[0], arg[1])
    }
    if (typeof arg[1] === "number") {
      return this.ctx.isPointInStroke(arg[0], arg[1], arg[1])
    }
    return false
  }

  lineTo(p: Vector2D): Canvas {
    this.ctx.lineTo(p.x, p.y)
    return this
  }

  measureText(text: string) {
    this.ctx.measureText(text)
    return this
  }

  moveTo(p: Vector2D): Canvas {
    this.ctx.moveTo(p.x, p.y)
    return this
  }

  putImageData(imageData: ImageData, dx: number, dy: number): Canvas
  putImageData(
    imageData: ImageData,
    dx: number,
    dy: number,
    dirtyX: number,
    dirtyY: number,
    dirtyWidth: number,
    dirtyHeight: number
  ): Canvas
  putImageData(imageData: ImageData, destination: Vector2D): Canvas
  putImageData(
    imageData: ImageData,
    destination: Vector2D,
    dirtyVec: Vector2D,
    dirtDim: Vector2D
  ): Canvas
  putImageData(
    imageData: ImageData,
    destination: Vector2D,
    dirtyRect: Rectangle2D
  ): Canvas
  putImageData(
    imageData: ImageData,
    destination: Vector2D,
    dirtyRect: Rectangle2D
  ): Canvas
  putImageData(...arg: any[]) {
    if (arg[1] instanceof Vector2D) {
      if (!arg[2]) {
        this.ctx.putImageData(arg[0], arg[1].x, arg[1].y)
      } else if (arg[2] instanceof Vector2D && arg[3] instanceof Vector2D) {
        this.ctx.putImageData(
          arg[0],
          arg[1].x,
          arg[1].y,
          arg[2].x,
          arg[2].y,
          arg[3].x,
          arg[3].y
        )
      } else if (arg[2] instanceof Rectangle2D) {
        this.ctx.putImageData(
          arg[0],
          arg[1].x,
          arg[1].y,
          arg[2].x,
          arg[2].y,
          arg[2].dim.x,
          arg[2].dim.y
        )
      }
    } else if (typeof arg[1] === "number") {
      if (arg.length === 7) {
        this.ctx.putImageData(
          arg[0],
          arg[1],
          arg[2],
          arg[3],
          arg[4],
          arg[5],
          arg[6]
        )
      } else {
        this.ctx.putImageData(arg[0], arg[1], arg[2])
      }
    }
    return this
  }

  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): Canvas
  quadraticCurveTo(controlP: Vector2D, p: Vector2D): Canvas
  quadraticCurveTo(...arg: any[]) {
    if (arg[0] instanceof Vector2D) {
      this.ctx.quadraticCurveTo(arg[0].x, arg[0].y, arg[1].x, arg[1].y)
    } else {
      this.ctx.quadraticCurveTo(arg[0], arg[1], arg[2], arg[3])
    }
    return this
  }

  rect(x: number, y: number, w: number, h: number): Canvas
  rect(p: Vector2D, dim: Vector2D): Canvas
  rect(rect: Rectangle2D): Canvas
  rect(...arg: any[]) {
    if (arg[0] instanceof Rectangle2D) {
      this.ctx.rect(arg[0].x, arg[0].y, arg[0].dim.x, arg[0].dim.y)
    } else if (arg[0] instanceof Vector2D) {
      this.ctx.rect(arg[0].x, arg[0].y, arg[1].x, arg[1].y)
    } else {
      this.ctx.rect(arg[0], arg[1], arg[2], arg[3])
    }
    return this
  }

  resetTransform() {
    this.ctx.resetTransform()
    return this
  }

  restore() {
    this.ctx.restore()
    return this
  }

  rotate(angle: number) {
    this.ctx.rotate(angle)
    return this
  }

  save() {
    this.ctx.save()
    return this
  }

  scale(x: number, y: number): Canvas
  scale(scaleVec: Vector2D): Canvas
  scale(scaleVecOrX: Vector2D | number, y?: number) {
    if (scaleVecOrX instanceof Vector2D) {
      this.ctx.scale(scaleVecOrX.x, scaleVecOrX.y)
    } else {
      this.ctx.scale(scaleVecOrX, y)
    }
    return this
  }

  scrollPathIntoView(path?: Path2D) {
    this.ctx.scrollPathIntoView(path)
    return this
  }

  setLineDash(segments: number[]) {
    this.ctx.setLineDash(segments)
    return this
  }

  setTransform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): Canvas
  setTransform(transform?: DOMMatrix2DInit): Canvas
  setTransform(
    transformOrA?: DOMMatrix2DInit | number,
    b?: number,
    c?: number,
    d?: number,
    e?: number,
    f?: number
  ) {
    if (typeof transformOrA === "number") {
      this.ctx.setTransform(transformOrA, b, c, d, e, f)
    } else {
      this.ctx.setTransform(transformOrA)
    }
    return this
  }

  stroke(): Canvas
  stroke(path?: Path2D): Canvas
  stroke(path?: Path2D) {
    if (path) {
      this.ctx.stroke(path)
    } else {
      this.ctx.stroke()
    }
    return this
  }

  strokeRect(x: number, y: number, w: number, h: number): Canvas
  strokeRect(p: Vector2D, dim: Vector2D): Canvas
  strokeRect(rect: Rectangle2D): Canvas
  strokeRect(...arg: any[]) {
    if (arg[0] instanceof Rectangle2D) {
      this.ctx.strokeRect(arg[0].x, arg[0].y, arg[0].dim.x, arg[0].dim.y)
    } else if (arg[0] instanceof Vector2D) {
      this.ctx.strokeRect(arg[0].x, arg[0].y, arg[1].x, arg[1].y)
    } else {
      this.ctx.strokeRect(arg[0], arg[1], arg[2], arg[3])
    }
    return this
  }

  strokeText(text: string, p: Vector2D, maxWidth?: number): Canvas
  strokeText(text: string, x: number, y: number, maxWidth?: number): Canvas
  strokeText(...arg: any[]) {
    if (arg[1] instanceof Vector2D) {
      this.ctx.strokeText(arg[0], arg[1].x, arg[1].y, arg[2])
    } else {
      this.ctx.strokeText(arg[0], arg[1], arg[2], arg[3])
    }
    return this
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.ctx.transform(a, b, c, d, e, f)
    return this
  }

  translate(x: number, y: number): Canvas
  translate(p: Vector2D): Canvas
  translate(pOrX: Vector2D | number, y?: number) {
    if (pOrX instanceof Vector2D) {
      this.ctx.translate(pOrX.x, pOrX.y)
    } else {
      this.ctx.translate(pOrX, y)
    }
    return this
  }

  // Specialized

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    return this
  }

  grid(w: number, h: number): Canvas {
    let p1 = new Point2D(w, 0)
    let p2 = new Point2D(w, this.height)
    for (; p1.x < this.width; p1.x += w, p2.x += w) {
      this.line(p1, p2)
    }
    p1 = new Point2D(0, h)
    p2 = new Point2D(this.width, h)
    for (; p1.y < this.height; p1.y += h, p2.y += h) {
      this.line(p1, p2)
    }
    return this
  }

  line(p1: Vector2D, p2: Vector2D): Canvas {
    this.begin()
    this.moveTo(p1).lineTo(p2)
    this.stroke()
    return this
  }

  circle(
    p: Vector2D,
    radius: number,
    startAngle = 0,
    endAngle = MathX.PI2,
    anticlockwise = false
  ): Canvas {
    this.ctx.arc(p.x, p.y, radius, startAngle, endAngle, anticlockwise)
    return this
  }

  fillCircle(
    center: Vector2D,
    radius: number,
    startAngle?: number,
    endAngle?: number,
    anticlockwise?: boolean
  ): Canvas {
    this.begin()
    this.circle(center, radius, startAngle, endAngle, anticlockwise)
    this.fill()
    return this
  }

  strokeCircle(
    center: Vector2D,
    radius: number,
    startAngle?: number,
    endAngle?: number,
    anticlockwise?: boolean
  ): Canvas {
    this.begin()
    this.circle(center, radius, startAngle, endAngle, anticlockwise)
    this.stroke()
    return this
  }

  dot(
    center: Vector2D,
    radius = 2,
    startAngle?: number,
    endAngle?: number,
    anticlockwise?: boolean
  ): Canvas {
    this.begin()
    this.circle(center, radius, startAngle, endAngle, anticlockwise)
    this.fill()
    return this
  }

  arcArrow(
    center: Vector2D,
    radius: number,
    startAngle = 0,
    endAngle = MathX.PI2,
    anticlockwise = false,
    arrowAngle = MathX.deg25,
    arrowLength = 7
  ): Canvas {
    this.begin()
      .arc(center, radius, startAngle, endAngle, anticlockwise)
      .stroke()
    const vecToEnd = Vector2D.fromAngle(endAngle, radius).add(center)
    const baseAngle = anticlockwise ? -MathX.deg90 : MathX.deg90
    const line1 = Line2D.fromPoints(vecToEnd, center)
      .rotateFromP1(baseAngle - arrowAngle * (anticlockwise ? 1 : 2))
      .scaleLineTo(arrowLength)
    this.line(line1, line1.end)
    const line2 = Line2D.fromPoints(vecToEnd, center)
      .rotateFromP1(baseAngle + arrowAngle * (anticlockwise ? 2 : 1))
      .scaleLineTo(arrowLength)
    this.line(line2, line2.end)
    return this
  }

  arrow(
    p1: Vector2D,
    p2: Vector2D,
    angle: number = 0.43633231299, // 25 degrees
    length: number = 7
  ): Canvas {
    let line = Line2D.fromPoints(p1, p2)
    const l3 = line.cloneAsLine().rotateFromP2(angle).scaleLineToByP2(length)
    const l4 = line.cloneAsLine().rotateFromP2(-angle).scaleLineToByP2(length)
    this.line(line, line.end).line(l3, l3.end).line(l4, l4.end)
    return this
  }
}
