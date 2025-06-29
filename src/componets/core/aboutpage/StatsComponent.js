

const States=[
    {
        counts:"5k",
        lebel:"Active Students"
    },
    {
        counts:"10+",
        lebel:"Mentors"
    },
    {
        counts:"200+",
        lebel:"Courses"
    },
    {
        counts:"50+",
        lebel:"Awards"
    }

]

const StatsComponent = () => {
  return (
  <div className="flex flex-wrap justify-center gap-6 w-[90%] max-w-screen-xl mx-auto text-white mt-10">
  {States.map((state, index) => (
    <div
      key={index}
      className="flex flex-col items-center p-6 bg-richblack-800 rounded-lg shadow hover:shadow-lg transition"
    >
      <h1 className="text-2xl md:text-3xl font-bold">{state.counts}</h1>
      <p className="text-sm md:text-base font-medium text-richblack-300">{state.lebel}</p>
    </div>
  ))}
</div>

  )
}

export default StatsComponent
