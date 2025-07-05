
import { useEffect, useState } from "react"
import { Container, Button, Modal } from "react-bootstrap"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./MemoryCardGame.module.css"
import appleImage from "../../../assets/images/apple.svg"
import bananaImage from "../../../assets/images/banana.svg"
import bottleImage from "../../../assets/images/bottle.svg"
import grapeImage from "../../../assets/images/grape.svg"
import cornImage from "../../../assets/images/corn.svg"
import iceCreamImage from "../../../assets/images/ice-cream.svg"
import iceCream2Image from "../../../assets/images/ice-cream2.svg"
import lollipopImage from "../../../assets/images/lollipop.svg"
import mixImage from "../../../assets/images/mix.svg"
import peachImage from "../../../assets/images/peach.svg"
import pineappleImage from "../../../assets/images/pinapple.svg"  
import strawberryImage from "../../../assets/images/strawberry.svg"
import waterImage from "../../../assets/images/water.svg"
import watermelonImage from "../../../assets/images/watermelon.svg"
const cardImages = [
  { src: appleImage, name: "apple" },
  { src: bananaImage, name: "banana" },
  { src: bottleImage, name: "bottle" },
  { src: grapeImage, name: "grape" },
  { src: cornImage, name: "corn" },
  { src: iceCreamImage, name: "ice-cream" },
  { src: iceCream2Image, name: "ice-cream2" },
  { src: lollipopImage, name: "lollipop" },
  { src: mixImage, name: "mix" },
  { src: peachImage, name: "peach" },
  { src: pineappleImage, name: "pineapple" },
  { src: strawberryImage, name: "strawberry" },
  { src: waterImage, name: "water" },
  { src: watermelonImage, name: "watermelon" },
]


const Card = ({ card, onClick, isFlipped, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled && !isFlipped) {
      onClick(card)
    }
  }

  return (
    <motion.div
      className={styles.cardContainer}
      whileHover={!isDisabled && !isFlipped ? { scale: 1.05 } : {}}
      whileTap={!isDisabled && !isFlipped ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ""} ${card.matched ? styles.matched : ""}`}
        onClick={handleClick}
      >
        <motion.div
          className={styles.cardFront}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.cardPattern}>?</div>
        </motion.div>
        <motion.div
          className={styles.cardBack}
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6 }}
        >
          <img src={card.src || "/placeholder.svg"} alt={card.name} className={styles.cardImage} />
        </motion.div>
      </div>
    </motion.div>
  )
}

const MemoryCardGame = () => {
  const [cards, setCards] = useState([])
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [moves, setMoves] = useState(0)
  const [initialShow, setInitialShow] = useState(true)
  const [showVictory, setShowVictory] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const shuffleCards = () => {
    const selectedImages = cardImages.slice(0, 8) // 8 pairs = 16 cards
    const shuffled = [...selectedImages, ...selectedImages]
      .map((card) => ({ ...card, id: Math.random(), matched: false }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffled)
    setFirstChoice(null)
    setSecondChoice(null)
    setMoves(0)
    setDisabled(true)
    setInitialShow(true)
    setShowVictory(false)
    setGameStarted(true)

    setTimeout(() => {
      setInitialShow(false)
      setDisabled(false)
    }, 2000)
  }

  const handleChoice = (card) => {
    if (!disabled && !card.matched) {
      firstChoice ? setSecondChoice(card) : setFirstChoice(card)
    }
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true)
      if (firstChoice.name === secondChoice.name && firstChoice.id !== secondChoice.id) {
        setCards((prev) => prev.map((card) => (card.name === firstChoice.name ? { ...card, matched: true } : card)))
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setTimeout(() => setShowVictory(true), 500)
    }
  }, [cards])

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setMoves((prev) => prev + 1)
    setDisabled(false)
  }

  const getStarRating = () => {
    if (moves <= 12) return 3
    if (moves <= 18) return 2
    return 1
  }

  return (
    <div className={styles.gameWrapper}>
      <Container className={styles.gameContainer}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className={styles.title}>🧠 Memory Match Game</h1>
        </motion.div>

        <motion.div
          className={styles.controls}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button variant="primary" size="lg" onClick={shuffleCards} className={styles.restartBtn}>
            🔄 New Game
          </Button>
          <div className={styles.statsContainer}>
            <div className={styles.movesDisplay}>
              <span className={styles.label}>Moves:</span>
              <span className={styles.value}>{moves}</span>
            </div>
            {gameStarted && (
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <motion.div
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(cards.filter((card) => card.matched).length / cards.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className={styles.progressText}>
                  {cards.filter((card) => card.matched).length} / {cards.length}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.board}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card
                  card={card}
                  onClick={handleChoice}
                  isFlipped={initialShow || card === firstChoice || card === secondChoice || card.matched}
                  isDisabled={disabled}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Modal show={showVictory} onHide={() => setShowVictory(false)} centered className={styles.victoryModal}>
          <Modal.Body className={styles.victoryContent}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
              <div className={styles.victoryIcon}>🎉</div>
              <h2 className={styles.victoryTitle}>Congratulations!</h2>
              <p className={styles.victoryText}>
                You completed the game in <strong>{moves}</strong> moves!
              </p>
              <div className={styles.starRating}>
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    className={i < getStarRating() ? styles.starFilled : styles.starEmpty}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setShowVictory(false)
                  shuffleCards()
                }}
                className={styles.playAgainBtn}
              >
                🎮 Play Again
              </Button>
            </motion.div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  )
}

export default MemoryCardGame
