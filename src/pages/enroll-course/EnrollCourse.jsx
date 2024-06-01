import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, markCompleted } from '../../components/redux/courseEnrolledSlice.js';
import './EnrolledCourses.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const EnrollCourse = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.course);

  const removeCourse = (courseId) => {
    dispatch(remove(courseId));
    toast.success("Course removed successfully");
  };

  const completeCourse = (courseId) => {
    dispatch(markCompleted(courseId));
    toast.success("Course marked as completed");
  };

  return (
    <div className='enrolled-courses'>
      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        enrolledCourses.map((course) => (
          <div className='enrolled-course' key={course.id}>
            <div className="card">
              <div className="card-img">
                <img src={course.thumbnail} alt={`${course.name} thumbnail`} />
              </div>

              <div className="card-info">
                <h2>{course.name}</h2>
                <p>{course.instructor}</p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `45%` }}
                  ></div>
                </div>
                <p>Due Date: {new Date(course.dueDate).toLocaleDateString()}</p>
                {course.completed ? <p className="completed">Completed</p> : null}
              </div>

              <div className="btn">
                <button>
                  <Link to={`/course-info/${course.id}`}>View Course</Link>
                </button>
                <button onClick={() => removeCourse(course.id)}>Remove</button>
                {!course.completed && (
                  <button onClick={() => completeCourse(course.id)}>Mark as Completed</button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EnrollCourse;
