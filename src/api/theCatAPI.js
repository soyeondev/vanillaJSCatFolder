const API_ENDPOINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('서버의 상태가 이상합니다!')
        } 
         const data = await response.json();
            return data;
            
    }catch(e){
        const errData = await response.json();
        throw errData;

    }
}

const api = {
    fetchRoot: async () => {
        try{
            const requests = await request(
                `${API_ENDPOINT}`
            );
            return requests;
        }catch(e){
            console.log(e);
            return e;
        }
    }
}

export default api;