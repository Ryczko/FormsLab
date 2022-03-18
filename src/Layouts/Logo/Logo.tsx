import { Link } from "react-router-dom";
import "./Logo.scss";

function Logo() {
    return (
        <Link to={"/"} className="flex items-center text-gray-600">
            <div className="heart mr-4"></div>
            Employee Pulse
        </Link>
    );
}

export default Logo;
