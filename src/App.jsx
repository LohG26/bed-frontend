import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function UrlNotFound() {
    return <h1>404 Page/URL not found.</h1>
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="*" element={<UrlNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

