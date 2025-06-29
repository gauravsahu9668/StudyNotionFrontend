import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCataAlCourses } from '../services/operation/category';
import { FaStar } from "react-icons/fa6";
import { FaFaceSadCry } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Footer from '../componets/common/Footer/Footer';

const Category = () => {
  const location = useLocation();
  const categoryId = location.pathname.split('/').at(-1);
  const [allcatcourses, setAllCatCourses] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const getCategoryCourses = async () => {
    try {
      const response = await getCataAlCourses(categoryId);
      setAllCatCourses(response.data.data || []); // Handle empty responses gracefully
    } catch (error) {
      console.error("Error fetching courses:", error);
      setAllCatCourses([]); // Ensure state is not null
    }
  };

  const goToCourseBuy = (courseId) => {
    if (token && user?.accountType !== "Instructor") {
      navigate(`/course-buy/${courseId}`);
    } else {
      toast.error(user?.accountType === "Instructor" ? "Create Student Account" : "Please login");
    }
  };

  useEffect(() => {
    getCategoryCourses();
  },[]);

  return (
    <div className="mt-14 w-full text-richblack-50">
  {allcatcourses.map((item, index) => (
    <div key={index} className="w-full">
      {categoryId === item._id && (
        <div className="w-full">
          {/* Category Banner */}
          <div className="flex items-center w-full bg-gradient-to-r from-richblack-700 via-richblack-800 to-richblack-900 h-[30vh]">
            <div className="w-[90%] md:w-[80%] mx-auto">
              <div className="flex gap-x-2 text-richblack-400 text-[14px] md:text-[16px] font-semibold">
                <span>Home /</span>
                <span>Catalog /</span>
                <span className="text-yellow-400">{item.name}</span>
              </div>
              <h1 className="mt-2 text-[24px] md:text-[30px] font-extrabold text-richblack-25">{item.name}</h1>
              <p className="mt-2 text-[14px] md:text-[16px] text-richblack-400">{item.description}</p>
            </div>
          </div>

          {/* Course List */}
          <div className="w-[90%] md:w-[80%] mx-auto mt-6">
            <h2 className="text-[22px] md:text-[26px] font-bold mb-2">Courses to get you started</h2>
            <div className="relative flex items-center justify-between border-b border-richblack-600 pb-2 mb-4">
              <span className="text-yellow-400 text-[16px] md:text-[18px]">All courses</span>
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-richblack-700 hover:bg-richblack-600 transition duration-200 cursor-pointer">
                <FiArrowRight color="yellow" size="1.4rem" />
              </div>
            </div>

            <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-richblack-900 pb-2">
              {item.Course?.length > 0 ? (
                item.Course.map((course, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[220px] md:w-[260px] bg-richblack-800 rounded-lg p-2 hover:scale-[1.02] hover:shadow-md transition duration-200 cursor-pointer"
                    onClick={() => goToCourseBuy(course._id)}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.courseName || "Course Thumbnail"}
                      className="w-full h-[150px] md:h-[180px] rounded-md object-cover"
                    />
                    <div className="mt-3 text-[16px] md:text-[18px] font-semibold">{course.courseName}</div>
                    <div className="mt-1 flex items-center gap-x-1 text-yellow-400 text-[14px]">
                      <span>4.5</span>
                      {[...Array(5)].map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                      <span className="ml-1 text-richblack-300">| 5 reviews</span>
                    </div>
                    <div className="mt-1 text-[13px] text-richblack-400 italic underline">
                      By {course?.instructor?.firstName || "N/A"} {course?.instructor?.lastName || ""}
                    </div>
                    <div className="mt-2 text-[16px] md:text-[18px] font-bold">
                      <span className="text-pink-400">Rs</span> {course.price || "0"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-x-2 text-[16px] text-richblack-400">
                  <span>No Course Added</span>
                  <FaFaceSadCry color="yellow" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  ))}
  <Footer />
</div>

  );
};

export default Category;
