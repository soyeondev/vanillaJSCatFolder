import api from "./api/theCatAPI.js";
import Node from './components/Node.js';

export default class App {
    constructor($target){
        console.log("app in");
        const loadRootData = async () => {
            const nodes = document.createElement("div");
            let response;
            response = await api.fetchRoot();
            console.log("app response: ", response);
            response.map((item, idx) => {
                console.log("item: ", item);
                console.log("idx: ", idx);
                const node = new Node($target, item);

            });
        };
        loadRootData();



    }
}