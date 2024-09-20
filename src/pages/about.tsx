import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react"; // Make sure to install this package
import aboutAnimation from "../assets/aboutAnimation.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div>
      <Navbar />
      <div className="bg-bg-color text-white min-h-screen flex flex-col items-center justify-center p-8">
        <motion.h1
          className="text-5xl font-bold mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          Welcome to AnimeTrack!
        </motion.h1>

        <motion.div
          className="flex flex-col items-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.7 }}
        >
          <Lottie
            animationData={aboutAnimation}
            loop={true}
            style={{ width: 300, height: 300 }}
          />
        </motion.div>

        <motion.p
          className="text-lg mb-4 text-center max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.9 }}
        >
          AnimeTrack is your ultimate destination for discovering anime and
          manga! Built with modern web technologies including{" "}
          <strong>
            <a href="https://react.dev/">React.js</a>
          </strong>
          ,{" "}
          <strong>
            <a href="https://www.typescriptlang.org/">Typescript</a>
          </strong>
          , and <strong><a href="https://redux.js.org/">Redux</a></strong>, this application leverages the{" "}
          <strong><a href="https://jikan.moe/">JIKAN API</a></strong> to provide a seamless experience for anime
          and manga enthusiasts.
        </motion.p>

        <motion.p
          className="text-lg mb-4 text-center max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 1.1 }}
        >
          Our platform offers comprehensive features such as searching for your
          favorite titles, browsing seasonal anime, and discovering popular
          series. With a user-friendly interface and interactive design, you can
          easily navigate through countless titles and keep track of what to
          watch next.
        </motion.p>

        <motion.p
          className="text-lg mb-4 text-center max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 1.3 }}
        >
          Join our community of anime fans, where you can explore, discuss, and
          share your love for anime and manga. Whether you’re a seasoned otaku
          or a newcomer to the world of anime, AnimeTrack has something for
          everyone!
        </motion.p>

        <motion.p
          className="text-lg mb-4 text-center max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 1.5 }}
        >
          Thank you for visiting AnimeTrack! We hope you enjoy your journey
          through the vibrant world of anime and manga. Happy Searching!
        </motion.p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
