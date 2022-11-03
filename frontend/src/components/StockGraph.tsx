import { useState } from "react";
import { StockGraphComponent } from "./StockGraphComponent";
import { StockRequest } from "../types/StockRequest";
import { StockFilters } from "./StockFilters";

export const StockGraph = () => {
    

    const [display, setDisplay] = useState<boolean>(false);

    const [componentRequest, setComponentRequest] = useState<StockRequest>({
        id: "",
        start_date: "",
        end_date: ""
    })

    const handleSubmit = (id : string, start_date : string, end_date : string) => {
        console.log("Submitted");
        setDisplay(true);
        setComponentRequest({
            id: id,
            start_date: start_date,
            end_date: end_date
        });
    }


    return (
        <>
            <div className="flex flex-row justify-center items-center gap-10">
                <div className="grid grid-cols-1 grid-rows-1 items-center">
                    <StockFilters handleSubmit={handleSubmit}/>      
                </div>
                <div >
                    {display && <StockGraphComponent {...componentRequest} />}
                </div>
            </div>
        </>
    );
}
