import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
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

  // Handler to fetch enrolled courses
  const handler = async () => {
    const response = await getenrollingcourses(token);
    setEnrollCourses(response);
  };
  useEffect(() => {
    handler(); 

    // Setup WebSocket connection
    const ws = new WebSocket("ws://localhost:8000");

    // WebSocket event handlers
    ws.onopen = () => {
      console.log("WebSocket connection established.");
      ws.send(JSON.stringify({type:"enrollconnect"}));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if(message.type==="notificationfromsender"){
         setLiveId(message.data);
         toast.success("sended")
         console.log(message.data)
      }
      else{
        setLiveId("");
      }
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    return () => {
      ws.close();
    };
  }, );

  return (
    <div className="flex flex-col gap-4 px-4 md:px-8 lg:px-16">
      <div className="text-[28px] md:text-[32px] font-bold text-white mt-3">
        Enrolled Courses
      </div>
      <div>
        {!enrollcourses ? (
          <div className="text-center text-white text-[18px] mt-4">Loading...</div>
        ) : !enrollcourses.length ? (
          <p className="text-white text-[18px] text-center">You have not enrolled in any courses</p>
        ) : (
          <div className="w-full mt-3">
            {/* Header Row */}
            <div className="flex items-center p-3 bg-richblack-800 rounded-md">
              <p className="w-[60%] text-richblack-50 font-bold text-[14px] md:text-[16px]">
                Course Name
              </p>
              <p className="w-[25%] text-richblack-50 font-bold text-[14px] md:text-[16px] pl-3">
                Progress
              </p>
              <p className="w-[15%] text-richblack-50 font-bold text-[14px] md:text-[16px] text-right pr-4">
                Actions
              </p>
            </div>

            {/* Courses in Row */}
            <div className="w-full flex flex-col gap-4">
              {enrollcourses.map((course, index) => (
                <div className='flex flex-col gap-y-1 relative'>
                  <Link
                  key={index}
                  to={`/courseview/${course._id}`}
                  className="group flex items-center border-[1px] border-richblack-500 rounded-md hover:bg-richblack-800 transition-all duration-200"
                >
                  {/* Course Thumbnail and Details */}
                  <div className="flex w-[60%] items-center p-4 gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-20 h-24 md:w-24 md:h-32 object-cover rounded-md"
                    />
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-richblack-25 font-bold text-[14px] md:text-[16px]">
                        {course.courseName}
                      </p>
                      <p className="text-richblack-500 text-[12px] md:text-[14px]">
                        {course.courseDescription}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-[25%] items-center gap-y-5 p-4">
                    <div className="w-full">
                      <p className="text-richblack-50 text-[14px] md:text-[16px] mb-1">
                        Progress: 60%
                      </p>
                      <ProgressBar
                        completed={60}
                        height="8px"
                        isLabelVisible={false}
                        maxCompleted={100}
                        bgColor="rgb(253, 186, 116)"
                        baseBgColor="rgb(75, 85, 99)"
                      />
                    </div>
                  </div>
                  <div className="w-[15%] p-4 text-richblack-50 flex items-center justify-end gap-3">
                    <BsThreeDotsVertical
                      size="1.5rem"
                      className="cursor-pointer hover:scale-110 transition-transform"
                    />
                    <MdDelete
                      size="1.5rem"
                      className="cursor-pointer hover:text-red-400 hover:scale-110 transition-transform"
                    />
                  </div>
                </Link>
                {
                  liveid===course._id && 
                  <Link to={`/go-live-student/${course._id}`} className='absolute -top-10 -right-3 mt-10'>
                    <div className='w-fit px-5 py-2  scale-105 animate-bounce transition-all dura duration-100  rounded-lg bg-[#d13434]'>
                     Live
                    </div>
                  </Link>
                }
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {liveid && (
        <div className="text-white text-center mt-4">
          Live Session ID: <span className="text-yellow-500 font-bold">{liveid}</span>
        </div>
      )}
    </div>
  );
};

export default EnrollCourses;
