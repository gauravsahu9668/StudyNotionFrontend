import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getcoursedetails, rateandreview} from '../../../services/operation/courses';
import { useSelector } from 'react-redux';
import { IoMdArrowBack } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import ReactStars from "react-rating-stars-component";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import toast from 'react-hot-toast';

const CourseView = () => {
  const location = useLocation();
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const courseId = location.pathname.split("/").at(-1);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [currentVideo, setCurrentVideo] = useState({ url: null, desc: null, id: null });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const res = await getcoursedetails(courseId, token);
      setCourse(res?.data?.data);
      console.log(res.data.data)
    } catch (err) {
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const handleVideoSelect = (video) => {
    setCurrentVideo({ url: video.videoUrl, desc: video.description, id: video._id });
  };

  const handleVideoEnd = async () => {
    // try {
    //   await updateCourseProgress(courseId, currentVideo.id, token);
    //   toast.success("Progress saved!");
    // } catch {
    //   toast.error("Failed to update progress");
    // }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await rateandreview(token, rating, review, courseId);
      if (res?.data?.success) {
        toast.success("Review submitted!");
        setShowReviewModal(false);
      } else {
        toast.error(res?.data?.message || "Failed to submit review");
      }
    } catch {
      toast.error("Error submitting review");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full mt-[56px] bg-richblack-900 text-richblack-25">
      {/* Sidebar */}
      <aside className="md:w-[300px] w-full md:h-[calc(100vh-56px)] border-r border-richblack-700 overflow-y-auto">
        <div className="flex items-center justify-between p-4 bg-richblack-800 sticky top-0">
          <Link to="/dashboard/enrolled-courses">
            <IoMdArrowBack size="1.5rem" className="text-richblack-100" />
          </Link>
          <button 
            onClick={() => setShowReviewModal(true)} 
            className="px-3 py-1 bg-yellow-50 text-richblack-900 rounded hover:bg-yellow-100 transition"
          >
            Review
          </button>
        </div>

        {loading ? (
          <div className="p-4">Loading course...</div>
        ) : (
          <>
            <h2 className="p-4 text-lg font-semibold">{course?.courseName}</h2>
            {course
  ?.filter(c => c._id === courseId)
  ?.map((singleCourse) => (
    <React.Fragment key={singleCourse._id}>
      <h2 className="p-4 text-lg font-semibold">{singleCourse.courseName}</h2>
      {singleCourse?.coursecontent?.map(section => (
        <div key={section._id}>
          <button
            className="w-full flex justify-between items-center px-4 py-2 bg-richblack-800 hover:bg-richblack-700 transition"
            onClick={() => setActiveSectionId(activeSectionId === section._id ? null : section._id)}
          >
            <span>{section.sectionName}</span>
            {activeSectionId === section._id ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {activeSectionId === section._id && (
            <div>
              {section?.subsection?.map(video => (
                <div 
                  key={video._id}
                  onClick={() => handleVideoSelect(video)}
                  className={`flex items-center gap-2 px-6 py-2 cursor-pointer hover:bg-yellow-800/40 transition 
                    ${currentVideo.id === video._id ? 'bg-yellow-800/40 text-yellow-200' : ''}`}
                >
                  <IoIosVideocam />
                  <span>{video.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </React.Fragment>
  ))}
          </>
        )}
      </aside>

      {/* Video player & description */}
      <main className="flex-1 p-4 flex flex-col items-center">
        {currentVideo.url ? (
          <>
            <video 
              src={currentVideo.url} 
              controls 
              onEnded={handleVideoEnd}
              className="w-full max-w-4xl rounded-lg shadow-lg"
            />
            {currentVideo.desc && (
              <p className="max-w-4xl mt-4 text-sm bg-richblack-800 p-3 rounded">{currentVideo.desc}</p>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <h3 className="text-xl font-semibold">Select a video to start learning</h3>
            <p className="text-yellow-100">Click on lecture titles in the sidebar</p>
          </div>
        )}
      </main>

      {/* Review modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-richblack-800 w-11/12 max-w-md rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <img src={user?.image} alt="profile" className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-yellow-50 font-semibold">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs">Posting publicly</p>
              </div>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <ReactStars
                count={5}
                onChange={setRating}
                size={30}
                emptyIcon={<MdOutlineStarOutline />}
                fullIcon={<MdOutlineStarPurple500 />}
                activeColor="#ffd700"
              />
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                placeholder="Write your review..."
                className="w-full p-2 rounded bg-richblack-900 text-sm text-white border border-richblack-700 focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowReviewModal(false)}
                  className="px-3 py-1 bg-richblack-700 rounded text-white hover:bg-richblack-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-3 py-1 border border-yellow-50 text-yellow-50 rounded hover:bg-yellow-50 hover:text-richblack-900 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseView;
