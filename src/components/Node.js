function Nodes({$app, initialState, onClick, onBackClick}){
    this.state = initialState

    this.$target = document.createElement('ul')
    $app.appendChild(this.$target)

    this.onClick = onClick

    this.onBackClick = onBackClick

    // state를 받아 현재 컴포넌트의 state를 변경하고 다시 렌더링
    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

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


    } 



            // 렌더링된 이후 클릭 가능한 모든 요소에 click 이벤트 걸기
        // this.$target.querySelectorAll('.Node').forEach($node => {
        //     console.log("$node: ", $node);
        //     $node.addEventListener('click', (e) => {
        //         console.log(e.currentTarget);
        //         const {nodeId} = e.currentTarget.dataset
        //         console.log("nodeId: ", nodeId);

        //         if(!nodeId) {
        //             this.onBackClick()
        //         }

        //         const selectedNode = this.state.nodes.find(node => node.id === nodeId)
                
        //         if(selectedNode){
        //             console.log("selectedNode: ", selectedNode);
        //             this.onClick(selectedNode)
        //         }
        //     })
        // })

        // 이벤트 최적화 - 이벤트 버블링 사용한 코드
        this.$target.addEventListener('click', (e) => {
            // $target 하위에 있는 HTML 요소를 클릭하면 이벤트가 상위로 계속 전파되고 
            // $target까지 오게 되어 forEach로 매번 이벤트를 걸어주지 않아도 된다.

            const $node = e.target.closest('.Node')
            if($node) {
                const {nodeId} = $node.dataset
                if(!nodeId){
                    this.onBackClick()
                    return
                }
                const selectedNode = this.state.nodes.find(node => node.id === nodeId)
                if(selectedNode){
                    this.onClick(selectedNode)
                }
            }
        })
        this.render()
}

export default Nodes;