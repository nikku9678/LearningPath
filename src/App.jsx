import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import CourseDetails from './pages/courses/CourseDetails';
import EnrollCourse from './pages/enroll-course/EnrollCourse';
import CourseUpload from './components/courses/CourseUpload';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
     

        <Route path="/" element={<Home />} />
        <Route path="/course-info/:id" element={<CourseDetails />} />
        <Route path="/enroll-course" element={<EnrollCourse />} />
        <Route path="/course-upload" element={<CourseUpload />} />

  
     
    </Routes>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </BrowserRouter>
  )
}

export default App
