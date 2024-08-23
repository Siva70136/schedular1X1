import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaShoppingCart } from "react-icons/fa";

import './index.css';

const Navbar = () => {

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="nav-home-container">
                    <Link to='/' className="link">
                        <MdHome className="icon " />
                    </Link>
                    <div className="input-container">
                        <input type="text" className="input" placeholder="Search Slot" />
                        <CiSearch className="icon" />
                    </div>
                </div>
                <div className="icon-container">
                    <Link to="/payment" className="link">
                        <FaShoppingCart className="icon cart" />
                    </Link>
                    <FaBars className="icon" />
                </div>
            </nav>
        </div>
    )
}

export default Navbar