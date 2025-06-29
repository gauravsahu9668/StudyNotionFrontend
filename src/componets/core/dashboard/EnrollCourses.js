import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getenrollingcourses } from '../../../services/operation/ProfileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

const EnrollCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrollcourses, setEnrollCourses] = useState([]);
  const [liveid, setLiveId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getenrollingcourses(token);
        setEnrollCourses(response);
      } catch {
        toast.error("Failed to load enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    // Setup WebSocket connection
    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = () => {
      console.log("WebSocket connected.");
      ws.send(JSON.stringify({ type: "enrollconnect" }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "notificationfromsender") {
        setLiveId(message.data);
        toast.success("Live session started!");
      } else {
        setLiveId("");
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket closed.");

    return () => ws.close();
  }, [token]);

  return (
    <div className="flex flex-col gap-4 px-4 md:px-8 lg:px-16 py-6">
      <h1 className="text-[24px] md:text-[30px] font-bold text-richblack-5">Enrolled Courses</h1>

      {loading ? (
        <div className="text-center text-richblack-200 mt-6">Loading courses...</div>
      ) : !enrollcourses.length ? (
        <div className="text-center text-richblack-200 mt-6">You have not enrolled in any courses yet.</div>
      ) : (
        <div className="mt-4 space-y-3">
          {/* Header Row */}
          <div className="hidden md:flex items-center p-3 bg-richblack-800 rounded-md">
            <p className="w-[60%] text-richblack-50 font-semibold text-[14px]">Course Name</p>
            <p className="w-[25%] text-richblack-50 font-semibold text-[14px]">Progress</p>
            <p className="w-[15%] text-richblack-50 font-semibold text-[14px] text-right">Actions</p>
          </div>

          {/* Course List */}
          <div className="flex flex-col gap-3">
            {enrollcourses.map((course) => (
              <div key={course._id} className="relative group border border-richblack-600 rounded-md hover:bg-richblack-800 transition">
                <Link to={`/courseview/${course._id}`} className="flex flex-col md:flex-row">
                  {/* Course Info */}
                  <div className="flex md:w-[60%] items-center p-3 gap-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.courseName} 
                      className="w-24 h-32 object-cover rounded-md flex-shrink-0" 
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-richblack-25 font-semibold text-[14px] md:text-[16px]">{course.courseName}</h3>
                      <p className="text-richblack-400 text-[12px] md:text-[14px] line-clamp-2">{course.courseDescription}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="md:w-[25%] flex flex-col justify-center p-3">
                    <p className="text-richblack-50 text-[12px] md:text-[14px]">Progress: 60%</p>
                    <ProgressBar 
                      completed={60}
                      height="8px"
                      isLabelVisible={false}
                      bgColor="rgb(253, 186, 116)"
                      baseBgColor="rgb(75, 85, 99)"
                    />
                  </div>

                  {/* Actions */}
                  <div className="md:w-[15%] flex justify-end items-center p-3 gap-2 text-richblack-200">
                    <BsThreeDotsVertical className="cursor-pointer hover:scale-110" size={20} />
                    <MdDelete className="cursor-pointer hover:text-red-500 hover:scale-110" size={20} />
                  </div>
                </Link>

                {/* Live badge */}
                {liveid === course._id && (
                  <Link to={`/go-live-student/${course._id}`} className="absolute top-2 right-2 animate-bounce">
                    <div className="px-3 py-1 bg-[#d13434] text-white text-xs font-semibold rounded-full">
                      Live
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional live session footer */}
      {liveid && (
        <div className="text-center text-yellow-500 mt-4 text-[14px]">
          Live Session ID: <span className="font-bold">{liveid}</span>
        </div>
      )}
    </div>
  );
};

export default EnrollCourses;
