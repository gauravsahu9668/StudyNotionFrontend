
import { Link} from 'react-router-dom'
const FooterLink = ({data}) => {
  return (
    <div className='gap-y-4 w-full'>
       <h1 className='text-base sm:text-[17px] md:text-[18px] text-richblack-5 font-bold'>
       {data.title}
       </h1>
  {
        data.links.map((item, index) => {
        return (
        <div key={index} className='text-sm sm:text-[15px] md:text-[16px] text-richblack-300 mt-2 sm:mt-3'>
          <Link to={item.link}>{item.title}</Link>
        </div>
      )
    })
  }
    </div>

  )
}

export default FooterLink
