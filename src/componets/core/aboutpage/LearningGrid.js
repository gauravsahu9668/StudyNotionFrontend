
import learningarray from '../../../Data/learningarray'
import CTAButton from '../homepage/Button'
const LearningGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] max-w-screen-xl mx-auto mt-12 mb-10 text-white">
  {learningarray.map((card, index) => (
    <div
      key={index}
      className={`
        ${index === 0 ? "lg:col-span-2 bg-richblack-900" : ""}
        ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
        ${card.order === 3 ? "lg:col-start-2" : ""}
        rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition
      `}
    >
      {card.order < 0 ? (
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-2xl md:text-3xl font-bold">
            {card.heading}
            <br />
            <span className="text-blue-400">{card.highlighttext}</span>
          </h2>
          <p className="text-richblack-300 text-base md:text-lg">{card.description}</p>
          <CTAButton linkto={card.Btnlink} active={true}>
            {card.Btntext}
          </CTAButton>
        </div>
      ) : (
        <div className="flex flex-col gap-3 py-6">
          <h3 className="text-lg md:text-xl font-bold text-richblack-50">{card.heading}</h3>
          <p className="text-richblack-300 text-sm md:text-base font-medium">{card.description}</p>
        </div>
      )}
    </div>
  ))}
</div>

  )
}

export default LearningGrid
