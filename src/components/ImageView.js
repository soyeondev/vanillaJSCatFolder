const IMAGE_PATH_PREFIX = "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public"

function ImageView ({$app, initialState}){
    this.state = initialState
    this.$target = document.createElement('div');
    this.$target.className = 'Modal ImageView'

    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        // App.js의 초기 selectedFilePath는 null이고 node.type이 FILE인 클릭 이벤트에 대해서만 selectedFilePath를 넘겨준다.
        this.$target.innerHTML = `<div class="content">${this.state ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">`:''}</div>`
        this.$target.style.display = this.state ? 'block' : 'none'
    }

    this.render()
}

export default ImageView;