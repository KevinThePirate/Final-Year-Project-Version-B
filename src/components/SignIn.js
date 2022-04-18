import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./Backdrop";
import GoogleButton from "react-google-button";
import { BsGoogle } from "react-icons/bs";

const dropIn = {
  hidden: {
    scale: "0%",
    opacity: 0,
  },
  visible: {
    scale: "100%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    scale: "0%",
    opacity: 0,
  },
};

export default function SignIn(props, { handleClose, text }) {
  return (
    <Backdrop onClick={handleClose}>
      <div id="sign-in-image">
        <img src="https://i.imgur.com/My0ZbeY.png" />
      </div>

      <div>
        <p id="sign-in-subtitle">Begin Your Journey With...</p>
        <h2 id="sign-in-title">Observo</h2>
      </div>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit">
        <div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={props.signInWithGoogle}>
            {" "}
            <button
              class="stand-button"
              onClick={() => {
                console.log("Google button clicked");
              }}>
              {" "}
              Sign In <BsGoogle />{" "}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </Backdrop>
  );
}
