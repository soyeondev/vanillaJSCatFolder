## vanillaJSCatFolder ๐ฑ
- 2021 Dev-Matching ์น ํ๋ก ํธ์๋ ๊ฐ๋ฐ์ ๊ณผ์  ๋ณต๊ธฐ


## โ study 


### ์ ์ธ์  ํ๋ก๊ทธ๋๋ฐ๊ณผ ์ปดํฌ๋ํธ ์ถ์ํ
- ์ปดํฌ๋ํธ ํํ๋ก ์ถ์ํ ํ๋ค๋ ๊ฒ?   
DOM์ ์ ๊ทผํ๋ ๋ถ๋ถ์ ์ต์ํํ๊ณ  ๋ช๋ นํ ํ๋ก๊ทธ๋๋ฐ ๋ฐฉ์๋ณด๋ค๋ ์ ์ธ์  ํ๋ก๊ทธ๋๋ฐ ๋ฐฉ์์ผ๋ก ์ ๊ทผํ๋ ๊ฒ์ ์ด์ผ๊ธฐ ํ๋ค.   
    - ๋ฌธ์ ๊ฐ์ฒด ๋ชจ๋ธ(DOM)
[ [WEB] window, DOM, BOM](https://soyeondev.tistory.com/310)

- ๋ช๋ นํ ํ๋ก๊ทธ๋๋ฐ ๋ฐฉ์: DOM์ ์ง์  ์ ๊ทผํ๋ ๊ฒ์ ์ ํ๊ณผ ๊ท์น์ด ์๊ณ  ์ฌ์ฌ์ฉ์ด ์ฝ์ง ์์
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
- ์ ์ธํ ํ๋ก๊ทธ๋๋ฐ ๋ฐฉ์
```javascript
// ์์ฑ๋ DOM์ ์ด๋์ appendํ ์ง $appํ๋ผ๋ฏธํฐ๋ก ๋ฐ๊ธฐ
function Nodes({$app, initialState, onClick}){
    this.state = initialState

    // Nodes ์ปดํฌ๋ํธ๋ฅผ ๋ ๋๋ง ํ  DOM์ this.$target ์ด๋ผ๋ ์ด๋ฆ์ผ๋ก ์์ฑ
    this.$target = document.createElement('ul')
    $app.appendChild(this.$target)

    // state๋ฅผ ๋ฐ์ ํ์ฌ ์ปดํฌ๋ํธ์ state๋ฅผ ๋ณ๊ฒฝํ๊ณ  ๋ค์ ๋ ๋๋ง
    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }
    this.onClick = onClick

    // ํ์ฌ ์ํ(this.state)๋ฅผ ๊ธฐ์ค์ผ๋ก ๋ ๋๋ง
    this.render = () => {
        this.$target.innerHTML = this.state.nodes.map(node => `<li>${node.name}</li>`)
    }

    // ์ธ์คํด์คํ ์ดํ ๋ฐ๋ก render ํจ์๋ฅผ ์คํํ๋ฉฐ new๋ก ์คํํ์๋ง์ ๋ ๋๋ง๋๋๋ก ํ  ์ ์์
    this.render()
}
```

### fetch๋ก ๋ฐ์ดํฐ ๋ถ๋ฌ์ค๊ธฐ 
fetch ํจ์๋ ๊ธฐ๋ณธ์ ์ผ๋ก url์ ํ๋ผ๋ฉํฐ๋ก ๋ฐ๊ณ  Promise ํํ๋ก ์ฒ๋ฆฌํ๋ค.   
fetch()๋ก ๋ถํฐ ๋ฐํ๋๋ Promise ๊ฐ์ฒด๋ HTTP error ์ํ๋ฅผ rejectํ์ง ์๋๋ค. ๋ฐ๋ผ์ ์์ฒญ์ด ์ฑ๊ณตํ๋์ง ์ฒดํฌํ๊ธฐ ์ํด response์ ok๋ฅผ ์ฒดํฌํด์ผ ํ๋ค.   
* Promise๋?   
[ [javascript] Promise๊ฐ๋๊ณผ ํ์ฉ](https://soyeondev.tistory.com/311)

* fetch   
```javascript
fetch('http://example.com/movies.json')
    .then((response) => {
        if(!response.ok){
            throw new Error('http ์ค๋ฅ')
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

### event.target๊ณผ event.currentTarget
- event.target
์ด๋ฒคํธ ๋ฐ์ ์์น(์ฌ์ฉ์๊ฐ ํด๋ฆญํ ๊ณณ)
- event.currentTarget
์ด๋ฒคํธ ์์ฑ ์์น(๊ฐ๋ฐ์๊ฐ ์ง์ ํ ์ด๋ฒคํธ ๋ฐ์ ์์น)

### Event Bubbling ์ ํ์ฉํ ์ด๋ฒคํธ ์ต์ ํ
- Event Bubbling: ํน์  ํ๋ฉด ์์์์ ์ด๋ฒคํธ๊ฐ ๋ฐ์ํ์ ๋ ํด๋น ์ด๋ฒคํธ๊ฐ ๋ ์์์ ํ๋ฉด ์์๋ค๋ก ์ ๋ฌ๋์ด ๊ฐ๋ ํน์ฑ์ ์๋ฏธ
- ํน์  ์ฌ๋ฌ๊ฐ์ ์์์ ์ด๋ฒคํธ๋ฅผ ๊ฑธ์ด์ฃผ์ด์ผ ํ๋ ๊ฒฝ์ฐ ๋ ๋๋ง์ด ์ผ์ด๋  ๋๋ง๋ค ๋งค๋ฒ forEach๋ก ์ด๋ฒคํธ๋ฅผ ๋ค์ ๊ฑธ์ด์ฃผ๋ ๊ณผ์ ์ด ํ์ํ์์ผ๋ ์ด๋ฒคํธ ๋ฒ๋ธ๋ง์ ํตํด ํ์ฌ ํด๋ฆญํ ์์์ ์์๋ก ์ ํ๋๋ ์ด๋ฒคํธ๋ฅผ closest()๋ฅผ ์ฌ์ฉํ์ฌ ์บ์นํด์ target์ ์ ๋ณด๋ฅผ ์ ์ ์์
- ๊ตฌํํ ์ฝ๋
```javascript
    this.$target.addEventListener('click', (e) => {
        // $target ํ์์ ์๋ HTML ์์๋ฅผ ํด๋ฆญํ๋ฉด ์ด๋ฒคํธ๊ฐ ์์๋ก ๊ณ์ ์ ํ๋๊ณ  
        // .Node๊น์ง ์ค๊ฒ ๋์ด forEach๋ก ๋งค๋ฒ ์ด๋ฒคํธ๋ฅผ ๊ฑธ์ด์ฃผ์ง ์์๋ ๋๋ค.
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
```



## ๐คฆโโ๏ธ issue



### event ๊ด๋ จ ์ด์
- ์ด์   
render ์์ addEventListener๋ฅผ ์ ์ธํด์ renderํจ์๊ฐ ํธ์ถ๋๋ ๋งํผ ์ด๋ฒคํธ๊ฐ ๋ฑ๋ก๋์ด์ ํด๋ฆญ๋น renderํจ์ ํธ์ถ ์ ๋งํผ ์ด๋ฒคํธ๊ฐ ๋ฐ์ํ๋ ์ด์๊ฐ ๋ฐ์ํ๋ค.
- ํด๊ฒฐ   
addEventListener ์ด๋ฒคํธ ๋ฑ๋ก์ render ํจ์ ๋ฐ๊นฅ์์ ํด์ฃผ์ด ํ๋ฒ๋ง ์ด๋ฒคํธ๊ฐ ๋ฑ๋ก๋๋๋ก ํ์๋ค.