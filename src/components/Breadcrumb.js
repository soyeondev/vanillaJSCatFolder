function Breadcrumb ({$app, initialState, onClick}) {
    this.state = initialState

    this.onClick = onClick

    this.$target = document.createElement('nav')
    this.$target.className = 'Breadcrumb'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        console.log("bread nextState: ", nextState);
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `<div class="nav-item">root</div>${
            this.state.map(
                (node, index) => `<div class="nav-item" data-index="${index}">${node.name}</div>`).join('')}`
    }

    this.$target.addEventListener('click', (e) => {
        console.log(e.target)
        const $breadcrumb = e.target.closest('.nav-item');
        console.log("breadcrumb: ", $breadcrumb)
        if($breadcrumb){
            const {index} = $breadcrumb.dataset;
            console.log(index)
            console.log("this.state: ", this.state)
            this.onClick(index ? parseInt(index, 10) : null)
        }
    });

    this.render()
}

export default Breadcrumb;