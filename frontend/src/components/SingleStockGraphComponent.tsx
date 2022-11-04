import { useState, useEffect } from "react";
import { LineChart, Tooltip, Legend, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar } from "recharts";
import { Stock } from "../types/Stock";
import StockDataService from "../service/StockService";
import { Audio } from 'react-loader-spinner'

export interface SingleStockGraphComponentProps {
    id : string;
    date : string;
}

export const SingleStockGraphComponent = (request: SingleStockGraphComponentProps) => {
    const [data, setData] = useState<Array<Stock>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState({
        isError: false,
        message: ""
    });
    const [open, setOpen] = useState<boolean>(true);
    const [close, setClose] = useState<boolean>(true);
    const [high, setHigh] = useState<boolean>(true);
    const [low, setLow] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        console.log(request);
        if(request) {
            StockDataService.getStockForDate(request)
                .then(response => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    setError({
                        isError: true,
                        message: e.message
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [request]);

    return (
        loading
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
        error.isError
        ?
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-bold text-red-500">{error.message}</h1>
        </div>
        :
        request && 
        <div className="container mx-auto flex flex-row justify-center items-center">
            <div className="flex flex-col">
                {/*check box */}
                <div className="flex items-center mb-4">
                    <input onClick={() => setOpen} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Open</label>
                </div>
            </div>
            <div className="flex justify-center items-center h-80">
                <BarChart width={600} height={600} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="open" fill="#8884d8" />
                    <Bar dataKey="high" fill="#82ca9d" />
                    <Bar dataKey="low" fill="#f44236" />
                    <Bar dataKey="close" fill="#75ca1d" />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date" />
                    <YAxis />
                </BarChart>                    
            </div>
        </div>
    );
}