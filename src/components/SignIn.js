import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./Backdrop";
import GoogleButton from "react-google-button";

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
      <img src="https://i.imgur.com/My0ZbeY.png" id="sign-in-image" />
      <p id="sign-in-subtitle">Begin Your Journey With...</p>
      <h2 id="sign-in-title">Observo</h2>
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
            <GoogleButton
              type="dark" // can be light or dark
              onClick={() => {
                console.log("Google button clicked");
              }}
            />{" "}
          </motion.div>
        </div>
      </motion.div>
    </Backdrop>
  );
}
