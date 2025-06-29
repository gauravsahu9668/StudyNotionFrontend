import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheckCircle } from "react-icons/fa";
import CourseBuilder from './CourseBuilder';
import CourseInformation from './CourseInformation';
import CoursePublish from './CoursePublish';
const RenderSteps = () => {
  const {step}=useSelector((state)=>state.course)
    const steps=[
        {
            id:1,
            title:"Course Information"
        },
        {
          id:2,
          title:"Course Builder"
        },
        {
          id:3,
          title:"Publish"
        }
  ]
  return (
   <div className="flex flex-col w-full gap-6">
  {/* Step circles with connecting lines */}
  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 md:gap-4 mt-2">
    {steps.map((item, index) => (
      <div key={item.id} className="flex items-center">
        {/* Step circle */}
        <div
          className={`
            w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-sm md:text-base font-semibold
            ${
              step === item.id
                ? "bg-yellow-900 border-2 border-yellow-50 text-yellow-50"
                : "border border-richblack-700 bg-richblack-800 text-richblack-300"
            }
          `}
        >
          {step > item.id ? (
            <FaCheckCircle className="text-yellow-400" size="1rem" />
          ) : (
            <span>{item.id}</span>
          )}
        </div>

        {/* Connecting line (hide on last item) */}
        {index !== steps.length - 1 && (
          <div
            className={`
              hidden md:block
              w-24 md:w-40 border-b border-dashed
              ${step > item.id ? "border-yellow-50" : "border-richblack-600"}
            `}
          ></div>
        )}
      </div>
    ))}
  </div>

  {/* Step titles */}
  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-[4.5rem] text-richblack-50 text-sm md:text-[16px] font-bold">
    {steps.map((item) => (
      <div key={item.id} className="text-center max-w-[80px] md:max-w-none">
        <p>{item.title}</p>
      </div>
    ))}
  </div>

  {/* Step content */}
  <div className="mt-3">
    {step === 1 && <CourseInformation />}
    {step === 2 && <CourseBuilder />}
    {step === 3 && <CoursePublish />}
  </div>
</div>

  )
}

export default RenderSteps
