import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetLectureByIdQuery,useUpdateLectureMutation } from "@/store/courseApi";

const UpdateLecture = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetLectureByIdQuery({ courseId, lectureId });
  const [updateLecture, { isLoading: isUpdating }] = useUpdateLectureMutation();

  const [lectureTitle, setLectureTitle] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (data?.lecture) {
      setLectureTitle(data.lecture.lectureTitle);
      setIsPreviewFree(data.lecture.isPreviewFree);
    }
  }, [data]);

  const handleUpdateLecture = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    formData.append("isPreviewFree", isPreviewFree);
    if (video) formData.append("video", video);
    
    await updateLecture({ courseId, lectureId, formData });
    navigate(-1);
  };

  if (isLoading) return <p>Loading lecture details...</p>;
  if (error) return <p>Error fetching lecture</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Update Lecture</h2>
      <form onSubmit={handleUpdateLecture} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Lecture Title</label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPreviewFree}
            onChange={(e) => setIsPreviewFree(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-gray-700 dark:text-gray-200">Free Preview</label>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Update Lecture"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLecture;
