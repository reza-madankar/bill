import axios from "axios";

const baseUrl = "http://localhost:8081/bill?type="

export default {
    Bill() {
        return {
          
            fetchData: type => axios.get(baseUrl + type)
        }
    }
}

