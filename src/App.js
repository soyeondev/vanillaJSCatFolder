import request from "./api/theCatAPI.js";
import Nodes from './components/Node.js';
import Breadcrumb from './components/Breadcrumb.js';

function App ($app){
    this.state = {
        isRoot: false,
        nodes: [],
        depth: []
    }

    const breadcrumb = new Breadcrumb({$app, initialState: this.state.depth})

    const nodes = new Nodes({
        $app,
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        // 함수를 파라미터로 던지고, Node 내에서 click 발생시 이 함수를 호출하게 함
        // 이런방식으로 구현할 경우 Node 내에서는 click 후 어떤 로직이 일어날지 알아야 할 필요가 없음
        onClick: async (node) => {
            try {
                if(node.type == "DIRECTORY"){
                    const nextNodes = await request(node.id)
                    this.setState({
                        ...this.state,
                        depth: [...this.state.depth, node],
                        nodes: nextNodes
                    })
                    // DIRECTORY인 경우 처리
                    // 여기에서 Breadcrumb 관련 처리를 하게되면, Node에서는 Breadcrumb를 몰라도 됨
                }else if(node.type === 'FILE'){
                    // FILE인 경우 처리
                    
                }
            } catch(e){

            }

        }
    });

    // setState 함수 정의
    this.setState = (nextState) => {
        console.log("appjs nextState: ", nextState);
        this.state = nextState
         breadcrumb.setState(this.state.depth)
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
    }

    // 사진첩 초기 로드시 기본 데이터를 받아온다.
    const init = async () => {
        try {
            const rootNodes = await request()
            await console.log("rootNodes: ", rootNodes);
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })
        } catch(e) {
            console.log(e);            
        }
    }
    init()
}

export default App