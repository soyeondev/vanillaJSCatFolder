import api from "./api/theCatAPI.js";

export default class App {
    
    constructor($target){
        console.log("app in");
        const loadRootData = async () => {
            let response;
            response = await api.fetchRoot();
            console.log("app response: ", response);
        };
        loadRootData();


        // const node = new Node($target);
    }
}