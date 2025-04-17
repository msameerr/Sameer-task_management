
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import UserHomePage from "./pages/User/UserHome";
import CreateTaskPage from "./pages/User/CreateTaskPage";
import TaskDetailPage from "./pages/User/TaskDetailPage";
import DeleteTaskPage from "./pages/User/DeleteTaskPage";
import UpdateTaskPage from "./pages/User/UpdateTaskPage";

function App() {
    return (
        <Router>
            <Sidebar />
            <div className="ml-16 p-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/userHome" element={<UserHomePage />} />
                    <Route path="/createTask" element={<CreateTaskPage />} />
                    <Route path="/detailTask/:id" element={<TaskDetailPage />} />
                    <Route path="/deleteTask/:id" element={<DeleteTaskPage />} />
                    <Route path="/UpdateTask/:id" element={<UpdateTaskPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
