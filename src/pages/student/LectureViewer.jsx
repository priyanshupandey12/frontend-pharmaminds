import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, RefreshCw, XCircle, AlertTriangle } from "lucide-react";
import { useLocation } from "react-router-dom";


const LectureViewer = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchLectureDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/courses/${courseId}/lectures/${lectureId}`,
          { withCredentials: true }
        );

        setLecture(response.data.lecture);
        
  
        const progressResponse = await axios.get(
          `http://localhost:3000/api/v1/progress/course-progress/${courseId}`,
          { withCredentials: true }
        );

        const lectureProgress = progressResponse.data.data.progress.find(
          (progress) => progress.lectureId === lectureId
        );

        setCompleted(lectureProgress?.viewed || false);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch lecture");
      } finally {
        setLoading(false);
      }
    };

    fetchLectureDetails();
  }, [courseId, lectureId]);

  
  const markLectureAsCompleted = async () => {
    try {
      setUpdating(true);
      await axios.post(
        `http://localhost:3000/api/v1/progress/mark/${courseId}/lectures/${lectureId}`,
        {},
        { withCredentials: true }
      );
      setCompleted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark as completed");
    } finally {
      setUpdating(false);
    }
  };

  
  const markLectureAsInCompleted = async () => {
    try {
      setUpdating(true);
      await axios.post(
        `http://localhost:3000/api/v1/progress/unmark/${courseId}/lectures/${lectureId}`,
        {},
        { withCredentials: true }
      );
      setCompleted(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark as incomplete");
    } finally {
      setUpdating(false);
    }
  };


  const handleVideoEnded = () => {
    if (!completed) {
      markLectureAsCompleted();
    }
  };

  const goBackToCourse = () => {
    if (location.state?.fromCourseProgress) {
      navigate(`/course-progress/${courseId}`); 
    } else {
      navigate(-1);  
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex justify-center items-center gap-2 text-red-500">
              <AlertTriangle size={20} />
              <p className="font-medium">{error}</p>
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={goBackToCourse}>
                <ArrowLeft className="mr-2" size={16} />
                Back to Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">No lecture data found</p>
            <div className="flex justify-center mt-4">
              <Button onClick={goBackToCourse}>
                <ArrowLeft className="mr-2" size={16} />
                Back to Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4 flex justify-between items-center">
        <Button variant="outline" onClick={goBackToCourse}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Course
        </Button>

        {completed ? (
          <Button
            onClick={markLectureAsInCompleted}
            disabled={updating}
            className="bg-red-600 hover:bg-red-700"
          >
            {updating ? (
              <>
                <RefreshCw className="mr-2 animate-spin" size={16} />
                Updating...
              </>
            ) : (
              <>
                <XCircle className="mr-2" size={16} />
                Mark as Incomplete
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={markLectureAsCompleted}
            disabled={updating}
            className="bg-green-600 hover:bg-green-700"
          >
            {updating ? (
              <>
                <RefreshCw className="mr-2 animate-spin" size={16} />
                Updating...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2" size={16} />
                Mark as Complete
              </>
            )}
          </Button>
        )}
      </div>

      <Card className="rounded-lg shadow-md overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">{lecture.lectureTitle}</h2>

          {lecture.description && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700">{lecture.description}</p>
            </div>
          )}

          {lecture.videos && lecture.videos.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Video</h3>
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video
                  className="w-full h-full"
                  controls
                  onEnded={handleVideoEnded}
                  src={lecture.videos[0].videoUrl}
                  poster={lecture.videos[0].thumbnail || ""}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureViewer;
