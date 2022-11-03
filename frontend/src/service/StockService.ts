import http from "../http-common";
import { Stock } from "../types/Stock";
import { StockID } from "../types/StockID";
import { StockRequest } from "../types/StockRequest";

class StockDataService {
    getAllIds() {
        return http.get<Array<StockID>>("/ids");
    }
    
    getStockBetweenDates(data : StockRequest) {
        return http.post<Array<Stock>>("/price", data);
    }    
}

export default new StockDataService();