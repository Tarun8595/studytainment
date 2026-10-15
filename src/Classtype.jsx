
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import "./Classtype.css";

const projects = [
  {
    title: "Smart Classroom",
    label: "01",
    video: "smartclassroom.mp4",
  },
  {
    title: "Online Classroom",
    label: "02",
    video: "onlineclass.mp4",
  },
  {
    title: "Studytainment Classroom",
    label: "03",
    video: "studytainment.mp4",
  },
  {
    title: "Group Study",
    label: "04",
    video: "groupstudy.mp4",
  },
];

function ProjectItem({ project, index, activeIndex, onActivate }) {
  const itemRef = useRef(null);

  const isInView = useInView(itemRef, {
    margin: "-45% 0px -45% 0px",
  });

  useEffect(() => {
    if (isInView) onActivate(index);
  }, [isInView, index, onActivate]);

  const isActive = activeIndex === index;

  return (
    <motion.div
      ref={itemRef}
      className={`classtype-item ${isActive ? "is-active" : ""}`}
      onMouseEnter={() => onActivate(index)}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="classtype-label"
        animate={{
          color: isActive ? "#070707" : "#100f0f",
          y: isActive ? 0 : 4,
        }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {project.label.split("\n").map((line, i) => (
          <span key={`${line}-${i}`}>{line}</span>
        ))}
      </motion.div>

      <motion.h2
        animate={{
          color: isActive ? "#070707" : "#100f0f",
          scale: isActive ? 1 : 0.96,
          x: isActive ? 0 : -4,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {project.title}
      </motion.h2>
    </motion.div>
  );
}

function ProjectVideo({ project }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});

    return () => video.pause();
  }, [project.video]);

  return (
    <motion.video
      ref={videoRef}
      className="classtype-video"
      src={project.video}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      initial={{ opacity: 0, scale: 1.07 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        opacity: { duration: 0.55, ease: "easeInOut" },
        scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
    />
  );
}

export default function Classtype() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activateProject = React.useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // Cursor movement with spring smoothing
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 120,
    damping: 22,
    mass: 0.7,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 120,
    damping: 22,
    mass: 0.7,
  });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    pointerX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    );

    pointerY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    );
  };

  const resetMouse = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="classtype-section">
        <p className="classtype_eyebrow">✺ A DIFFERENT WAY TO LEARN</p>
        <p className="classtype_heading">Turn any place into a space for discovery</p>
      <div className="classtype-layout">
        <div className="classtype-list">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.title}
              project={project}
              index={index}
              activeIndex={activeIndex}
              onActivate={activateProject}
            />
          ))}
        </div>

        <div className="classtype-visual">
          <motion.div
            className="classtype-video-frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMouse}
            style={{
              rotateX,
              rotateY,
            }}
          >
            <div className="classtype-video-inner">
              <AnimatePresence mode="sync">
                <ProjectVideo
                  key={projects[activeIndex].video}
                  project={projects[activeIndex]}
                />
              </AnimatePresence>

              <motion.div
                className="classtype-video-caption"
                key={projects[activeIndex].title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <span className="classtype-caption-dot" />
                {projects[activeIndex].title}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
