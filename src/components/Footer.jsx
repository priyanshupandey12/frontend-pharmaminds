import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
       
        <div>
          <h2 className="text-3xl font-extrabold text-blue-400">Pharmaminds</h2>
          <p className="text-gray-400 mt-3 text-sm">
            Your trusted platform for GPAT & NIPER exam preparation. Explore top-notch courses and excel in your journey.
          </p>
        </div>

    
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Courses</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <Facebook className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
            <Instagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
            <Twitter className="w-6 h-6 hover:text-blue-400 cursor-pointer" />
            <Linkedin className="w-6 h-6 hover:text-blue-600 cursor-pointer" />
          </div>
          <p className="text-gray-400 mt-4 text-sm">Email: support@pharmaminds.com</p>
          <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>
        </div>
      </div>
      
    
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Pharmaminds. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
