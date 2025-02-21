import { motion, Variants } from "framer-motion";

interface AnimatedCheckmarkProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

export function AnimatedCheckmark({
  size = "lg",
  className,
}: AnimatedCheckmarkProps) {
  const pathVariants: Variants = {
    initial: {
      pathLength: 0,
      opacity: 0,
      rotate: -3,
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        pathLength: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 0.5,
          repeatType: "reverse",
        },
        opacity: { duration: 0.01 },
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 0.5,
          repeatType: "reverse",
        },
      },
    },
  };

  const circleVariants: Variants = {
    initial: {
      scale: 0.95,
      opacity: 0.7,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
        repeatType: "reverse",
      },
    },
  };

  return (
    <div className={`${sizeMap[size]} relative ${className || ""}`}>
      {/* Background Circle */}
      <motion.div
        variants={circleVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 rounded-full bg-green-50 dark:bg-green-900/20"
      />

      {/* SVG Checkmark */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
      >
        <motion.path
          d="M20 50L40 70L80 30"
          variants={pathVariants}
          initial="initial"
          animate="animate"
          className="stroke-green-600 dark:stroke-green-500"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
