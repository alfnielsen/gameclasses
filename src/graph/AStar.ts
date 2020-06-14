import BinaryHeap from "./BinaryHeap.js"

export default class AStar<TItem> {
   openHeap?: BinaryHeap<GraphNode<TItem>>
   startNode: GraphNode<TItem> | null = null;
   lastStartTime: number = 0
   lastEndTime: number = 0
   lastTotalTime: number = 0

   constructor(
      public heuristic: (currentNode: GraphNode<TItem>, endNode: GraphNode<TItem>) => number
   ) {
   }

   timedSearch(startNode: GraphNode<TItem>, endNode: GraphNode<TItem>): TItem[] {
      this.lastStartTime = (new Date()).getTime()
      const result = this.search(startNode, endNode)
      this.lastEndTime = (new Date()).getTime()
      this.lastTotalTime = this.lastEndTime - this.lastStartTime
      return result
   }

   search(startNode: GraphNode<TItem>, endNode: GraphNode<TItem>): TItem[] {
      this.openHeap = new BinaryHeap<GraphNode<TItem>>((node: GraphNode<TItem>) => this.heuristic(endNode, node))
      this.openHeap.add(startNode)
      while (this.openHeap.size() > 0) {
         var currentNode = this.openHeap.pop()
         if (currentNode === endNode) {
            return this.getFinalPath(currentNode)
         }
         currentNode.closed = true
         this.addNodeFromEdges(currentNode, endNode)
      }
      return []
   }

   addNodeFromEdges(node: GraphNode<TItem>, endNode: GraphNode<TItem>): void {
      node.forEachEdge((edge: GraphEdge<TItem>) => {
         const neighbor = edge.toNode
         if (neighbor.blocked || neighbor.closed) {
            return
         }
         neighbor.cost = edge.weight
         let newCost = node.cost_from_start + neighbor.cost
         if (!neighbor.visited || newCost < neighbor.cost_from_start) {
            neighbor.visited = true
            neighbor.parent = node
            neighbor.cost_from_start = newCost
            neighbor.final_cost_estimate = neighbor.cost_from_start + this.heuristic(neighbor, endNode)
            if (!neighbor.visited) {
               this.openHeap.add(neighbor)
            }
            else {
               this.openHeap.rescoreNode(neighbor)
            }
         }
      })
   }

   getFinalPath(node: GraphNode<TItem>): TItem[] {
      var path: TItem[] = []
      while (node.parent) {
         path.push(node.item)
         node = node.parent
      }
      path = path.reverse()
      return path
   }
}



export class GraphNode<TItem> {
   edges: GraphEdge<TItem>[] = [];
   //pathfinding
   parent?: GraphNode<TItem>
   blocked = false;
   visited = false;
   closed = false;
   cost = 0;
   cost_from_start = 0;
   final_cost_estimate = 0;

   constructor(
      public item: TItem
   ) { }

   cleanUp() {
      this.visited = false
      this.closed = false
      this.cost_from_start = 0
      this.final_cost_estimate = 0
   }

   addEdgeTo(node: GraphNode<TItem>, weight = 1, bidirectional = true) {
      const edgesTo = new GraphEdge(this, node, weight)
      this.edges.push(edgesTo)
      if (bidirectional) {
         const edgesFrom = new GraphEdge(node, this, weight)
         node.edges.push(edgesFrom)
      }
   }

   forEachEdge(callbackfn: (edge: GraphEdge<TItem>) => void) {
      this.edges.forEach(edge => callbackfn.call(this, edge))
   }
}
export class GraphEdge<TItem> {
   constructor(
      public fromNode: GraphNode<TItem>,
      public toNode: GraphNode<TItem>,
      public weight = 1
   ) { }
}


