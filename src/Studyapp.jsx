
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import "./Studyapp.css";

const features = [
  {
    number: "01",
    title: "Personalized guidance for every stage, ages 3–30",
    position: "feature-left-top",
  },
  {
    number: "02",
    title: "Follow the journey, track learning and progress",
    position: "feature-left-bottom",
  },
  {
    number: "03",
    title: "Connect with experts and book 1:1 guidance sessions",
    position: "feature-right-top",
  },
  {
    number: "04",
    title: "Learn, explore, grow: meaningful experiences in one place",
    position: "feature-right-bottom",
  },
];

const subjects = [
  { name: "Mathematics", score: 78 },
  { name: "Science", score: 60 },
  { name: "English", score: 46 },
];

function FeatureCard({ feature, index }) {
  return (
    <motion.article
      className={`study-feature ${feature.position}`}
      initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="study-feature-number">{feature.number}</span>
      <p>{feature.title}</p>
    </motion.article>
  );
}

function StudyPhone() {
  const phoneRef = useRef(null);

  // Pointer position controls the 3D phone tilt.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 110,
    damping: 18,
    mass: 0.7,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 110,
    damping: 18,
    mass: 0.7,
  });

  const rotateY = useTransform(smoothX, [-1, 1], [-12, 12]);
  const rotateX = useTransform(smoothY, [-1, 1], [10, -10]);

  const handlePointerMove = (event) => {
    if (!phoneRef.current) return;

    const rect = phoneRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set((x - 0.5) * 2);
    pointerY.set((y - 0.5) * 2);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="study-phone-stage"
      initial={{ opacity: 0, y: 45, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        ref={phoneRef}
        className="study-phone"
        style={{
          rotateX,
          rotateY,
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerUp={resetTilt}
      >
        <div className="study-phone-frame">
          <div className="study-phone-screen">
            <div className="study-phone-island" />

            <div className="study-phone-content">
              <span className="study-check">✓</span>

              <h2>
                Your <span className="study-gradient-word">journey.</span>
                <br />
                Your growth.
              </h2>

              <p className="study-phone-description">
                Personalized guidance for every stage. Follow your learning.
                Track progress and connect with experts.
              </p>
            </div>

            <div className="study-progress-panel">
              <div className="study-progress-summary">
                <div className="study-progress-circle">
                  <strong>72%</strong>
                  <span>overall</span>
                </div>

                <div className="study-progress-stats">
                  <p><strong>12</strong> Lessons completed</p>
                  <p><strong>08</strong> Badges earned</p>
                </div>
              </div>

              <div className="study-subjects">
                {subjects.map((subject) => (
                  <div className="study-subject" key={subject.name}>
                    <div className="study-subject-label">
                      <span>{subject.name}</span>
                      <span>{subject.score}%</span>
                    </div>

                    <div className="study-progress-track">
                      <motion.div
                        className="study-progress-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${subject.score}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.45,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="study-phone-bottom">
              <h3>
                Always within
                <br />
                reach.
              </h3>

              <div className="study-phone-actions">
                <span className="study-action-icon">♧</span>
                <span className="study-action-icon">▤</span>
                <button
                  type="button"
                  className="study-book-button"
                  onClick={() =>
                    document
                      .getElementById("study-contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Book a 1:1 session
                </button>
              </div>
            </div>

            <div className="study-phone-home-indicator" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Studyapp() {
  return (
    <section className="studyapp-section" id="studyapp">

      <div className="studyapp-topline">
        <span className="studyapp-eyebrow">✺ YOUR LEARNING COMPANION</span>
        <span className="studyapp-age">Ages 3 – 30</span>
      </div>

      <div className="studyapp-layout">
        <div className="studyapp-features studyapp-features-left">
          {features.slice(0, 2).map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        <StudyPhone />

        <div className="studyapp-features studyapp-features-right">
          {features.slice(2).map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index + 2}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="studyapp-sparkle"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 8, 0],
          opacity: [0.55, 1, 0.55],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <img src="arrow_nav.webp" alt="" />
      </motion.div>
      <motion.div
        className="studyapp-sparkle2"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -8, 0],
          opacity: [0.55, 1, 0.55],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <img src="arrow_nav2.webp" alt="" />
      </motion.div>
    </section>
  );
}
