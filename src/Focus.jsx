
import React, { useEffect, useRef, useState } from "react";
import "./Focus.css";

const focusItems = [
  {
    id: 1,
    title: "Meaningful Learning",
    description:
      "Learning should be more than memorising facts. We create meaningful experiences that connect knowledge with real life, inspire deeper thinking, and help every learner discover their potential.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85",
    category: "01 / LEARNING",
  },
  {
    id: 2,
    title: "Learner-Centred Approach",
    description:
      "Every learner is different. Our approach puts individual needs, strengths, and interests at the centre, giving each student the confidence and freedom to grow in their own way.",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=85",
    category: "02 / INDIVIDUALITY",
  },
  {
    id: 3,
    title: "Engagement & Curiosity",
    description:
      "We turn questions into discoveries and ideas into possibilities. Through exploration, collaboration, and creative thinking, curiosity becomes a lifelong habit.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85",
    category: "03 / DISCOVERY",
  },
  {
    id: 4,
    title: "Growth Beyond Academics",
    description:
      "Education extends beyond the classroom. We nurture confidence, empathy, creativity, and resilience to help learners become thoughtful individuals ready for the world.",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85",
    category: "04 / GROWTH",
  },
  {
    id: 5,
    title: "One-Size-Fits-All Thinking",
    description:
      "We challenge conventional thinking and make space for different abilities, perspectives, and learning styles. Because every learner deserves an approach that recognises their individuality.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=85",
    category: "05 / NEW PERSPECTIVES",
  },
];

const cardPositions = [
  { x: 8, y: 67, rotate: -9, width: 120 },
  { x: 17, y: 56, rotate: 7, width: 145 },
  { x: 29, y: 44, rotate: -5, width: 160 },
  { x: 42, y: 33, rotate: 6, width: 150 },
  { x: 53, y: 22, rotate: -7, width: 135 },
];

function Focus() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const animationRef = useRef(null);

  const [activeItem, setActiveItem] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    if (!leftRef.current) return;

    const rect = leftRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    cancelAnimationFrame(animationRef.current);

    animationRef.current = requestAnimationFrame(() => {
      setPointer({
        x: (x - 0.5) * 2,
        y: (y - 0.5) * 2,
      });
    });
  };

  const resetPointer = () => {
    cancelAnimationFrame(animationRef.current);
    setPointer({ x: 0, y: 0 });
  };

  const currentItem = focusItems.find(
    (item) => item.id === activeItem
  );

  return (
    <section
      ref={sectionRef}
      className={`focus-section ${isVisible ? "is-visible" : ""}`}
      aria-label="Our educational focus"
    >
      <div className="focus-layout">
        {/* LEFT: Interactive project gallery */}
        <div
          ref={leftRef}
          className="focus-gallery"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="focus-heading">
            <span className="focus-eyebrow">
             ✺ Shaping minds today to lead tomorrow.
            </span>

            <h2>
              Our Focus. Their Future.
            </h2>
          </div>

          <div className="focus-gallery-content">
            <div className="focus-image-stack">
              {focusItems.map((item, index) => {
                const position = cardPositions[index];
                const isActive = activeItem === item.id;

                const distance = index + 1;

                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`focus-image-card ${
                      isActive ? "image-active" : ""
                    } ${
                      activeItem && !isActive
                        ? "image-muted"
                        : ""
                    }`}
                    style={{
                      "--card-x": `${position.x}%`,
                      "--card-y": `${position.y}%`,
                      "--card-rotate": `${position.rotate}deg`,
                      "--card-width": `${position.width}px`,
                      "--card-depth": index,
                      "--pointer-x": `${pointer.x * distance * 5}px`,
                      "--pointer-y": `${pointer.y * distance * 5}px`,
                      "--card-delay": `${index * 90}ms`,
                    }}
                    onMouseEnter={() => setActiveItem(item.id)}
                    onFocus={() => setActiveItem(item.id)}
                    onClick={() => setActiveItem(item.id)}
                    aria-label={`Preview ${item.title}`}
                    aria-pressed={isActive}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable="false"
                    />

                    <span className="focus-image-overlay" />

                    <span className="focus-image-label">
                      {item.category}
                    </span>

                    <span className="focus-image-arrow">↗</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Interactive focus list */}
        <div
          className={`focus-content ${
            currentItem ? "has-active-item" : ""
          }`}
          onMouseLeave={() => setActiveItem(null)}
        >
          <div className="focus-content-noise" />

          <div className="focus-content-top">
            <span className="focus-content-label">
              WHAT WE BELIEVE IN
            </span>

            <span className="focus-content-count">
              {currentItem
                ? `0${currentItem.id}`
                : "EXPLORE 01—05"}
            </span>
          </div>

          <div className="focus-list-area">
            {!currentItem ? (
              <div className="focus-list" key="focus-list">
                {focusItems.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    className="focus-list-item"
                    style={{
                      "--item-delay": `${index * 85}ms`,
                    }}
                    onMouseEnter={() => setActiveItem(item.id)}
                    onFocus={() => setActiveItem(item.id)}
                    onClick={() =>
                      setActiveItem((previous) =>
                        previous === item.id ? null : item.id
                      )
                    }
                    aria-pressed={false}
                  >
                    <span className="focus-item-number">
                      0{item.id}
                    </span>

                    <span className="focus-item-title">
                      {item.title}
                    </span>

                    <span className="focus-item-icon">↗</span>
                  </button>
                ))}
              </div>
            ) : (
              <article
                className="focus-detail"
                key={`detail-${currentItem.id}`}
              >
                <span className="focus-detail-category">
                  {currentItem.category}
                </span>

                <h3>{currentItem.title}</h3>

                <p>{currentItem.description}</p>

                <div className="focus-detail-bottom">
                  <span className="focus-detail-indicator">
                    <span />
                    OUR APPROACH
                  </span>

                  <button
                    type="button"
                    className="focus-detail-close"
                    onClick={() => setActiveItem(null)}
                    aria-label="Close description"
                  >
                    <span>BACK TO ALL</span>
                    <span className="focus-back-arrow">↗</span>
                  </button>
                </div>
              </article>
            )}
          </div>

          <div className="focus-content-bottom">
            <span>EDUCATION WITH PURPOSE.</span>

            <span className="focus-bottom-mark">✳</span>

            <span>BUILT AROUND EVERY LEARNER.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Focus;
