import React from "react";
import styles from "./Card.module.css";

const Card = ({ card, onClick, isFlipped, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled && !isFlipped) onClick(card);
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
    >
      <div className={`${styles.inner} ${isFlipped ?  "": styles.flipped}`}>
        <div className={styles.front}>
          <img src={card.src} alt={card.name} />
        </div>
        <div className={styles.back}>
          <span className={styles.backText}>?</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
