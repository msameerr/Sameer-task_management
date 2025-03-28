
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import UserHomePage from "./pages/User/UserHome"

function App() {
    return (
        <Router>
            <Sidebar />
            <div className="ml-16 p-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/userHome" element={<UserHomePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
