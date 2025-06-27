import React from 'react'
import StudentSection from '../../../components/User/StudentSection'
import ParentSection from '../../../components/User/ParentSection'
import TeacherSection from '../../../components/User/TeacherSection'
import DirectorSection from '../../../components/User/DirectorSection'

function Home() {
  return (
    <>
      <StudentSection/>
      <ParentSection/>
      <br />
      <TeacherSection/>
      <br />
      <DirectorSection/>
    </>
  )
}

export default Home
