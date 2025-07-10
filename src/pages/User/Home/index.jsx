import React from 'react'
import StudentSection from '../../../components/User/StudentSection'
import ParentSection from '../../../components/User/ParentSection'
import TeacherSection from '../../../components/User/TeacherSection'
import DirectorSection from '../../../components/User/DirectorSection'
import ContactSection from '../../../components/User/ContactSection'
import { Helmet } from 'react-helmet'


function Home() {
  return (
    <>
    <Helmet>
        <title>Ana Səhifə | Təhsil Portalı</title>
        <meta name="description" content="Tələbələr, valideynlər, müəllimlər və direktorlar üçün hazırlanmış interaktiv ana səhifə." />
        <meta name="keywords" content="təhsil, tələbə, müəllim, direktor, portal, məktəb" />
      </Helmet>
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
