import React, {  useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";



const Navbar = () => {
    const activeLink = "text-white";
    const normalLink = "text-gray-800 hover:text-white ";
    const Links = [
        { name: "Home", link: "/" },
        // { name: "About", link: "about" },
        { name: "Add", link: "add" },
    ];

    const [open, setOpen] = useState(false);
    const location = useLocation();
     const [search,setSearch] = useState("");
     const navigate = useNavigate();
     const handleSubmit =(e) =>{
        e.preventDefault();
        navigate(`/search?contact=${search}`)
        setSearch("")
     }
    return (
        <>
            <div className="z-50 top-0 left-0 w-full bg-[#7A9B70] bg-opacity-85 p-2">
                <div className="md:flex items-center justify-between md:px-10 px-7">
                    <NavLink to="/">
                        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800 pt-3 text-white">
                            <h1>STUDENT MANAGEMENT</h1>
                        </div>
                    </NavLink>
                    <div
                        onClick={() => setOpen(!open)}
                        className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden text-white"
                    >
                        <ion-icon  name={open ? "close" : "menu"}></ion-icon>
                    </div>

                    <ul
                        className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto  left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-14 bg-[#7A9B70] bg-opacity-85 mt-2" : "top-[-490px]"
                            }`}
                    >
                        {Links.map((data) => (
                            <li
                                key={data?.name}
                                className="md:ml-8 text-base font-bold md:my-0 my-7 cursor-pointer font-[Roboto]  text-lg "
                            >
                                <NavLink
                                    to={data?.link}
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${activeLink} ${location.pathname === "/Cart" ? activeLink : ""}`
                                            : normalLink
                                    }
                                >
                                    {data?.name}
                                </NavLink>
                         
                            </li>
                        ))}
                      <form onSubmit={handleSubmit}>
                           
                      <input className="md:ml-8 px-6 py-1 md:m-1  text-center rounded-md" type="text" name="search" placeholder="search Contact..." onChange={(e) => setSearch(e.target.value)} value={search}/>
                      </form>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
