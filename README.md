## vanillaJSCatFolder 🐱
- 2021 Dev-Matching 웹 프론트엔드 개발자 과제 복기


## ✏ study 


### 선언적 프로그래밍과 컴포넌트 추상화
- 컴포넌트 형태로 추상화 한다는 것?   
DOM에 접근하는 부분을 최소화하고 명령형 프로그래밍 방식보다는 선언적 프로그래밍 방식으로 접근하는 것을 이야기 한다.   
    - 문서 객체 모델(DOM)
[ [WEB] window, DOM, BOM](https://soyeondev.tistory.com/310)

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
```

### fetch로 데이터 불러오기 
fetch 함수는 기본적으로 url을 파라메터로 받고 Promise 형태로 처리한다.   
fetch()로 부터 반환되는 Promise 객체는 HTTP error 상태를 reject하지 않는다. 따라서 요청이 성공했는지 체크하기 위해 response의 ok를 체크해야 한다.   
* Promise란?   
[ [javascript] Promise개념과 활용](https://soyeondev.tistory.com/311)

* fetch   
```javascript
fetch('http://example.com/movies.json')
    .then((response) => {
        if(!response.ok){
            throw new Error('http 오류')
        }
        return response.json();
    })
    .then((myJson) => {
        console.log(JSON.stringify(myJson));
    })
    .catch(e => {
        alert(e.message)
    })
```

### event.target과 event.currentTarget
- event.target
이벤트 발생 위치(사용자가 클릭한 곳)
- event.currentTarget
이벤트 생성 위치(개발자가 지정한 이벤트 발생 위치)

### Event Bubbling
- 이벤트 버블링이란 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미


## 🤦‍♀️ issue



### event 관련 이슈
- 이슈   
render 안에 addEventListener를 선언해서 render함수가 호출되는 만큼 이벤트가 등록되어서 클릭당 render함수 호출 수 만큼 이벤트가 발생하는 이슈가 발생했다.
- 해결   
addEventListener 이벤트 등록을 render 함수 바깥에서 해주어 한번만 이벤트가 등록되도록 하였다.