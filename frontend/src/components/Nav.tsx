import { useState } from "react";
import { Link } from "react-router-dom";

interface Tab {
    name: string;
    path: string;
}

export const Nav = () => {

    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs : Tab[] = [
        {
            name: "Stock Graph",
            path: "/"
        },
        {
            name: "Stock Detail",
            path: "/detail"
        }
    ]

  return (
    <div className="w-full flex justify-around p-4 items-center">

        <div className="text-2xl font-bold font-inter text-indigo-500">
            NSE Analytics
        </div>

        <nav >

            <ul className="md:flex gap-10 p-6 uppercase">

                {tabs.map((tab, index) => (
                    <li key={index} className="text-lg font-bold">
                        <Link to={tab.path} className={`py-2 border-b-4 font-inter transition-colors duration-300 ${index === activeTab ? "border-indigo-500": "border-transparent hover:border-gray-200"}`} onClick={() => setActiveTab(index)}>{tab.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>    
    </div>
  );
}
