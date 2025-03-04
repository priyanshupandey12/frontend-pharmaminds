import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton'

import SearchResult from './SearchResult';
import axios from 'axios';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';

  const [data, setData] = useState({ courses: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isEmpty = !isLoading && (!data.courses || data.courses.length === 0);

  useEffect(() => {
    fetchCourses();
  }, [query]);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      let apiUrl = 'http://localhost:3000/api/v1/courses/search?';
    
  
      const response = await axios.get(apiUrl, {
        withCredentials: true
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error.response?.data?.error || 'Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  };
  

 

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">
          {query ? `Results for "${query}"` : "All Courses"}
        </h1>
        {query && (
          <p>
            Showing results for{" "}
            <span className="text-blue-800 font-bold italic">{query}</span>
          </p>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-10">
        
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => <SearchResult key={course._id} course={course}/>)
          )}
        </div>
      </div>
    </div>
  );
};

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden mb-4">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};

export default SearchPage;