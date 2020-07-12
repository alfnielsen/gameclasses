import Canvas from "../canvas/Canvas.js"
import IGameElm from "./IGameElm.js"



export default class GameLayer {
   public lastClean = 500
   constructor(
      public id: string,
      public zIndex = 100,
      public elms: IGameElm[] = [],
      public cleanRate = 500
   ) { }


   render(canvas: Canvas, deltaTime: number, time: number) {
      if (this.lastClean - time > this.cleanRate) {
         this.lastClean = time
         this.renderWithClean(canvas, deltaTime, time)
      } else {
         this.renderWithOutClean(canvas, deltaTime, time)
      }
   }


   renderWithOutClean(canvas: Canvas, deltaTime: number, time: number) {
      this.elms.forEach(elm => elm.render(canvas, deltaTime, time))
   }
   renderWithClean(canvas: Canvas, deltaTime: number, time: number) {
      const nextList = []
      for (let i = 0; i < this.elms.length; i++) {
         const elm = this.elms[i]
         if (!elm.delete) {
            elm.render(canvas, deltaTime, time)
            nextList.push(elm)
         }
      }
      this.elms = nextList
   }

}
