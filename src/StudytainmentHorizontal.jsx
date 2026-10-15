import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import "./StudytainmentHorizontal.css";

const ASSETS = {
  purpleArrow:
    "https://assets.website-files.com/62fcbf467b1adcb80d4ce04d/6322f8e9b305b02f2a7fee6b_purple_arrow_new.webp",
  purpleArrowR:
    "https://assets.website-files.com/62fcbf467b1adcb80d4ce04d/6322fd51aba663554fd7967a_arrow_1.webp",
  blackArrow:
    "https://assets.website-files.com/62fcbf467b1adcb80d4ce04d/6322f764a14376c0cce3ebfe_black_arrow_black.webp",
  step1:
    "https://assets.website-files.com/62fcbf467b1adcb80d4ce04d/63106832ff915b38d52b7d77_Step_4.png",
  step2:
    "https://assets.website-files.com/62fcbf467b1adcb80d4ce04d/631068327d53a5e86a0f8fdd_Step_2.png",
  step3:
    "https://assets.website-files.com/62fcbf467b1adcb80d4ce04d/6310683237560b56ee28f1a3_Step_3.png",
};

const challenges = [
  "Rote Learning Over Real Understanding",
  "One Approach for Every Learner",
  "Rising Academic Pressure",
  "Passive Digital Learning",
];

const growthGaps = [
  "Struggle With Independent Learning",
  "The Gap Beyond Academics",
  "Growing Up Without Continuous Guidance",
];

const objectives = [
  {
    number: "1",
    title: "The Learning Methodology",
    points: ["Understanding Before Memorising", "Making Learning More Engaging"],
  },
  {
    number: "2",
    title: "The Tools & Environment",
    points: [
      "Technology With a Human Purpose",
      "Learning Across Environments",
      "Development Beyond Academics",
    ],
  },
  {
    number: "3",
    title: "The Personal Vision",
    points: [
      "A more connected way to learn",
      "Every Journey Deserves Its Own Pace",
    ],
  },
];

function ItemList({ items }) {
  return (
    <ul className="study-hscroll__list">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true">✳</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function StudytainmentSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Higher damping and lower stiffness smooth the scroll-linked movement.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 30,
    mass: 0.8,
  });

  // Four hundred and fifty viewport heights give each panel more scroll time.
  const trackX = useTransform(smoothProgress, [0, 1], ["0vw", "-223vw"]);

  // Panel 1 gets the first 37% of scroll progress.
  const lineProgress = useTransform(smoothProgress, [0.02, 0.34, 0.37], [0, 1, 1]);
  const arrowX = useTransform(smoothProgress, [0.02, 0.37], ["7vw", "90vw"]);
  const arrowY = useTransform(smoothProgress, [0.02, 0.37], ["73vh", "23vh"]);

  // Panel 2: each objective becomes clear in turn and stays highlighted long enough to read.
  const approachOpacity = useTransform(smoothProgress, [0.34, 0.39, 0.68, 0.72], [0.6, 1, 1, 0.75]);
  const objectiveOne = useTransform(smoothProgress, [0.37, 0.405, 0.49], [0.28, 1, 0.28]);
  const objectiveTwo = useTransform(smoothProgress, [0.46, 0.515, 0.6], [0.28, 1, 0.28]);
  const objectiveThree = useTransform(smoothProgress, [0.57, 0.625, 0.72], [0.28, 1, 0.28]);

  // Panel 3 transitions into a light, curved finish.
  const whiteShade = useTransform(smoothProgress, [1, 9, 4, 5], [0.01, 0.21, 2, 15]);
  const stairRise = useTransform(smoothProgress, [0.68, 0.98], ["50vh", "0vh"]);
  const progressFillScale = useTransform(smoothProgress, [0.2, 1.5], [2, 1]);

  return (
    <section
      className={`study-hscroll ${reduceMotion ? "study-hscroll--reduced" : ""}`}
      ref={sectionRef}
      aria-label="Studytainment: challenges, approach, and outcomes"
    >
      <div className="study-hscroll__sticky">
        <motion.div
          className="study-hscroll__track"
          style={reduceMotion ? undefined : { x: trackX }}
        >
          <article className="study-panel study-panel--challenge">
            <div className="study-panel__watermark" aria-hidden="true">Confidence</div>
            <div className="study-panel__content study-panel__content--challenge">
              <div className="study-panel__intro">
                <p className="study-panel__eyebrow">✺ THE CHALLENGE</p>
                <h2>What you might be<br />facing right now</h2>
                <p className="study-panel__sub">
                  Does your current routine feel more like a burden than a benefit?
                </p>
                <div className="study-hscroll__pills">
                  <span>Stress</span><span>Pressure</span><span>Burnout</span>
                </div>
              </div>

              <div className="study-hscroll__challenge-copy">
                <div className="study-hscroll__copy-block">
                  <h3>Flaws in the Educational System<br />&amp; Methods</h3>
                  <ItemList items={challenges} />
                </div>
                <div className="study-hscroll__copy-block study-hscroll__copy-block--lower">
                  <h3>Gaps in Personal Growth &amp; Support</h3>
                  <ItemList items={growthGaps} />
                </div>
              </div>

              <svg className="study-hscroll__route" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 65 735 C 300 780, 485 690, 640 590 S 820 420, 1015 335"
                  fill="none"
                  stroke="rgba(255,255,255,.22)"
                  strokeWidth="2"
                  strokeDasharray="5 9"
                />
                <motion.path
                  d="M 65 735 C 300 780, 485 690, 640 590 S 820 420, 1015 335"
                  fill="none"
                  stroke="#fff1e7"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{ pathLength: reduceMotion ? 1 : lineProgress }}
                />
              </svg>

              <motion.img
                className="study-hscroll__moving-arrow"
                src={ASSETS.purpleArrow}
                alt=""
                aria-hidden="true"
                style={
                  reduceMotion
                    ? { left: "83%", top: "23%" }
                    : { left: arrowX, top: arrowY }
                }
              />
              <motion.img
                className="study-hscroll__black-arrow"
                src={ASSETS.blackArrow}
                alt=""
                aria-hidden="true"
                animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [-8, 0, -8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </article>


          <article className="study-panel study-panel--approach">
            <div className="study-panel__watermark" aria-hidden="true">Growth</div>
            <div className="study-panel__content study-panel__content--approach">
              <motion.div className="study-panel__intro" style={{ opacity: approachOpacity }}>
                <p className="study-panel__eyebrow">A BETTER WAY FORWARD</p>
                <h2>Studytainment<br />Approach</h2>
                <p className="study-panel__sub">Unlock your potential without the pressure.</p>
              </motion.div>

              <div className="study-hscroll__objective-row">
                {objectives.map((objective, index) => {
                  const opacity = [objectiveOne, objectiveTwo, objectiveThree][index];
                  return (
                    <motion.article
                      className={`study-hscroll__objective study-hscroll__objective--${objective.number}`}
                      key={objective.number}
                      style={{ opacity: reduceMotion ? 1 : opacity }}
                    >
                      <div className="study-hscroll__objective-heading">
                        <span className="study-hscroll__number">{objective.number}</span>
                        <h3>{objective.title}</h3>
                      </div>
                      <ItemList items={objective.points} />
                    </motion.article>
                  );
                })}
              </div>

              <motion.img
                className="study-hscroll__approach-arrow"
                src={ASSETS.purpleArrow}
                alt=""
                aria-hidden="true"
                animate={reduceMotion ? undefined : { y: [0, 10, 0], rotate: [4, 10, 4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </article>

          <div className="curve_last"></div>
          <article className="study-panel study-panel--outcomes">
            <div className="study-panel__watermark" aria-hidden="true">Success</div>
            <motion.div
              className="study-panel__white-shade"
              style={{ opacity: reduceMotion ? 1 : whiteShade }}
            />
            <div className="study-panel__content study-panel__content--outcomes">
              <div className="study-panel__intro">
                <p className="study-panel__eyebrow">THE BIGGER PICTURE</p>
                <h2>Today’s Challenges<br />Need a New Approach<br />to Learning.</h2>
                <p className="study-panel__sub study-panel__sub--outcomes">
                  Studytainment is being built to bring these experiences closer together,
                  making learning more meaningful, engaging and human.
                </p>
                <div className="study-hscroll__pills study-hscroll__pills--outcomes">
                  <span>Growth</span><span>Confidence</span><span>Success</span>
                </div>
              </div>

              <motion.div
                className="study-hscroll__stairs"
                style={reduceMotion ? undefined : { y: stairRise }}
              >
                {[ASSETS.step1, ASSETS.step2, ASSETS.step3, ASSETS.step1].map((src, index) => (
                  <motion.img
                    key={`${src}-${index}`}
                    className={`study-hscroll__stair study-hscroll__stair--${index + 1}`}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    animate={reduceMotion ? undefined : { y: [0, -5 - index * 2, 0] }}
                    transition={{
                      duration: 3.2 + index * 0.45,
                      delay: index * 0.18,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <motion.img
                  className="study-hscroll__outcome-arrow"
                  src={ASSETS.purpleArrow}
                  alt=""
                  aria-hidden="true"
                  animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [-5, 2, -5] }}
                  transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <div className="study-hscroll__progress" aria-hidden="true">
                <span className="study-hscroll__progress-label">YOUR PROGRESS</span>
                <motion.div
                  className="study-hscroll__progress-track"
                  animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span
                    className="study-hscroll__progress-fill"
                    style={{ scaleY: reduceMotion ? 1 : progressFillScale }}
                  />
                </motion.div>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
