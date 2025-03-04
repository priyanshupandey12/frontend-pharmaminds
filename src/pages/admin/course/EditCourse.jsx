import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";
const EditCourse = () => {
  const { id: courseId } = useParams(); // Extract courseId from the URL

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>
        <Link to={`/admin/course/${courseId}/lectures`}>
          <Button className="hover:text-blue-600" variant="link">
            Go to lectures page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
