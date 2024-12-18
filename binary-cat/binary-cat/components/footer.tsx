import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <motion.footer 
      className="bg-gray-900 bg-opacity-90 text-gray-300 py-6 md:py-8 px-4 md:px-6 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center space-x-6 mb-4">
        <motion.a 
          href="#" 
          className="hover:text-blue-400 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <Github size={24} />
        </motion.a>
        <motion.a 
          href="http://www.linkedin.com/in/khwahishkushwah" 
          className="hover:text-blue-400 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <Linkedin size={24} />
        </motion.a>
      </div>
      <p className="text-xs md:text-sm font-medium">© 2024 Made with <span className="text-red-500">❤️</span> by Khwahish Kushwah</p>
    </motion.footer>
  )
}

