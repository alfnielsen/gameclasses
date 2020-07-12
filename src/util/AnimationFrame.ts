
export default class AnimationFrame {
   constructor(
      public render?: (deltaTime: number, time: number) => void
   ) { }

   requestRef = 0
   previousTimeRef = 0
   renderRate = 200;
   pause = false

   setSetRender(render: (deltaTime: number, time: number) => void) {
      this.render = render
   }

   start() {
      this.pause = false
      requestAnimationFrame(this.animate.bind(this))
      return this
   }

   private animate(time: number) {
      const previousTime = this.previousTimeRef
      if (previousTime !== undefined && this.render) {
         const deltaTime = time - previousTime
         this.render(deltaTime, time)
      }
      this.previousTimeRef = time
      if (!this.pause) {
         this.requestRef = requestAnimationFrame(this.animate.bind(this))
      }
   };

   stop() {
      this.pause = true
      if (this.requestRef) {
         cancelAnimationFrame(this.requestRef)
      }
      return this
   }
}
