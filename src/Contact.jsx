
import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";

const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`contact-section ${isVisible ? "contact-visible" : ""}`}
    >
      <div className="contact-inner">
        {/* Eyebrow */}
        <p className="contact-eyebrow">
          <span>✺ Have any questions?</span>
        </p>

        {/* Main Heading */}
        <h2 className="contact-heading">
          <span className="contact-heading-line">
            Get a free Seminar
          </span>

          <span className="contact-heading-line">
            about your Future<span className="contact-heading-dot">.</span>
          </span>
        </h2>

        {/* Floating 3D Mascot */}
        <div className="contact-mascot-wrap">
          <div className="contact-mascot-glow" />

          <img
            className="contact-mascot"
            src="arrow_nav.webp"
            alt="Friendly blue virtual assistant mascot"
            draggable="false"
          />
        </div>

        {/* Description */}
        <div className="contact-description">
          <p>
            Every Change Begins with Understanding
          </p>

          <p>
            Join a Studytainment Parenting Seminar or Webinar
          </p>
        </div>

        {/* CTA */}
        <a
          href="mailto:hello@yourwebsite.com?subject=Free%20Project%20Consultation"
          className="contact-cta"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <span className="contact-cta-text">Book a Call</span>

          <span
            className={`contact-cta-icon ${
              isHovered ? "contact-arrow-active" : ""
            }`}
          >
            <svg
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 24H38M27 12L39 24L27 36"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>

        {/* Bottom decorative indicator */}
        <div className="contact-bottom">
          <span className="contact-bottom-line" />
          <span>From first steps to career milestones—we're with you all the way.</span>
          <span className="contact-bottom-line" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
