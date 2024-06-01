import React, { useState } from 'react';
import { db, storage } from '../../firebase.js';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './CourseUpload.css';

const CourseUpload = () => {
  const [course, setCourse] = useState({
    name: '',
    instructor: '',
    description: '',
    enrollmentStatus: '',
    thumbnail: '',
    duration: '',
    schedule: '',
    location: '',
    prerequisites: '',
    syllabus: [],
  });

  const [weeks, setWeeks] = useState(1);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSyllabusChange = (index, field, value) => {
    const updatedSyllabus = [...course.syllabus];
    updatedSyllabus[index] = { ...updatedSyllabus[index], [field]: value };
    setCourse({ ...course, syllabus: updatedSyllabus });
  };

  const handleWeeksChange = (e) => {
    const weeksCount = parseInt(e.target.value);
    setWeeks(weeksCount);
    const updatedSyllabus = Array.from({ length: weeksCount }, (v, i) => ({
      week: i + 1,
      topic: '',
      content: '',
    }));
    setCourse({ ...course, syllabus: updatedSyllabus });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
     
      if (imageFile) {
        const storageRef = ref(storage, `thumbnails/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);
        setCourse({ ...course, thumbnail: imageUrl });
      }
  
     
      const courseData = { ...course };
  
      await addDoc(collection(db, 'courses'), courseData);
      alert('Course added successfully!');
  
      setCourse({
        name: '',
        instructor: '',
        description: '',
        enrollmentStatus: '',
        thumbnail: '',
        duration: '',
        schedule: '',
        location: '',
        prerequisites: '',
        syllabus: [],
      });
      setWeeks(1);
      setImageFile(null);
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Error adding course. Please try again later.');
    }
  };

  return (
    <form className="course-upload-form" onSubmit={handleSubmit}>
      <h2>Add New Course</h2>
      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={course.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="instructor"
        placeholder="Instructor"
        value={course.instructor}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={course.description}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="enrollmentStatus"
        placeholder="Enrollment Status"
        value={course.enrollmentStatus}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={course.duration}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="schedule"
        placeholder="Schedule"
        value={course.schedule}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={course.location}
        onChange={handleChange}
        required
      />
      <textarea
        name="prerequisites"
        placeholder="Pre-requisites (comma separated)"
        value={course.prerequisites}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="weeks"
        placeholder="Number of Weeks"
        value={weeks}
        onChange={handleWeeksChange}
        min="1"
        required
      />
      {Array.from({ length: weeks }).map((_, index) => (
        <div key={index} className="syllabus-inputs">
          <h3>Week {index + 1}</h3>
          <input
            type="text"
            placeholder="Topic"
            value={course.syllabus[index]?.topic || ''}
            onChange={(e) => handleSyllabusChange(index, 'topic', e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={course.syllabus[index]?.content || ''}
            onChange={(e) => handleSyllabusChange(index, 'content', e.target.value)}
            required
          />
        </div>
      ))}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseUpload;