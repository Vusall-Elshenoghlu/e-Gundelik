import React from 'react'
import styles from "./ParentMenu.module.css"
import { FaArrowRight } from 'react-icons/fa'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import lessonsPicture from '../../../assets/images/Lessons.jpg';
import lessonsPicturee from '../../../assets/images/lessons.png';
import diaryPicture from '../../../assets/images/diary.png';
import resultPicture from '../../../assets/images/result.jpg';
const menuItems = [
  {
    title: "Dərslər",
    description: "Fənn üzrə bütün dərslərlə buradan tanış ola bilərsiniz",
    route: "/parent-portal/lessons",
    imgUrl: lessonsPicturee, 
  },
  {
    title: "Gündəlik",
    description: "Şagirdin gündəlik qeydlərinə buradan baxa bilərsiniz",
    route: "/parent-portal/diary",
    imgUrl: diaryPicture
  },
  {
    title: "Nəticə",
    description: "Şagirdin qiymətləndirmə nəticələrini buradan izləyə bilərsiniz",
    route: "/parent-portal/results",
    imgUrl: resultPicture
  },
  {
    title: "Kitablar",
    description: "Fənn üzrə kitablarla buradan tanış ola bilərsiniz",
    route: "/parent-portal/books",
    imgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80", // online kitablar şəkli
  },
  {
    title: "Fənlər",
    description: "Fənlərlə buradan tanış ola bilərsiniz",
    route: "/parent-portal/books",
    imgUrl: lessonsPicture
  },
];

function ParentMenu() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 }}
      className={`d-flex flex-column p-4 ${styles.hero}`}
    >
      {menuItems.map((item, index) => (
        <div key={index} className={`${styles.card}`}>
          <div className={`${styles.baseText}`}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button
              className={`${styles.continueBtn}`}
              onClick={() => navigate(item.route)}
            >
              Davam et <FaArrowRight />
            </button>
          </div>
          <div className={`${styles.baseImage}`}>
            <img src={item.imgUrl} alt={item.title} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default ParentMenu;
