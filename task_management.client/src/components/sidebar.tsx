import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Home, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; 

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    return (
        <div className="flex">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full"
            >
                <Menu size={24} />
            </button>

            <div
                className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300`}
            >
                <h2 className="text-lg font-bold mb-6 text-center">Menu</h2>

                <ul className="space-y-4">
                    <li>
                        <Link to="/">
                            <Button variant="ghost" className="flex items-center gap-2 w-full text-left">
                                <Home size={20} /> Home
                            </Button>
                        </Link>
                    </li>

                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link to="/auth">
                                    <Button variant="ghost" className="flex items-center gap-2 w-full text-left">
                                        <LogIn size={20} /> Sign In
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/auth">
                                    <Button variant="ghost" className="flex items-center gap-2 w-full text-left">
                                        <LogIn size={20} /> Register
                                    </Button>
                                </Link>
                            </li>
                        </>
                    )}

                    {isLoggedIn && (
                        <li>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 w-full text-left"
                                onClick={handleLogout}
                            >
                                <LogOut size={20} /> Logout
                            </Button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
