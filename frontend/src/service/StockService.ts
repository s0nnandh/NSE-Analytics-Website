import { Stream } from "stream";
import http from "../http-common";
import { Stock } from "../types/Stock";
import { StockID } from "../types/StockID";
import { StockRequest } from "../types/StockRequest";

class StockDataService {
    getAllIds() {
        return http.get<Array<StockID>>("/stock/ids");
    }
    
    // getStockBetweenDates(data : StockRequest) {
    //     // convert data to dict
    //     let dict = {
    //         id : data.id,
    //         start_date : data.start_date,
    //         end_date : data.end_date
    //     }
    //     return http.post<Array<Stock>>("/price", dict);
    // }  
    
    getStockBetweenDates(data : StockRequest) {
        return http.get<Array<Stock>>(`/stock/${data.id}/${data.start_date}/${data.end_date}`);
    }

}

export default new StockDataService();