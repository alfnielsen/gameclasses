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
      this.elms.forEach(elm => elm.render(canvas, deltaTime, time))
   }

}
