import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navigation from "../Layouts/Navigation/Navigation";
import HomePage from "./HomePage/HomePage";

function PageWrapper() {
    return (
        <BrowserRouter>
            <Navigation />
            <div className="m-auto px-8  sm:px-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default PageWrapper;
