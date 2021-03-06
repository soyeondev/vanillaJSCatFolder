import request from "./api/theCatAPI.js";
import Nodes from './components/Node.js';
import Breadcrumb from './components/Breadcrumb.js';
import ImageView from './components/ImageView.js';
import Loading from './components/Loading.js';

const cache = {}
function App ($app){
    this.state = {
        isRoot: false,
        nodes: [],
        depth: [],
        selectedFilePath: null,
        isLoading: false,
    }

    const loading = new Loading({
        $app, 
        isLoading: this.state.isLoading
    })

    // ImageView component
    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedFilePath
    })

    // Breadcrumb component
    const breadcrumb = new Breadcrumb({$app, initialState: this.state.depth, 
        onClick: async (index) => {
            if(index === null){
                this.setState({
                    ...this.state,
                    depth: [],
                    nodes: cache.rootNodes
                })

                return
            }
            // breadcrumb에서 현재 위치를 누른 경우는 무시
            if(index === this.state.depth.length - 1){
                return
            }

            const nextState = {...this.state}
            const nextDepth = this.state.depth.slice(0, index + 1)

            this.setState({
                ...nextState,
                depth: nextDepth,
                nodes: cache[nextDepth[nextDepth.length - 1].id]
            })
        }});

    // Nodes component
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
                // DIRECTORY인 경우 처리
                // 여기에서 Breadcrumb 관련 처리를 하게되면, Node에서는 Breadcrumb를 몰라도 됨
                if(node.type == "DIRECTORY"){
                    if(cache[node.id]){ // 선택한 node가 cache에 있는 경우 처리
                        this.setState({
                            ...this.state,
                            depth: [...this.state.depth, node],
                            nodes: nextNodes
                        })
                    } else {  // 선택한 node가 cache에 없는 경우 처리
                        const nextNodes = await request(node.id)
                        this.setState({
                            ...this.state,
                            depth: [...this.state.depth, node],
                            nodes: nextNodes
                        })
                        cache[node.id] = nextNodes
                    }
                // FILE인 경우 처리
                // ImageView 컴포넌트에 filePath state를 넘겨준다.
                }else if(node.type === 'FILE'){
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath
                    })
                }

            } catch(e){

            }

        },
        onBackClick: async () => {
            try{
                const nextState = {...this.state}
                nextState.depth.pop()   // 배열에서 pop()해서 빠져나오게 함
                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id
                if(prevNodeId === null) {
                    const rootNodes = await request()
                    this.setState({
                        ...nextState,
                        isRoot: true,
                        nodes: cache.rootNodes
                    })
                } else {
                    const prevNodes = await request(prevNodeId)
                    this.setState({
                        ...nextState,
                        isRoot: false,
                        nodes: cache[prevNodes],
                    })
                }
            }catch(e){
                console.log(e)
            }
        }
    });

    // setState 함수 정의
    this.setState = (nextState) => {
        this.state = nextState
         breadcrumb.setState(this.state.depth)
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        imageView.setState(this.state.selectedFilePath)
        loading.setState(this.state.isLoading)
    }

    // 사진첩 초기 로드시 기본 데이터를 받아온다.
    const init = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        try {
            const rootNodes = await request()
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })

            // 캐시에 추가
            cache.rootNodes = rootNodes
        } catch(e) {
            console.log(e);            
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    }
    init()
}

export default App