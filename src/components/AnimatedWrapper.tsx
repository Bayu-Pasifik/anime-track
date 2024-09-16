import { motion } from "framer-motion";
import React from "react";

interface AnimatedWrapperProps {
  index: number;
  type: "card" | "list";
  children: React.ReactNode;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  index,
  type,
  children,
}) => {
  // Animasi berbeda tergantung jenis "card" atau "list"
  const animationProps =
    type === "card"
      ? {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
        }
      : {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
        };

  return (
    <motion.div
      key={index}
      {...animationProps}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
