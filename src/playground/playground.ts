import Canvas from "../canvas/Canvas.js"
import Line2D from "../geometric/Line2D.js"

export default class Playground {
   line = new Line2D(0, 0, 0, 0)
   runCode(code: string, canvas: Canvas) {
      console.log("Playground runCode:")

      canvas.resize(300, 200)
      const f = new Function('canvas', /*body*/code)
      console.log("F:", f)
      f(canvas)
   }
}