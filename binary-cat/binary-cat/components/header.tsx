import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header 
      className="bg-gray-900 bg-opacity-90 text-white py-4 md:py-6 px-4 md:px-6 flex justify-center items-center shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-2xl md:text-3xl font-bold flex items-center tracking-wide"
        whileHover={{ scale: 1.05 }}
      >
        <span className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full mr-2 md:mr-3 animate-pulse"></span>
        BINARY CAT
      </motion.h1>
    </motion.header>
  )
}

