import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock, PlayCircle } from "lucide-react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/courses/${courseId}`, {
          withCredentials: true,
        });
        setCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
      setIsLoading(false);
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/courses/enrolled-courses", {
          withCredentials: true,
        });

        const enrolledCourses = response.data.enrolledCourses;
        const isCourseEnrolled = enrolledCourses.some((course) => course._id === courseId);
        setPurchased(isCourseEnrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };

    checkEnrollment();
  }, [courseId]);

  const handleContinueCourse = () => {
    const firstLectureId = course?.sections[0]?.lectures[0]?._id;
    if (firstLectureId) {
      navigate(`/courses/${courseId}/lectures/${firstLectureId}`, {
        state: { fromCourseProgress: true }, 
      });
    } else {
      alert("No lectures available in this course.");
    }
  };
  

  if (isLoading) return <p className="text-center text-gray-500">Loading course...</p>;
  if (!course) return <p className="text-center text-red-500">Course not found.</p>;

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-extrabold text-3xl md:text-4xl"
          >
            {course?.courseTitle}
          </motion.h1>
          <div className="text-base md:text-lg text-gray-300 leading-relaxed space-y-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
  {course?.description.includes("-") ? (
    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
      {course?.description.split("-").map((point, idx) =>
        point.trim() ? <li key={idx}>{point.trim()}</li> : null
      )}
    </ul>
  ) : (
    <p>{course?.description}</p>
  )}
</div>

          <p className="text-gray-400">Students Enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-2/3 space-y-5"
        >
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <div className="text-base md:text-lg text-gray-300 leading-relaxed space-y-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
  {course?.description?.split(". ").map((sentence, idx) => (
    <p key={idx} className="text-gray-700 dark:text-gray-300">
      {sentence}.
    </p>
  ))}
</div>


          <Card className="shadow-xl border border-gray-700">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course?.sections?.reduce((acc, sec) => acc + sec.lectures.length, 0)} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="p-2 border-b border-gray-600">
                  <h2 className="font-semibold text-gray-200">{section.title}</h2>
                  {section.lectures.map((lecture, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition">
                      <span>{purchased ? <PlayCircle size={18} className="text-green-400" /> : <Lock size={18} className="text-red-500" />}</span>
                      <p>{lecture?.lectureTitle}</p>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/3"
        >
          <Card className="shadow-2xl border border-gray-700">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                {course?.sections.length > 0 && course.sections[0].lectures.length > 0 ? (
                  <>
                  <ReactPlayer
                    width="100%"
            height="100%"
            url={course?.sections[0].lectures[0]?.videos[0]?.videoUrl}
            controls={true}
            playbackRate={playbackRate}
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
            onContextMenu={(e) => e.preventDefault()}
                  />
                   <div className="mt-2 flex gap-2">
            <button onClick={() => setPlaybackRate(0.5)}>0.5x</button>
            <button onClick={() => setPlaybackRate(1)}>1x</button>
            <button onClick={() => setPlaybackRate(1.5)}>1.5x</button>
            <button onClick={() => setPlaybackRate(2)}>2x</button>
          </div>
                   </>
                ) : (
                  <p className="text-center text-gray-400">No preview available</p>
                )}
              </div>
              <h1 className="text-lg md:text-xl font-semibold">{course?.sections[0]?.lectures[0]?.lectureTitle || "Lecture Title"}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold text-blue-400">Price: ₹{course?.coursePrice}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
