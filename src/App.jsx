
import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader } from "./Loader";
import './Loader.css';
import Navbar from "./Navbar";
import './Navbar.css';
import Home from "./Home";
import './Home.css';
import StudytainmentSection from "./StudytainmentHorizontal";
import './StudytainmentHorizontal.css';
import Classtype from "./Classtype";
import "./Classtype.css";
import Ownpace from "./Ownpace";
import "./Ownpace.css";
import Studyapp from "./Studyapp";
import "./Studyapp.css";
import Focus from "./Focus";
import "./Focus.css";
import Contact from "./Contact";
import "./Contact.css";
import Footer from "./Footer";
import "./Footer.css";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <Loader onComplete={() => setIsLoaded(true)} />
      )}

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <Navbar />
          <Home />

          <section id="challange" className="next-section">
            <StudytainmentSection></StudytainmentSection>
          </section>

          <section id="classtype" className="next-section">
            <Classtype />
          </section>

          <section id="ownpace" className="next-section">
            <Ownpace />
          </section>

          <section id="studyapp" className="next-section">
          <Studyapp />
          </section>

          <section id="focus" className="next-section">
          <Focus />
          </section>
          <section id="contact" className="next-section">
            <Contact />
          </section>
          <section id="footer" className="next-section">
            <Footer />
          </section>
        </motion.div>

      )}
    </>
    
  );
}
