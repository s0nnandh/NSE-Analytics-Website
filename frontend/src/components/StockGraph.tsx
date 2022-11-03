import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { CustomDateRangePicker } from "./CustomDateRangePicker";
import { Audio } from 'react-loader-spinner'
import StockDataService from "../service/StockService";
import { StockID } from "../types/StockID";


export const StockGraph = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState({
        isError: true,
        message: "Error Occurred"
    });

    const [startDate, setStartDate] = useState<Date>(new Date());

    const [endDate, setEndDate] = useState<Date>(new Date());
    
    const [text, setText] = useState<String>("");

    const [stockId, setStockId] = useState<String>("")

    const [openDropdown, setOpenDropdown] = useState<Boolean>(false);
    
    const [data, setData] = useState<Array<StockID>>([]);

    useEffect(() => {
        setIsLoading(true);
        StockDataService.getAllIds()
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(e => {
                console.log(e);
                setError({
                    isError: true,
                    message: e.message
                })
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = () => {
        
    }

    return (

        isLoading 
        ? 
        <div className="flex justify-center items-center h-screen">
            <Audio
                height="80"
                width="80"
                color="green"
                ariaLabel="loading"
            />
        </div>
        : 
        (
        error.isError ? 
        <div className="flex justify-center items-center h-screen">
            <div className="text-2xl font-bold">
                Sorry, Please try later. Facing error : {error.message}
            </div>
        </div>
        :
        <div className="container mx-auto" >
            <div className="flex flex-row p-6 gap-10">
                <div className="w-72 h-80 font-medium grow" >
                    <div onClick={() => setOpenDropdown(!openDropdown)} 
                        className="bg-white w-full p-2 flex items-center justify-between rounded-md">
                        {   
                            stockId == "" 
                            ? "Select Stock" 
                            : stockId.substring(0, Math.min(20, stockId.length)) + (stockId.length > 20 ? "..." : "")
                        }  
                        <BiChevronDown className="ml-2" />
                    </div>
                    <ul className={`bg-white overflow-y-auto ${openDropdown ? "max-h-60" : "max-h-0"} rounded-md mt-2`}>
                        <div className="bg-white hover:bg-white hover:text-blue-500 flex items-center px-2 sticky top-0">
                            <AiOutlineSearch className="ml-2" />
                            <input type="text" 
                                className="w-full p-2 bg-white hover:bg-white hover:text-blue-500 outline-none" 
                                placeholder="Search" 
                                onChange={(e) => setText(e.target.value)} 
                            />
                        </div>
                        {
                            data.map((item, index) => (
                                <li key={item.id + index} className={`p-2 text-sm 
                                    ${item.id.toLowerCase().includes(text.toLowerCase()) ? "block" : "hidden"}
                                    hover:bg-white 
                                    rounded-md
                                    hover:text-blue-500`}
                                    onClick={() => {
                                        const new_stock_id = item.id;
                                        setStockId(new_stock_id);
                                        setOpenDropdown(false);
                                    }}
                                    >
                                    {item.id}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="grow w-90 h-80 font-medium">
                    {/* Date Range } */}
                    <CustomDateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
                </div>
                <div>
                    {/* Search button */}
                    <button disabled={stockId.length === 0} onClick={handleSubmit} 
                    className={`${stockId.length === 0 ? "bg-slate-400" : "bg-blue-500"} grow text-white p-2 rounded-md`}>
                        Search
                    </button>
                </div>
            </div>
            <div>
                {text}
            </div>
        </div>
                    ));
}
