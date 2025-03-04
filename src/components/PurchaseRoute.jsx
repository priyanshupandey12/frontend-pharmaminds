import { useParams, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const response = await axios.get("https://backend-pharmaminds.onrender.com/api/v1/courses/enrolled-courses", {
          withCredentials: true,
        });

        const enrolledCourses = response.data.enrolledCourses || [];
        const isCourseEnrolled = enrolledCourses.some((course) => course._id === courseId);

        setPurchased(isCourseEnrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      } finally {
        setLoading(false);
      }
    };

    checkEnrollment();
  }, [courseId]);

  if (loading) return <div>Loading...</div>; 

 
  if (!purchased && location.pathname !== `/course-detail/${courseId}`) {
    return <Navigate to={`/course-detail/${courseId}`} replace />;
  }

  return children;
};

export default PurchaseCourseProtectedRoute;
