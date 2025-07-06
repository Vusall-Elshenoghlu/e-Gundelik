import React from 'react'
import StudentSection from '../../../components/User/StudentSection'
import ParentSection from '../../../components/User/ParentSection'
import TeacherSection from '../../../components/User/TeacherSection'
import DirectorSection from '../../../components/User/DirectorSection'
import ContactSection from '../../../components/User/ContactSection'

function Home() {
  return (
    <>
      <StudentSection/>
      <ParentSection/>
      <br />
      <TeacherSection/>
      <br />
      <DirectorSection/>
      <br />
      <ContactSection/>
    </>
  )
}

export default Home
