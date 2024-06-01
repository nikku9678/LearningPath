import React, { useEffect, useState } from 'react';
import { db } from '../../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../components/redux/courseEnrolledSlice.js';
import './Course.css';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState(null);

  const enrolledCourses = useSelector((state) => state.course);
  const isEnrolled = enrolledCourses.some((enrolledCourse) => enrolledCourse.id === id);

  useEffect(() => {
    const fetchCourse = async () => {
      const courseDoc = doc(db, 'courses', id);
      const courseSnapshot = await getDoc(courseDoc);
      if (courseSnapshot.exists()) {
        setCourse(courseSnapshot.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchCourse();
  }, [id]);

  const toggleWeek = (weekIndex) => {
    setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const enrollCourse = () => {
    dispatch(add({ id, ...course }));
    toast.success("Course enrolled successfully");
  };

  return (
    <div className='course'>
      <div className='course-info'>
        <div className='course-left'>
          <h1>{course.name}</h1>
          <p className='desc'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet,
            obcaecati doloribus tempore quam ratione perspiciatis a expedita
            excepturi nesciunt in! {course.description}
          </p>
          <p><span>Created by - </span> {course.instructor}</p>
          <p>Enrollment Status: <span className='enrollment-status'>{course.enrollmentStatus}</span></p>
          <p>Duration: {course.duration}</p>
          <p>Schedule: {course.schedule}</p>
          <p>Location: {course.location}</p>
          <p>Pre-requisites: {course.prerequisites}</p>
          <p>Language: English</p>
          <div>
            <h2>Syllabus</h2>
            {course.syllabus.map((item, index) => (
              <div key={index} className='week'>
                <div className='week-header' onClick={() => toggleWeek(index)}>
                  <p><strong>Week {item.week}:</strong> {item.topic}</p>
                  <span className={`arrow ${expandedWeek === index ? 'up' : 'down'}`}></span>
                </div>
                {expandedWeek === index && (
                  <div className='week-content'>
                    <p>{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='course-right'>
          <img 
            src={"https://images.unsplash.com/photo-1517329782449-810562a4ec2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D"} 
            alt={course.name} 
          />
          <div className="enroll">
            <button onClick={enrollCourse} disabled={isEnrolled}>
              {isEnrolled ? "Enrolled" : "Enroll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
