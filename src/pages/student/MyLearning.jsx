import React, { useEffect, useState } from 'react'
import Course from './Course';
import axios from 'axios';
import SingleCourse from './SingleCourse';

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   


  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:3000/api/v1/courses/enrolled-courses", {
          withCredentials: true,
        });
        setCourses(response.data.enrolledCourses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
      setIsLoading(false);
    };

    fetchEnrolledCourses();
  }, []);
 
 
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
    <h1 className="font-bold text-2xl">MY LEARNING</h1>
    <div className="my-5">
      {isLoading ? (
        <MyLearningSkeleton />
      ) : courses.length === 0 ? (
        <p>You are not enrolled in any course.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <SingleCourse key={index} course={course}/>
          ))}
        </div>
      )}
    </div>
  </div>
  )
}

export default MyLearning

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);