
import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    let frameId = null;

    const updateProgress = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const rect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Reveal the panel as the footer enters the viewport.
        const revealDistance = viewportHeight * 0.72;
        const rawProgress =
          (viewportHeight - rect.top) / revealDistance;

        const nextProgress = Math.max(
          0,
          Math.min(1, rawProgress)
        );

        setProgress(nextProgress);
        frameId = null;
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const contentProgress = Math.max(
    0,
    Math.min(1, (progress - 0.38) / 0.42)
  );

  const footerStyle = {
    "--footer-progress": progress,
    "--footer-panel-height": `${progress * 82}svh`,
    "--footer-content-opacity": contentProgress,
    "--footer-content-y": `${(1 - contentProgress) * 35}px`,
    "--footer-content-blur": `${(1 - contentProgress) * 10}px`,
  };

  return (
    <footer
      ref={footerRef}
      className="matters-footer"
      style={footerStyle}
    >
      <div className="matters-footer-panel">
        {/* Top left: email */}
        <div className="matters-footer-contact">
          <h3>Course enquiries</h3>

          <a
            href="mailto:hello@yourwebsite.com"
            className="matters-email-pill"
          >
            <span>studytainment@gmail.com</span>

            <span className="matters-email-arrow">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M25 16H7M15 8L7 16L15 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Top right: social links */}
        <nav
          className="matters-footer-socials"
          aria-label="Social media"
        >
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </nav>

        {/* Oversized brand word */}
        <div className="matters-footer-word-wrap">
          <a
            href="#top"
            className="matters-footer-word"
            aria-label="Matters — back to top"
          >
            Studytainment<span className="matters-footer-period">°</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="matters-footer-copyright">
          <span>
            ©{new Date().getFullYear()} Studytainment · All rights reserved
          </span>

          <a href="#top" className="matters-back-to-top">
            BACK TO TOP ↑
          </a>
        </div>

        {/* Decorative grain */}
        <div
          className="matters-footer-grain"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
};

export default Footer;
