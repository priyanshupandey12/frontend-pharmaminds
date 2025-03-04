import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import SingleCourse from './SingleCourse';
import { useGetPublishCourseQuery } from '@/store/courseApi';
import { motion } from 'framer-motion';

const Course = () => {
  const { data: courses, isLoading, isError } = useGetPublishCourseQuery();

  if (isError) {
    return <h1 className="text-center text-red-500 text-2xl font-bold mt-10">Something went wrong</h1>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[#141414] dark:to-[#1E1E1E] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-extrabold text-4xl text-center text-gray-900 dark:text-white mb-12 tracking-wide"
        >
          Explore Our Courses
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <CourseSkeleton key={index} />)
            : courses?.course?.map((course, index) => (
                <SingleCourse key={index} course={course} />
              ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Course;

const CourseSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all rounded-xl overflow-hidden transform hover:scale-105 duration-300"
    >
      <Skeleton className="w-full h-48 bg-gray-200 dark:bg-gray-800" />
      <div className="px-6 py-5 space-y-4">
        <Skeleton className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>
          <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
        <Skeleton className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </motion.div>
  );
};