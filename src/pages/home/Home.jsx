import React, { useEffect, useState } from "react";
import "./Home.css";
import { add } from "../../components/redux/courseEnrolledSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState({});

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.course);
  const items = useSelector((state) => state.course);
  console.log(items);

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = collection(db, 'courses');
      const courseSnapshot = await getDocs(courseCollection);
      const courseList = courseSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  const handleEnroll = (course) => {
    console.log("click");
    dispatch(add(course));
    toast.success("Course enrolled successfully");

    // Update the enrolledCourses state
    setEnrolledCourses(prevState => ({
      ...prevState,
      [course.id]: true
    }));
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-name">Latest Courses</div>
        <div className="search">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="all-courses">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card">
            <div className="card-img">
              <img src={course.thumbnail} alt={`${course.name} thumbnail`} />
            </div>

            <div className="card-info">
              <h2>{course.name}</h2>
              <p>{course.instructor}</p>
            </div>

            <div className="btn">
              <button>
                <Link to={`/course-info/${course.id}`}>View Course</Link>
              </button>
              <button 
                onClick={() => handleEnroll(course)} 
                disabled={enrolledCourses[course.id]}
              >
                {enrolledCourses[course.id] ? "Enrolled" : "Enroll"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
