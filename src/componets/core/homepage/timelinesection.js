import React from 'react'
import logo1 from '../../../Assets/TimelineLogo/Logo1.svg'
import logo2 from '../../../Assets/TimelineLogo/Logo2.svg'
import logo3 from '../../../Assets/TimelineLogo/Logo3.svg'
import logo4 from '../../../Assets/TimelineLogo/Logo4.svg'
import timelineimage from '../../../Assets/Images/TimelineImage.png'
const timeline=[
    {
        logo:logo1,
        heading:"Leadership",
        Description:"Fully commetited to success company"
    },
    {
        logo:logo2,
        heading:"Leadership",
        Description:"Fully commetited to success company"
    },
    {
        logo:logo3,
        heading:"Leadership",
        Description:"Fully commetited to success company"
    },
    {
        logo:logo4,
        heading:"Leadership",
        Description:"Fully commetited to success company"
    }
]
const TimeLineSection = () => {
  return (
       <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-10 gap-8 mb-28 mt-5">
  {/* Timeline list */}
  <div className="w-full lg:w-[50%] flex flex-col gap-6">
    {timeline.map((element, index) => (
      <div className="flex gap-4 items-start" key={index}>
        <div className="min-w-[50px] min-h-[50px] bg-white rounded-md flex items-center justify-center shadow-md">
          <img src={element.logo} alt={`Step ${index}`} className="w-6 h-6 object-contain" />
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold text-base sm:text-lg md:text-xl text-richblack-50">{element.heading}</h2>
          <p className="text-xs sm:text-sm md:text-base text-richblack-300">{element.Description}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Timeline image and overlay */}
  <div className="relative w-full lg:w-[50%] flex justify-center items-center">
    <img 
      src={timelineimage} 
      alt="timeline" 
      className="w-[90%] sm:w-[80%] rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" 
    />

    <div className="absolute bottom-[-20px] right-4 sm:right-10 md:right-20 bg-caribbeangreen-700 text-white rounded-md flex flex-col sm:flex-row w-[90%] sm:w-[380px] md:w-[400px] p-4 sm:p-6 shadow-md">
      <div className="flex-1 flex items-center gap-3 sm:gap-4 border-b sm:border-b-0 sm:border-r border-caribbeangreen-300 mb-2 sm:mb-0 pr-0 sm:pr-4">
        <p className="text-xl sm:text-2xl font-bold">10</p>
        <p className="text-xs sm:text-sm text-caribbeangreen-300">Years of Experience</p>
      </div>
      <div className="flex-1 flex items-center gap-3 sm:gap-4 pt-2 sm:pt-0 sm:pl-4">
        <p className="text-xl sm:text-2xl font-bold">250</p>
        <p className="text-xs sm:text-sm text-caribbeangreen-300">Type of courses</p>
      </div>
    </div>
  </div>
</div>

  )
}

export default TimeLineSection
