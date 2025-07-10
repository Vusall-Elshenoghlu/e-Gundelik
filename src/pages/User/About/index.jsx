import { Container, Row, Col, Card } from "react-bootstrap"
import { motion } from "framer-motion"
import styles from "./About.module.css"
import { Helmet } from "react-helmet"

const About = () => {
  const features = [
    {
      icon: "📅",
      title: "Dərs Cədvəlləri",
      description: "Dinamik və interaktiv dərs cədvəlləri ilə vaxtınızı optimal şəkildə planlaşdırın",
    },
    {
      icon: "📊",
      title: "İştirak Hesabatları",
      description: "Real vaxtda iştirak vəziyyətini izləyin və analiz edin",
    },
    {
      icon: "🎯",
      title: "Qiymətləndirmələr",
      description: "Şəffaf və ədalətli qiymətləndirmə sistemi ilə tələbə irəliləyişini izləyin",
    },
    {
      icon: "📚",
      title: "Dərs Materialları",
      description: "Bütün dərs materiallarına asanlıqla çıxış əldə edin",
    },
    {
      icon: "🤖",
      title: "AI Əsaslı Quizlər",
      description: "Süni intellekt texnologiyası ilə fərdiləşdirilmiş test və quizlər",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Valideyn Nəzarəti",
      description: "Valideynlər üçün tam şəffaflıq və nəzarət imkanları",
    },
  ]


  return (
    <>
    <Helmet>
        <title>Haqqımızda</title>
        <meta name="description" content="Tələbələr, valideynlər, müəllimlər və direktorlar üçün hazırlanmış interaktiv ana səhifə." />
        <meta name="keywords" content="təhsil, tələbə, müəllim, direktor, portal, məktəb" />
      </Helmet>
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <motion.section
        className={styles.heroSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  <span className={styles.brandName}>e-Gündəlik</span>
                  <span className={styles.heroSubtitle}>Təhsilin Rəqəmsal Gələcəyi</span>
                </h1>
                <p className={styles.heroDescription}>
                  Təhsil prosesində şəffaflığı, sürəti və effektivliyi artırmaq məqsədi ilə yaradılmış müasir bir
                  idarəetmə platformasıdır. Məktəblər, müəllimlər, şagirdlər və valideynlər arasında körpü rolu
                  oynayaraq, bütün tərəflərə real vaxtda məlumat paylaşımı və qarşılıqlı əlaqə imkanı yaradır.
                </p>
                <div className={styles.heroStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>100+</span>
                    <span className={styles.statLabel}>Məktəb</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>5000+</span>
                    <span className={styles.statLabel}>Şagird</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>500+</span>
                    <span className={styles.statLabel}>Müəllim</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className={styles.heroImage}>
                <div className={styles.imageContainer}>
                  <div className={styles.floatingCard}>
                    <div className={styles.cardIcon}>📚</div>
                    <div className={styles.cardContent}>
                      <h6>Dərs Materialları</h6>
                      <p>Real vaxtda çıxış</p>
                    </div>
                  </div>
                  <div className={`${styles.floatingCard} ${styles.card2}`}>
                    <div className={styles.cardIcon}>📊</div>
                    <div className={styles.cardContent}>
                      <h6>Analitika</h6>
                      <p>Detallı hesabatlar</p>
                    </div>
                  </div>
                  <div className={`${styles.floatingCard} ${styles.card3}`}>
                    <div className={styles.cardIcon}>🤖</div>
                    <div className={styles.cardContent}>
                      <h6>AI Quizlər</h6>
                      <p>Ağıllı qiymətləndirmə</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className={styles.missionSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className={styles.sectionTitle}>Bizim Missiyamız</h2>
              <p className={styles.missionText}>
                Məqsədimiz, təhsildə texnologiyanın gücündən maksimum istifadə etməklə daha ədalətli və əlçatan bir
                mühit formalaşdırmaqdır. e-Gündəlik, istifadəçilərinə rahat interfeys, güclü təhlükəsizlik və ağıllı
                funksiyalar təqdim edir.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4} className="text-center mb-4">
              <div className={styles.missionCard}>
                <div className={styles.missionIcon}>🎯</div>
                <h4>Şəffaflıq</h4>
                <p>Təhsil prosesində tam şəffaflıq və açıqlıq təmin edirik</p>
              </div>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className={styles.missionCard}>
                <div className={styles.missionIcon}>⚡</div>
                <h4>Sürət</h4>
                <p>Real vaxtda məlumat paylaşımı və sürətli əlaqə</p>
              </div>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className={styles.missionCard}>
                <div className={styles.missionIcon}>📈</div>
                <h4>Effektivlik</h4>
                <p>Təhsil prosesinin effektivliyini maksimum dərəcədə artırırıq</p>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className={styles.featuresSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 className={styles.sectionTitle}>Platformamızın İmkanları</h2>
              <p className={styles.sectionSubtitle}>
                e-Gündəlik platforması müasir təhsilin bütün ehtiyaclarını qarşılayan geniş funksionallıq spektri təqdim
                edir
              </p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className={styles.featureCard}>
                  <Card.Body className="text-center">
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <Card.Title className={styles.featureTitle}>{feature.title}</Card.Title>
                    <Card.Text className={styles.featureDescription}>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        className={styles.visionSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className={styles.visionContent}>
                <h2 className={styles.sectionTitle}>Gələcəyə Baxış</h2>
                <p className={styles.visionText}>
                  Biz inanırıq ki, təhsilin gələcəyi rəqəmsal mühitdə formalaşır və e-Gündəlik bu gələcəyə atılan önəmli
                  addımlardan biridir. Platformamız daim inkişaf edir və yeni texnologiyaları özündə birləşdirir.
                </p>
                <div className={styles.visionPoints}>
                  <div className={styles.visionPoint}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>İnnovasiya və texnologiya</span>
                  </div>
                  <div className={styles.visionPoint}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>İstifadəçi təcrübəsi</span>
                  </div>
                  <div className={styles.visionPoint}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>Təhlükəsizlik və etibarlılıq</span>
                  </div>
                  <div className={styles.visionPoint}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>Davamlı inkişaf</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className={styles.visionImage}>
                <div className={styles.techGrid}>
                  <div className={styles.techItem}>AI</div>
                  <div className={styles.techItem}>Cloud</div>
                  <div className={styles.techItem}>Mobile</div>
                  <div className={styles.techItem}>Analytics</div>
                  <div className={styles.techItem}>Security</div>
                  <div className={styles.techItem}>Real-time</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className={styles.ctaTitle}>Təhsilin Gələcəyinə Qoşulun</h2>
              <p className={styles.ctaText}>e-Gündəlik ilə təhsil prosesini daha effektiv və şəffaf hale gətirin</p>
              <div className={styles.ctaButtons}>
                <button className={`btn ${styles.primaryBtn}`}>Platformaya Başla</button>
                <button className={`btn ${styles.secondaryBtn}`}>Daha Ətraflı</button>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.section>
    </div>
    </>
  )
}

export default About
