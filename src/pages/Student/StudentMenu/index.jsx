import React from 'react'
import styles from "./StudentMenu.module.css"
import { FaArrowRight } from 'react-icons/fa'
import lessonImage from '../../../assets/images/lessons.png';

function StudentMenu() {
  return (
    <div className={`d-flex flex-column p-4 ${styles.hero}`}>
      <div className={`${styles.card}`}>
         <div className={`${styles.baseText}`}>
            <h2>Bütün Dərslər</h2>
            <p>Fənn üzrə bütün dərslərlə buradan tanış ola bilərsiniz</p>
            <button className={`${styles.continueBtn}`}>Davam et <FaArrowRight/></button>
         </div>
         <div className={`${styles.baseImage}`}><img src={lessonImage} alt="" /></div>
         
      </div>
      <div className={`${styles.card}`}>
         <div className={`${styles.baseText}`}>
            <h2>Bütün Dərslər</h2>
            <p>Fənn üzrə bütün dərslərlə buradan tanış ola bilərsiniz</p>
            <button className={`${styles.continueBtn}`}>Davam et <FaArrowRight/></button>
         </div>
         <div className={`${styles.baseImage}`}><img src={lessonImage} alt="" /></div>
         
      </div>
      <div className={`${styles.card}`}>
         <div className={`${styles.baseText}`}>
            <h2>Bütün Dərslər</h2>
            <p>Fənn üzrə bütün dərslərlə buradan tanış ola bilərsiniz</p>
            <button className={`${styles.continueBtn}`}>Davam et <FaArrowRight/></button>
         </div>
         <div className={`${styles.baseImage}`}><img src={lessonImage} alt="" /></div>
         
      </div>
      <div className={`${styles.card}`}>
         <div className={`${styles.baseText}`}>
            <h2>Bütün Dərslər</h2>
            <p>Fənn üzrə bütün dərslərlə buradan tanış ola bilərsiniz</p>
            <button className={`${styles.continueBtn}`}>Davam et <FaArrowRight/></button>
         </div>
         <div className={`${styles.baseImage}`}><img src={lessonImage} alt="" /></div>
         
      </div>
      
    </div>
  )
}

export default StudentMenu
