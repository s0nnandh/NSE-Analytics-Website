import { useState, useEffect } from "react";
import { StockID } from "../types/StockID";
import StockDataService from "../service/StockService";
import { Audio } from 'react-loader-spinner';
import { CustomDateRangePicker } from "./CustomDateRangePicker";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { CustomDatePicker } from "./CustomDatePicker";

interface StockFilterProps {
    handleSubmit : (id : string, start_date : string, end_date : string) => void;
    onlyDatePicker? : boolean;
}

export const StockFilters = (props : StockFilterProps) => {

    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState({
        isError: false,
        message: ""
    });

    const [selectDate, setSelectDate] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<Date>(new Date());

    const [endDate, setEndDate] = useState<Date>(new Date());
    
    const [text, setText] = useState<string>("");

    const [stockId, setStockId] = useState<string>("")

    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    
    const [data, setData] = useState<Array<StockID>>([]);

    const [selectSingleDate, setSelectSingleDate] = useState<boolean>(false);

    const [singleDate, setSingleDate] = useState<Date>(new Date());
    
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

    const formatDate = (date: Date) => {
        let year = '' + date.getFullYear();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return year + '-' + month + '-' + day
    }
    return (
        isLoading 
        ? 
        <div className="flex justify-center items-center h-screen test-id=loader ">
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
            <div className="text-2xl font-inter">
                Sorry, Please try later. Facing error : {error.message}
            </div>
        </div>
        :
        <div className="flex flex-col justify-end">
                            <div className="w-72 h-80 font-medium">
                                <div id="id" onClick={() => setOpenDropdown(!openDropdown)}
                                    className="bg-white transform font-inter transition duration-500 hover:scale-110 w-full p-2 flex items-center justify-between rounded-md">
                                    {stockId == ""
                                        ? "Select Stock"
                                        : stockId.substring(0, Math.min(20, stockId.length)) + (stockId.length > 20 ? "..." : "")}
                                    <BiChevronDown className="ml-2" />
                                </div>
                                <ul className={`bg-white overflow-y-auto display:block ${openDropdown ? "max-h-60" : "max-h-0"} rounded-md mt-2`}>
                                    <div className="bg-white hover:bg-white transform transition duration-500 hover:scale-110 hover:text-indigo-500 flex items-center px-2 sticky top-0">
                                        <AiOutlineSearch className="ml-2" />
                                        <input type="text"
                                            className="w-full p-2 bg-white hover:bg-white hover:text-indigo-500 outline-none font-inter"
                                            placeholder="Search"
                                            onChange={(e) => setText(e.target.value)} />
                                    </div>
                                    {data.map((item, index) => (
                                        <li key={item.id + index} className={`p-2 text-sm 
                                            ${item.id.toLowerCase().includes(text.toLowerCase()) ? "block" : "hidden"}
                                            hover:bg-white 
                                            rounded-md
                                            font-inter
                                            hover:text-indigo-500`}
                                                    onClick={() => {
                                                        const new_stock_id = item.id;
                                                        setStockId(new_stock_id);
                                                        setOpenDropdown(false);
                                                    } }
                                                >
                                            {item.id}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-72 h-80 font-medium display:block">
                                                    
                                {
                                props.onlyDatePicker ? <CustomDatePicker setSelectSingleDate={setSelectSingleDate} setSingleDate={setSingleDate}/>
                                : <CustomDateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} setSelectDate={setSelectDate}  />
                                }
                            </div>
                            <div className="pt-32 w-72 h-80 font-medium content-center display:block">
                                {/* Search button */}
                                <button role={"button"} id="submit-button" disabled={stockId.length === 0 || !(selectDate || selectSingleDate)} onClick={
                                    () => {
                                        const start_date = props.onlyDatePicker ? formatDate(singleDate) : formatDate(startDate);
                                        const end_date = props.onlyDatePicker ? formatDate(singleDate) : formatDate(endDate);
                                        console.log(start_date, end_date);
                                        props.handleSubmit(stockId, start_date, end_date); 
                                        setSelectDate(false);
                                        setSelectSingleDate(false);
                                    }
                                }
                                    className={`${stockId.length === 0 ? "bg-slate-400" : "bg-indigo-500"} transform transition duration-500 hover:scale-110 ml-28 text-white p-2 rounded-md`}>
                                    Search
                                </button>
                            </div>
                        </div>
        ))
}