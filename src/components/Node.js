// import fileImg from "../../assets/file.png";
// import directoryImg from "../../assets/directory.png";

function Nodes({$app, initialState, onClick}){
    this.state = initialState

    this.$target = document.createElement('ul')
    $app.appendChild(this.$target)

    // state를 받아 현재 컴포넌트의 state를 변경하고 다시 렌더링
    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }
    this.onClick = onClick

    this.render = () => {
        this.$target.innerHTML = this.state.nodes.map(node => `<li>${node.name}</li>`)
    }

    this.render()
}