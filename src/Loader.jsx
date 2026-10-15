
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Loader.css";
// import "./chillax.css";

const title = "Studytainment";

export const Loader = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleVideoProgress = (event) => {
    const video = event.currentTarget;

    if (video.duration && Number.isFinite(video.duration)) {
      const value = Math.min(
        100,
        Math.floor((video.currentTime / video.duration) * 110)
      );

      setProgress(value);
    }
  };

  const handleVideoEnd = () => {
    setProgress(100);
    setIsFinished(true);

    // Wait for the loader fade-out before revealing the website.
    setTimeout(() => {
      onComplete();
    }, 100);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.section
          className="loader-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <video
            className="loader_video"
            src="/loader.mp4"
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleVideoProgress}
            onEnded={handleVideoEnd}
          />

          {/* Animated counter */}
          
{/* Animated counter - top right */}
<div className="loader-counter">
  <motion.span
    className="counter-number"
    animate={{ x: progress * 11 }}
    transition={{ duration: 1, ease: "easeOut" }}
    style={{fontFamily: "Chillax-Bold"}}
  >
    {String(progress).padStart(2, "0")}
  </motion.span>
</div>


          {/* Animated heading */}
          <h1 className="loader-title" aria-label={title}>
            {title.split("").map((letter, index) => (
              <span
                className="letter-wrap"
                key={`${letter}-${index}`}
                aria-hidden="true"
              >
                <motion.span
                  className="loader-letter"
                  animate={{ y: ["-30%", "100%", "-30%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.055,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
