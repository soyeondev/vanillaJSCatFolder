const API_ENDPOINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            const errData = await response.json();
            throw errData;
        }
    }catch(e){
        throw {
            message: e.message,
            status: e.status
        }
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