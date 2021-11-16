// api end point를 상수처리 해두기
const API_END_POINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/";

// const request = (nodeId) => {
//     fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
//         .then((response) => {
//             if(!response.ok) {
//                 throw new Error('서버의 상태가 이상합니다.')
//             }
//             return response.json()
//         })
//         .catch((e) => {
//             throw new Error(`무언가 잘못 되었습니다! ${e.message}`)
//         });
// }

const request = async (nodeId) => { // async ~ await 형태 사용
    try {
        const res = await fetch(`${API_END_POINT}${nodeId ? nodeId : ''}`)        
        if(!res.ok) {
            throw new Error('서버의 상태가 이상합니다.')
        }
        return await res.json()
    } catch(e){
        throw new Error(`무언가 잘못 되었습니다! ${e.message}`)
    }
}

export default request;