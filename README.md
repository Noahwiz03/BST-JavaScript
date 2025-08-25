# Interactive Binary Search Tree Visualizer  

An interactive **Binary Search Tree (BST) visualizer website** that lets you **create, drag, and connect nodes** to form BSTs. Unlike traditional static diagrams or animations, this project gives you a **hands-on experience** with BSTs—you can manipulate the nodes directly, drag them around the canvas, and watch the tree restructure itself in real time.  

Inspired by the visuals often shown in YouTube tutorials on binary trees, this project aims to make learning **engaging, exploratory, and intuitive.**  

---

## Features  

- **Node Creation**  
  - Enter a value and click *Create Node* to spawn a new node at a random location on the canvas.  

- **Drag & Drop Interaction**  
  - **Left Click + Drag**: Move nodes around freely.  
  - **Drop on Another Node**: Automatically inserts the dragged node into that node’s BST.  
  - **Right Click + Drag Out**: Removes a node from its tree.  
  - **Right Click on a Root (no children)**: Converts it back into a normal, unlinked node.  

- **Automatic Layout**  
  - Trees are restructured and neatly spaced when a root node is dragged.  
  - Subtree widths and depths are calculated dynamically for balanced visualization.  

- **Multiple Trees**  
  - Create several independent trees by dragging nodes onto unlinked nodes.  

- **Reset Option**  
  - Clear all nodes and start fresh with one click.  

---

## Controls  

| Action        | Mouse/Button         | Behavior                                   |
|---------------|----------------------|--------------------------------------------|
| Create Node   | Button               | Spawns a new node with the entered value   |
| Drag Node     | Left Click + Move    | Moves a node around the canvas             |
| Insert Node   | Drag onto another    | Node is inserted into that tree            |
| Remove Node   | Right Click on node  | Removes the node from its tree             |
| Reset         | Button               | Clears all nodes from canvas               |

---

## Tech Stack  

- **HTML5 Canvas** – rendering nodes & edges  
- **Vanilla JavaScript (ES6 modules)** – logic & interaction  
- **Custom BST Implementation** – insert, remove, and layout calculations  

---

## Future Improvements  

- Add animations for smoother insertions/removals  
- Show node deletion cases more clearly with animations  
- Add a search feature to highlight nodes  
