import axios from 'axios';
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from './ui/button';
const BuyCourseButton = ({ courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const HandleClick=async()=>{

    
    const verifyPremiumUser=async()=>{
      try {
        const enrolledResponse = await axios.get("https://backend-pharmaminds.onrender.com/api/v1/courses/enrolled-courses", {
          withCredentials: true,
        });
        const enrolledCourses = enrolledResponse.data.enrolledCourses;
              const isCourseEnrolled = enrolledCourses.some((course) => course._id === courseId);
              if (isCourseEnrolled) {
                alert("✅ Payment Successful! You are now enrolled.");
                navigate(`/course-detail/${courseId}`); 
              } else {
                alert("⚠️ Payment success, but course enrollment failed. Please contact support.");
              }
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
        alert("⚠️ Payment success, but unable to confirm enrollment.");
      }
    }






    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://backend-pharmaminds.onrender.com/api/v1/payment/create-payment",
        { courseId }, 
        { withCredentials: true } 
      );
      console.log(response.data)
      const order=response.data
      console.log("Order amount received:", order.amount);
      const options = {
        key: order.keyid, 
        amount: order.amount, 
        currency: 'INR',
        name: 'Pharmaminds',
     
      order_id: order.razorpayOrderId, 
     
      
        theme: {
          color: '#F37254'
        },
        handler: verifyPremiumUser,
      };
      const rzp = new window.Razorpay(options);
         rzp.open();
    } catch (error) {
      console.log("Payment initiation failed:", error);
      alert("Payment initiation failed");
    }
    setIsLoading(false);
  }
  return (
    <Button

    className="w-full"
    onClick={HandleClick} 
  >
    {isLoading ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </>
    ) : (
      "Purchase Course"
    )}
  </Button>
  )
}

export default BuyCourseButton
