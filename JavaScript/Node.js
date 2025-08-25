 export class Node{
    constructor(value, x, y){
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;

        this.isInTree = false;
        this.tree = null
        this.isRoot = false;

        this.x = x;
        this.y = y;
        this.radius = 25;
    }
}
