import React, { useEffect, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { getcoursedetails } from '../services/operation/courses'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdTime } from "react-icons/io";
import { FaRegShareSquare } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';
import { addedtocart } from '../services/operation/courses';
import toast from 'react-hot-toast';
import { setTotalItems } from '../slices/cartSlice';
import { buyCourse } from '../services/operation/courses';
import Footer from '../componets/common/Footer/Footer';
import { categories } from '../services/apis';

import { apiconnector,formatDate } from '../services/apiconnector';
const CourseBuy = () => {
    const location=useLocation()
    const user=useSelector((state)=>state.profile.user)
    const courseId=location.pathname.split("/").at(-1)
    const {token}=useSelector((state)=>state.auth)
    const [Course,setCourse]=useState([]) 
    const getcourseDetails=()=>{
        getcoursedetails(courseId,token).then((result)=>{
            setCourse(result.data.data)
        })
    }
    const {totalItems}=useSelector((state)=>state.cart)
    const dispatch=useDispatch()
    const addtocart=(Course_Id)=>{
      console.log("step-1")
      addedtocart(Course_Id,token).then((response)=>{
          if(response.data.success){
            dispatch(setTotalItems(totalItems+1))
          }
          console.log(response)
        
      })
    }
    const navigate=useNavigate();
    const {PAYMENT_VERIFY}=categories
    const options = {
    key: "rzp_test_f9jmD3i6pHEM3U",  // Not secret!
    amount: 0,
    currency: "INR",
    name: "StudyNotion",
    description: "Course Purchase",
    image: "",
    order_id: "",
    handler: async function (response) {
    const data = {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      courseId,
      userId:user._id
    };
    const reso=await apiconnector("POST",PAYMENT_VERIFY,data,{
                  'Authorization':`Bearer ${token}`
              })
    if(reso.data.success){
      toast.success(reso.data.message)
      navigate("/dashboard/enrolled-courses")
    }
    else{
      
    }
    }
    };
    const buyHandler=async(courseId)=>{
      try{
        buyCourse(courseId,token).then((response)=>{
          console.log(response)
        if(response.data.success){
          options.amount=response.data.amount
          options.currency=response.data.currency
          options.name=response.data.courseName
          options.description=response.data.coursedescription
          options.image=response.data.thumbnail
          options.order_id=response.data.orderid
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      })
      }catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
        getcourseDetails()
    },[])
  return (
    
       <div className="w-full mt-14 text-richblack-50">
  {Course.map((item, index) => (
    item._id === courseId && (
      <div key={index}>
        {/* Header section */}
        <div className="bg-gradient-to-r from-richblack-700 via-richblack-800 to-richblack-900 py-10">
          <div className="w-[90%] md:w-[80%] mx-auto flex flex-col lg:flex-row gap-6">
            {/* Left: Course details */}
            <div className="flex-1 flex flex-col gap-3">
              <h1 className="text-[24px] md:text-[30px] font-bold">{item.courseName}</h1>
              <div className="text-[14px] md:text-[16px] text-richblack-200 flex flex-wrap gap-2">
                {item.tag.split(',').map((tag, i) => (
                  <span key={i} className="px-2 py-[2px] bg-richblack-700 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-[15px] md:text-[16px] text-yellow-400">
                <div className="flex items-center gap-1">
                  <span>4.5</span>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  <span className="ml-2 text-richblack-300">| 5 reviews</span>
                </div>
                <div className="text-richblack-200">{item.studentsenroll.length} students enrolled</div>
              </div>
              <p className="flex items-center gap-1 text-[14px] md:text-[16px] text-richblack-300">
                <IoMdTime /> Created on <span className="ml-2 text-[#c6c1c1]">{formatDate(item.time)}</span>
              </p>
              {/* Author */}
              <div className="mt-3 flex items-center gap-3">
                <img src={item?.instructor?.image} alt="Instructor" className="w-[50px] h-[50px] rounded-full object-cover" />
                <div className="text-[16px] md:text-[18px] text-richblack-200">{item?.instructor?.firstName} {item?.instructor?.lastName}</div>
              </div>
            </div>

            {/* Right: Buy card */}
            <div className="w-full lg:w-[320px] bg-richblack-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg">
              <img src={item?.thumbnail} alt="Thumbnail" className="rounded-md w-full h-[180px] object-cover" />
              <h2 className="text-[22px] md:text-[24px] font-bold">Rs {item?.price}</h2>
              <button onClick={() => buyHandler(item._id)} className="w-full py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition">Buy Now</button>
              <button onClick={() => addtocart(item._id)} className="w-full py-2 bg-richblack-700 text-white font-bold rounded-lg hover:bg-richblack-600 transition">Add to Cart</button>
              <div className="flex justify-center items-center text-yellow-300 text-[16px] mt-2 gap-2 cursor-pointer hover:text-yellow-200">
                <FaRegShareSquare /><span>Share</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course info */}
        <div className="w-[90%] md:w-[80%] mx-auto mt-8 flex flex-col gap-6">
          {/* What you'll learn */}
          <div className="bg-richblack-800 p-5 rounded-xl shadow-md">
            <h2 className="text-[22px] font-bold mb-2">What you'll learn</h2>
            <p className="text-richblack-300 text-[15px] md:text-[17px]">{item.courseDescription}</p>
          </div>

          {/* Course content */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-[20px] md:text-[23px] font-bold">Course Content</h2>
              <button className="text-yellow-400 text-[14px] hover:underline">Collapse all sections</button>
            </div>
            <p className="text-[14px] md:text-[15px] text-richblack-300">{item.coursecontent.length} sections · 2 hrs 30 min</p>

            {/* Sections */}
            <div className="flex flex-col gap-2">
              {item.coursecontent.map((section, idx) => (
                <div key={idx} className="flex justify-between items-center bg-richblack-800 rounded-lg px-4 py-2 hover:bg-richblack-700 transition">
                  <span className="text-[15px] md:text-[16px]">{section.sectionName}</span>
                  {/* Optional: add icon */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  ))}
  <div className="mt-10">
    <Footer />
  </div>
</div>

  )
}

export default CourseBuy
