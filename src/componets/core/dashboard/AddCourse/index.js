
import RenderSteps from './RenderSteps'
import { RxDotFilled } from "react-icons/rx";
import { BsLightningChargeFill } from "react-icons/bs";
const AddCourse = () => {
  return (
        <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-16 mt-6 w-full">
  {/* Title */}
  <h1 className="text-2xl md:text-3xl font-extrabold text-richblack-5">Add Course</h1>

  {/* Main content */}
  <div className="flex flex-col lg:flex-row gap-6 w-full">
    {/* Left: RenderSteps */}
    <div className="lg:w-2/3 w-full bg-richblack-800 rounded-md p-4 shadow">
      <RenderSteps />
    </div>

    {/* Right: Instructions */}
    <div className="lg:w-1/3 w-full bg-richblack-800 rounded-md p-4 shadow flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-2">
        <BsLightningChargeFill className="text-yellow-400" size="1.2rem" />
        <h2 className="text-lg md:text-xl font-bold text-richblack-50">Course Instructions</h2>
      </div>
      <ul className="list-none flex flex-col gap-2 text-[14px] text-richblack-100">
        <li className="flex items-start gap-1">
          <RxDotFilled /> Get the course price action or make it free
        </li>
        <li className="flex items-start gap-1">
          <RxDotFilled /> Standard size for the course thumbnail is 1024×578
        </li>
        <li className="flex items-start gap-1">
          <RxDotFilled /> Video section controls the course overview video
        </li>
        <li className="flex items-start gap-1">
          <RxDotFilled /> Course builder helps you create & organize course content
        </li>
        <li className="flex items-start gap-1">
          <RxDotFilled /> Info from Additional Data shows up on the course page
        </li>
        <li className="flex items-start gap-1">
          <RxDotFilled /> Make announcements to notify learners of updates
        </li>
        <li className="flex items-start gap-1">
          <RxDotFilled /> Course builder helps you create & organize course content
        </li>
        <li className="flex items-start gap-1">
          <RxDotFilled /> Info from Additional Data shows up on the course page
        </li>
        <li className="flex items-start gap-1">
          <RxDotFilled /> Make announcements to notify learners of updates
        </li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default AddCourse
