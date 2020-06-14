export default class BinaryHeap<TNode> {
   content: TNode[] = [];
   constructor(
      public getNodeScore: (node1: TNode) => number
   ) {
   }

   add(element: TNode) {
      this.content.push(element)
      const lastIndex = this.content.length - 1
      this.sinkDown(lastIndex)
   }

   pop() {
      const node = this.content[0]
      const endNode = this.content.pop()
      if (this.content.length > 0 && endNode) {
         this.content[0] = endNode
         this.bubbleUp(0)
      }
      return node
   }

   remove(node: TNode) {
      const i = this.content.indexOf(node)
      const endNode = this.content.pop()
      if (i !== this.content.length - 1 && endNode) {
         this.content[i] = endNode
         if (this.getNodeScore(endNode) < this.getNodeScore(node)) {
            this.sinkDown(i)
         } else {
            this.bubbleUp(i)
         }
      }
   }

   size() {
      return this.content.length
   }

   rescoreNode(node: TNode) {
      this.sinkDown(this.content.indexOf(node))
   }

   sinkDown(index: number) {
      const node = this.content[index]
      while (index > 0) {
         const parentIndex = Math.floor((index + 1) / 2) - 1
         const parentNode = this.content[parentIndex]
         if (this.getNodeScore(node) < this.getNodeScore(parentNode)) {
            this.content[parentIndex] = node
            this.content[index] = parentNode
            index = parentIndex
         } else {
            break
         }
      }
   }

   bubbleUp(index: number) {
      const length = this.content.length
      const node = this.content[index]
      const nodeScore = this.getNodeScore(node)
      while (true) {
         const child2Index = (index + 1) * 2
         const child1Index = child2Index - 1
         let child1Score: number = 0
         let swap = null
         if (child1Index < length) {
            const child1 = this.content[child1Index]
            child1Score = this.getNodeScore(child1)
            if (child1Score < nodeScore) {
               swap = child1Index
            }
         }
         if (child2Index < length) {
            const child2 = this.content[child2Index],
               child2Score = this.getNodeScore(child2)
            if (child2Score < (swap === null ? nodeScore : child1Score)) {
               swap = child2Index
            }
         }
         if (swap !== null) {
            this.content[index] = this.content[swap]
            this.content[swap] = node
            index = swap
         } else {
            break
         }
      }
   }
}
