import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useGetCourseByIdQuery, usePublishCourseMutation, useUpdateCourseMutation } from '@/store/courseApi'
import { toast } from 'sonner'


const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",

    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const params = useParams();
  const id=params.id;

  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(id);
  console.log("Course Data:", courseByIdData);  // Log the data to see if it's updated

  const [updateCourse,{isError,isSuccess,isLoading,data}]=useUpdateCourseMutation()

   const [PublishCourse, {}]=usePublishCourseMutation();
   const publishStatusHandler = async (action) => {

    try {
      const response = await PublishCourse({ courseId: id, query: action });

  
      if (response?.data) {
        refetch();
        toast.success(response.data.message);
      }
  
   
    } catch (error) {
      toast.error(error.message || "Course is not published");
    }
  };
  




  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

     console.log(courseByIdData?.data)
  useEffect(() => {
    if (courseByIdData?.data) { 
        const course = courseByIdData?.data
      setInput({
        courseTitle: course.courseTitle,
         description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
  
    const response = await updateCourse({ formData, id });
   
    if (response?.data) {
      refetch();  
    }
  };
  

     useEffect(()=>{
      if(isSuccess) {
        toast.success(data.message ||"course updated Succesfully")
      }
      if(isError) {
        toast.error("Something Went Wrong")
      }

     },[isSuccess,isError])

     if(courseByIdLoading) return <h1>Loading...</h1>

  





  return (
    <Card>
    <CardHeader className="flex flex-row justify-between">
      <div>
        <CardTitle>Basic Course Information</CardTitle>
        <CardDescription>
          Make changes to your courses here. Click save when you're done.
        </CardDescription>
      </div>
      <div className="space-x-2">
  <Button 
    disabled={!courseByIdData?.data} 
    variant="outline" 
    onClick={() => publishStatusHandler(courseByIdData?.data.isPublished ? "false" : "true")}
  >
    {courseByIdData?.data.isPublished ? "Unpublish" : "Publish"}
  </Button>
  <Button>Remove Course</Button>
</div>

    </CardHeader>
    <CardContent>
      <div className="space-y-4 mt-5">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack developer"
          />
        </div>
     
        <div>
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Ex.b"
          />
        </div>
        <div className="flex items-center gap-5">
          <div>
            <Label>Category</Label>
            <Select
              defaultValue={input.category}
              onValueChange={selectCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">
                    Frontend Development
                  </SelectItem>
                  <SelectItem value="Fullstack Development">
                    Fullstack Development
                  </SelectItem>
                  <SelectItem value="MERN Stack Development">
                    MERN Stack Development
                  </SelectItem>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Course Level</Label>
            <Select
              defaultValue={input.courseLevel}
              onValueChange={selectCourseLevel}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Level</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price in (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="199"
              className="w-fit"
            />
          </div>
        </div>
        <div>
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbnail}
            accept="image/*"
            className="w-fit"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="e-64 my-2"
              alt="Course Thumbnail"
            />
          )}
        </div>
        <div>
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={updateCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default CourseTab