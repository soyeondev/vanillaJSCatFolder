## vanillaJSCatFolder 🐱
- 2021 Dev-Matching 웹 프론트엔드 개발자 과제 복기


## ✏ study 


### 선언적 프로그래밍과 컴포넌트 추상화
- 컴포넌트 형태로 추상화 한다는 것?
DOM에 접근하는 부분을 최소화하고 명령형 프로그래밍 방식보다는 선언적 프로그래밍 방식으로 접근하는 것을 이야기 한다.
- 명령형 프로그래밍 방식: DOM을 직접 접근하는 것에 제한과 규칙이 없고 재사용이 쉽지 않음
```javascript
function renderNodes(nodes) {
    const $container = document.querySelector('.container')
    nodes.forEach(node => {
        const $node = document.createElement('div')
        ...
        ...
        $container.appendChild($node)
    })
}
```
- 선언형 프로그래밍 방식
```javascript
// 생성된 DOM을 어디에 append할지 $app파라미터로 받기
function Nodes({$app, initialState, onClick}){
    this.state = initialState

    // Nodes 컴포넌트를 렌더링 할 DOM을 this.$target 이라는 이름으로 생성
    this.$target = document.createElement('ul')
    $app.appendChild(this.$target)

    // state를 받아 현재 컴포넌트의 state를 변경하고 다시 렌더링
    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }
    this.onClick = onClick

    // 현재 상태(this.state)를 기준으로 렌더링
    this.render = () => {
        this.$target.innerHTML = this.state.nodes.map(node => `<li>${node.name}</li>`)
    }

    // 인스턴스화 이후 바로 render 함수를 실행하며 new로 실행하자마자 렌더링되도록 할 수 있음
    this.render()
}