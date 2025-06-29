import React, { useState } from 'react'
import coursesdata from '../../../Data/homepage-explore'
import HighlighText from './HighlighText';
import CourseCard from './CourseCard';
const tabnames=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const ExploreMore = () => {
    const [currenttab,setcurrenttab]=useState("Free");
    const data=coursesdata
  return (
    // <div className='flex flex-col justify-center'>
    //     <div className='text-4xl font-semibold text-center '>
    //         Unlock the <HighlighText text={"Power of Code"}></HighlighText>
    //     </div>
    //     <p className='text-[16px] text-richblack-200 font-semibold text-center mt-4'>Learn to build anything you can imagine</p>
    //     <div className=' rounded-full  bg-richblack-800 mx-auto mt-4 p-1 gap-10 w-fit'>
    //         <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("Free")}}>Free</button>
    //         <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("New to coding")}}>New to coding</button>
    //         <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("Skills paths")}}>Skills paths</button>
    //         <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("Most popular")}}>Most popular</button>
    //         <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("Career paths")}}>Career paths</button>
    //     </div>
    //     <div className='flex relative '>
    //         {
    //             data.map((cour,index)=>{
    //                 if(cour.tag===currenttab){
    //                         return(
    //                             <CourseCard course={cour.courses} key={index} ></CourseCard>
    //                         ) 
    //                 }
    //             })
    //         }
    //     </div>
    // </div>
    <div className='flex flex-col justify-center px-4 sm:px-6 md:px-8'>
  <div className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center'>
    Unlock the <HighlighText text={"Power of Code"} />
  </div>

  <p className='text-sm sm:text-base md:text-[16px] text-richblack-200 font-semibold text-center mt-2 sm:mt-3 md:mt-4'>
    Learn to build anything you can imagine
  </p>

  <div className='flex flex-wrap justify-center rounded-full bg-richblack-800 mx-auto mt-4 p-1 gap-2 sm:gap-4 md:gap-6 lg:gap-10 w-full sm:w-fit'>
    <button
      className='px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-richblack-300 hover:bg-richblack-900 rounded-full'
      onClick={() => setcurrenttab("Free")}>
      Free
    </button>
    <button
      className='px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-richblack-300 hover:bg-richblack-900 rounded-full'
      onClick={() => setcurrenttab("New to coding")}>
      New to coding
    </button>
    <button
      className='px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-richblack-300 hover:bg-richblack-900 rounded-full'
      onClick={() => setcurrenttab("Skills paths")}>
      Skills paths
    </button>
    <button
      className='px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-richblack-300 hover:bg-richblack-900 rounded-full'
      onClick={() => setcurrenttab("Most popular")}>
      Most popular
    </button>
    <button
      className='px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-richblack-300 hover:bg-richblack-900 rounded-full'
      onClick={() => setcurrenttab("Career paths")}>
      Career paths
    </button>
  </div>

  <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-6 mt-6'>
    {data.map((cour, index) =>
      cour.tag === currenttab ? (
        <CourseCard course={cour.courses} key={index} />
      ) : null
    )}
  </div>
    </div>

  )
}

export default ExploreMore
