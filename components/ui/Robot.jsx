import { motion } from 'framer-motion';

export default function Robot() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* Robot Animation Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        style={{ display: 'inline-block' }}
      >
        {/* Robot Image */}
        <motion.img
          src="/robo.jpg" // Adjust the path if your image is hosted elsewhere
          alt="Robot"
          width={200} // Adjust size as needed
          height={400} // Adjust size as needed
          animate={{
            rotate: [0, 5, -5, 0], // Simple head bobbing effect
            x: [0, 10, -10, 0], // Moving left and right
            scale: [1, 1.05, 1], // Slightly growing and shrinking
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}
