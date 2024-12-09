import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react"; // Keeping Lucide Menu for Hamburger Icon
import { AiOutlineClose } from "react-icons/ai"; // React Icons Close Button

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginSignupClick = () => {
    navigate("/login_signup");
    setIsMobileMenuOpen(false);
  };

  const handleProfile = () => {
    if (currentUser.is_patient) navigate(`/patient/${currentUser._id}`);
    else navigate(`/doctor/${currentUser._id}`);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const isActiveTab = (path) => location.pathname === path;

  const menuItems = [
    { label: "Getting Started", path: "/getting_started" },
    { label: "Doctor Overview", path: "/doctor_overview" },
    { label: "Patient Stories", path: "/patient_stories" },
    { label: "About Us", path: "/contact" },
  ];

  return (
    <div className="relative">
      <div className="flex bg-white border border-slate-200 h-18 font-sans z-[999] relative">
        <div className="w-1/4 flex justify-center items-center">
          <img
            src={"../images/HealthBot+.PNG"}
            alt="Logo"
            className="h-5/6 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        <div className="w-3/4 hidden md:flex justify-center items-center">
          <div className="w-full h-full flex justify-between">
            {menuItems.map((item) => (
              <div
                key={item.path}
                className={`flex-1 flex justify-center items-center ${
                  isActiveTab(item.path) ? "bg-gray-200 rounded-3xl" : ""
                }`}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className="bg-white text-black font-semibold py-2 px-4 w-full h-full"
                >
                  {item.label}
                </button>
              </div>
            ))}

            {currentUser ? (
              <div
                className="flex-1 flex justify-center items-center hover:bg-slate-200 rounded-xl cursor-pointer"
                onClick={handleProfile}
              >
                <img
                  className="rounded-full h-7 w-7 object-cover mr-4"
                  src={currentUser.profile}
                  alt="Profile Pic"
                />
                {currentUser.name}
              </div>
            ) : (
              <div
                className="flex-1 flex justify-center items-center hover:bg-slate-200 font-semibold cursor-pointer rounded-xl"
                onClick={handleLoginSignupClick}
              >
                Login / SignUp
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[1000] bg-white">
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-[1100]">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 focus:outline-none"
            >
              <AiOutlineClose size={28} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col items-center justify-center py-10 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-center p-4 ${
                  isActiveTab(item.path) ? "bg-gray-200 rounded-3xl" : ""
                }`}
              >
                {item.label}
              </button>
            ))}

            {currentUser ? (
              <div
                onClick={handleProfile}
                className="p-4 flex items-center hover:bg-gray-100 cursor-pointer rounded-3xl"
              >
                <img
                  className="rounded-full h-8 w-8 object-cover mr-4"
                  src={currentUser.profile}
                  alt="Profile Pic"
                />
                {currentUser.name}
              </div>
            ) : (
              <button
                onClick={handleLoginSignupClick}
                className="w-full text-center font-semibold py-4"
              >
                Login / SignUp
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
