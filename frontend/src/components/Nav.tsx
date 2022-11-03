import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="w-full flex justify-around p-4 items-center">

        <div className="text-2xl font-bold">
            NSE Analytics
        </div>

        <nav >

            <ul className="md:flex gap-10 p-6 uppercase">

                    <Link to='/'> 
                        <li>
                            Stock Graph
                        </li>
                    </Link>
                    <Link to='/detail'>
                        <li>
                            Stock Detail
                        </li>
                    </Link>
            </ul>
        </nav>    
    </div>
  );
}
