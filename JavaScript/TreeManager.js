import { Node } from './Node.js';

export class BinarySearchTree{
    constructor(){
        this.root
    }

    insert(nodeToInsert, currentNode = this.root){
        
        if(nodeToInsert.value <= currentNode.value){
            if(currentNode.leftChild == null){
                nodeToInsert.isInTree = true;
                nodeToInsert.tree = this;
                nodeToInsert.parent = currentNode;
                currentNode.leftChild = nodeToInsert;
            }else{
                this.insert(nodeToInsert, currentNode.leftChild);
            }
        }
        if(nodeToInsert.value > currentNode.value){
            if(currentNode.rightChild == null){
                nodeToInsert.isInTree = true;
                nodeToInsert.tree = this;
                nodeToInsert.parent = currentNode;
                currentNode.rightChild = nodeToInsert;
            }else{
                this.insert(nodeToInsert, currentNode.rightChild);
            }
        }
        
    }

    remove(nodeToRemove, currentNode = this.root) {
    if (nodeToRemove.value < currentNode.value) {
        this.remove(nodeToRemove, currentNode.leftChild);
    }
    if (nodeToRemove.value > currentNode.value) {
        this.remove(nodeToRemove, currentNode.rightChild);
    }
    if (nodeToRemove.value == currentNode.value) {
        //Case 1: No children
        if (!nodeToRemove.rightChild && !nodeToRemove.leftChild) {
            nodeToRemove.isInTree = false;
            nodeToRemove.tree = null;
            let ParentNode = nodeToRemove.parent;
            if (ParentNode.leftChild == nodeToRemove) {
                ParentNode.leftChild = null;
            }
            if (ParentNode.rightChild == nodeToRemove) {
                ParentNode.rightChild = null;
            }
            nodeToRemove.parent = null;
            return;
        }
        //Case 2a: No left child
        else if (!nodeToRemove.leftChild) {
            let replacementNode = nodeToRemove.rightChild;
            if (nodeToRemove.parent.leftChild == nodeToRemove) {
                replacementNode.parent = nodeToRemove.parent;
                nodeToRemove.parent.leftChild = replacementNode;
            } else if (nodeToRemove.parent.rightChild == nodeToRemove) {
                replacementNode.parent = nodeToRemove.parent;
                nodeToRemove.parent.rightChild = replacementNode;
            }
            nodeToRemove.isInTree = false;
            nodeToRemove.tree = null;
            nodeToRemove.parent = null;
            nodeToRemove.rightChild = null;
            return;
        }
        //Case 2b: No right child
        else if (!nodeToRemove.rightChild) {
            let replacementNode = nodeToRemove.leftChild;
            if (nodeToRemove.parent.leftChild == nodeToRemove) {
                replacementNode.parent = nodeToRemove.parent;
                nodeToRemove.parent.leftChild = replacementNode;
            } else if (nodeToRemove.parent.rightChild == nodeToRemove) {
                replacementNode.parent = nodeToRemove.parent;
                nodeToRemove.parent.rightChild = replacementNode;
            }
            nodeToRemove.isInTree = false;
            nodeToRemove.tree = null;
            nodeToRemove.parent = null;
            nodeToRemove.leftChild = null;
            return;
        }
        //Case 3: Two children
        else if (nodeToRemove.leftChild && nodeToRemove.rightChild) {
            let succesorNode = this.findInOrderSuccesor(nodeToRemove);

            //If removing a right child
            if (nodeToRemove.parent.rightChild == nodeToRemove) {
                if (succesorNode.rightChild && succesorNode.parent != nodeToRemove) {
                    succesorNode.parent.leftChild = succesorNode.rightChild;
                    succesorNode.rightChild.parent = succesorNode.parent;
                    succesorNode.parent.leftChild = null;
                }  else if(!succesorNode.rightChild && succesorNode.parent != nodeToRemove){
                    succesorNode.parent.leftChild = null;
                }

                succesorNode.parent = nodeToRemove.parent;
                nodeToRemove.parent.rightChild = succesorNode;

                if (nodeToRemove.rightChild != succesorNode) {
                    succesorNode.rightChild = nodeToRemove.rightChild;
                    nodeToRemove.rightChild.parent = succesorNode;
                }

                succesorNode.leftChild = nodeToRemove.leftChild;
                nodeToRemove.leftChild.parent = succesorNode;
            }

            //If removing a left child
            else if (nodeToRemove.parent.leftChild == nodeToRemove) {
                if (succesorNode.rightChild && succesorNode.parent != nodeToRemove) {
                    succesorNode.parent.leftChild = succesorNode.rightChild;
                    succesorNode.rightChild.parent = succesorNode.parent;
                    succesorNode.parent.leftChild = null;
                } else if(!succesorNode.rightChild && succesorNode.parent != nodeToRemove){
                    succesorNode.parent.leftChild = null;
                }
                

                succesorNode.parent = nodeToRemove.parent;
                nodeToRemove.parent.leftChild = succesorNode;

                if (nodeToRemove.rightChild != succesorNode) {
                    succesorNode.rightChild = nodeToRemove.rightChild;
                    nodeToRemove.rightChild.parent = succesorNode;
                }

                succesorNode.leftChild = nodeToRemove.leftChild;
                nodeToRemove.leftChild.parent = succesorNode;
            }

            // cleanup the node that was removed
            nodeToRemove.isInTree = false;
            nodeToRemove.parent = null;
            nodeToRemove.tree = null;
            nodeToRemove.leftChild = null;
            nodeToRemove.rightChild = null;
            return;
        }
    }
}

    search(Value){

    }

    findInOrderSuccesor(nodeTofindSuccesor, wentToRight = false){ //needs to find the smallest value of the right subtree
       if(wentToRight == true){
            if(nodeTofindSuccesor.leftChild){
                return this.findInOrderSuccesor(nodeTofindSuccesor.leftChild, wentToRight = true);
            }
            else{
                let succesorNode = nodeTofindSuccesor;
                return succesorNode;
            }
        }
        if(nodeTofindSuccesor.rightChild){
            return this.findInOrderSuccesor(nodeTofindSuccesor.rightChild, wentToRight = true);
        }


        return undefined;
    }

}


