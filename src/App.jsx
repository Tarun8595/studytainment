
import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader } from "./Loader";
import Navbar from "./Navbar";
import Home from "./Home";
import StudytainmentSection from "./StudytainmentHorizontal";
import Classtype from "./Classtype";
import Ownpace from "./Ownpace";
import Studyapp from "./Studyapp";
import Focus from "./Focus";
import Contact from "./Contact";
import Footer from "./Footer";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* {!isLoaded && (
        <Loader onComplete={() => setIsLoaded(true)} />
      )} */}

      {/* {isLoaded && ( */}
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
    </>
  );
}
