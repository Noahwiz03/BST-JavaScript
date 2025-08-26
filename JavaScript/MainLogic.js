//imports
import {Node} from './Node.js';
import {BinarySearchTree} from './TreeManager.js';
const widthMult = 0.999;
const heightMult = 0.92;
const canvas = document.getElementById("canvas");
canvas.width= window.innerWidth * widthMult;
canvas.height = window.innerHeight * heightMult;
const ctx = canvas.getContext("2d");

const allNodes = []; //stores all nodes
//const allTrees = []; //stores all trees



// making the canvas rezise to the size of the window
resizeCanvas(true);
window.addEventListener("resize", () => resizeCanvas(false));

function resizeCanvas(initial = false) {
    const oldWidth = canvas.width || 1;
    const oldHeight = canvas.height || 1;

    const newWidth = Math.floor(window.innerWidth * widthMult);
    const newHeight = Math.floor(window.innerHeight * heightMult);

    const scaleX = newWidth / oldWidth;
    const scaleY = newHeight / oldHeight;

    canvas.width = newWidth;
    canvas.height = newHeight;

    // Scale nodes if not first run
    if (!initial && oldWidth > 1 && oldHeight > 1) {
        for (let node of allNodes) {
            node.x *= scaleX;
            node.y *= scaleY;
        }
    }

   // drawAllNodes(allNodes);
}



//dropdown button
  // Click-to-toggle dropdown
  const dropdownContainer = document.querySelector('.dropdown-container');
  const dropdownBtn = document.getElementById('dropdownBtn');

  dropdownBtn.addEventListener('click', () => {
    dropdownContainer.classList.toggle('active');
  });


//dragging logic

function getPointerPos(e) {
    if (e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    } else {
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    }
}
let draggingNode = null;


function isMouseInNode(x,y, node){
    
    if(Math.sqrt((x-node.x)*(x-node.x) + (y-node.y)*(y-node.y)) < node.radius){
        return true;
    }
    return false
}

canvas.addEventListener('mousedown', e => {
e.preventDefault();
if(e.button == 0){
const {x, y} = getPointerPos(e);
let startX = parseInt(x);
let startY = parseInt(y);

for(let node of allNodes){
    if(isMouseInNode(startX,startY, node)){
        draggingNode = node;
        if(draggingNode.isRoot){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            layOutTree(draggingNode);
        }
        let temp = allNodes[allNodes.length -1];
        let swapIndex = allNodes.indexOf(draggingNode);
        allNodes[allNodes.length-1] = draggingNode;
        allNodes[swapIndex] = temp;
       // drawAllNodes(allNodes);
        break;
    }
 }

}

if(e.button == 2){
    const {x, y} = getPointerPos(e);
    let startX = parseInt(x);
    let startY = parseInt(y);

    for(let node of allNodes){
    if(isMouseInNode(startX,startY, node)){
        draggingNode = node;
        if(draggingNode.isRoot){
            if(!draggingNode.leftChild && !draggingNode.rightChild){
                draggingNode.isInTree = false;
                draggingNode.tree = null;
                draggingNode.isRoot = false;
            }
            continue;
        }
        else if(!draggingNode.isInTree || !draggingNode.tree){
            continue;
        }
        let temp = allNodes[allNodes.length -1];
        let swapIndex = allNodes.indexOf(draggingNode);
        allNodes[allNodes.length-1] = draggingNode;
        allNodes[swapIndex] = temp;
        draggingNode.tree.remove(draggingNode);
       // drawAllNodes(allNodes);
        break;
    }
 }
}
//console.log(startX,startY);
//console.log(draggingNode);
});

canvas.addEventListener('mousemove', e => {
   if(!draggingNode){return;}
   const {x, y} = getPointerPos(e);
    draggingNode.x = parseInt(x);
    draggingNode.y = parseInt(y);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if(draggingNode.isRoot){  
     layOutTree(draggingNode);
    }
   // drawAllNodes(allNodes);
});

//found on stackedOverFlow https://stackoverflow.com/questions/10864249/how-to-disable-the-right-click-context-menu-on-an-html-canvas
canvas.oncontextmenu = function (e) {
    e.preventDefault();
};

canvas.addEventListener('mouseup', e => {
    let targetNode = null;
    if(!draggingNode){return;}

    for(let node of allNodes){
        if(node === draggingNode){
            continue;
        }
        let dx = draggingNode.x-node.x;
        let dy = draggingNode.y-node.y;
        let rTotal = node.radius + draggingNode.radius
        if(Math.sqrt( dx*dx + dy*dy) < rTotal){
            targetNode = node;
            break;
        }
    }
    if(draggingNode.isInTree){
        drawAllNodes(allNodes);
         let temp = allNodes[0];
        let swapIndex = allNodes.indexOf(draggingNode);
        allNodes[0] = draggingNode;
        allNodes[swapIndex] = temp;
        draggingNode = null;
        return;
    }

    if(targetNode){
        if(!targetNode.isInTree){
            const newTree = new BinarySearchTree();
            newTree.root = targetNode;
            targetNode.isInTree = true;515
            targetNode.isRoot = true;
            targetNode.parent = null;
            targetNode.tree = newTree;
  //          allTrees.push(newTree);
        }
        
        targetNode.tree.insert(draggingNode);
    }
        drawAllNodes(allNodes);
        let temp = allNodes[0];
        let swapIndex = allNodes.indexOf(draggingNode);
        allNodes[0] = draggingNode;
        allNodes[swapIndex] = temp;
        draggingNode = null;
});

canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    canvas.dispatchEvent(new MouseEvent('mousedown', e));
});

canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    canvas.dispatchEvent(new MouseEvent('mousemove', e));
});

canvas.addEventListener('touchend', e => {
    e.preventDefault();
    canvas.dispatchEvent(new MouseEvent('mouseup', e));
});

//buttons logic
document.getElementById("createbtn").onclick = function() {CreateNode()};
function CreateNode(){
    let newNodeValue = document.getElementById("nodeValue").value;
    if(newNodeValue != ''){
        newNodeValue = parseInt(newNodeValue);
        if(isNaN(newNodeValue)){
            return;
        }
    }else{ return;}
    let x = Math.random(0,1) * canvas.width;
    let y = Math.random(0,1) * canvas.height;
    // console.log(x, y);
    allNodes.push(new Node(newNodeValue,x,y));
   // drawAllNodes(allNodes);
   document.getElementById("nodeValue").value = "";
}

document.getElementById("resetbtn").onclick = function() {ResetScene()};
function ResetScene(){
    allNodes.length = 0;
  //  allTrees.length = 0;
   // ctx.clearRect(0,0,canvas.width,canvas.height);
}


//originall implemented using chatGPT but i deleted it and rewrote it from notes, it had minor bugs but i now have a deeper understanding of this function
//referenced original after i rewrote it all ande came to conclusions myself, will tag what i regained from the original chatgpt one
//reconstructed to the best of my ability, added a few minor fixes from the orginal chatgpt one after. feeling even more comfortable with this function now


//Split this to assign subtreeWidths from bottom up. then make a functon that assigns positons from the top down??
function layOutTree(node, layer = 0){
    if(!node){return 0; }//added the 0 so there is no NaNs, this would fuck shit up
 
    const horizontalGap = 100;
    const verticalGap = 80;

    if(!node.leftChild && !node.rightChild){
     node.subtree = 1;
     return 1;
    }

    const leftWidth = layOutTree(node.leftChild, layer + 1);
    const rightWidth = layOutTree(node.rightChild,layer + 1);


    const totalWidth = leftWidth + rightWidth || 1; // ||1 is just a guard rail as the no children case is handled earlier
    node.subtree = totalWidth;

    const leftStart = node.x - (totalWidth * horizontalGap)/2; //added the /2 which gives you half of the total space which makes more sense anyway
    if(node.leftChild){
    node.leftChild.x = leftStart + (leftWidth * horizontalGap)/2;
    node.leftChild.y = node.y + horizontalGap;
    }
    if(node.rightChild){
    node.rightChild.x = leftStart + (leftWidth * horizontalGap) + (rightWidth*horizontalGap)/2;
    node.rightChild.y = node.y + horizontalGap;
    }


    return totalWidth;
}

//drawing the stuff
function drawEdges(currentNode){
    
    ctx.beginPath();
    ctx.moveTo(currentNode.x,currentNode.y);
    if(currentNode.leftChild){
    ctx.lineTo(currentNode.leftChild.x, currentNode.leftChild.y);
    ctx.moveTo(currentNode.x,currentNode.y);    
    }
    50
    if(currentNode.rightChild){
    ctx.lineTo(currentNode.rightChild.x,currentNode.rightChild.y);
    ctx.moveTo(currentNode.x,currentNode.y);
    }

    ctx.strokeStyle = "white";
    ctx.stroke();
}

function drawNode(node){
    ctx.textAlign = "center";
    ctx.lineWidth = 4;


    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = "#4262fe";
    if(node.isRoot){
        ctx.fillStyle = "#005f32";
    }
    ctx.fill();
    ctx.font = "16px serif";
    ctx.fillStyle = "white";
    ctx.textBaseLine = "middle";
    ctx.fillText(`${node.value}`, node.x, node.y + 4);
}
function drawAllNodes(nodes){

   drawInstructionsOnCanvas();
    for(var node of nodes){
      drawEdges(node);
    }
    for(var node of nodes){
      drawNode(node);
    }
}


function drawInstructionsOnCanvas() {
    const instructions = [
        "Action       Mouse/Button             Behavior",
        "Create Node  Button                   Spawns a new node with the entered value",
        "Drag Node    Left Click + Move        Moves a node around the canvas",
        "Insert Node  Drag Node onto another   Node is inserted into that tree",
        "Remove Node  Right Click on node      Removes the node from its tree",
        "Reset        Button                   Clears all nodes from canvas"
    ];

    ctx.save();

    // Responsive font size: 2% of canvas height, min 12px, max 20px
    const fontSize = Math.max(12, Math.min(20, canvas.height * 0.02));
    ctx.font = `${fontSize}px monospace`;

    // Faint, semi-transparent text
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.textAlign = "left";

    const paddingX = canvas.width * 0.02; // 2% from left
    const paddingY = canvas.height * 0.10; // 5% from top
    const lineHeight = fontSize * 1.5;

    for (let i = 0; i < instructions.length; i++) {
        ctx.fillText(instructions[i], paddingX, paddingY + i * lineHeight);
    }

    ctx.restore();
}

function update() {
    // Clear and redraw the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    drawInstructionsOnCanvas();
    // Draw edges
    for (let node of allNodes) {
        drawEdges(node);
    }

    // Draw instructions (faint text under nodes)
    

    // Draw nodes
    for (let node of allNodes) {
        drawNode(node);
    }

    // Schedule next frame
    requestAnimationFrame(update);
}

update();