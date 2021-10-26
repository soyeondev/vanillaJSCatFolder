export default class Node {
    constructor({$target}){
        this.div = document.createElement("div");
        this.div.className = "Node";
        $target.appendChild(this.div);
        this.render();
    }

    render(){

    }
}