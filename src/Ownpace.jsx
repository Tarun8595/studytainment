
import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "motion/react";
import "./Ownpace.css";

const stories = [
    {
        category: "Learn",
        secondary: "Lifelong",
        third: "Journey",
        title: "Learning Is Only One Part of Growing Up.",
        description:
            "Every stage of life brings different questions, challenges and possibilities.",
        position: "card-one",
        image: "learningB.png",
    },
    {
        category: "3 - 12",
        secondary: "FOUNDATION",
        third: "Discover",
        title: "Building the basics, sparking curiosity.",
         description: "Where every big dream begins.",
        position: "card-two",
        image: "FOUNDATION.png",
    },
    {
        category: "13 - 20",
        secondary: "RISING STAR",
        third: "Develop",
        title: "Finding your voice, building your future.",
         description: "Turning passion into direction.",
        position: "card-three",
        image: "risingstar.png",
    },
    {
        category: "21 - 30",
        secondary: "CAREER SUCCESS",
        third: "Dominate",
        title: "Mastering your craft, leading the way.",
         description: "Turning ambition into achievement.",
        position: "card-four",
        image: "carrersuccess.png",
    },
    {
         category: "Guidance",
        secondary: "Growth",
        third: "Possibilities",
        title: "Guidance. Growth. Infinite Possibilities.",
        description:
            "Guidance that shapes. Growth that inspires. Possibilities that empower.",
        position: "card-five",
        image: "3inone.png",
    },
];


function StoryCard({ story, index, progress }) {
    // Each card enters, crosses the screen, and exits at the top.
    const start = 0.20 + index * 0.1;
    const end = start + 0.15;

    const y = useTransform(
        progress,
        [start, start + 0.035, end - 0.035, end],
        ["110vh", "75vh", "-75vh", "-110vh"]
    );

    const opacity = useTransform(
        progress,
        [start, start + 0.035, end - 0.035, end],
        [0, 1, 1, 0]
    );

    const blur = useTransform(
        progress,
        [start, start + 0.06, end - 0.06, end],
        [
            "blur(12px)",
            "blur(0px)",
            "blur(0px)",
            "blur(12px)",
        ]
    );

    const scale = useTransform(
        progress,
        [start, start + 0.08, end],
        [0.94, 1, 0.97]
    );

    return (
        <motion.article
            className={`ownpace-card ${story.position}`}
            style={{
                top: "50%",
                y,
                opacity,
                filter: blur,
                scale,
            }}
        >
            <div className="ownpace-card-tags">
                <span>{story.category}</span>
                {story.secondary && <span>{story.secondary}</span>}
                 <span>{story.third}</span>
            </div>

            <div className="ownpace-card-content">
                {story.image ? (
                    <img
                        className="ownpace-card-image"
                        src={story.image}
                        alt=""
                    />
                ) : (
                    <div className={`ownpace-card-thumbnail thumbnail-${index + 1}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                )}

                <div className="ownpace-card-copy">
                    <h3>{story.title}</h3>
                    {story.description && <p>{story.description}</p>}
                </div>
            </div>

        </motion.article>
    );
}


export default function Ownpace() {
    const sectionRef = useRef(null);


    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

     const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 40,
        mass: 0.5,
    });

    // Phase 1: Heading enters.
    // Phase 2: Heading remains fixed as cards enter.
    // Phase 3: Heading blurs and fades near the end.
    const headingY = useTransform(
        scrollYProgress,
        [0, 0.13, 0.19, 0.90, 1],
        ["45vh", "0vh", "0vh", "0vh", "-12vh"]
    );

    const headingOpacity = useTransform(
        scrollYProgress,
        [0, 0.12, 0.19, 0.91, 1],
        [0, 1, 1, 1, 0]
    );

    const headingBlur = useTransform(
        scrollYProgress,
        [0, 0.12, 0.19, 0.90, 1],
        [
            "blur(18px)",
            "blur(5px)",
            "blur(0px)",
            "blur(0px)",
            "blur(18px)",
        ]
    );

    const headingScale = useTransform(
        scrollYProgress,
        [0, 0.15, 0.90, 1],
        [0.92, 1, 1, 0.97]
    );

    return (
       <>
        <motion.section className="ownpace-section" ref={sectionRef}>
            <div className="ownpace-sticky">
       {/* <div className="own_curve"></div>         */}
                <motion.h1
                    className="ownpace-heading"
                    style={{
                        y: headingY,
                        opacity: headingOpacity,
                        filter: headingBlur,
                        scale: headingScale,
                    }}
                >
                   Study <span> tain </span>ment
                </motion.h1>

                <div className="ownpace-cards">
                    {stories.map((story, index) => (
                        <StoryCard
                            key={story.title}
                            story={story}
                            index={index}
                            progress={smoothProgress}
                        />
                    ))}
                </div>
                {/* <div className="own_curve2"></div> */}
            </div>
        </motion.section>
       </>
    );
}
