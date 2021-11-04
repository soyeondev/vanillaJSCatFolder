import api from "./api/theCatAPI.js";
import Nodes from './components/Node.js';

function App ($app){
    this.state = {
        isRoot: false,
        nodes: [],
        depth: []
    }

    const nodes = new Nodes({
        $app,
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        // 함수를 파라미터로 던지고, Node 내에서 click 발생시 이 함수를 호출하게 함
        // 이런방식으로 구현할 경우 Node 내에서는 click 후 어떤 로직이 일어날지 알아야 할 필요가 없음
        onClick: (node) => {
            if(node.type == "DIRECTORY"){
                // DIRECTORY인 경우 처리
                // 여기에서 Breadcrumb 관련 처리를 하게되면, Node에서는 Breadcrumb를 몰라도 됨
            }else if(node.type === 'FILE'){
                // FILE인 경우 처리
                
            }
        }
    });
}

export default App