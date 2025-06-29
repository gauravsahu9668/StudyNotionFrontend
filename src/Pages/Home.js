import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlighText from '../componets/core/homepage/HighlighText'
import CTAButton from '../componets/core/homepage/Button'
import banner from '../Assets/Images/banner.mp4'
import CodeBlocks from '../componets/core/homepage/CodeBlock'
import TimeLineSection from '../componets/core/homepage/timelinesection'
import LearningLanguageSection from '../componets/core/homepage/learnlangugesection'
import ExploreMore from '../componets/core/homepage/ExploreMore'
import Footer from '../componets/common/Footer/Footer'
import ReviewSlider from '../componets/common/ReviewSlider'
const Home = () => {
  return (
    <div>
  <div className='group relative mx-auto flex flex-col w-11/12 mt-8 items-center text-white justify-between'>
    <Link to="/signup">
      <div className='-z-50 mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
        <div className='flex flex-row items-center gap-2 rounded-full px-6 sm:px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
          <p className='text-sm sm:text-base'>Become an Instructor</p>
          <FaArrowRight />
        </div>
      </div>
    </Link>

    <div className='text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-7 px-4'>
      Empower Your Future with <HighlighText text={"Coding skills"} />
    </div>

    <div className='w-[90%] sm:w-[80%] md:w-[65%] text-center text-sm sm:text-base md:text-lg font-bold text-richblack-300 mt-4 px-2'>
      with our online courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
    </div>

    <div className='flex flex-col sm:flex-row gap-4 sm:gap-7 mt-8'>
      <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
      <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
    </div>

    <div className='shadow-blue-200 mx-3 my-12 w-full'>
      <video muted loop autoPlay src={banner} className='w-[95%] sm:w-[90%] mx-auto rounded-md' />
    </div>

    <div className='w-full px-4 sm:px-8'>
      <CodeBlocks
        position={"lg:flex-row"}
        heading={<div className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
          Unlock Your <HighlighText text={"coding potential"} /> with our online courses
        </div>}
        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
        ctabtn1={{ active: true, linkto: "/signup", btntext: "Try it yourself" }}
        ctabtn2={{ active: false, linkto: "/login", btntext: "Learn more" }}
        codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n <meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n <title>Document</title>\n</head>`}
        codeColor={"text-yellow-25"}
      />
    </div>

    <div className='w-full px-4 sm:px-8'>
      <CodeBlocks
        position={"lg:flex-row-reverse"}
        heading={<div className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
          Start <HighlighText text={"coding in seconds"} /> with our platform
        </div>}
        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your first lesson"}
        ctabtn1={{ active: true, linkto: "/signup", btntext: "Continue Lesson" }}
        ctabtn2={{ active: false, linkto: "/login", btntext: "Learn more" }}
        codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n <meta charset="UTF-8">\n<meta name="viewport" content="width=device-width">\n <title>Document</title>\n</head>\n<body>\n<h1>hello learners</h1>\n</body>`}
        codeColor={"text-pink-400"}
      />
    </div>
  </div>

  {/* Section 2 */}
  <div className='bg-pure-greys-5 text-richblack-700'>
    

    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col lg:flex-row items-center px-4'>
      <div className='flex flex-col lg:flex-row gap-10 lg:gap-20 mb-10 mt-[100px] lg:mt-[150px] w-full'>
        <div className='text-2xl sm:text-3xl md:text-4xl font-semibold lg:w-[45%] jobskill1 text-center lg:text-left'>
          Get the skills you need for a <HighlighText text={"job that’s in demand"} />
        </div>
        <div className='flex flex-col gap-6 sm:gap-10 lg:w-[40%] items-center lg:items-start jobskill2 text-center lg:text-left'>
          <div className='text-sm sm:text-base'>
            The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
          </div>
          <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>
        </div>
      </div>
    </div>

    <div className='flex flex-col w-11/12 mx-auto'>
      <TimeLineSection />
      <LearningLanguageSection />
    </div>
  </div>

  {/* Section 3 */}
  <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center gap-8 bg-richblack-900 text-white px-4'>
    <h2 className='text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-10'>Reviews from other learners</h2>
    <div className='w-full sm:w-[90%] md:w-[85%] mx-auto'>
      <ReviewSlider />
    </div>
  </div>
  <div className='mt-10'>
    <Footer />
  </div>
</div>

  )
}

export default Home
