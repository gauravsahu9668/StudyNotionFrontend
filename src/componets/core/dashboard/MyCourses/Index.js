import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getinstructorallcourses } from '../../../../services/operation/courses'
import { MdAdd, MdModeEdit } from "react-icons/md";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { VscIssueDraft } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import { deleteCourse } from '../../../../services/operation/courses';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../services/apiconnector';
const MyCourses = () => {
    const { token } = useSelector((state) => state.auth)
    const [allcourses, setallcourses] = useState([])

    const getallcourses = () => {
        getinstructorallcourses(token)
            .then(result => {
                setallcourses(result)
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }

    const deletethecourse = (courseId) => {
        deleteCourse(courseId, token).then((result) => {
            toast.success("Course Deleted successfully")
            getallcourses()
        })
    }

    const goLiveHandler = (courseId) => {
        toast.success(`Going live with course ID: ${courseId}`)
        // Add logic here to start the live session
    }

    useEffect(() => {
        getallcourses()
    }, [token])

    return (
        <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-16 mt-6">
  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <h1 className="text-2xl md:text-3xl font-extrabold text-richblack-5">My Courses</h1>
    <Link to="/dashboard/add-course">
      <button className="flex items-center gap-2 bg-yellow-50 text-black px-4 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-yellow-100 transition">
        <MdAdd size="1.2rem" /> <span>Create New</span>
      </button>
    </Link>
  </div>

  {/* Content */}
  {allcourses.length === 0 ? (
    <div className="text-center text-lg md:text-2xl font-semibold text-richblack-100 py-10">
      No course added! Click on "Create New"
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      {/* Table Header */}
      <div className="hidden md:flex p-3 bg-richblack-800 rounded-md shadow-sm">
        <p className="w-[50%] text-sm font-semibold uppercase text-richblack-200">Courses</p>
        <p className="w-[12%] text-sm font-semibold uppercase text-richblack-200">Duration</p>
        <p className="w-[12%] text-sm font-semibold uppercase text-richblack-200">Price</p>
        <p className="w-[26%] text-sm font-semibold uppercase text-richblack-200 text-center">Actions</p>
      </div>

      {/* Course Items */}
      <div className="flex flex-col gap-4">
        {allcourses.map((course, index) => (
          <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-richblack-800 rounded-md p-4 hover:shadow transition">
            {/* Course Info */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-[50%]">
              <img src={course?.thumbnail} alt="Thumbnail" className="w-full sm:w-40 h-28 object-cover rounded-lg border border-richblack-700" />
              <div className="flex flex-col gap-1">
                <p className="text-base md:text-lg font-semibold text-richblack-5">{course?.courseName}</p>
                <p className="text-sm text-richblack-400 line-clamp-2">{course?.courseDescription}</p>
                <p className="text-xs text-richblack-500">Created at: {formatDate(course?.time)}</p>
                {course?.status === "Published" ? (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-700 text-green-100 w-fit">
                    <MdOutlinePublishedWithChanges /> {course?.status}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-pink-700 text-pink-100 w-fit">
                    <VscIssueDraft /> {course?.status}
                  </span>
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="w-full md:w-[12%] text-sm font-medium text-richblack-300">{course?.duration || "N/A"}</div>

            {/* Price */}
            <div className="w-full md:w-[12%] text-sm font-medium text-yellow-50">₹ {course?.price}</div>

            {/* Actions */}
            <div className="flex gap-3 justify-start md:justify-center w-full md:w-[26%]">
              <button onClick={() => toast.error("This feature appears soon")}>
                <MdModeEdit size="1.4rem" className="text-richblack-300 hover:text-yellow-50 transition" />
              </button>
              <button onClick={() => deletethecourse(course._id)}>
                <RiDeleteBin5Line size="1.4rem" className="text-richblack-300 hover:text-red-500 transition" />
              </button>
              <Link to={`/go-live-instructor/${course._id}`}>
                <button
                  onClick={() => goLiveHandler(course._id)}
                  className="bg-green-600 text-white text-xs md:text-sm px-3 py-1 rounded-md font-semibold hover:bg-green-800 transition"
                >
                  Go Live
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

    )
}

export default MyCourses
