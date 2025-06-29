import React from 'react'
import HighlighText from './HighlighText'
import knowyourprogress from "../../../Assets/Images/Know_your_progress.png"
import comparewithothers from '../../../Assets/Images/Compare_with_others.png'
import planyourlesson from '../../../Assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'
const LearningLanguageSection = () => {
  return (
  <div className="mt-12 mb-10 px-4 sm:px-6 md:px-8">
  <div className="flex flex-col gap-6 items-center max-w-screen-xl mx-auto">
    {/* Heading */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white">
      Your Swiss Knife for <HighlighText text={"learning any language"} />
    </h2>

    {/* Subtext */}
    <p className="w-full sm:w-[80%] md:w-[60%] text-center text-richblack-400 text-sm sm:text-base md:text-lg">
      Using spin making multiple languages easy. With 20+ languages, realistic voice-over,
      progress tracking, schedule and more.
    </p>

    {/* Images */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-5">
      <img
        src={knowyourprogress}
        alt="Know your progress"
        className="w-[90%] sm:w-[70%] md:w-[250px] lg:w-[300px] xl:w-[350px] rounded-md shadow-md"
      />
      <img
        src={comparewithothers}
        alt="Compare with others"
        className="w-[90%] sm:w-[70%] md:w-[250px] lg:w-[300px] xl:w-[350px] rounded-md shadow-md"
      />
      <img
        src={planyourlesson}
        alt="Plan your lesson"
        className="w-[90%] sm:w-[70%] md:w-[250px] lg:w-[300px] xl:w-[350px] rounded-md shadow-md"
      />
    </div>

    {/* Button */}
    <div className="mt-5">
      <CTAButton linkto="/signup" active={true}>
        Learn more
      </CTAButton>
    </div>
  </div>
</div>

  )
}

export default LearningLanguageSection
