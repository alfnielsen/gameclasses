import AStar, { GraphNode } from "./AStar.js"
import Point2D from "../geometric/Point2D.js"

export default class PathFinder<TItem extends Point2D> extends AStar<TItem> {

   constructor() {
      super((currentNode: GraphNode<TItem>, endNode: GraphNode<TItem>) => this.pathFinderHeuristic(currentNode.item, endNode.item))
   }

   pathFinderHeuristic(node: Point2D, endNode: Point2D) {
      //manhattan
      var d1 = Math.abs(endNode.x - node.x)
      var d2 = Math.abs(endNode.y - node.y)
      return d1 + d2
   }
}
