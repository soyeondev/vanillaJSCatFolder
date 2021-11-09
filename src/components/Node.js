// import fileImg from "../../assets/file.png";
// import directoryImg from "../../assets/directory.png";

function Nodes({$app, initialState, onClick}){
    this.state = initialState

    this.$target = document.createElement('ul')
    $app.appendChild(this.$target)

    // state를 받아 현재 컴포넌트의 state를 변경하고 다시 렌더링
    this.setState = (nextState) => {
        console.log("node nextState: ", nextState);
        this.state = nextState
        this.render()
    }
    this.onClick = onClick

    this.render = () => {
        if(this.state.nodes) {
            const nodesTemplate = this.state.nodes.map(node => {
                const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png'

                return `
                    <div class="Node" data-node-id="${node.id}">
                        <img src="${iconPath}" width="100px" height="100px"/>
                        <div>${node.name}</div>
                    </div>
                `
            }).join('')
            this.$target.innerHTML = this.state.isRoot ? `<div class="Node"><img src="/assets/prev.png" width="100px" height="100px"></div>${nodesTemplate}` : nodesTemplate
        }

        // 렌더링된 이후 클릭 가능한 모든 요소에 click 이벤트 걸기
        this.$target.querySelectorAll('.Node').forEach($node => {
            console.log("$node: ", $node);
            $node.addEventListener('click', (e) => {
                console.log(e.currentTarget);
                const {nodeId} = e.currentTarget.dataset
                console.log("nodeId: ", nodeId);
                const selectedNode = this.state.nodes.find(node => node.id === nodeId)
                
                if(selectedNode){
                    console.log("selectedNode: ", selectedNode);
                    this.onClick(selectedNode)
                }
            })
        })
    }

    this.render()
}

export default Nodes;