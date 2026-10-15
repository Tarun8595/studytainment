import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
} from "react-icons/fa";
import "./Navbar.css";

const menuColumns = [
    [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Blog", href: "#blog" },
    ],
    [
        { label: "Our Story?", href: "#story" },
        { label: "Why Choose Us?", href: "#why-us" },
        { label: "What We Do?", href: "#what-we-do" },
    ],
    [
        { label: "+91 859 5703 558" },
        { label: "contact@gmail.com" },
        { label: "" },

    ],
    [
        {
            label: "",
            href: "https://instagram.com",
            icon: <FaInstagram />,
        },
        {
            label: "",
            href: "https://facebook.com",
            icon: <FaFacebookF />,
        },
        {
            label: "",
            href: "https://youtube.com",
            icon: <FaYoutube />,
        },
    ],
];

function MenuIcon({ isOpen }) {
    return (
        <span className={`menu-icon ${isOpen ? "is-open" : ""}`}>
            <span />
            <span />
        </span>
    );
}


const arrowImages = [
    { src: "/arrow_nav.webp", size: 30, duration: 5.5 },
    { src: "/arrow_nav2.webp", size: 65, duration: 7 },
    { src: "/arrow_nav.webp", size: 22, duration: 10.5 },
    { src: "/arrow_nav2.webp", size: 44, duration: 12 },
    { src: "/arrow_nav.webp", size: 55, duration: 8 },
    { src: "/arrow_nav2.webp", size: 36, duration: 6.5 },
    { src: "/arrow_nav.webp", size: 72, duration: 18.5 },
    { src: "/arrow_nav2.webp", size: 24, duration: 11 },
    { src: "/arrow_nav.webp", size: 45, duration: 9 },
    { src: "/arrow_nav2.webp", size: 36, duration: 8.5 },
];

function FlyingArrow({ arrow, index, mouse }) {
    const [flight] = useState(() => ({
        left: Math.random() * 80,
        top: 10 + Math.random() * 80,
        x: [
            `${Math.random() * 30 - 15}vw`,
            `${Math.random() * 40 - 20}vw`,
            `${Math.random() * 30 - 15}vw`,
            "0vw",
        ],
        y: [
            `${Math.random() * 20 - 10}vh`,
            `${Math.random() * 36 - 18}vh`,
            `${Math.random() * 24 - 12}vh`,
            "0vh",
        ],
        rotate: [
            Math.random() * 80 - 40,
            Math.random() * 140 - 70,
            Math.random() * 100 - 50,
            0,
        ],
        delay: Math.random() * 2,
    }));

    // Smooth mouse-follow motion, independent of normal flight
    const followX = useSpring(useMotionValue(0), {
        stiffness: 90,
        damping: 18,
        mass: 0.7,
    });

    const followY = useSpring(useMotionValue(0), {
        stiffness: 90,
        damping: 18,
        mass: 0.7,
    });

    useEffect(() => {
        if (!mouse.active) {
            followX.set(0);
            followY.set(0);
            return;
        }

        const dx = mouse.x - flight.left;
        const dy = mouse.y - flight.top;

        // Wider horizontal range for the full-screen layout
        const distance = Math.hypot(dx * 1.1, dy * 1.4);
        const radius = 0.30;

        if (distance < radius) {
            const strength = 1 - distance / radius;

            // Gently attract nearby arrows toward the cursor
            followX.set(dx * 180 * strength);
            followY.set(dy * 100 * strength);
        } else {
            // Smoothly return to normal flight
            followX.set(0);
            followY.set(0);
        }
    }, [
        mouse,
        flight,
        followX,
        followY,
    ]);

    return (
        <motion.div
            className="flying-arrow-wrapper"
            initial={{
                left: `${flight.left}%`,
                top: `${flight.top}%`,
                x: "0vw",
                y: "0vh",
                rotate: flight.rotate[0],
            }}
            animate={{
                x: flight.x,
                y: flight.y,
                rotate: flight.rotate,
            }}
            transition={{
                x: {
                    duration: arrow.duration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: flight.delay,
                },
                y: {
                    duration: arrow.duration * 0.75,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: flight.delay,
                },
                rotate: {
                    duration: arrow.duration * 0.9,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: flight.delay,
                },
            }}
            style={{
                zIndex: index + 1,
            }}
        >
            <motion.img
                src={arrow.src}
                alt=""
                aria-hidden="true"
                className="flying-arrow"
                style={{
                    width: arrow.size,
                    x: followX,
                    y: followY,
                }}
            />
        </motion.div>
    );
}

function FlyingArrows() {
    const containerRef = useRef(null);

    const [mouse, setMouse] = useState({
        x: 0,
        y: 0,
        active: false,
    });

    const handleMouseMove = (event) => {
        const rect = containerRef.current?.getBoundingClientRect();

        if (!rect) return;

        setMouse({
            x: (event.clientX - rect.left) / rect.width,
            y: (event.clientY - rect.top) / rect.height,
            active: true,
        });
    };

    const handleMouseLeave = () => {
        setMouse((previous) => ({
            ...previous,
            active: false,
        }));
    };

    return (
        <div
            ref={containerRef}
            className="nav_bottom_arrow"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {arrowImages.map((arrow, index) => (
                <FlyingArrow
                    key={index}
                    arrow={arrow}
                    index={index}
                    mouse={mouse}
                />
            ))}
        </div>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <motion.nav
                className={`site-navbar ${isOpen ? "is-open" : ""}`}
            >
                <a
                    href="#home"
                    className="navbar-brand"
                    onClick={closeMenu}
                >
                    Studytainment
                </a>

                <button
                    className="menu-toggle"
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((open) => !open)}
                >
                    <MenuIcon isOpen={isOpen} />
                </button>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        className="menu-panel"
                        aria-label="Main navigation"
                        initial={{ y: "-100%", opacity: 0.8 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0.8 }}
                        transition={{
                            duration: 0.75,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                    >
                        <div className="menu-columns">
                            {menuColumns.map((column, columnIndex) => (
                                <div
                                    className="menu-column"
                                    key={columnIndex}
                                >
                                    {column.map((item, itemIndex) => (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            className="menu-link"
                                            initial={{
                                                opacity: 0,
                                                y: 18,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.45,
                                                delay:
                                                    0.18 +
                                                    columnIndex * 0.08 +
                                                    itemIndex * 0.06,
                                            }}
                                            whileHover={{ x: 8 }}
                                            onClick={closeMenu}
                                            target={
                                                columnIndex === 2
                                                    ? "_blank"
                                                    : undefined
                                            }
                                            rel={
                                                columnIndex === 2
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                        >
                                            <span className="menu-link-content">
                                                {item.icon && (
                                                    <span className="social-icon">
                                                        {item.icon}
                                                    </span>
                                                )}

                                                <span>{item.label}</span>
                                            </span>

                                            <span className="menu-link-arrow">
                                                ↗
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <FlyingArrows />

                        <motion.div className="nav_bottom_slider">
                            <div className="slider_track">
                                {[0, 1].map((group) => (
                                    <div className="slider_container" key={group}>
                                        {Array.from({ length: 8 }).map((_, index) => (
                                            <div className="slider_item" key={index}>
                                                <p>A DIFFERENT WAY TO LEARN</p>
                                                <span>✺</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.nav>


                )}

            </AnimatePresence>

        </>
    );
}
