import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { CustomDateRangePicker } from "./CustomDateRangePicker";


export const StockGraph = () => {
    const [loading, setLoading] = useState(true);
    
    const [text, setText] = useState<String>("");

    const [stockId, setStockId] = useState<String>("")

    const [openDropdown, setOpenDropdown] = useState<Boolean>(false);

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    
    const search_data = [
        {"name": "TCS", "symbol": "TCS"},
        {"name": "Infosys", "symbol": "INFY"},
        {"name": "Reliance", "symbol": "RELIANCE"},
        {"name": "HDFC Bank", "symbol": "HDFCBANK"},
        {"name": "HDFC", "symbol": "HDFC"},
        {"name": "ICICI Bank", "symbol": "ICICIBANK"},
        {"name": "Bajaj Finance", "symbol": "BAJFINANCE"},
        {"name": "Bajaj Auto", "symbol": "BAJAJ-AUTO"},
        {"name": "Axis Bank", "symbol": "AXISBANK"},
        {"name": "SBI", "symbol": "SBIN"},
        {"name": "Hindustan Unilever", "symbol": "HINDUNILVR"},
        {"name": "Maruti Suzuki", "symbol": "MARUTI"},
        {"name": "Asian Paints", "symbol": "ASIANPAINT"},
    ]
    
    const [data, setData] = useState(search_data);

    const handleSubmit = () => {
        console.log(text);
    }

    return (
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
                                className="w-full p-2 bg-blue-100 hover:bg-white hover:text-blue-500 outline-none" 
                                placeholder="Search" 
                                onChange={(e) => setText(e.target.value)} 
                            />
                        </div>
                        {
                            data.map((item, index) => (
                                <li key={item.name + index} className={`p-2 text-sm 
                                    ${item.name.toLowerCase().includes(text.toLowerCase()) ? "block" : "hidden"}
                                    hover:bg-white 
                                    rounded-md
                                    hover:text-blue-500`}
                                    onClick={() => {
                                        const new_stock_id = item.name;
                                        setStockId(new_stock_id);
                                        setOpenDropdown(false);
                                    }}
                                    >
                                    {item.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="grow w-90 h-80 font-medium">
                    {/* Date Range } */}
                    <CustomDateRangePicker />
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
    );
}
