import Canvas from "../canvas/Canvas.js"

export class DocElm {
   constructor(
      public elm = document.createElement("div"),
      public title = document.createElement("div"),
      public info = document.createElement("div"),
      public code = document.createElement("code"),
      public canvas = new Canvas()
   ) {
      title.className = "title"
      info.className = "info"
      code.className = "code"
      canvas.elm.className = "canvas"
      canvas.resize(400, 200)
      elm.append(title)
      elm.append(info)
      elm.append(code)
      elm.append(canvas.elm)
   }
   setInfo(title: string, html: string) {
      this.title.innerHTML = title
      this.info.innerHTML = html
      return this
   }
   renderInfo(r: (c: Canvas) => void) {
      r(this.canvas)
      return this
   }
   render(r: (c: Canvas) => void) {
      r(this.canvas)
      let raw = r.toString()
      raw = raw.replace(/\n\s{9}/g, "\n")
      raw = raw.replace(/\n\s{9}\}/g, "\n}")
      raw = raw.replace(/\n\s*\}\s*$/g, "\n}")
      this.code.innerHTML = raw
      return this
   }
}

export default class Doc {
   docElms: DocElm[] = []
   masterDiv = document.createElement("div")
   constructor() {
      this.masterDiv.className = "docElm"
   }

   addDoc() {
      const e = new DocElm()
      this.docElms.push(e)
      this.masterDiv.append(e.elm)
      return e
   }
}
