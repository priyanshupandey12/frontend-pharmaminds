import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`course/search?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleExplore = () => {
    navigate(`/course/search?search`);
  };

  return (
    <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] dark:from-gray-900 dark:to-gray-950 py-24 px-4 text-center overflow-hidden text-white">
      <div className="absolute inset-0 bg-opacity-30 blur-2xl"></div>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-left lg:w-1/2"
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
            Ace Your GPAT & NIPER Journey <br />
            <span className="text-blue-400">With Expert Guidance</span>
          </h1>
          <p className="text-gray-300 mb-8 max-w-xl">
            Comprehensive preparation platform designed by top educators to help you crack GPAT and NIPER entrance exams with confidence.
          </p>

          <motion.form 
            onSubmit={handleSearch} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden max-w-xl mb-6 border border-gray-300 dark:border-gray-700 hover:shadow-blue-500/50 transition-all"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="flex-grow border-none focus-visible:ring-2 focus-visible:ring-blue-500 px-6 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 text-white px-8 py-4 rounded-r-full hover:scale-110 transition-transform duration-300 flex items-center gap-2 shadow-lg hover:shadow-indigo-500/50"
            >
              <Search size={20} /> Search
            </Button>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 relative z-20"
          >
            
            <Button onClick={handleExplore} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md shadow-lg transition-transform hover:scale-105 hover:shadow-blue-500/50">
              View Courses
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-gray-900 p-6 rounded-lg shadow-2xl max-w-md lg:w-1/3 border border-gray-700 hover:shadow-indigo-500/50 transition-all"
        >
          <h2 className="text-lg font-bold mb-4">Key Highlights</h2>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={18} /> Live Interactive Classes</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={18} /> 1000+ Practice Questions</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={18} /> Mock Tests & Analysis</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-400" size={18} /> Personalized Mentoring</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
