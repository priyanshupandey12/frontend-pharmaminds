import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SearchResult = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row">
        {/* Course thumbnail */}
        <div className="md:w-1/3 relative">
          <img 
            src={course.courseThumbnail || '/images/default-course.jpg'} 
            alt={course.courseTitle} 
            className="w-full h-48 md:h-full object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-blue-600">
            {course.category}
          </Badge>
        </div>
        
        {/* Course information */}
        <div className="p-4 md:p-6 flex-1">
          <Link to={`/course/${course._id}`}>
            <h2 className="text-xl md:text-2xl font-bold hover:text-blue-600 transition-colors mb-2">
              {course.courseTitle}
            </h2>
          </Link>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {course.description|| "No description available."}
          </p>
          
          {/* Course metadata */}
          <div className="flex flex-wrap gap-4 mb-4">
           
            
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              <span className="text-sm text-gray-700">
                {course.rating || "0"} ({course.reviews?.length || 0} reviews)
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700">
                {course.duration || "Self-paced"}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <BookOpen size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700">
                {course.sections?.length || 0} sections
              </span>
            </div>
          </div>
          
          {/* Price and enrollment */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-blue-800">
              {course.coursePrice ? `₹${course.coursePrice.toFixed(2)}` : "Free"}
            </div>
            
            <Link 
              to={`/course-detail/${course._id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              View Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;