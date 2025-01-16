import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const HomePage = () => {
   const user=useSelector((store)=>store.user)
   console.log(user)


  return (
    <div className="font-sans">
    
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ace Your GPAT & NIPER Journey <br /> With Expert Guidance
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Comprehensive preparation platform designed by top educators to help
            you crack GPAT and NIPER exams with confidence.
          </p>
          {user ? (<p className="font-semibold">{`Welcome to Our Platform Dear ${user.firstName}`}</p>):(   <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
            <Link to='/sign-in'>  Sign-up</Link>
            
            </button>
            <button className="bg-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-800">
              View Courses
            </button>
          </div>)}
       
          <p className="mt-4 text-sm opacity-75">500+ Students already enrolled this month</p>
        </div>
      </section>


      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Key Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📚",
                title: "Comprehensive Study Material",
                description:
                  "Access in-depth and updated study resources designed to meet GPAT and NIPER standards.",
              },
              {
                icon: "📊",
                title: "Regular Mock Tests",
                description:
                  "Test your preparation with exam-oriented mock tests and detailed performance analysis.",
              },
              {
                icon: "👨‍🏫",
                title: "Expert Faculty",
                description:
                  "Learn from industry experts with years of experience in guiding successful GPAT aspirants.",
              },
              {
                icon: "🎥",
                title: "Live & Recorded Lectures",
                description:
                  "Join live interactive sessions or revisit topics anytime with recorded lectures.",
              },
              {
                icon: "🤝",
                title: "Personalized Mentorship",
                description:
                  "Receive one-on-one guidance to overcome challenges and excel in your preparation.",
              },
              {
                icon: "📅",
                title: "Flexible Learning Schedule",
                description:
                  "Study at your own pace with a schedule that fits your needs.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4 text-blue-600">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-16 px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Our Platform?
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Comprehensive features designed to maximize your success in GPAT & NIPER
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💻",
                title: "Live Online Classes",
                description:
                  "Interactive sessions with experienced faculty members. Real-time doubt clearing and personalized attention.",
              },
              {
                icon: "📚",
                title: "Study Materials",
                description:
                  "Comprehensive study notes, previous year papers, and chapter-wise practice questions.",
              },
              {
                icon: "📊",
                title: "Performance Analytics",
                description:
                  "Detailed analysis of your progress with personalized insights and improvement suggestions.",
              },
              {
                icon: "👨‍🏫",
                title: "Expert Mentorship",
                description:
                  "One-on-one guidance from experienced mentors who have cracked GPAT & NIPER.",
              },
              {
                icon: "📝",
                title: "Mock Tests",
                description:
                  "Regular mock tests designed to simulate actual exam conditions with detailed solutions.",
              },
              {
                icon: "⏰",
                title: "Flexible Learning",
                description:
                  "Study at your own pace with 24/7 access to recorded lectures and study materials.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
