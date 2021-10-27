// import fileImg from "../../assets/file.png";
// import directoryImg from "../../assets/directory.png";

export default class Node {
    constructor($target, data){
        this.data = data;
        this.$target = $target;
        console.log("node data: ", data);
        this.div = document.createElement("div");
        this.div.className = "Node";
        $target.appendChild(this.div);
        this.render();
    }

    render(){
        const nodeImg = document.createElement("img");
        console.log("this.data.type: ", this.data.type);
        nodeImg.width = '116';
        nodeImg.height = '116';
        if(this.data.type == "DIRECTORY"){
            nodeImg.src = "../../assets/directory.png";
        } else {
            nodeImg.src = "../../assets/file.png";
        }
        const name = document.createElement("div");
        name.innerHTML = this.data.name;
        
        this.div.appendChild(nodeImg);
        this.div.appendChild(name);
    }
}