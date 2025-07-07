"use client"

import { Container, Row, Col, Accordion, Card } from "react-bootstrap"
import { motion } from "framer-motion"
import { useState } from "react"
import styles from "./FAQ.module.css"

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState("general")

    const faqCategories = [
        { id: "general", name: "Ümumi", icon: "❓" },
        { id: "students", name: "Şagirdlər", icon: "🎓" },
        { id: "teachers", name: "Müəllimlər", icon: "👨‍🏫" },
        { id: "parents", name: "Valideynlər", icon: "👨‍👩‍👧‍👦" },
        { id: "technical", name: "Texniki", icon: "⚙️" },
    ]

    const faqData = {
        general: [
            {
                question: "e-Gündəlik nədir və necə işləyir?",
                answer:
                    "e-Gündəlik müasir təhsil idarəetmə sistemidir. Platform məktəblər, müəllimlər, şagirdlər və valideynlər arasında əlaqə yaradır, dərs cədvəlləri, qiymətlər, davamiyyət və digər məlumatları real vaxtda paylaşır.",
            },
            {
                question: "Platformaya necə qeydiyyatdan keçə bilərəm?",
                answer:
                    "Qeydiyyat prosesi çox sadədir. Məktəbinizin admin və ya müəllimindən dəvət linki alın, şəxsi məlumatlarınızı daxil edin və e-poçt təsdiqini tamamlayın. Daha sonra platformanın bütün imkanlarından istifadə edə bilərsiniz.",
            },
            {
                question: "Platform hansı cihazlarda işləyir?",
                answer:
                    "e-Gündəlik bütün müasir cihazlarda işləyir: kompüterlər, planşetlər və mobil telefonlar. Responsive dizayn sayəsində istənilən ekran ölçüsündə rahat istifadə edə bilərsiniz.",
            },
            {
                question: "Məlumatlarımın təhlükəsizliyi necə təmin edilir?",
                answer:
                    "Biz ən yüksək təhlükəsizlik standartlarını tətbiq edirik. SSL şifrələmə, iki faktorlu autentifikasiya və müntəzəm təhlükəsizlik yoxlamaları ilə məlumatlarınızı qoruyuruq.",
            },
        ],
        students: [
            {
                question: "Qiymətlərimi necə görə bilərəm?",
                answer:
                    "Ana səhifədə 'Qiymətlərim' bölməsinə daxil olaraq bütün fənlər üzrə qiymətlərinizi görə bilərsiniz. Həmçinin hər qiymətin ətraflı təfsilatını və müəllim şərhlərini oxuya bilərsiniz.",
            },
            {
                question: "Davamiyyət məlumatlarım harada görünür?",
                answer:
                    "Davamiyyət məlumatlarınız 'Davamiyyət' bölməsində tarix və fən üzrə təşkil edilmişdir. Buradan hansı dərslərdə iştirak etdiyinizi və ya etmədiyinizi görə bilərsiniz.",
            },
            {
                question: "AI quizlər necə işləyir?",
                answer:
                    "AI quizlər sizin bilik səviyyənizə uyğun olaraq avtomatik yaradılır. Hər düzgün cavabdan sonra suallar çətinləşir, səhv cavabdan sonra isə asanlaşır. Bu şəkildə optimal öyrənmə təcrübəsi əldə edirsiniz.",
            },
            {
                question: "Ev tapşırıqlarını necə təhvil verə bilərəm?",
                answer:
                    "Ev tapşırıqları bölməsində müəllimin verdiyi tapşırığı seçin, cavabınızı yazın və ya fayl əlavə edin. Təhvil vermə vaxtı bitməmişsə istədiyiniz qədər redaktə edə bilərsiniz.",
            },
        ],
        teachers: [
            {
                question: "Şagird qiymətlərini necə daxil edə bilərəm?",
                answer:
                    "Qiymətləndirmə bölməsində sinfinizi və fəninizi seçin, şagird adını tapın və qiyməti daxil edin. İstəsəniz qiymətə şərh də əlavə edə bilərsiniz. Qiymət dərhal şagird və valideynə göndərilir.",
            },
            {
                question: "Davamiyyəti necə qeyd edə bilərəm?",
                answer:
                    "Hər dərsdən əvvəl və ya sonra davamiyyət bölməsinə daxil olaraq şagirdlərin iştirak vəziyyətini qeyd edin. Sistem avtomatik olaraq statistika hazırlayır və valideynlərə məlumat göndərir.",
            },
            {
                question: "Dərs materiallarını necə paylaşa bilərəm?",
                answer:
                    "Materiallar bölməsində yeni material əlavə edin, faylları yükləyin və ya linklər paylaşın. Materialları müəyyən sinif və ya şagird qrupları ilə paylaşa bilərsiniz.",
            },
            {
                question: "Valideynlərlə necə əlaqə saxlaya bilərəm?",
                answer:
                    "Mesajlaşma sistemi vasitəsilə valideynlərlə birbaşa əlaqə saxlaya bilərsiniz. Həmçinin qrup mesajları göndərə və ya elan paylaşa bilərsiniz.",
            },
        ],
        parents: [
            {
                question: "Uşağımın qiymətlərini necə izləyə bilərəm?",
                answer:
                    "Uşağınızın profilinə daxil olaraq bütün fənlər üzrə qiymətləri, davamiyyət məlumatlarını və müəllim şərhlərini real vaxtda görə bilərsiniz. Həmçinin qiymət dəyişikliklərindən avtomatik xəbərdar olursunuz.",
            },
            {
                question: "Müəllimlərlə necə əlaqə saxlaya bilərəm?",
                answer:
                    "Hər müəllimin profil səhifəsində mesaj göndərmə imkanı var. Həmçinin məktəbin ümumi elanlarını və müəllim mesajlarını da görə bilərsiniz.",
            },
            {
                question: "Uşağımın ev tapşırıqlarını necə izləyə bilərəm?",
                answer:
                    "Ev tapşırıqları bölməsində uşağınıza verilmiş bütün tapşırıqları, təhvil vermə tarixlərini və tamamlanma vəziyyətini görə bilərsiniz.",
            },
            {
                question: "Bildirişləri necə idarə edə bilərəm?",
                answer:
                    "Tənzimləmələr bölməsində hansı növ bildirişlər almaq istədiyinizi seçə bilərsiniz: qiymət dəyişiklikləri, davamiyyət, ev tapşırıqları və s.",
            },
        ],
        technical: [
            {
                question: "Şifrəmi unutmuşam, necə bərpa edə bilərəm?",
                answer:
                    "Giriş səhifəsində 'Şifrəni unutmuşam' linkini klikləyin, e-poçt ünvanınızı daxil edin. Sizə göndərilən linkə klikləyərək yeni şifrə təyin edə bilərsiniz.",
            },
            {
                question: "Mobil tətbiq varmı?",
                answer:
                    "Hələlik mobil tətbiqimiz yoxdur, lakin veb versiyamız mobil cihazlarda mükəmməl işləyir. Yaxın gələcəkdə iOS və Android tətbiqləri hazırlanacaq.",
            },
            {
                question: "Sistem yavaş işləyir, nə edə bilərəm?",
                answer:
                    "Brauzerinizin keşini təmizləyin, internetinizin sürətini yoxlayın və ya başqa brauzerdə cəhd edin. Problem davam edərsə, texniki dəstək komandası ilə əlaqə saxlayın.",
            },
            {
                question: "Məlumatlarımı necə yedəkləyə bilərəm?",
                answer:
                    "Profil tənzimləmələrində 'Məlumatları İxrac Et' seçimini istifadə edərək şəxsi məlumatlarınızı PDF və ya Excel formatında yükləyə bilərsiniz.",
            },
        ],
    }

    return (
        <div className={styles.faqContainer}>
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
                        <Col lg={8} className="mx-auto text-center">
                            <div className={styles.heroContent}>
                                <div className={styles.heroIcon}>❓</div>
                                <h1 className={styles.heroTitle}>Tez-tez Verilən Suallar</h1>
                                <p className={styles.heroDescription}>
                                    e-Gündəlik platforması haqqında ən çox verilən sualların cavablarını burada tapa bilərsiniz.
                                    Axtardığınız cavabı tapmadınızsa, bizimlə əlaqə saxlamaqdan çəkinməyin.
                                </p>
                                <div className={styles.searchBox}>
                                    <input type="text" placeholder="Sual axtarın..." className={styles.searchInput} />
                                    <button className={styles.searchBtn}>🔍</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </motion.section>

            {/* Categories Section */}
            <motion.section
                className={styles.categoriesSection}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className={styles.categoryTabs}>
                                {faqCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`${styles.categoryTab} ${activeCategory === category.id ? styles.active : ""}`}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        <span className={styles.categoryIcon}>{category.icon}</span>
                                        <span className={styles.categoryName}>{category.name}</span>
                                    </button>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </motion.section>

            {/* FAQ Content Section */}
            <motion.section
                className={styles.faqSection}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Container>
                    <Row>
                        <Col lg={10} className="mx-auto">
                            <Accordion className={styles.faqAccordion}>
                                {faqData[activeCategory].map((faq, index) => (
                                    <Accordion.Item eventKey={index.toString()} key={index} className={styles.faqCard}>
                                        <Accordion.Header className={styles.faqHeader}>
                                            <div className={styles.faqQuestion}>
                                                <span className={styles.questionIcon}>Q</span>
                                                <span>{faq.question}</span>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className={styles.faqBody}>
                                            <div className={styles.faqAnswer}>
                                                <span className={styles.answerIcon}>A</span>
                                                <span>{faq.answer}</span>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </motion.section>

            {/* Help Section */}
            <motion.section
                className={styles.helpSection}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto text-center">
                            <h2 className={styles.helpTitle}>Hələ də sualınız var?</h2>
                            <p className={styles.helpText}>
                                Axtardığınız cavabı tapmadınızsa, bizim dəstək komandamız sizə kömək etməyə hazırdır.
                            </p>
                            <div className={styles.helpOptions}>
                                <div className={styles.helpOption}>
                                    <div className={styles.helpIcon}>📧</div>
                                    <h4>E-poçt Dəstəyi</h4>
                                    <p>support@e-gundelik.az</p>
                                    <button className={styles.helpBtn}>E-poçt Göndər</button>
                                </div>
                                <div className={styles.helpOption}>
                                    <div className={styles.helpIcon}>💬</div>
                                    <h4>Canlı Söhbət</h4>
                                    <p>24/7 onlayn dəstək</p>
                                    <button className={styles.helpBtn}>Söhbət Başlat</button>
                                </div>
                                <div className={styles.helpOption}>
                                    <div className={styles.helpIcon}>📞</div>
                                    <h4>Telefon Dəstəyi</h4>
                                    <p>+994 12 345 67 89</p>
                                    <button className={styles.helpBtn}>Zəng Et</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </motion.section>

            {/* Popular Topics */}
            <motion.section
                className={styles.topicsSection}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Container>
                    <Row>
                        <Col lg={12}>
                            <h2 className={styles.topicsTitle}>Populyar Mövzular</h2>
                            <div className={styles.topicTags}>
                                <span className={styles.topicTag}>Qeydiyyat</span>
                                <span className={styles.topicTag}>Şifrə Bərpası</span>
                                <span className={styles.topicTag}>Qiymətləndirmə</span>
                                <span className={styles.topicTag}>Davamiyyət</span>
                                <span className={styles.topicTag}>AI Quizlər</span>
                                <span className={styles.topicTag}>Mobil İstifadə</span>
                                <span className={styles.topicTag}>Valideyn Nəzarəti</span>
                                <span className={styles.topicTag}>Təhlükəsizlik</span>
                                <span className={styles.topicTag}>Texniki Dəstək</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </motion.section>
        </div>
    )
}

export default FAQ
