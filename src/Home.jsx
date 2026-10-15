
import React from "react";
import { motion } from "motion/react";
import "./Home.css";

const headlineLines = [
    "Feed your mind.",
    "Doesn't force it.",
];

export default function Home() {
    return (
        <main className="home-hero" id="home">
            <motion.div
                className="hero-copy"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { y: 65, opacity: 0 },
                    visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            delay: 0.15,
                            staggerChildren: 0.22,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    },
                }}
            >
                <p className="hero-eyebrow">
                    ✺ A DIFFERENT WAY TO LEARN
                </p>

                <h1 className="hero-heading">
                    {headlineLines.map((line, index) => (
                        <span className="hero-line-mask" key={line}>
                            <motion.span
                                className="hero-line"
                                variants={{
                                    hidden: {
                                        y: "110%",
                                        scaleY: 1.12,
                                        opacity: 0,
                                    },
                                    visible: {
                                        y: "0%",
                                        scaleY: 1,
                                        opacity: 1,
                                        transition: {
                                            duration: 1.05,
                                            ease: [0.22, 1, 0.36, 1],
                                        },
                                    },
                                }}
                                style={{ transformOrigin: "bottom" }}
                            >
                                {line}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                >
                    Welcome, what can we do for you?
                </motion.p>

                <motion.a
                    href="#about"
                    className="hero-cta"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    whileHover={{ x: 6 }}
                >
                    Explore Studytainment 
                    <span>
                        ↗
                    </span>
                </motion.a>
                 <motion.a
                    href="#about"
                    className="hero-cta hero-cta1"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    whileHover={{ x: 6 }}
                >
                    Discover Own Pace Academy
                    <span>
                        ↗
                    </span>
                </motion.a>
            </motion.div>

            <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.96, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <img
                    src="https://cdn.prod.website-files.com/68f68958c2668295d6501e97/6977c005dac304f4da17a994_102825-NEWKID-PRIMER-Backlot1-TopDown-9184%202.webp"
                    alt="A creative learning space"
                    className="hero-image"
                />
                <span className="hero-image-caption">
                    LEARN DIFFERENTLY — 01
                </span>
            </motion.div>
            <motion.div className="nav_bottom_slider">
                <div className="slider_track">
                    {[0, 1].map((group) => (
                        <div className="slider_container" key={group}>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div className="slider_item" key={index}>
                                    <p>Grow at your pace, not under pressure.</p>
                                    <span>✺</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </motion.div>
        </main>
    );
}
