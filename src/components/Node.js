// import fileImg from "../../assets/file.png";
// import directoryImg from "../../assets/directory.png";

export default class Node {
    constructor($target, data, onClick){
        this.data = data;
        this.$target = $target;
        this.onClick = onClick;
        console.log("node data: ", data);
        this.div = document.createElement("ul");
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
        this.div.dataset.id = this.data.id
        const name = document.createElement("div");
        name.innerHTML = this.data.name;
        
        this.div.appendChild(nodeImg);
        this.div.appendChild(name);
        console.log("this.$target: ", this.$target.querySelectorAll('.Node'));

        this.$target.querySelectorAll(".Node").forEach($node => {
            console.log($node.dataset);
            console.log("ddd");
            $node.addEventListener("click", (e) => {
                const nodeId = $node.dataset.id;
                console.log(nodeId);
            })
        });
    }
}