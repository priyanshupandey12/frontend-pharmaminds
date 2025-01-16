import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handlelogout=async()=>{
    try {
      await axios.get(`${BASE_URL}/users/logout`, {
        withCredentials: true
      })
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="bg-black   p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
    
        <div className="text-white text-2xl font-bold">
     
        Pharmaminds
        </div>

      
        <div className="flex-1 mx-4">
          <div className="relative w-2/5 mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full border border-gray-400 focus:ring-2 focus:ring-blue-300 focus:outline-none hover:shadow-lg transition-shadow duration-300"
            />
            <button
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37a1 1 0 01-1.42 1.42l-4.37-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Navigation Links and Profile */}
        <div className="flex items-center space-x-10">
          <Link to="/" className="text-white hover:text-blue-400 transition-colors duration-300">Home</Link>
          <Link to="#courses" className="text-white hover:text-blue-400 transition-colors duration-300">Courses</Link>
          <Link to="#courses" className="text-white hover:text-blue-400 transition-colors duration-300">Study Materials</Link>
  
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border border-white hover:shadow-lg transition-shadow duration-300"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
        
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <Link
                  to="#my-profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                  My Profile
                </Link>
                <Link 
  to="/login" 
  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
>
  Login
</Link>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300" onClick={handlelogout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
