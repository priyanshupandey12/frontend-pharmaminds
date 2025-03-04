import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import SingleCourse from "./SingleCourse";
import { useLoadUserQuery, useUpdateUserMutation } from "@/store/userApi";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { updateUserdata, updateUserIsLoading, isError, isSuccess, error }] = useUpdateUserMutation();
  console.log("User Profile Data:", data?.userProfile);
  const changeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePicture(file);
  };

  const updateClickHandler = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("profilePicture", profilePicture);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserdata?.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [updateUserdata, isError, isSuccess, error]);

  return (
    <div className="max-w-4xl mx-auto px-6 my-12 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-bold text-3xl text-center text-gray-900 dark:text-white"
      >
        Profile
      </motion.h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-8">
        <Avatar className="h-32 w-32 border-4 border-blue-500 shadow-lg">
          <AvatarImage src={data?.userProfile.profilePicture || "https://github.com/shadcn.png"} alt="Profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">Name: <span className="font-normal">{data?.userProfile.firstName} {data?.userProfile.lastName}</span></p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">Email: <span className="font-normal">{data?.userProfile.email}</span></p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">Role: <span className="font-normal">{data?.userProfile.role.toUpperCase()}</span></p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="p-6 bg-white dark:bg-gray-800 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Edit Profile</DialogTitle>
                <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">Make changes to your profile here. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>First Name</Label>
                  <Input type="text" value={firstName} placeholder="First Name" className="col-span-3" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Last Name</Label>
                  <Input type="text" value={lastName} placeholder="Last Name" className="col-span-3" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input type="file" accept="image/*" className="col-span-3" onChange={changeHandler} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={updateClickHandler} className="bg-green-600 hover:bg-green-700 text-white rounded-md">
                  {updateUserIsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
  {data?.userProfile.enrolledCourses?.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400">You haven't enrolled yet</p>
  ) : (
    data?.userProfile.enrolledCourses.map((course) =>
      course?._id && course?.courseTitle ? (  // ✅ Ensure course has ID & Title
        <SingleCourse course={course} key={course._id} />
      ) : (
        <p key={course?._id || Math.random()} className="text-gray-500">
          Invalid Course Data
        </p>
      )
    )
  )}
</div>
    </div>
  );
};

export default Profile;
