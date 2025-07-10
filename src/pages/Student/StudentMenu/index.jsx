import React from 'react';
import styles from "./StudentMenu.module.css";
import { FaArrowRight } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import lessonPicture from "../../../assets/images/lessons.png"
function StudentMenu() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Dərslər',
      desc: 'Bütün dərslərlə tanış olun və öyrənməyə davam edin',
      path: 'student-page/lessons',
      image: 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
    },
    {
      title: 'Gündəlik',
      desc: 'Gündəlik tapşırıqlar və iştirak məlumatlarını izləyin',
      path: 'student-page/diary',
      image: lessonPicture
    },
    {
      title: 'Özünü Yoxla',
      desc: 'Biliklərinizi test edin və özünüzü qiymətləndirin',
      path: 'student-page/check-yourself',
      image: 'https://cdn-icons-png.flaticon.com/512/4470/4470303.png',
    },
    {
      title: 'İmtahan Vaxtları',
      desc: 'Yaxınlaşan imtahan tarixlərini izləyin',
      path: 'student-page/quiz-times',
      image: 'https://cdn-icons-png.flaticon.com/512/4205/4205695.png',
    },
    {
      title: 'Kitablar',
      desc: 'Əldə olan dərslik və əlavə resurslara baxın',
      path: 'student-page/books',
      image: 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
    },
    {
      title: 'Profilim',
      desc: 'Profil məlumatlarınızı görüntüləyin və yeniləyin',
      path: 'student-page/my-profile',
      image: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 }}
      className={`d-flex flex-column p-4 ${styles.hero}`}
    >
      {cards.map((card, index) => (
        <div className={`${styles.card}`} key={index}>
          <div className={`${styles.baseText}`}>
            <h2>{card.title}</h2>
            <p>{card.desc}</p>
            <button
              className={`${styles.continueBtn}`}
              onClick={() => navigate(`/${card.path}`)}
            >
              Davam et <FaArrowRight />
            </button>
          </div>
          <div className={`${styles.baseImage}`}>
            <img src={card.image} alt={card.title} style={{ maxWidth: '100px', objectFit: 'contain' }} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default StudentMenu;
