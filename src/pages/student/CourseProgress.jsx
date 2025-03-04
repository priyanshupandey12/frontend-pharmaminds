import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Layers, CheckCircle, Clock } from "lucide-react";

const CourseProgress = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [lecturesData, setLecturesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/progress/course-progress/${courseId}`,
          { withCredentials: true }
        );

        setCourseData(response.data.data);

        if (response.data.data.coursedetails.sections) {
          const lectureIds = response.data.data.coursedetails.sections.flatMap(
            (section) => section.lectures
          );

          if (lectureIds.length > 0) {
            await fetchLectureDetails(lectureIds);
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch course progress");
      } finally {
        setLoading(false);
      }
    };

    const fetchLectureDetails = async (lectureIds) => {
      try {
        const promises = lectureIds.map((id) =>
          axios.get(`http://localhost:3000/api/v1/courses/${courseId}/lectures/${id}`, {
            withCredentials: true,
          })
        );

        const results = await Promise.all(promises);

        const lecturesMap = {};
        results.forEach((res) => {
          const lecture = res.data.lecture;
          if (lecture && lecture._id) {
            lecturesMap[lecture._id] = lecture;
          }
        });

        setLecturesData(lecturesMap);
      } catch (err) {
        console.error("Failed to fetch lecture details:", err);
      }
    };

    fetchCourseProgress();
  }, [courseId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-red-500 border-red-700 text-white shadow-lg">
          <CardContent className="p-6">
            <p className="text-center font-semibold">{error}</p>
          </CardContent>
        </Card>
      </div>
    );

  if (!courseData)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gray-800 text-white shadow-md">
          <CardContent className="p-6">
            <p className="text-center">No course data found</p>
          </CardContent>
        </Card>
      </div>
    );

  const { coursedetails, progress } = courseData;

 
  const completedLectures = {};
  if (progress && progress.length > 0) {
    progress.forEach((item) => {
      completedLectures[item.lectureId] = item.viewed;
    });
  }


  const totalLectures = coursedetails.sections
    ? coursedetails.sections.flatMap((s) => s.lectures).length
    : 0;

  const completedLecturesCount = progress ? progress.filter((item) => item.viewed).length : 0;

 
  const progressPercentage = totalLectures > 0 ? (completedLecturesCount / totalLectures) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="rounded-lg shadow-md bg-gray-900 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {coursedetails.courseThumbnail && (
              <img
                src={coursedetails.courseThumbnail}
                alt={coursedetails.courseTitle}
                className="w-full md:w-32 h-32 rounded-lg object-cover shadow-lg"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{coursedetails.courseTitle}</h2>
              <p className="text-sm text-gray-400 mt-1">Category: {coursedetails.category}</p>
              <p className="text-sm text-gray-300 mt-2">{coursedetails.description}</p>

              {/* Progress indicator */}
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Course Progress:</span>
                  <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {`${completedLecturesCount} / ${totalLectures} completed`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-4">
        {coursedetails.sections?.map((section, sectionIndex) => (
          <Card key={section._id || sectionIndex} className="overflow-hidden bg-gray-800 text-white">
            <CardContent className="p-0">
              <div className="bg-gray-700 p-4 border-b border-gray-600">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Layers size={20} className="text-blue-400" />
                  {section.title}
                </h3>
              </div>

              <div className="divide-y divide-gray-700">
                {section.lectures?.map((lectureId, lectureIndex) => {
                  const lecture = lecturesData[lectureId];
                  const isCompleted = completedLectures[lectureId];

                  return (
                    <div
                      key={lectureId || lectureIndex}
                      className="flex items-center justify-between p-4 hover:bg-gray-700 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle size={20} className="text-green-400" />
                        ) : (
                          <Clock size={20} className="text-gray-400" />
                        )}

                        <div>
                          <p className="font-medium">{lecture ? lecture.lectureTitle : `Lecture ${lectureIndex + 1}`}</p>
                          {lecture && lecture.duration && (
                            <p className="text-xs text-gray-400">Duration: {lecture.duration}</p>
                          )}
                        </div>
                      </div>

                      <Link
                        to={`/courses/${courseId}/lectures/${lectureId}`}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium flex items-center gap-1 transition-all"
                      >
                        <PlayCircle size={16} /> Watch
                      </Link>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        {coursedetails.sections?.length === 0 && (
          <Card className="bg-gray-800 text-white">
            <CardContent className="p-6">
              <p className="text-center text-gray-400">No sections available for this course</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseProgress;
